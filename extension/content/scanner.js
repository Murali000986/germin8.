/**
 * Germin8 Universal Webpage & DOM Scanner
 * Injected as a Content Script or executed on-demand.
 * Capable of scanning traditional web forms, modern SPAs (React, Angular, Vue),
 * and dynamic government portals like MCA V3.
 */

(function () {
  if (window.__Germin8Scanner) {
    return;
  }

  class UniversalScanner {
    constructor() {
      this.isObserving = false;
      this.mutationObserver = null;
      this.lastScanResults = [];
      this.initListeners();
    }

    initListeners() {
      // Listen for messages from extension popup, sidepanel, or background worker
      chrome.runtime?.onMessage?.addListener((message, sender, sendResponse) => {
        if (message.action === "SCAN_PAGE") {
          const fields = this.scan();
          sendResponse({
            success: true,
            url: window.location.href,
            title: document.title,
            formProfile: this.detectFormProfile(),
            fieldsCount: fields.length,
            fields
          });
          return true;
        }

        if (message.action === "GET_LAST_SCAN") {
          sendResponse({
            success: true,
            fieldsCount: this.lastScanResults.length,
            fields: this.lastScanResults
          });
          return true;
        }

        if (message.action === "START_OBSERVING") {
          this.startObserving();
          sendResponse({ success: true, observing: true });
          return true;
        }

        if (message.action === "STOP_OBSERVING") {
          this.stopObserving();
          sendResponse({ success: true, observing: false });
          return true;
        }
      });
    }

    /**
     * Scans the document (including open Shadow DOMs and Angular components)
     * and returns a list of detailed field descriptors
     */
    scan() {
      const detectedFields = [];
      const formControls = this.collectAllControlsDeep(document);

      let fieldIndex = 0;
      formControls.forEach(el => {
        // Skip invisible / hidden controls unless part of a custom component
        if (this.isElementHidden(el)) return;

        const fieldInfo = this.extractFieldInfo(el, fieldIndex++);
        if (fieldInfo) {
          detectedFields.push(fieldInfo);
        }
      });

      this.lastScanResults = detectedFields;
      console.log(`[Germin8 Scanner] Advanced scan completed: ${detectedFields.length} controls found.`);
      return detectedFields;
    }

    /**
     * Deep traversal that pierces open Shadow DOM boundaries
     */
    collectAllControlsDeep(root = document) {
      const selector = `
        input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="image"]),
        textarea,
        select,
        mat-select,
        [role="combobox"],
        [role="listbox"],
        [role="radio"],
        [role="checkbox"],
        [contenteditable="true"]
      `;
      const controls = Array.from(root.querySelectorAll(selector));

      // Recursively inspect child shadow roots
      const allElements = root.querySelectorAll("*");
      for (const el of allElements) {
        if (el.shadowRoot) {
          const shadowControls = this.collectAllControlsDeep(el.shadowRoot);
          controls.push(...shadowControls);
        }
      }
      return controls;
    }

    isElementHidden(el) {
      if (!el.offsetParent && el.offsetWidth === 0 && el.offsetHeight === 0) {
        // Double check if styled display none or visibility hidden
        const style = window.getComputedStyle(el);
        return style.display === "none" || style.visibility === "hidden" || style.opacity === "0";
      }
      return false;
    }

    extractFieldInfo(el, index) {
      const tagName = el.tagName.toUpperCase();
      const type = (el.getAttribute("type") || tagName.toLowerCase()).toLowerCase();
      const id = el.id || "";
      const name = el.name || el.getAttribute("name") || "";
      const placeholder = el.placeholder || el.getAttribute("placeholder") || "";
      const required = el.required || el.getAttribute("aria-required") === "true";
      const readonly = el.readOnly || el.hasAttribute("readonly");
      const disabled = el.disabled || el.hasAttribute("disabled");

      let currentValue = "";
      if (tagName === "MAT-SELECT" || el.getAttribute("role") === "combobox") {
        const valText = el.querySelector(".mat-select-value-text, [class*='value'], [class*='selected']");
        currentValue = valText ? valText.textContent.trim() : (el.innerText || el.value || "");
      } else if (type === "checkbox" || type === "radio") {
        currentValue = el.checked ? (el.value || "true") : "";
      } else {
        currentValue = el.value || el.innerText || "";
      }

      // Dropdown options extraction (native select + Angular mat-select)
      const options = [];
      if (tagName === "SELECT") {
        Array.from(el.options).forEach(opt => {
          options.push({
            value: opt.value,
            text: opt.text.trim(),
            selected: opt.selected
          });
        });
      } else if (tagName === "MAT-SELECT") {
        const matOptions = document.querySelectorAll(`mat-option, .mat-select-panel mat-option`);
        matOptions.forEach(opt => {
          options.push({
            value: opt.getAttribute("ng-reflect-value") || opt.getAttribute("value") || opt.textContent.trim(),
            text: opt.textContent.trim(),
            selected: opt.classList.contains("mat-selected")
          });
        });
      }

      // Context resolution
      const label = this.resolveLabel(el);
      const section = this.resolveSection(el);
      const tableContext = this.resolveTableContext(el);
      const surroundingText = this.resolveSurroundingText(el);
      const selector = this.generateUniqueSelector(el);
      const rect = el.getBoundingClientRect();

      const fieldInfo = {
        fieldIndex: index,
        id,
        name,
        tagName,
        type,
        label,
        placeholder,
        required,
        readonly,
        disabled,
        currentValue: currentValue.trim(),
        options,
        section,
        tableContext: tableContext.summary,
        isInsideTable: tableContext.isInsideTable,
        tableId: tableContext.tableId,
        rowIndex: tableContext.rowIndex,
        columnIndex: tableContext.columnIndex,
        columnHeader: tableContext.columnHeader,
        rowElementId: tableContext.rowElementId,
        surroundingText,
        selector,
        rect: {
          x: Math.round(rect.left + window.scrollX),
          y: Math.round(rect.top + window.scrollY),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        }
      };

      // Angular Reactive Forms detection
      const formControlName = el.getAttribute('formcontrolname') ||
                              el.getAttribute('formControlName') ||
                              el.getAttribute('ng-reflect-name') || '';

      if (formControlName) {
        fieldInfo.formControlName = formControlName;
        // If label not found yet, use formControlName as a hint
        if (!fieldInfo.label || fieldInfo.label === fieldInfo.name) {
          fieldInfo.label = fieldInfo.label || formControlName;
          fieldInfo.labelSource = 'angular-formcontrolname';
        }
      }

      // Angular Material mat-label detection
      // Look for <mat-label> sibling or parent
      const matLabel = findMatLabel(el);
      if (matLabel) {
        fieldInfo.matLabel = matLabel;
        if (!fieldInfo.label) fieldInfo.label = matLabel;
      }

      // Angular FormArray context
      const formArrayContainer = el.closest('[formarrayname]') || el.closest('[formArrayName]');
      if (formArrayContainer) {
        fieldInfo.formArrayName = formArrayContainer.getAttribute('formarrayname') || formArrayContainer.getAttribute('formArrayName');
        // Determine array index by counting previous sibling form groups
        const formGroupEl = el.closest('[formgroupname]') || el.closest('[formGroupName]');
        if (formGroupEl) {
          const siblings = Array.from(formArrayContainer.children);
          fieldInfo.arrayIndex = siblings.indexOf(formGroupEl);
        }
      }

      // Angular validation state classes
      if (el.classList.contains('ng-invalid')) fieldInfo.angularValid = false;
      if (el.classList.contains('ng-valid')) fieldInfo.angularValid = true;
      if (el.classList.contains('ng-dirty')) fieldInfo.angularDirty = true;

      // Angular formGroupName context
      const formGroupNameEl = el.closest('[formgroupname]') || el.closest('[formGroupName]');
      if (formGroupNameEl) {
        fieldInfo.formGroupName = formGroupNameEl.getAttribute('formgroupname') || formGroupNameEl.getAttribute('formGroupName');
      }

      return fieldInfo;
    }

    /**
     * Multi-heuristic Label Association
     */
    resolveLabel(el) {
      // 1. Explicit <label for="id">
      if (el.id) {
        const explicitLabel = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
        if (explicitLabel && explicitLabel.innerText.trim()) {
          return this.cleanText(explicitLabel.innerText);
        }
      }

      // 2. Enclosing <label>
      const parentLabel = el.closest("label");
      if (parentLabel) {
        // Clone and remove input's own text to avoid duplicate value in label
        const clone = parentLabel.cloneNode(true);
        const inputInside = clone.querySelector("input, select, textarea");
        if (inputInside) inputInside.remove();
        if (clone.innerText.trim()) {
          return this.cleanText(clone.innerText);
        }
      }

      // 3. aria-labelledby
      const ariaLabelledBy = el.getAttribute("aria-labelledby");
      if (ariaLabelledBy) {
        const refEl = document.getElementById(ariaLabelledBy);
        if (refEl && refEl.innerText.trim()) {
          return this.cleanText(refEl.innerText);
        }
      }

      // 4. aria-label
      const ariaLabel = el.getAttribute("aria-label");
      if (ariaLabel && ariaLabel.trim()) {
        return this.cleanText(ariaLabel);
      }

      // 5. Preceding label inside form-group / container
      const container = el.closest(".form-group, .form-row, .col, .field, div, td");
      if (container) {
        const labelInContainer = container.querySelector("label, .label, strong, b");
        if (labelInContainer && labelInContainer.innerText.trim()) {
          return this.cleanText(labelInContainer.innerText);
        }
      }

      // 6. Preceding sibling text
      let prev = el.previousElementSibling;
      while (prev) {
        if (prev.matches("label, span, div, strong, b") && prev.innerText.trim()) {
          return this.cleanText(prev.innerText);
        }
        prev = prev.previousElementSibling;
      }

      // 7. Table Header association
      const td = el.closest("td");
      if (td) {
        const cellIndex = td.cellIndex;
        const table = td.closest("table");
        if (table) {
          const header = table.querySelector(`thead tr th:nth-child(${cellIndex + 1})`);
          if (header && header.innerText.trim()) {
            return this.cleanText(header.innerText);
          }
        }
      }

      // Fallback: placeholder or name or id
      return el.placeholder || el.name || el.id || "Unlabeled Field";
    }

    resolveSection(el) {
      // Check fieldset legend
      const fieldset = el.closest("fieldset");
      if (fieldset) {
        const legend = fieldset.querySelector("legend");
        if (legend && legend.innerText.trim()) {
          return this.cleanText(legend.innerText);
        }
      }

      // Check card header / accordion / section
      const sectionContainer = el.closest(".card, .panel, .accordion-item, section, [data-section]");
      if (sectionContainer) {
        const header = sectionContainer.querySelector("h1, h2, h3, h4, h5, h6, .card-title, .panel-title, .accordion-header");
        if (header && header.innerText.trim()) {
          return this.cleanText(header.innerText);
        }
      }

      // Fallback: nearest preceding heading in the document
      let cur = el.parentElement;
      while (cur && cur !== document.body) {
        const prevHeading = cur.querySelector("h1, h2, h3, h4");
        if (prevHeading && prevHeading.innerText.trim()) {
          return this.cleanText(prevHeading.innerText);
        }
        cur = cur.parentElement;
      }

      return "General Section";
    }

    resolveTableContext(el) {
      const td = el.closest("td");
      const tr = el.closest("tr");
      const table = el.closest("table, [role=\"table\"], [data-component*=\"table\"]");

      if (!table || !tr || !td) {
        return { isInsideTable: false, summary: "", tableId: null, rowIndex: -1, columnIndex: -1, columnHeader: "" };
      }

      const tableId = table.id || table.getAttribute("name") || "table";
      // 0-based row index within tbody (excluding thead)
      let rowIndex = 0;
      const tbody = tr.closest("tbody");
      if (tbody) {
        rowIndex = Array.from(tbody.querySelectorAll("tr")).indexOf(tr);
      } else {
        rowIndex = tr.rowIndex ? tr.rowIndex - 1 : 0;
      }

      const columnIndex = td.cellIndex !== undefined ? td.cellIndex : 0;
      let columnHeader = "";
      const headerCell = table.querySelector(`thead tr th:nth-child(${columnIndex + 1})`);
      if (headerCell && headerCell.innerText.trim()) {
        columnHeader = this.cleanText(headerCell.innerText);
      }

      const rowElementId = tr.id || `row_${rowIndex}`;
      const summary = `Table: ${tableId} | Row ${rowIndex + 1} | Col ${columnIndex + 1} (${columnHeader || "Cell"})`;

      return {
        isInsideTable: true,
        summary,
        tableId,
        rowIndex,
        columnIndex,
        columnHeader,
        rowElementId
      };
    }

    resolveSurroundingText(el) {
      const container = el.closest(".form-group, .field, div, td");
      if (!container) return "";
      const text = container.innerText || "";
      return this.cleanText(text.replace(el.value || "", ""));
    }

    generateUniqueSelector(el) {
      if (el.id && document.querySelectorAll(`#${CSS.escape(el.id)}`).length === 1) {
        return `#${CSS.escape(el.id)}`;
      }

      if (el.name && document.querySelectorAll(`[name="${CSS.escape(el.name)}"]`).length === 1) {
        return `[name="${CSS.escape(el.name)}"]`;
      }

      // Structural path
      const path = [];
      let current = el;
      while (current && current.nodeType === Node.ELEMENT_NODE && current !== document.body) {
        let selector = current.tagName.toLowerCase();
        if (current.id) {
          selector += `#${CSS.escape(current.id)}`;
          path.unshift(selector);
          break;
        } else {
          let sibling = current;
          let nth = 1;
          while (sibling.previousElementSibling) {
            sibling = sibling.previousElementSibling;
            if (sibling.tagName === current.tagName) nth++;
          }
          if (nth > 1) selector += `:nth-of-type(${nth})`;
        }
        path.unshift(selector);
        current = current.parentElement;
      }
      return path.join(" > ");
    }

    cleanText(str) {
      if (!str) return "";
      return str
        .replace(/[\n\r\t]+/g, " ")
        .replace(/\s{2,}/g, " ")
        .replace(/\*+/g, "") // remove required asterisks
        .trim();
    }

    detectFormProfile() {
      const bodyText = (document.body.innerText || "").toLowerCase();
      const currentUrl = window.location.href.toLowerCase();

      if (currentUrl.includes("spice") || bodyText.includes("application for incorporation") || bodyText.includes("spice+")) {
        return { code: "SPICe+", name: "SPICe+ Part B (Company Incorporation)" };
      }
      if (currentUrl.includes("dir-12") || currentUrl.includes("dir12") || bodyText.includes("particulars of appointment of directors") || bodyText.includes("dir-12")) {
        return { code: "DIR-12", name: "Form DIR-12 (Appointment of Directors)" };
      }
      if (currentUrl.includes("aoc-4") || currentUrl.includes("aoc4") || bodyText.includes("financial statements") || bodyText.includes("balance sheet")) {
        return { code: "AOC-4", name: "Form AOC-4 (Filing Financial Statements)" };
      }
      if (currentUrl.includes("mgt-7") || currentUrl.includes("mgt7") || bodyText.includes("annual return")) {
        return { code: "MGT-7", name: "Form MGT-7 (Annual Return)" };
      }
      if (currentUrl.includes("inc-22") || bodyText.includes("notice of situation") || bodyText.includes("registered office")) {
        return { code: "INC-22", name: "Form INC-22 (Registered Office Verification)" };
      }

      return { code: "GENERIC_WEB_FORM", name: "Universal Web Form" };
    }

    startObserving() {
      if (this.isObserving) return;
      this.mutationObserver = new MutationObserver((mutations) => {
        let hasNewControls = false;
        for (const m of mutations) {
          if (m.addedNodes.length > 0) {
            for (const node of m.addedNodes) {
              if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.matches("input, select, textarea, [role=\"combobox\"]") || node.querySelector("input, select, textarea")) {
                  hasNewControls = true;
                  break;
                }
              }
            }
          }
        }

        if (hasNewControls) {
          console.log("[Germin8 Scanner] Dynamic DOM mutations detected with new form controls.");
          chrome.runtime?.sendMessage?.({
            action: "DOM_MUTATION_DETECTED",
            url: window.location.href
          });
        }
      });

      this.mutationObserver.observe(document.body, { childList: true, subtree: true });
      this.isObserving = true;
      console.log("[Germin8 Scanner] MutationObserver activated for dynamic SPA changes.");
    }

    stopObserving() {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
        this.mutationObserver = null;
      }
      this.isObserving = false;
    }
  }

  window.__Germin8Scanner = new UniversalScanner();

  /**
   * Angular Material mat-label helper
   * Looks for a <mat-label> within the closest mat-form-field, or a data-mat-label attribute.
   */
  function findMatLabel(element) {
    // Check mat-form-field parent for mat-label
    const matFormField = element.closest('mat-form-field');
    if (matFormField) {
      const matLabelEl = matFormField.querySelector('mat-label');
      if (matLabelEl) return matLabelEl.textContent.trim();
    }
    // Check for data-mat-label attribute
    if (element.dataset.matLabel) return element.dataset.matLabel;
    return null;
  }

  console.log("[Germin8] Universal Webpage Scanner initialized.");
})();
