/**
 * Germin8 Extension Background Service Worker (Manifest V3)
 * Orchestrates API communication, storage sync, tab messaging, and state management.
 */

const DEFAULT_BACKEND_URL = "http://localhost:4567";
const DEFAULT_API_KEY = "germin8_secret_token_2026";

// Install & Startup Lifecycle
chrome.runtime.onInstalled.addListener(() => {
  console.log("[Germin8 Service Worker] Extension installed successfully.");
  chrome.storage.local.get(["backendUrl", "apiKey", "selectedClientId"], (res) => {
    if (!res.backendUrl) {
      chrome.storage.local.set({
        backendUrl: DEFAULT_BACKEND_URL,
        apiKey: DEFAULT_API_KEY,
        autoScanOnPageLoad: false,
        confidenceThreshold: 0.50
      });
    }
  });

  // Enable side panel behavior if supported
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch(() => {});
  }
});

// Central Message Broker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 1. Relay from In-Page Dock to Extension Popup/SidePanel
  if (message.action === "TRIGGER_PAGE_SCAN" || message.action === "TRIGGER_AUTO_FILL" || message.action === "TRIGGER_CLEAR_FORM") {
    // Notify all active extension views
    chrome.runtime.sendMessage(message).catch(() => {});
    return false;
  }

  // 2. Fetch Clients from Backend
  if (message.action === "FETCH_CLIENTS") {
    getConfig().then(cfg => {
      const q = encodeURIComponent(message.query || "");
      fetch(`${cfg.backendUrl}/api/clients?q=${q}`, {
        headers: { "x-germin8-api-key": cfg.apiKey }
      })
        .then(r => r.json())
        .then(data => sendResponse(data))
        .catch(err => {
          console.warn("[Germin8 SW] Failed to reach backend, falling back to local cache:", err);
          sendResponse({ success: false, error: err.message });
        });
    });
    return true; // Keep sendResponse open
  }

  // 3. Fetch Single Client Details
  if (message.action === "FETCH_CLIENT_DETAILS") {
    getConfig().then(cfg => {
      fetch(`${cfg.backendUrl}/api/clients/${encodeURIComponent(message.clientId)}`, {
        headers: { "x-germin8-api-key": cfg.apiKey }
      })
        .then(r => r.json())
        .then(data => sendResponse(data))
        .catch(err => sendResponse({ success: false, error: err.message }));
    });
    return true;
  }

  // 4. Remote Matching Engine API (Server-side)
  if (message.action === "MATCH_FIELDS_REMOTE") {
    getConfig().then(cfg => {
      fetch(`${cfg.backendUrl}/api/mapping/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-germin8-api-key": cfg.apiKey
        },
        body: JSON.stringify({
          fields: message.fields,
          clientId: message.clientId,
          customRules: message.customRules || []
        })
      })
        .then(r => r.json())
        .then(data => sendResponse(data))
        .catch(err => sendResponse({ success: false, error: err.message }));
    });
    return true;
  }

  // 5. Post Audit Log to Backend
  if (message.action === "LOG_AUDIT_EVENT") {
    getConfig().then(cfg => {
      fetch(`${cfg.backendUrl}/api/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-germin8-api-key": cfg.apiKey
        },
        body: JSON.stringify(message.logData)
      })
        .then(r => r.json())
        .then(data => sendResponse(data))
        .catch(err => sendResponse({ success: false, error: err.message }));
    });
    return true;
  }

  // 6. Post-fill Validation API
  if (message.action === "VALIDATE_FILLED_FIELDS") {
    getConfig().then(cfg => {
      fetch(`${cfg.backendUrl}/api/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-germin8-api-key": cfg.apiKey
        },
        body: JSON.stringify({
          filledFields: message.filledFields,
          clientId: message.clientId
        })
      })
        .then(r => r.json())
        .then(data => sendResponse(data))
        .catch(err => sendResponse({ success: false, error: err.message }));
    });
    return true;
  }

  // 7. Open Sidepanel for current tab
  if (message.action === "OPEN_SIDEPANEL") {
    if (chrome.sidePanel && chrome.sidePanel.open && sender.tab?.id) {
      chrome.sidePanel.open({ tabId: sender.tab.id }).catch(() => {});
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, message: "Sidepanel API unavailable" });
    }
    return true;
  }
});

function getConfig() {
  return new Promise(resolve => {
    chrome.storage.local.get(["backendUrl", "apiKey"], res => {
      resolve({
        backendUrl: res.backendUrl || DEFAULT_BACKEND_URL,
        apiKey: res.apiKey || DEFAULT_API_KEY
      });
    });
  });
}
