/**
 * Germin8 High-Fidelity Auto-Filling Engine
 * Injected as a Content Script or executed on-demand.
 * Capable of filling React, Angular, Vue, and vanilla DOM inputs without breaking state.
 */

(function () {
  if (window.__Germin8Filler) {
    return;
  }

  class UniversalFormFiller {
    constructor() {
      this.initListeners();
    }

    initListeners() {
      chrome.runtime?.onMessage?.addListener((message, sender, sendResponse) => {
        if (message.action === "FILL_FORM") {
          this.fillForm(message.mappings, message.options || {})
            .then(result => sendResponse({ success: true, ...result }))
            .catch(err => sendResponse({ success: false, error: err.message }));
          return true; // Keep message channel open for async response
        }

        if (message.action === "CLEAR_FILLED_FIELDS") {
          const result = this.clearFilledFields(message.mappings || []);
          sendResponse({ success: true, ...result });
          return true;
        }
      });
    }

    /**
     * Executes the form filling operation across all provided mapped fields
     */
    async fillForm(mappings = [], options = {}) {
      const {
        overwriteExisting = false,
        confidenceThreshold = 0.50,
        highlightFilled = true
      } = options;

      console.log(`[Germin8 Filler] Starting auto-fill for ${mappings.length} mapped fields...`);

      let totalAttempted = 0;
      let filledCount = 0;
      let skippedCount = 0;
      let failedCount = 0;
      const details = [];

      for (const item of mappings) {
        if (!item.matched || item.resolvedValue === null || item.resolvedValue === undefined) {
          continue;
        }

        if (item.confidence < confidenceThreshold) {
          skippedCount++;
          details.push({
            fieldId: item.fieldId,
            status: "SKIPPED_LOW_CONFIDENCE",
            reason: `Confidence ${(item.confidence * 100).toFixed(0)}% is below threshold`
          });
          continue;
        }

        totalAttempted++;
        const el = this.findDomElement(item.domField);

        if (!el) {
          failedCount++;
          details.push({
            fieldId: item.fieldId,
            targetPath: item.targetPath,
            status: "ELEMENT_NOT_FOUND",
            selector: item.domField?.selector
          });
          continue;
        }

        // Check overwrite protection
        const currentVal = this.getDomValue(el);
        if (!overwriteExisting && currentVal !== "") {
          skippedCount++;
          details.push({
            fieldId: item.fieldId,
            targetPath: item.targetPath,
            status: "SKIPPED_ALREADY_FILLED",
            currentValue: currentVal
          });
          continue;
        }

        try {
          const fillResult = await this.fillSingleElement(el, item.resolvedValue, item.domField);
          const isSuccess = typeof fillResult === "object" ? fillResult.success : !!fillResult;
          const statusReason = typeof fillResult === "object" ? fillResult.reason : (isSuccess ? "SUCCESS" : "FILL_FAILED");

          if (isSuccess) {
            filledCount++;
            if (highlightFilled && window.__Germin8Highlighter) {
              window.__Germin8Highlighter.highlightElement(el, "FILLED", item.targetPath);
            }
            details.push({
              fieldId: item.fieldId,
              targetPath: item.targetPath,
              filledValue: item.resolvedValue,
              status: "SUCCESS"
            });
          } else {
            failedCount++;
            details.push({
              fieldId: item.fieldId,
              targetPath: item.targetPath,
              status: statusReason || "FILL_FAILED"
            });
          }
        } catch (err) {
          console.error(`[Germin8 Filler] Error filling field ${item.fieldId}:`, err);
          failedCount++;
          details.push({
            fieldId: item.fieldId,
            targetPath: item.targetPath,
            status: "ERROR",
            error: err.message
          });
        }
      }

      // Pass 2: Retry dependent fields that were previously blocked/readonly after Angular state update
      const blockedItems = details.filter(d => d.status === "READONLY_BLOCKED");
      if (blockedItems.length > 0) {
        console.log(`[Germin8 Filler] Executing Pass 2 for ${blockedItems.length} dependent reactive fields...`);
        await new Promise(r => setTimeout(r, 120));

        for (const item of blockedItems) {
          const mapping = mappings.find(m => m.fieldId === item.fieldId);
          if (!mapping) continue;
          const el = this.findDomElement(mapping.domField);
          if (el && !el.disabled && !el.readOnly) {
            try {
              const res = await this.fillSingleElement(el, mapping.resolvedValue, mapping.domField);
              if (res === true || res?.success) {
                item.status = "SUCCESS";
                item.filledValue = mapping.resolvedValue;
                filledCount++;
                failedCount--;
              }
            } catch (e) {
              // keep as blocked
            }
          }
        }
      }

      console.log(`[Germin8 Filler] Form filling completed: ${filledCount} filled, ${skippedCount} skipped, ${failedCount} failed.`);
      return {
        totalAttempted,
        filledCount,
        skippedCount,
        failedCount,
        details
      };
    }

    findDomElement(fieldDescriptor) {
      if (!fieldDescriptor) return null;

      // 1. Try by ID
      if (fieldDescriptor.id) {
        const byId = document.getElementById(fieldDescriptor.id);
        if (byId) return byId;
      }

      // 2. Try by unique selector
      if (fieldDescriptor.selector) {
        try {
          const bySelector = document.querySelector(fieldDescriptor.selector);
          if (bySelector) return bySelector;
        } catch (e) {
          // ignore invalid selector syntax
        }
      }

      // 3. Try by Name
      if (fieldDescriptor.name) {
        const byName = document.querySelector(`[name="${CSS.escape(fieldDescriptor.name)}"]`);
        if (byName) return byName;
      }

      // 4. Try inside table row if rowIndex specified
      if (fieldDescriptor.isInsideTable && fieldDescriptor.tableId && fieldDescriptor.rowIndex !== undefined) {
        const table = document.getElementById(fieldDescriptor.tableId) || document.querySelector(`table[name="${fieldDescriptor.tableId}"]`);
        if (table) {
          const rows = table.querySelectorAll("tbody tr");
          const targetRow = rows[fieldDescriptor.rowIndex];
          if (targetRow && fieldDescriptor.columnIndex !== undefined) {
            const cell = targetRow.children[fieldDescriptor.columnIndex];
            if (cell) {
              const input = cell.querySelector("input, select, textarea");
              if (input) return input;
            }
          }
        }
      }

      return null;
    }

    async fillSingleElement(el, value, fieldDescriptor) {
      if (!el.isConnected) {
        return { success: false, reason: "ELEMENT_DETACHED" };
      }

      const tagName = el.tagName.toUpperCase();
      const type = (el.getAttribute("type") || tagName.toLowerCase()).toLowerCase();

      // Check if disabled or readonly
      if (el.disabled || el.readOnly) {
        return { success: false, reason: "READONLY_BLOCKED" };
      }

      // Focus element
      el.focus();

      if (tagName === "SELECT") {
        const selectSuccess = this.fillSelectElement(el, value);
        return selectSuccess ? { success: true } : { success: false, reason: "DROPDOWN_OPTION_NOT_FOUND" };
      }

      if (tagName === "MAT-SELECT") {
        return this.fillMatSelect(el, value);
      }

      if (type === "checkbox") {
        const boolVal = value === true || String(value).toLowerCase() === "true" || String(value) === "1";
        el.checked = boolVal;
        this.dispatchEvents(el);
        return { success: true };
      }

      if (type === "radio") {
        const stringVal = String(value).toLowerCase().trim();
        const radioVal = String(el.value).toLowerCase().trim();
        if (radioVal === stringVal || stringVal.includes(radioVal)) {
          el.checked = true;
          this.dispatchEvents(el);
          return { success: true };
        }
        return { success: false, reason: "RADIO_OPTION_MISMATCH" };
      }

      // Text, Number, Date, Textarea inputs
      let formattedValue = String(value);

      // Handle Numbers: strip commas and currency symbol if target is type="number"
      if (type === "number") {
        formattedValue = formattedValue.replace(/[₹$,\sA-Za-z]/g, "");
      }

      // Handle Date formats
      if (type === "date") {
        // HTML5 date inputs expect YYYY-MM-DD
        if (formattedValue.includes("/")) {
          const parts = formattedValue.split("/");
          if (parts.length === 3) {
            // Assume DD/MM/YYYY -> YYYY-MM-DD
            formattedValue = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
          }
        }
      }

      // React / Modern Framework Controlled Input Dispatcher
      this.setNativeValue(el, formattedValue);
      this.dispatchEvents(el);
      el.blur();

      return { success: true };
    }

    async fillMatSelect(matSelectEl, value) {
      try {
        const strVal = String(value).toLowerCase().trim();
        matSelectEl.click();
        await new Promise(r => setTimeout(r, 60));
        const options = Array.from(document.querySelectorAll("mat-option, .mat-select-panel mat-option"));
        const targetOption = options.find(opt => {
          const t = opt.textContent.toLowerCase().trim();
          const v = (opt.getAttribute("ng-reflect-value") || opt.getAttribute("value") || "").toLowerCase().trim();
          return t === strVal || v === strVal || t.includes(strVal) || strVal.includes(t);
        });
        if (targetOption) {
          targetOption.click();
          return { success: true };
        } else {
          document.body.click();
          return { success: false, reason: "DROPDOWN_OPTION_NOT_FOUND" };
        }
      } catch (e) {
        return { success: false, reason: "MAT_SELECT_ERROR" };
      }
    }

    fillSelectElement(selectEl, value) {
      const strVal = String(value).toLowerCase().trim();
      let matchedIndex = -1;

      // 1. Try exact value
      for (let i = 0; i < selectEl.options.length; i++) {
        const opt = selectEl.options[i];
        if (opt.value.toLowerCase().trim() === strVal) {
          matchedIndex = i;
          break;
        }
      }

      // 2. Try exact text
      if (matchedIndex === -1) {
        for (let i = 0; i < selectEl.options.length; i++) {
          const opt = selectEl.options[i];
          if (opt.text.toLowerCase().trim() === strVal) {
            matchedIndex = i;
            break;
          }
        }
      }

      // 3. Try partial substring / keyword matching
      if (matchedIndex === -1) {
        for (let i = 0; i < selectEl.options.length; i++) {
          const opt = selectEl.options[i];
          const optText = opt.text.toLowerCase().trim();
          if (optText.includes(strVal) || strVal.includes(optText)) {
            matchedIndex = i;
            break;
          }
        }
      }

      if (matchedIndex !== -1) {
        selectEl.selectedIndex = matchedIndex;
        selectEl.options[matchedIndex].selected = true;
        this.dispatchEvents(selectEl);
        selectEl.blur();
        return true;
      }

      return false;
    }

    /**
     * Bypasses React / Angular / Vue synthetic event wrapping by invoking
     * the underlying prototype value setter.
     */
    setNativeValue(element, value) {
      const prototype = Object.getPrototypeOf(element);
      const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
      if (descriptor && descriptor.set) {
        descriptor.set.call(element, value);
      } else {
        element.value = value;
      }
    }

    /**
     * Dispatches native DOM events with bubbling so front-end reactive frameworks update state
     */
    dispatchEvents(element) {
      element.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
      element.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
      element.dispatchEvent(new Event("blur", { bubbles: true, cancelable: true }));
    }

    getDomValue(element) {
      if (!element) return "";
      const type = (element.getAttribute("type") || "").toLowerCase();
      if (type === "checkbox" || type === "radio") {
        return element.checked ? "checked" : "";
      }
      return element.value ? element.value.trim() : "";
    }

    clearFilledFields(mappings = []) {
      let clearedCount = 0;
      for (const item of mappings) {
        const el = this.findDomElement(item.domField);
        if (el) {
          const type = (el.getAttribute("type") || "").toLowerCase();
          if (type === "checkbox" || type === "radio") {
            el.checked = false;
          } else if (el.tagName === "SELECT") {
            el.selectedIndex = 0;
          } else {
            this.setNativeValue(el, "");
          }
          this.dispatchEvents(el);
          clearedCount++;
          if (window.__Germin8Highlighter) {
            window.__Germin8Highlighter.removeHighlight(el);
          }
        }
      }
      return { clearedCount };
    }
  }

  window.__Germin8Filler = new UniversalFormFiller();
  console.log("[Germin8] High-Fidelity Form Filling Engine initialized.");
})();
