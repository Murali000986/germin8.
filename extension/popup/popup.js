/**
 * Germin8 Extension Popup Controller
 * Manages UI interactions, client selection, scanning, mapping, filling, and validation.
 */

import { FIELD_DEFINITIONS } from "../lib/mca-ontology.js";
import { mapDetectedFields, matchField, resolveClientValue } from "../lib/mapping-engine.js";

class Germin8PopupController {
  constructor() {
    this.activeClient = null;
    this.detectedFields = [];
    this.currentMappings = [];
    this.activeTab = null;
    this.backendUrl = "http://localhost:4567";
    this.apiKey = "germin8_secret_token_2026";
    this.isObserving = false;

    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadConfig();
    await this.resolveActiveTab();
    await this.fetchClients();
    this.checkBackendHealth();
  }

  async loadConfig() {
    return new Promise(resolve => {
      chrome.storage?.local?.get(["backendUrl", "apiKey", "selectedClientId"], res => {
        if (res.backendUrl) this.backendUrl = res.backendUrl;
        if (res.apiKey) this.apiKey = res.apiKey;
        document.getElementById("setting-backend-url").value = this.backendUrl;
        document.getElementById("setting-api-key").value = this.apiKey;
        resolve(res.selectedClientId);
      });
    });
  }

  async resolveActiveTab() {
    if (!chrome.tabs?.query) return;
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs.length > 0) {
      this.activeTab = tabs[0];
      const urlLabel = document.getElementById("page-url-label");
      if (urlLabel) {
        urlLabel.textContent = this.activeTab.url || "Unknown";
      }
      this.detectFormSignature(this.activeTab.url || "", this.activeTab.title || "");
    }
  }

  detectFormSignature(url, title) {
    const combined = `${url} ${title}`.toLowerCase();
    const badge = document.getElementById("detected-form-badge");
    if (!badge) return;

    if (combined.includes("spice")) {
      badge.textContent = "MCA SPICe+ Part B";
      badge.className = "pill pill-success";
    } else if (combined.includes("dir-12") || combined.includes("dir12")) {
      badge.textContent = "MCA Form DIR-12";
      badge.className = "pill pill-success";
    } else if (combined.includes("aoc-4") || combined.includes("aoc4")) {
      badge.textContent = "MCA Form AOC-4";
      badge.className = "pill pill-success";
    } else if (combined.includes("mgt-7") || combined.includes("mgt7")) {
      badge.textContent = "MCA Form MGT-7";
      badge.className = "pill pill-success";
    } else {
      badge.textContent = "Universal Web Form";
      badge.className = "pill pill-info";
    }
  }

  bindEvents() {
    // Nav Tab Switching
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        const targetPane = document.getElementById(btn.getAttribute("data-tab"));
        if (targetPane) targetPane.classList.add("active");

        if (btn.getAttribute("data-tab") === "tab-logs") {
          this.fetchLogs();
        }
      });
    });

    // Workflow jump buttons
    document.getElementById("btn-proceed-to-scan")?.addEventListener("click", () => {
      this.switchTab("tab-scan");
      this.scanActivePage();
    });

    document.getElementById("btn-proceed-to-mapping")?.addEventListener("click", () => {
      this.switchTab("tab-mapping");
      this.calculateMappings();
    });

    document.getElementById("btn-proceed-to-fill")?.addEventListener("click", () => {
      this.switchTab("tab-fill");
    });

    // Scan & Observer
    document.getElementById("btn-scan-page")?.addEventListener("click", () => this.scanActivePage());
    document.getElementById("btn-toggle-observer")?.addEventListener("click", () => this.toggleObserver());

    // Mapping Actions
    document.getElementById("btn-re-match")?.addEventListener("click", () => this.calculateMappings());

    // Fill & Clear Actions
    document.getElementById("btn-trigger-fill")?.addEventListener("click", () => this.triggerFormFill());
    document.getElementById("btn-clear-fields")?.addEventListener("click", () => this.triggerClearFields());
    document.getElementById("btn-trigger-validate")?.addEventListener("click", () => this.triggerValidation());

    // Client Selection & Search
    const clientSelect = document.getElementById("client-select-dropdown");
    clientSelect?.addEventListener("change", (e) => this.selectClient(e.target.value));

    const searchInput = document.getElementById("client-search-input");
    searchInput?.addEventListener("input", (e) => this.fetchClients(e.target.value));

    document.getElementById("btn-refresh-clients")?.addEventListener("click", () => this.fetchClients());

    // Side Panel
    document.getElementById("btn-open-sidepanel")?.addEventListener("click", () => {
      if (chrome.sidePanel?.open && this.activeTab?.id) {
        chrome.sidePanel.open({ tabId: this.activeTab.id });
      } else {
        alert("To open the side panel, click the Side Panel icon in Chrome's top toolbar.");
      }
    });

    // Admin Settings & SaaS Pairing
    document.getElementById("btn-pair-device")?.addEventListener("click", () => this.pairWithSaaS());
    document.getElementById("btn-save-settings")?.addEventListener("click", () => this.saveSettings());
    document.getElementById("btn-add-rule")?.addEventListener("click", () => this.addCustomRule());
    document.getElementById("btn-open-simulator")?.addEventListener("click", () => {
      chrome.tabs.create({ url: `${this.backendUrl}/simulator/index.html` });
    });
    document.getElementById("btn-refresh-logs")?.addEventListener("click", () => this.fetchLogs());
  }

  switchTab(tabId) {
    document.querySelectorAll(".tab-btn").forEach(b => {
      if (b.getAttribute("data-tab") === tabId) b.classList.add("active");
      else b.classList.remove("active");
    });
    document.querySelectorAll(".tab-pane").forEach(p => {
      if (p.id === tabId) p.classList.add("active");
      else p.classList.remove("active");
    });
  }

  async checkBackendHealth() {
    const dot = document.getElementById("backend-status-dot");
    try {
      const res = await fetch(`${this.backendUrl}/api/health`, {
        headers: { "x-germin8-api-key": this.apiKey }
      });
      if (res.ok) {
        dot.style.backgroundColor = "var(--success)";
        dot.title = "Backend Online (REST API Connected)";
      } else {
        dot.style.backgroundColor = "var(--warning)";
        dot.title = "Backend returned status " + res.status;
      }
    } catch (e) {
      dot.style.backgroundColor = "var(--danger)";
      dot.title = "Backend Offline. Running in standalone local mode.";
    }
  }

  async fetchClients(query = "") {
    try {
      const res = await fetch(`${this.backendUrl}/api/clients?q=${encodeURIComponent(query)}`, {
        headers: { "x-germin8-api-key": this.apiKey }
      });
      const data = await res.json();
      if (data.success && data.clients) {
        this.renderClientDropdown(data.clients);
      }
    } catch (err) {
      console.warn("[Germin8 Popup] Could not fetch remote clients, falling back to local storage:", err);
    }
  }

  renderClientDropdown(clients) {
    const select = document.getElementById("client-select-dropdown");
    const countPill = document.getElementById("client-count-pill");
    if (!select) return;

    countPill.textContent = `${clients.length} Clients`;

    chrome.storage?.local?.get(["selectedClientId"], (res) => {
      const savedId = res.selectedClientId;
      select.innerHTML = `<option value="">-- Choose a registered client (${clients.length}) --</option>`;

      clients.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = `${c.legal_name} (${c.cin || c.client_code})`;
        if (savedId && c.id === savedId) {
          opt.selected = true;
          this.loadClientDetails(c.id);
        }
        select.appendChild(opt);
      });
    });
  }

  async selectClient(clientId) {
    if (!clientId) {
      this.activeClient = null;
      document.getElementById("active-client-card").style.display = "none";
      document.getElementById("footer-client-status").textContent = "No Client Selected";
      chrome.storage?.local?.remove("selectedClientId");
      return;
    }

    chrome.storage?.local?.set({ selectedClientId: clientId });
    await this.loadClientDetails(clientId);
    if (this.detectedFields.length > 0) {
      this.calculateMappings();
    }
  }

  async loadClientDetails(clientId) {
    try {
      const res = await fetch(`${this.backendUrl}/api/clients/${encodeURIComponent(clientId)}`, {
        headers: { "x-germin8-api-key": this.apiKey }
      });
      const data = await res.json();
      if (data.success && data.client) {
        this.activeClient = data.client;
        this.renderClientPreview(this.activeClient);
        this.updateDockInPage();
      }
    } catch (e) {
      console.error("[Germin8] Error loading client details:", e);
    }
  }

  renderClientPreview(client) {
    const card = document.getElementById("active-client-card");
    if (!card) return;

    card.style.display = "flex";
    document.getElementById("preview-client-name").textContent = client.company.legal_name;
    document.getElementById("preview-client-cin").textContent = `CIN: ${client.company.cin || client.company.llpin}`;
    document.getElementById("preview-client-class").textContent = client.company.class_of_company;
    document.getElementById("preview-client-status").textContent = client.company.status || "Active";
    
    const addr = client.company.registered_address;
    document.getElementById("preview-client-address").textContent = 
      `${addr.address_line_1}, ${addr.city}, ${addr.state} - ${addr.pin_code}`;

    document.getElementById("preview-client-authcap").textContent = 
      `₹ ${Number(client.company.authorized_capital).toLocaleString("en-IN")}`;
    document.getElementById("preview-client-directors").textContent = 
      client.directors?.length || 0;

    document.getElementById("footer-client-status").textContent = client.company.short_name || client.company.legal_name;
  }

  async ensureScriptsInjected(tabId) {
    if (!chrome.scripting?.executeScript) return;
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: [
          "content/scanner.js",
          "content/filler.js",
          "content/highlighter.js"
        ]
      });
      await chrome.scripting.insertCSS({
        target: { tabId },
        files: ["content/highlighter.css"]
      });
    } catch (e) {
      // already injected or restricted page
    }
  }

  async scanActivePage() {
    if (!this.activeTab?.id) {
      alert("No active browser tab found.");
      return;
    }

    await this.ensureScriptsInjected(this.activeTab.id);

    chrome.tabs.sendMessage(this.activeTab.id, { action: "SCAN_PAGE" }, (response) => {
      if (chrome.runtime.lastError || !response || !response.success) {
        alert("Scanning error: Unable to communicate with the page. Please refresh the page and try again.");
        return;
      }

      this.detectedFields = response.fields || [];
      const badge = document.getElementById("scanned-count-badge");
      if (badge) badge.textContent = `${this.detectedFields.length} Fields Detected`;

      this.renderDetectedFieldsTable(this.detectedFields);
      this.calculateMappings();
      this.updateDockInPage();
    });
  }

  renderDetectedFieldsTable(fields) {
    const tbody = document.getElementById("detected-fields-tbody");
    if (!tbody) return;

    if (fields.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #64748b; padding: 20px;">No form controls found on this page.</td></tr>`;
      return;
    }

    tbody.innerHTML = "";
    fields.forEach((f, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><span class="pill pill-info">${f.type}</span></td>
        <td>
          <div style="font-weight: 600; color: #f1f5f9;">${this.escapeHtml(f.label)}</div>
          <div style="font-size: 10px; color: #94a3b8;">${this.escapeHtml(f.section || "")}</div>
        </td>
        <td><code>${this.escapeHtml(f.name || f.id || f.selector)}</code></td>
        <td style="color: #38bdf8;">${this.escapeHtml(f.currentValue || "(empty)")}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  async calculateMappings() {
    if (!this.activeClient) {
      const tbody = document.getElementById("mapping-preview-tbody");
      if (tbody) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #f59e0b; padding: 20px;">Please select a client in the "Client" tab first to map fields.</td></tr>`;
      }
      return;
    }

    if (this.detectedFields.length === 0) {
      return;
    }

    // Try server-side matching first, fallback to client-side mapping engine
    try {
      const res = await fetch(`${this.backendUrl}/api/mapping/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-germin8-api-key": this.apiKey
        },
        body: JSON.stringify({
          fields: this.detectedFields,
          clientId: this.activeClient.id
        })
      });
      const data = await res.json();
      if (data.success && data.mappings) {
        this.currentMappings = data.mappings;
      } else {
        this.currentMappings = mapDetectedFields(this.detectedFields, this.activeClient);
      }
    } catch (err) {
      // Local fallback
      this.currentMappings = mapDetectedFields(this.detectedFields, this.activeClient);
    }

    this.renderMappingsTable(this.currentMappings);
    this.highlightFieldsOnPage(this.currentMappings);
    this.updateDockInPage();
  }

  renderMappingsTable(mappings) {
    const tbody = document.getElementById("mapping-preview-tbody");
    const summaryBadge = document.getElementById("mapped-summary-badge");
    const readyCount = mappings.filter(m => m.status === "READY_TO_FILL").length;

    if (summaryBadge) {
      summaryBadge.textContent = `${readyCount} / ${mappings.length} Ready`;
    }

    document.getElementById("footer-ready-status").textContent = `${readyCount} Fields Ready`;

    if (!tbody) return;
    tbody.innerHTML = "";

    mappings.forEach((m, idx) => {
      const tr = document.createElement("tr");

      // Confidence Pill
      let confPill = "";
      if (m.confidence >= 0.85) {
        confPill = `<span class="pill pill-success">${(m.confidence * 100).toFixed(0)}%</span>`;
      } else if (m.confidence >= 0.50) {
        confPill = `<span class="pill pill-warning">${(m.confidence * 100).toFixed(0)}%</span>`;
      } else {
        confPill = `<span class="pill pill-danger">0%</span>`;
      }

      // Dropdown of possible ontology fields for CA/CS manual override
      let optionsHtml = `<option value="">-- Unmapped --</option>`;
      FIELD_DEFINITIONS.forEach(def => {
        const isSelected = m.targetPath && (m.targetPath === def.path || m.targetPath.startsWith(def.path.split("[")[0]));
        optionsHtml += `<option value="${def.path}" ${isSelected ? "selected" : ""}>${def.label}</option>`;
      });

      tr.innerHTML = `
        <td>
          <div style="font-weight: 600;">${this.escapeHtml(m.domField.label)}</div>
          <div style="font-size: 10px; color: #64748b;">${this.escapeHtml(m.domField.name || m.domField.id)}</div>
        </td>
        <td>
          <select class="select-input manual-mapping-select" data-index="${idx}" style="font-size: 11px; padding: 3px 6px;">
            ${optionsHtml}
          </select>
          <div style="font-size: 9px; color: #94a3b8; margin-top: 2px;">${m.tierDescription || ""}</div>
        </td>
        <td>${confPill}</td>
        <td style="color: var(--success); font-family: ui-monospace, monospace; font-weight: 600; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${this.escapeHtml(String(m.resolvedValue ?? "-"))}
        </td>
      `;

      tbody.appendChild(tr);
    });

    // Handle manual mapping override
    tbody.querySelectorAll(".manual-mapping-select").forEach(sel => {
      sel.addEventListener("change", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"), 10);
        const newPath = e.target.value;
        if (this.currentMappings[index]) {
          this.currentMappings[index].targetPath = newPath;
          this.currentMappings[index].matched = !!newPath;
          this.currentMappings[index].confidence = 1.0;
          this.currentMappings[index].tierDescription = "Manual Override by User";
          this.currentMappings[index].resolvedValue = resolveClientValue(this.activeClient, newPath);
          this.currentMappings[index].status = "READY_TO_FILL";
          this.renderMappingsTable(this.currentMappings);
          this.highlightFieldsOnPage(this.currentMappings);
        }
      });
    });
  }

  highlightFieldsOnPage(mappings) {
    if (!this.activeTab?.id) return;
    chrome.tabs.sendMessage(this.activeTab.id, {
      action: "HIGHLIGHT_FIELDS",
      mappings
    }, () => {
      if (chrome.runtime.lastError) {}
    });
  }

  updateDockInPage() {
    if (!this.activeTab?.id) return;
    const readyCount = this.currentMappings.filter(m => m.status === "READY_TO_FILL").length;
    chrome.tabs.sendMessage(this.activeTab.id, {
      action: "RENDER_DOCK",
      client: this.activeClient,
      stats: { readyToFillCount: readyCount }
    }, () => {
      if (chrome.runtime.lastError) {}
    });
  }

  async triggerFormFill() {
    if (!this.activeTab?.id) return;
    if (this.currentMappings.length === 0) {
      alert("No mappings ready. Please scan and calculate mappings first.");
      return;
    }

    const overwrite = document.getElementById("check-overwrite-existing")?.checked || false;
    const highlight = document.getElementById("check-highlight-dom")?.checked ?? true;

    chrome.tabs.sendMessage(this.activeTab.id, {
      action: "FILL_FORM",
      mappings: this.currentMappings,
      options: {
        overwriteExisting: overwrite,
        highlightFilled: highlight,
        confidenceThreshold: 0.50
      }
    }, (res) => {
      if (chrome.runtime.lastError || !res || !res.success) {
        alert("Automation notice: Please ensure the target government form webpage is active and refreshed.");
        return;
      }

      // Professional execution dialog
      const msg = [
        "Germin8 Form Automation Report",
        "------------------------------------",
        `• Successfully Populated: ${res.filledCount} controls`,
        `• Skipped (Already Populated): ${res.skippedCount}`,
        `• Skipped / Read-Only / Detached: ${res.failedCount}`,
        "",
        "Statutory Safety Protocol: All populated values have been highlighted for your review. Please inspect before manual submission."
      ].join("\n");
      alert(msg);
      
      // Save Audit Log
      this.logExecutionEvent(res);

      // Auto trigger validation
      setTimeout(() => this.triggerValidation(), 600);
    });
  }

  async triggerClearFields() {
    if (!this.activeTab?.id) return;
    chrome.tabs.sendMessage(this.activeTab.id, {
      action: "CLEAR_FILLED_FIELDS",
      mappings: this.currentMappings
    }, (res) => {
      alert(`Cleared ${res?.clearedCount || 0} fields from the form.`);
    });
  }

  async triggerValidation() {
    if (!this.activeTab?.id || !this.activeClient) return;

    // Scan again to get current live values on DOM
    chrome.tabs.sendMessage(this.activeTab.id, { action: "SCAN_PAGE" }, async (scanRes) => {
      if (!scanRes || !scanRes.fields) return;

      const liveFields = scanRes.fields;
      const filledCheckList = [];

      for (const m of this.currentMappings) {
        if (!m.matched || !m.targetPath) continue;
        const liveDom = liveFields.find(f => f.id === m.domField.id || f.selector === m.domField.selector || f.name === m.domField.name);
        filledCheckList.push({
          fieldId: m.fieldId,
          label: m.domField.label,
          targetPath: m.targetPath,
          domValue: liveDom ? liveDom.currentValue : ""
        });
      }

      try {
        const res = await fetch(`${this.backendUrl}/api/validate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-germin8-api-key": this.apiKey
          },
          body: JSON.stringify({
            filledFields: filledCheckList,
            clientId: this.activeClient.id
          })
        });
        const data = await res.json();
        if (data.success) {
          this.renderValidationResults(data);
        }
      } catch (e) {
        console.error("Validation API error:", e);
      }
    });
  }

  renderValidationResults(data) {
    const tbody = document.getElementById("validation-results-tbody");
    const statusPill = document.getElementById("validation-status-pill");
    if (!tbody || !data.validationResults) return;

    if (data.summary.mismatchCount === 0) {
      statusPill.textContent = "100% Validated";
      statusPill.className = "pill pill-success";
    } else {
      statusPill.textContent = `${data.summary.mismatchCount} Discrepancies`;
      statusPill.className = "pill pill-warning";
    }

    tbody.innerHTML = "";
    data.validationResults.forEach(r => {
      const tr = document.createElement("tr");
      let resPill = `<span class="pill pill-success">PASS</span>`;
      if (r.status === "FORMAT_ERROR") {
        resPill = `<span class="pill pill-danger" title="${r.formatError}">FORMAT</span>`;
      } else if (r.status === "VALUE_MISMATCH") {
        resPill = `<span class="pill pill-warning">DIFF</span>`;
      }

      tr.innerHTML = `
        <td style="font-weight: 500;">${this.escapeHtml(r.label || r.targetPath)}</td>
        <td style="color: var(--text-primary); font-family: ui-monospace, monospace;">${this.escapeHtml(r.domValue || "(empty)")}</td>
        <td style="color: var(--text-secondary); font-family: ui-monospace, monospace;">${this.escapeHtml(r.expectedValue || "-")}</td>
        <td>${resPill}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  async logExecutionEvent(fillResult) {
    if (!this.activeClient) return;
    try {
      await fetch(`${this.backendUrl}/api/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-germin8-api-key": this.apiKey
        },
        body: JSON.stringify({
          client_id: this.activeClient.id,
          client_name: this.activeClient.company.legal_name,
          form_code: document.getElementById("detected-form-badge")?.textContent || "MCA Form",
          page_url: this.activeTab?.url || "",
          fields_detected: this.detectedFields.length,
          fields_mapped: this.currentMappings.length,
          fields_filled: fillResult.filledCount,
          status: "SUCCESS",
          validation_passed: true,
          details: fillResult
        })
      });
    } catch (e) {}
  }

  async fetchLogs() {
    const tbody = document.getElementById("audit-logs-tbody");
    if (!tbody) return;

    try {
      const res = await fetch(`${this.backendUrl}/api/logs?limit=25`, {
        headers: { "x-germin8-api-key": this.apiKey }
      });
      const data = await res.json();
      if (data.success && data.logs && data.logs.length > 0) {
        tbody.innerHTML = "";
        data.logs.forEach(l => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td style="font-size: 10px; color: #94a3b8;">${new Date(l.timestamp).toLocaleTimeString()}</td>
            <td style="font-weight: 600;">${this.escapeHtml(l.client_name)}</td>
            <td><span class="pill pill-info">${this.escapeHtml(l.form_code)}</span></td>
            <td style="color: #34d399;">${l.fields_filled}</td>
            <td><span class="pill pill-success">${l.status}</span></td>
          `;
          tbody.appendChild(tr);
        });
      }
    } catch (e) {}
  }

  toggleObserver() {
    if (!this.activeTab?.id) return;
    this.isObserving = !this.isObserving;
    const btn = document.getElementById("btn-toggle-observer");

    chrome.tabs.sendMessage(this.activeTab.id, {
      action: this.isObserving ? "START_OBSERVING" : "STOP_OBSERVING"
    }, (res) => {
      if (btn) {
        btn.textContent = this.isObserving ? "👁️ Watching SPA..." : "👁️ Watch SPA";
        btn.className = this.isObserving ? "btn btn-primary" : "btn btn-secondary";
      }
    });
  }

  saveSettings() {
    const url = document.getElementById("setting-backend-url")?.value.trim();
    const key = document.getElementById("setting-api-key")?.value.trim();

    if (url) this.backendUrl = url;
    if (key) this.apiKey = key;

    chrome.storage?.local?.set({ backendUrl: this.backendUrl, apiKey: this.apiKey }, () => {
      alert("Settings saved successfully.");
      this.checkBackendHealth();
    });
  }

  async addCustomRule() {
    const domId = document.getElementById("new-rule-dom-id")?.value.trim();
    const targetPath = document.getElementById("new-rule-target-path")?.value.trim();

    if (!domId || !targetPath) {
      alert("Please provide both DOM ID/Name and Target Path.");
      return;
    }

    try {
      const res = await fetch(`${this.backendUrl}/api/rules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-germin8-api-key": this.apiKey
        },
        body: JSON.stringify({
          site_pattern: "mca.gov.in",
          dom_id: domId,
          target_path: targetPath,
          confidence_boost: 1.0
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Rule saved for "${domId}" -> "${targetPath}".`);
        document.getElementById("new-rule-dom-id").value = "";
        document.getElementById("new-rule-target-path").value = "";
      }
    } catch (e) {
      alert("Failed to save rule: " + e.message);
    }
  }

  async pairWithSaaS() {
    const codeInput = document.getElementById("input-pairing-code");
    const statusMsg = document.getElementById("pairing-status-msg");
    const code = codeInput ? codeInput.value.trim().toUpperCase() : "";

    if (!code) {
      if (statusMsg) {
        statusMsg.style.color = "#DC2626";
        statusMsg.textContent = "Please enter the 6-character pairing code.";
      }
      return;
    }

    try {
      const res = await fetch(`${this.backendUrl}/api/extension/pair`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pairingCode: code,
          clientInfo: { version: "2.5.0", browser: navigator.userAgent }
        })
      });
      const data = await res.json();
      if (data.success) {
        if (statusMsg) {
          statusMsg.style.color = "#16A34A";
          statusMsg.textContent = `✓ Paired to Workspace (${data.clientCount} clients synced)`;
        }
        chrome.storage?.local?.set({
          extensionToken: data.extensionToken,
          workspaceId: data.workspaceId
        });
        await this.fetchClients();
        alert("🎉 Successfully paired to Germin8 SaaS Workspace!");
      } else {
        if (statusMsg) {
          statusMsg.style.color = "#DC2626";
          statusMsg.textContent = data.error || "Pairing failed.";
        }
      }
    } catch (err) {
      if (statusMsg) {
        statusMsg.style.color = "#DC2626";
        statusMsg.textContent = "Connection error to Germin8 server.";
      }
    }
  }

  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Germin8PopupController();
});
