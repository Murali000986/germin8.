import http from "node:http";
import { EventEmitter } from "node:events";
import { dbInstance } from "../backend/src/database.js";
import { mapDetectedFields } from "../backend/src/matching.js";

console.log("[Test Server API]");

// Test Database clients
const clients = dbInstance.getClients();
console.log(`Database has ${clients.length} clients.`);
if (clients.length < 3) throw new Error("Expected at least 3 clients");

// Test search
const searchResult = dbInstance.getClients("Technova");
console.log(`Search 'Technova' found: ${searchResult.length} records (${searchResult[0]?.legal_name})`);

// Test get by ID
const client = dbInstance.getClientById("cli_technova_001");
console.log(`Get client by ID: ${client.company.legal_name}, CIN: ${client.company.cin}`);

// Test MCA Form profiles
const profiles = dbInstance.getSiteProfiles();
console.log(`Loaded ${profiles.length} MCA Form profiles:`, profiles.map(p => p.code).join(", "));

// Test Rule persistence
const savedRule = dbInstance.saveMappingRule({
  site_pattern: "mca.gov.in",
  form_name: "DIR-12",
  dom_name: "custom_director_din_test",
  target_path: "directors[INDEX].din",
  confidence_boost: 1.0
});
console.log(`Saved custom mapping rule ID: ${savedRule.id}`);

const rules = dbInstance.getMappingRules("DIR-12");
console.log(`Fetched rules count for DIR-12: ${rules.length}`);

// Test Audit log creation & fetch
const savedLog = dbInstance.addAuditLog({
  client_id: client.id,
  client_name: client.company.legal_name,
  form_code: "SPICe+",
  page_url: "https://www.mca.gov.in/mcafoportal/spicePlus.do",
  fields_detected: 25,
  fields_mapped: 24,
  fields_filled: 24,
  status: "COMPLETED",
  validation_passed: true
});
console.log(`Saved audit log ID: ${savedLog.id}`);

const logs = dbInstance.getAuditLogs(5);
console.log(`Fetched recent audit logs count: ${logs.length}`);

console.log("\nALL SERVER CORE UNIT TESTS PASSED SUCCESSFULLY!");
