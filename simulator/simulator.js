/**
 * MCA V3 Portal Testbed Interactive Script
 * Simulates React / Enterprise SPA controlled input state updates and dynamic row mutations.
 */

(function () {
  let directorRowCount = 2;
  const stateTracker = new Map();

  // Tab switching between forms
  document.querySelectorAll(".mca-nav-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".mca-nav-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const formId = item.getAttribute("data-form");
      document.querySelectorAll(".form-section").forEach(sec => {
        sec.style.display = sec.id === formId ? "block" : "none";
      });

      logEvent("Navigation", `Switched active form view to ${item.textContent}`);
      updateFieldStats();
    });
  });

  // Track all input and change events (simulating React / Angular two-way binding)
  function attachControlListeners(container = document) {
    container.querySelectorAll("input, select, textarea").forEach(el => {
      if (el.__hasGermin8Listener) return;
      el.__hasGermin8Listener = true;

      el.addEventListener("input", (e) => {
        stateTracker.set(el.id || el.name, el.value);
        logEvent("Framework Event", `[INPUT] Field "${el.name || el.id}" updated to: "${el.value}"`, "log-type-react");
        updateFieldStats();
      });

      el.addEventListener("change", (e) => {
        stateTracker.set(el.id || el.name, el.value);
        logEvent("Framework Event", `[CHANGE] Field "${el.name || el.id}" committed: "${el.value}"`, "log-type-change");
        updateFieldStats();
      });
    });
  }

  // Add Dynamic Director Row (Simulates SPA dynamic components)
  const addRowBtn = document.getElementById("btn-add-director-row");
  if (addRowBtn) {
    addRowBtn.addEventListener("click", () => {
      const tbody = document.getElementById("spice_directors_tbody");
      if (!tbody) return;

      const idx = directorRowCount++;
      const tr = document.createElement("tr");
      tr.id = `spice_dir_row_${idx}`;
      tr.innerHTML = `
        <td style="text-align: center;">${idx + 1}</td>
        <td><input type="text" id="din_${idx}" name="director_din_${idx}" placeholder="8-digit DIN" maxlength="8"></td>
        <td><input type="text" id="name_${idx}" name="director_name_${idx}" placeholder="Full name"></td>
        <td><input type="text" id="father_${idx}" name="director_father_${idx}" placeholder="Father's name"></td>
        <td>
          <select id="desig_${idx}" name="director_designation_${idx}">
            <option value="Director">Director</option>
            <option value="Independent Director">Independent Director</option>
            <option value="Nominee Director">Nominee Director</option>
          </select>
        </td>
        <td><input type="text" id="mobile_${idx}" name="director_mobile_${idx}" placeholder="10-digit mobile"></td>
        <td><input type="email" id="email_${idx}" name="director_email_${idx}" placeholder="director@company.in"></td>
      `;

      tbody.appendChild(tr);
      attachControlListeners(tr);
      logEvent("DOM Mutation", `Dynamically added Director Row ${idx + 1} to table. MutationObserver will detect new controls!`, "log-type-react");
      updateFieldStats();
    });
  }

  // Clear Form
  document.getElementById("btn-clear-spice")?.addEventListener("click", () => {
    document.querySelectorAll("#form-spice input").forEach(i => i.value = "");
    document.querySelectorAll("#form-spice select").forEach(s => s.selectedIndex = 0);
    logEvent("Form Action", "Cleared all fields in SPICe+ form");
    updateFieldStats();
  });

  // Save Draft
  document.getElementById("btn-save-draft")?.addEventListener("click", () => {
    alert("Draft saved to simulated ROC temporary cache.");
    logEvent("ROC Draft", "Simulated draft saved successfully.");
  });

  // Clear console
  document.getElementById("btn-clear-logs")?.addEventListener("click", () => {
    const box = document.getElementById("sim-log-entries");
    if (box) box.innerHTML = "";
  });

  function logEvent(source, text, customClass = "") {
    const box = document.getElementById("sim-log-entries");
    if (!box) return;

    const time = new Date().toLocaleTimeString();
    const div = document.createElement("div");
    div.className = "log-entry";
    div.innerHTML = `
      <span class="log-time">[${time}]</span>
      <span class="${customClass}">[${source}]</span>
      <span>${escapeHtml(text)}</span>
    `;

    box.prepend(div);
  }

  function updateFieldStats() {
    const visibleActiveForm = document.querySelector(".form-section[style*='block']") || document.querySelector(".active-form");
    if (!visibleActiveForm) return;

    const inputs = visibleActiveForm.querySelectorAll("input:not([type='button']), select, textarea");
    let filled = 0;
    inputs.forEach(el => {
      if (el.value && el.value.trim() !== "") filled++;
    });

    const badge = document.getElementById("live-fields-state-badge");
    if (badge) {
      badge.textContent = `${filled} of ${inputs.length} fields filled in active form`;
    }
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  attachControlListeners(document);
  updateFieldStats();
  console.log("[MCA Portal Simulator] Initialized.");
})();
