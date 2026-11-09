/**
 * Germin8 Intelligent Field Mapping Engine
 * 5-Tier Matching Algorithm:
 * 1. Exact ID/Name Match
 * 2. Label & Placeholder Match
 * 3. Semantic & Structural Context Match (tables, sections, types)
 * 4. Fuzzy & AI-Assisted Heuristic Match (Token similarity, Levenshtein, Abbreviations)
 * 5. Manual Mapping Overrides & Learned Rules
 */

import { FIELD_DEFINITIONS } from "./mca-ontology.js";

/**
 * Normalizes a string for matching (lowercase, removes special chars, trims)
 */
export function normalize(str) {
  if (!str) return "";
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

/**
 * Tokenizes a string into distinct meaningful alphanumeric tokens
 */
export function tokenize(str) {
  if (!str) return [];
  return String(str)
    .toLowerCase()
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase to words
    .replace(/[^a-z0-9]/g, " ")
    .split(/\s+/)
    .filter(t => t.length > 1 && !["the", "of", "and", "in", "to", "for", "a", "an", "is"].includes(t));
}

/**
 * Calculates Levenshtein Distance similarity (0 to 1)
 */
export function stringSimilarity(s1, s2) {
  const longer = s1.length >= s2.length ? s1 : s2;
  const shorter = s1.length < s2.length ? s1 : s2;
  if (longer.length === 0) return 1.0;
  
  const costs = [];
  for (let i = 0; i <= longer.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= shorter.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (longer.charAt(i - 1) !== shorter.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[shorter.length] = lastValue;
  }
  return (longer.length - costs[shorter.length]) / parseFloat(longer.length);
}

/**
 * Jaccard token set similarity (0 to 1)
 */
export function tokenSimilarity(str1, str2) {
  const set1 = new Set(tokenize(str1));
  const set2 = new Set(tokenize(str2));
  if (set1.size === 0 || set2.size === 0) return 0;
  
  let intersection = 0;
  for (const item of set1) {
    if (set2.has(item)) intersection++;
  }
  const union = new Set([...set1, ...set2]).size;
  return intersection / union;
}

/**
 * Resolves dot-notation path on client object, supporting array indices
 * e.g. "company.registered_address.pin_code", "directors[0].name"
 */
export function resolveClientValue(client, path) {
  if (!client || !path) return undefined;
  
  // Format: directors[0].name -> directors.0.name
  const normalizedPath = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = normalizedPath.split(".");
  
  let current = client;
  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[part];
  }
  return current;
}

/**
 * Core 5-tier mapping engine for a single detected field
 */
export function matchField(field, options = {}) {
  const { customRules = [], arrayIndex = null } = options;
  
  const idNorm = normalize(field.id || "");
  const nameNorm = normalize(field.name || "");
  const labelNorm = normalize(field.label || "");
  const placeholderNorm = normalize(field.placeholder || "");
  const contextNorm = normalize(`${field.section || ""} ${field.tableContext || ""} ${field.surroundingText || ""}`);
  
  // --- TIER 5 (Highest Priority Override): Custom / Learned User Mapping Rules ---
  for (const rule of customRules) {
    if (
      (rule.dom_id && normalize(rule.dom_id) === idNorm) ||
      (rule.dom_name && normalize(rule.dom_name) === nameNorm) ||
      (rule.label_pattern && labelNorm.includes(normalize(rule.label_pattern)))
    ) {
      const targetPath = formatArrayPath(rule.target_path, arrayIndex ?? field.rowIndex);
      return {
        matched: true,
        tier: 5,
        tierDescription: "Custom / Learned User Rule",
        targetPath,
        confidence: Math.min(1.0, 0.98 * (rule.confidence_boost || 1.0)),
        definition: FIELD_DEFINITIONS.find(d => d.path === rule.target_path) || null
      };
    }
  }

  let bestMatch = null;
  let highestScore = 0;
  let matchedTier = 0;
  let tierDesc = "";

  for (const def of FIELD_DEFINITIONS) {
    let score = 0;
    let tier = 0;
    let desc = "";

    // --- TIER 1: Exact Field Name / ID Matching ---
    const hasExactIdMatch = def.aliases.some(a => normalize(a) === idNorm);
    const hasExactNameMatch = def.aliases.some(a => normalize(a) === nameNorm);

    if (hasExactIdMatch || hasExactNameMatch) {
      score = 0.98;
      tier = 1;
      desc = `Exact HTML ${hasExactIdMatch ? "ID" : "Name"} match (${field.id || field.name})`;
    }

    // --- TIER 2: Label & Placeholder Exact / Canonical Match ---
    if (score < 0.90 && (labelNorm.length > 2 || placeholderNorm.length > 2)) {
      const defLabelNorm = normalize(def.label);
      const isExactLabel = def.aliases.some(a => normalize(a) === labelNorm) || labelNorm === defLabelNorm;
      const isExactPlaceholder = def.aliases.some(a => normalize(a) === placeholderNorm);

      if (isExactLabel || isExactPlaceholder) {
        score = 0.94;
        tier = 2;
        desc = `Canonical ${isExactLabel ? "Label" : "Placeholder"} match (${field.label || field.placeholder})`;
      } else {
        // High token overlap on label
        const tokenSim = tokenSimilarity(field.label || "", def.label);
        if (tokenSim >= 0.75) {
          score = 0.88 + (tokenSim * 0.05);
          tier = 2;
          desc = `Strong Label Token match (${Math.round(tokenSim * 100)}%)`;
        }
      }
    }

    // --- TIER 3: Semantic Matching using Field Context & Domain Ontology ---
    if (score < 0.85) {
      let contextScore = 0;
      
      // Keywords check in surrounding context, section, or label
      let keywordHits = 0;
      for (const kw of def.keywords) {
        const kwNorm = normalize(kw);
        if (labelNorm.includes(kwNorm) || placeholderNorm.includes(kwNorm) || contextNorm.includes(kwNorm)) {
          keywordHits++;
        }
      }

      if (keywordHits > 0) {
        const hitRatio = Math.min(1.0, keywordHits / Math.min(def.keywords.length, 3));
        contextScore = 0.70 + (hitRatio * 0.18);
        
        // Boost if input type matches semantic expectation
        if (def.type === "date" && (field.type === "date" || /date|dob|doi/i.test(field.label || ""))) {
          contextScore += 0.05;
        } else if (def.type === "dropdown" && (field.tagName === "SELECT" || field.role === "combobox")) {
          contextScore += 0.05;
        } else if (def.type === "number" && (field.type === "number" || /amount|capital|rupees|inr|turnover/i.test(field.label || ""))) {
          contextScore += 0.05;
        }

        if (contextScore > score) {
          score = Math.min(0.89, contextScore);
          tier = 3;
          desc = `Semantic domain ontology match (${keywordHits} keyword hits)`;
        }
      }
    }

    // --- TIER 4: Fuzzy & AI-Assisted Matching ---
    if (score < 0.75) {
      // String similarity against aliases
      let maxAliasSim = 0;
      for (const alias of def.aliases) {
        const simId = stringSimilarity(idNorm, normalize(alias));
        const simName = stringSimilarity(nameNorm, normalize(alias));
        const simLabel = stringSimilarity(labelNorm, normalize(alias));
        maxAliasSim = Math.max(maxAliasSim, simId, simName, simLabel);
      }

      if (maxAliasSim >= 0.78) {
        const fuzzyScore = 0.60 + (maxAliasSim * 0.20);
        if (fuzzyScore > score) {
          score = fuzzyScore;
          tier = 4;
          desc = `Fuzzy text similarity match (${Math.round(maxAliasSim * 100)}%)`;
        }
      }
    }

    // Array / repeated section penalty or adjustment
    if (def.is_array) {
      const isInsideTable = field.isInsideTable || (field.rowIndex !== undefined && field.rowIndex >= 0);
      const isDirectorField = /director|signatory|subscriber/i.test(`${field.label || ""} ${field.section || ""} ${field.tableContext || ""}`);
      
      if (isInsideTable || isDirectorField) {
        score += 0.05; // context reinforces table/array mapping
      }
    }

    // --- Disambiguation: Company vs Director Context ---
    const isDirectorContext = /director|signatory|subscriber|din\b|board/i.test(`${field.label || ""} ${field.section || ""} ${field.tableContext || ""} ${field.formArrayName || ""}`);
    const isCompanyContext = /company|corporate|registered\s*office|entity\s*name|cin\b/i.test(`${field.label || ""} ${field.section || ""} ${field.tableContext || ""}`);

    if (def.is_array || def.path.startsWith("directors")) {
      if (isDirectorContext) score += 0.08;
      if (isCompanyContext && !isDirectorContext) score -= 0.15;
    } else if (def.path.startsWith("company")) {
      if (isCompanyContext) score += 0.05;
      if (isDirectorContext && !isCompanyContext) score -= 0.15;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = def;
      matchedTier = tier;
      tierDesc = desc;
    }
  }

  if (bestMatch && highestScore >= 0.50) {
    const computedIndex = arrayIndex ?? (field.rowIndex !== undefined && field.rowIndex >= 0 ? field.rowIndex : 0);
    const targetPath = formatArrayPath(bestMatch.path, computedIndex);

    return {
      matched: true,
      tier: matchedTier,
      tierDescription: tierDesc,
      targetPath,
      confidence: Math.min(1.0, parseFloat(highestScore.toFixed(3))),
      definition: bestMatch
    };
  }

  return {
    matched: false,
    tier: 0,
    tierDescription: "No confident match",
    targetPath: null,
    confidence: 0,
    definition: null
  };
}

/**
 * Replaces [INDEX] with actual numerical index (e.g. directors[INDEX].din -> directors[0].din)
 */
export function formatArrayPath(path, index) {
  if (!path) return "";
  return path.replace(/\[INDEX\]/g, `[${index}]`);
}

/**
 * Maps a full list of detected fields against a client database record
 */
export function mapDetectedFields(detectedFields, client, customRules = []) {
  const mappings = [];
  
  // Track table rows to accurately assign array indices
  const tableRowIndexTracker = new Map();

  for (const field of detectedFields) {
    let rowIndex = field.rowIndex;
    if (field.isInsideTable && field.tableId) {
      const trackerKey = `${field.tableId}_${field.rowElementId || field.rowIndex || 0}`;
      if (!tableRowIndexTracker.has(trackerKey)) {
        tableRowIndexTracker.set(trackerKey, tableRowIndexTracker.size);
      }
      rowIndex = tableRowIndexTracker.get(trackerKey);
    }

    const matchResult = matchField(field, { customRules, arrayIndex: rowIndex });
    
    let resolvedValue = null;
    let hasValue = false;
    
    if (matchResult.matched && matchResult.targetPath) {
      resolvedValue = resolveClientValue(client, matchResult.targetPath);
      hasValue = resolvedValue !== undefined && resolvedValue !== null && resolvedValue !== "";
    }

    mappings.push({
      fieldId: field.id || field.selector,
      domField: field,
      matched: matchResult.matched,
      tier: matchResult.tier,
      tierDescription: matchResult.tierDescription,
      targetPath: matchResult.targetPath,
      confidence: matchResult.confidence,
      definition: matchResult.definition,
      resolvedValue: resolvedValue ?? null,
      hasClientData: hasValue,
      status: !matchResult.matched 
        ? "UNMATCHED" 
        : !hasValue 
          ? "MISSING_DATA" 
          : matchResult.confidence >= 0.85 
            ? "READY_TO_FILL" 
            : "REQUIRES_REVIEW"
    });
  }

  return mappings;
}
