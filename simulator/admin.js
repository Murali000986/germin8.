/**
 * Germin8 Admin & Developer Dashboard Controller
 */

(function () {
  const API_ROOT = "";

  // Navigation
  document.querySelectorAll(".admin-nav-item").forEach(item => {
    item.addEventListener("click", () => {
      const targetSec = item.getAttribute("data-section");
      if (targetSec === "sec-testbed") {
        window.location.href = "index.html";
        return;
      }

      document.querySelectorAll(".admin-nav-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      document.querySelectorAll(".admin-view").forEach(v => {
        v.style.display = v.id === targetSec ? "block" : "none";
      });
    });
  });

  document.getElementById("btn-refresh-admin")?.addEventListener("click", () => {
    loadDashboardData();
  });

  async function loadDashboardData() {
    await Promise.all([
      loadClients(),
      loadProfiles(),
      loadRules(),
      loadAuditLogs()
    ]);
  }

  async function loadClients() {
    try {
      const res = await fetch(`${API_ROOT}/api/clients`);
      const data = await res.json();
      if (data.success) {
        document.getElementById("stat-client-count").textContent = data.count || data.clients.length;
        const tbody = document.getElementById("admin-clients-tbody");
        if (tbody) {
          tbody.innerHTML = "";
          data.clients.forEach(c => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td><code>${c.client_code}</code></td>
              <td style="font-weight: 600;">${c.legal_name}</td>
              <td style="color: #38bdf8;">${c.cin || "-"}</td>
              <td><span class="pill pill-info">${c.class_of_company}</span></td>
              <td><span class="pill pill-success">${c.status}</span></td>
            `;
            tbody.appendChild(tr);
          });
        }
      }
    } catch (e) {
      console.warn("Could not load clients:", e);
    }
  }

  async function loadProfiles() {
    try {
      const res = await fetch(`${API_ROOT}/api/profiles`);
      const data = await res.json();
      if (data.success) {
        document.getElementById("stat-profile-count").textContent = data.profiles.length;
        const tbody = document.getElementById("admin-profiles-tbody");
        if (tbody) {
          tbody.innerHTML = "";
          data.profiles.forEach(p => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td><span class="pill pill-success">${p.code}</span></td>
              <td style="font-weight: 600;">${p.name}</td>
              <td style="color: #94a3b8;">${p.description}</td>
              <td style="color: #38bdf8; font-weight: 700;">~${p.typical_field_count || 30}</td>
              <td><code>${p.version || "1.0.0"}</code></td>
            `;
            tbody.appendChild(tr);
          });
        }
      }
    } catch (e) {
      console.warn("Could not load profiles:", e);
    }
  }

  async function loadRules() {
    try {
      const res = await fetch(`${API_ROOT}/api/rules`);
      const data = await res.json();
      if (data.success) {
        const tbody = document.getElementById("admin-rules-tbody");
        if (tbody) {
          tbody.innerHTML = "";
          if (data.rules.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #64748b; padding: 16px;">No custom rules defined yet.</td></tr>`;
            return;
          }
          data.rules.forEach(r => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td><code>${r.dom_id || r.dom_name || r.label_pattern}</code></td>
              <td style="color: #34d399;">${r.target_path}</td>
              <td><span class="pill pill-info">${r.form_name || "Universal"}</span></td>
              <td><button class="btn btn-danger btn-delete-rule" data-id="${r.id}" style="padding: 2px 6px; font-size: 10px;">Delete</button></td>
            `;
            tbody.appendChild(tr);
          });

          tbody.querySelectorAll(".btn-delete-rule").forEach(btn => {
            btn.addEventListener("click", async () => {
              const ruleId = btn.getAttribute("data-id");
              await fetch(`${API_ROOT}/api/rules/${ruleId}`, { method: "DELETE" });
              loadRules();
            });
          });
        }
      }
    } catch (e) {
      console.warn("Could not load rules:", e);
    }
  }

  // Save new custom rule
  document.getElementById("admin-btn-save-rule")?.addEventListener("click", async () => {
    const dom = document.getElementById("admin-new-rule-dom").value.trim();
    const target = document.getElementById("admin-new-rule-target").value.trim();
    const form = document.getElementById("admin-new-rule-form").value;

    if (!dom || !target) {
      alert("Please enter DOM identifier and target path.");
      return;
    }

    await fetch(`${API_ROOT}/api/rules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site_pattern: "mca.gov.in",
        dom_id: dom,
        target_path: target,
        form_name: form
      })
    });

    document.getElementById("admin-new-rule-dom").value = "";
    document.getElementById("admin-new-rule-target").value = "";
    loadRules();
  });

  async function loadAuditLogs() {
    try {
      const res = await fetch(`${API_ROOT}/api/logs?limit=50`);
      const data = await res.json();
      if (data.success) {
        const tbody = document.getElementById("admin-audit-tbody");
        if (tbody) {
          tbody.innerHTML = "";
          if (data.logs.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #64748b; padding: 20px;">No audit execution logs recorded yet.</td></tr>`;
            return;
          }
          data.logs.forEach(l => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td style="font-size: 11px; color: #94a3b8;">${new Date(l.timestamp).toLocaleString()}</td>
              <td style="font-weight: 600;">${l.client_name || "-"}</td>
              <td><span class="pill pill-info">${l.form_code || "-"}</span></td>
              <td style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #64748b;">${l.page_url}</td>
              <td>${l.fields_detected || 0}</td>
              <td style="color: #34d399; font-weight: 700;">${l.fields_filled || 0}</td>
              <td><span class="pill ${l.validation_passed ? "pill-success" : "pill-warning"}">${l.validation_passed ? "PASSED" : "WARN"}</span></td>
              <td><span class="pill pill-success">${l.status}</span></td>
            `;
            tbody.appendChild(tr);
          });
        }
      }
    } catch (e) {
      console.warn("Could not load audit logs:", e);
    }
  }

  // Scan Diff Comparator
  document.getElementById("btn-run-diff")?.addEventListener("click", () => {
    const rawA = document.getElementById("diff-scan-a").value.trim();
    const rawB = document.getElementById("diff-scan-b").value.trim();
    const card = document.getElementById("diff-results-card");
    const output = document.getElementById("diff-output-box");

    try {
      const listA = rawA ? JSON.parse(rawA) : [];
      const listB = rawB ? JSON.parse(rawB) : [];

      const mapA = new Map(listA.map(f => [f.id || f.name || f.selector, f]));
      const mapB = new Map(listB.map(f => [f.id || f.name || f.selector, f]));

      const added = [];
      const removed = [];
      const changed = [];

      for (const [key, itemB] of mapB.entries()) {
        if (!mapA.has(key)) {
          added.push(itemB);
        } else {
          const itemA = mapA.get(key);
          if (itemA.type !== itemB.type || itemA.label !== itemB.label) {
            changed.push({ key, old: itemA, current: itemB });
          }
        }
      }

      for (const [key, itemA] of mapA.entries()) {
        if (!mapB.has(key)) {
          removed.push(itemA);
        }
      }

      card.style.display = "block";
      output.innerHTML = `
        <div style="margin-bottom: 8px;"><strong>Comparison Result:</strong></div>
        <div style="color: #34d399;">+ Added Fields (${added.length}): ${added.map(a => a.id || a.name).join(", ") || "None"}</div>
        <div style="color: #f87171;">- Removed Fields (${removed.length}): ${removed.map(r => r.id || r.name).join(", ") || "None"}</div>
        <div style="color: #fbbf24;">~ Modified Fields (${changed.length}): ${changed.map(c => c.key).join(", ") || "None"}</div>
      `;
    } catch (err) {
      alert("Invalid JSON format in one of the scan inputs: " + err.message);
    }
  });

  loadDashboardData();
})();
