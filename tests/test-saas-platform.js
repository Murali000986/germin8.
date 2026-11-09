/**
 * GERMIN8 SaaS Platform - Comprehensive End-to-End Test Suite
 * Tests all 10 core SaaS workflows:
 * 1. Health & Server Routing
 * 2. Multi-tenant Auth & Workspace Provisioning
 * 3. Subscription & Plan Management
 * 4. Razorpay Payment Lifecycle & Invoicing
 * 5. Team RBAC & Employee Invitations
 * 6. Chrome Extension Pairing & Device Security
 * 7. Scoped API Key Generation & Hashed Storage
 * 8. MCA Form Automation Job Execution & Telemetry
 * 9. Platform Super Admin Analytics & Diagnostics
 * 10. Statutory Post-Fill Validation
 */

import http from "node:http";
import assert from "node:assert";
import { startServer } from "../backend/src/server.js";
import { dbInstance } from "../backend/src/database.js";

const TEST_PORT = 4599;
const BASE_URL = `http://localhost:${TEST_PORT}`;

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqHeaders = {
      "Content-Type": "application/json",
      ...headers
    };

    const req = http.request(
      url,
      {
        method,
        headers: reqHeaders
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: data ? JSON.parse(data) : null
            });
          } catch (e) {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: data
            });
          }
        });
      }
    );

    req.on("error", reject);
    if (body) {
      req.write(typeof body === "string" ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log("\n=================================================");
  console.log("   GERMIN8 SAAS PLATFORM - VERIFICATION SUITE    ");
  console.log("=================================================\n");

  const server = await startServer(TEST_PORT);
  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    return async () => {
      try {
        await fn();
        console.log(`[PASS] ${name}`);
        passed++;
      } catch (err) {
        console.error(`[FAIL] ${name}`);
        console.error("       Error:", err.message);
        failed++;
      }
    };
  }

  // --- 1. HEALTH & ROUTING ---
  console.log("--- TEST GROUP 1: Health & Routing ---");
  await test("Backend health endpoint returns ok and database connected", async () => {
    const res = await request("GET", "/api/health");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, "ok");
    assert.strictEqual(res.body.database, "connected");
  })();

  await test("Public website root returns HTML status 200", async () => {
    const res = await request("GET", "/");
    assert.strictEqual(res.status, 200);
    assert.ok(typeof res.body === "string" && res.body.includes("GERMIN8"));
  })();

  await test("Customer dashboard route returns HTML status 200", async () => {
    const res = await request("GET", "/dashboard");
    assert.strictEqual(res.status, 200);
    assert.ok(typeof res.body === "string" && res.body.includes("Corporate Clients"));
  })();

  // --- 2. AUTH & WORKSPACE PROVISIONING ---
  console.log("\n--- TEST GROUP 2: Auth & Multi-Tenant Workspaces ---");
  let newCompanyToken = "";
  let newCompanyUser = null;
  const testEmail = `firm_${Date.now()}@testfirm.com`;

  await test("User registration creates user, company workspace, and subscription", async () => {
    const res = await request("POST", "/api/auth/register", {
      email: testEmail,
      password: "SecurePass@2026",
      full_name: "CA Ananya Deshmukh",
      plan: "company",
      company_name: "Deshmukh & Associates LLP"
    });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.token);
    assert.strictEqual(res.body.user.role, "company_owner");
    newCompanyToken = res.body.token;
    newCompanyUser = res.body.user;
  })();

  await test("User login succeeds with correct password and returns JWT session", async () => {
    const res = await request("POST", "/api/auth/login", {
      email: testEmail,
      password: "SecurePass@2026"
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.token);
  })();

  await test("User login rejects invalid credentials", async () => {
    const res = await request("POST", "/api/auth/login", {
      email: testEmail,
      password: "WrongPassword"
    });
    assert.strictEqual(res.status, 401);
    assert.strictEqual(res.body.success, false);
  })();

  await test("Profile /api/auth/me returns user, active workspace, and subscription details", async () => {
    const res = await request("GET", "/api/auth/me", null, {
      Authorization: `Bearer ${newCompanyToken}`
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.user.email, testEmail);
    assert.ok(res.body.workspace);
    assert.strictEqual(res.body.workspace.type, "company");
    assert.ok(res.body.subscription);
  })();

  // --- 3. PLANS & SUBSCRIPTIONS ---
  console.log("\n--- TEST GROUP 3: Plans & Pricing Config ---");
  await test("Returns 3 core plans (Individual, Company, Enterprise) with valid pricing", async () => {
    const res = await request("GET", "/api/plans");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.plans.length, 3);
    const companyPlan = res.body.plans.find((p) => p.code === "company");
    assert.ok(companyPlan);
    assert.strictEqual(companyPlan.monthly_price, 4999);
    assert.strictEqual(companyPlan.max_users, 10);
  })();

  await test("Admin can update plan pricing in real time", async () => {
    const res = await request("PUT", "/api/admin/plans/plan_company", {
      monthly_price: 4999,
      annual_price: 3499,
      max_users: 12,
      max_automations: 3000,
      is_active: 1,
      is_visible: 1
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.plan.max_users, 12);
  });

  // --- 4. PAYMENTS & RAZORPAY ---
  console.log("\n--- TEST GROUP 4: Razorpay Payments & Invoicing ---");
  let razorpayOrderId = "";
  await test("Creates Razorpay order for subscription checkout", async () => {
    const res = await request("POST", "/api/payments/create-order", {
      planId: "plan_company",
      billingCycle: "annual"
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.order.id.startsWith("order_"));
    assert.strictEqual(res.body.order.currency, "INR");
    razorpayOrderId = res.body.order.id;
  })();

  await test("Server verifies Razorpay payment, activates subscription, and issues invoice", async () => {
    const res = await request("POST", "/api/payments/verify", {
      workspaceId: newCompanyUser.activeWorkspaceId,
      userId: newCompanyUser.id,
      planId: "plan_company",
      billingCycle: "annual",
      orderId: razorpayOrderId,
      paymentId: `pay_rzp_${Date.now()}`
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.payment.invoice_number.startsWith("INV-2026-"));
    assert.strictEqual(res.body.subscription.status, "active");
  })();

  await test("Retrieves GST invoices for workspace", async () => {
    const res = await request("GET", `/api/payments/invoices?workspaceId=${newCompanyUser.activeWorkspaceId}`);
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.invoices.length >= 1);
  })();

  // --- 5. TEAM & RBAC ---
  console.log("\n--- TEST GROUP 5: Team Management & RBAC ---");
  let invitedUserId = "";
  await test("Invites employee to company workspace with Accountant role", async () => {
    const res = await request("POST", "/api/workspace/invite", {
      workspaceId: newCompanyUser.activeWorkspaceId,
      email: `staff_${Date.now()}@testfirm.com`,
      full_name: "Vikas Patil, ACA",
      role: "accountant"
    });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.member.role, "accountant");
    invitedUserId = res.body.member.id;
  })();

  await test("Lists all workspace members with assigned roles", async () => {
    const res = await request("GET", `/api/workspace/members?workspaceId=${newCompanyUser.activeWorkspaceId}`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.members.length, 2); // Owner + 1 employee
  })();

  await test("Removes employee from workspace", async () => {
    const res = await request("DELETE", `/api/workspace/members/${invitedUserId}?workspaceId=${newCompanyUser.activeWorkspaceId}`);
    assert.strictEqual(res.status, 200);
    const listRes = await request("GET", `/api/workspace/members?workspaceId=${newCompanyUser.activeWorkspaceId}`);
    assert.strictEqual(listRes.body.members.length, 1);
  })();

  // --- 6. CHROME EXTENSION PAIRING ---
  console.log("\n--- TEST GROUP 6: Chrome Extension Pairing & Fleet ---");
  let pairingCode = "";
  let extensionToken = "";
  await test("Generates 6-character time-limited pairing code", async () => {
    const res = await request("POST", "/api/extension/generate-pairing-code", {
      workspaceId: newCompanyUser.activeWorkspaceId,
      userId: newCompanyUser.id,
      deviceName: 'Chrome Extension on ThinkPad'
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.pairingCode.length, 6);
    pairingCode = res.body.pairingCode;
  })();

  await test("Extension exchanges pairing code for scoped hardware credential", async () => {
    const res = await request("POST", "/api/extension/pair", {
      pairingCode,
      clientInfo: { version: "2.5.0", browser: "Google Chrome 128" }
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.extensionToken.startsWith("g8_ext_"));
    extensionToken = res.body.extensionToken;
  })();

  await test("Extension status confirms paired device and active ping", async () => {
    const res = await request("GET", `/api/extension/status?workspaceId=${newCompanyUser.activeWorkspaceId}`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.connected, true);
    assert.strictEqual(res.body.count, 1);
  })();

  // --- 7. API CREDENTIALS ---
  console.log("\n--- TEST GROUP 7: Scoped API Key Management ---");
  let createdKeyId = "";
  await test("Generates production API key with scoped permissions and reveals secret once", async () => {
    const res = await request("POST", "/api/api-credentials", {
      workspaceId: newCompanyUser.activeWorkspaceId,
      userId: newCompanyUser.id,
      name: "ERP Synchronization Key",
      permissions: ["clients:read", "automation:execute"]
    });
    assert.strictEqual(res.status, 201);
    assert.ok(res.body.credential.secret.startsWith("g8_live_sk_"));
    assert.ok(res.body.credential.prefix.startsWith("g8_live_sk_"));
    createdKeyId = res.body.credential.id;

    // Verify secret is hashed in DB
    const dbRecord = dbInstance.db.prepare("SELECT hashed_secret FROM api_credentials WHERE id = ?").get(createdKeyId);
    assert.notStrictEqual(dbRecord.hashed_secret, res.body.credential.secret);
    assert.strictEqual(dbRecord.hashed_secret.length, 64); // SHA-256 hex length
  })();

  await test("Lists active API credentials metadata without exposing secret", async () => {
    const res = await request("GET", `/api/api-credentials?workspaceId=${newCompanyUser.activeWorkspaceId}`);
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.credentials.length >= 1);
    assert.strictEqual(res.body.credentials[0].secret, undefined);
  })();

  // --- 8. MCA AUTOMATION JOBS & TELEMETRY ---
  console.log("\n--- TEST GROUP 8: MCA Form Job Execution & Telemetry ---");
  await test("Submits completed SPICe+ automation job and increments subscription usage", async () => {
    const res = await request("POST", "/api/jobs", {
      workspaceId: newCompanyUser.activeWorkspaceId,
      userId: newCompanyUser.id,
      userName: "CA Ananya Deshmukh",
      clientId: "client_technova_001",
      clientName: "TECHNOVA SOLUTIONS INDIA PVT LTD",
      formCode: "SPICE_PLUS",
      formName: "SPICe+ Part B",
      fieldsDetected: 17,
      fieldsFilled: 17,
      validationStatus: "PASSED",
      durationMs: 1220
    });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.job.status, "completed");
    assert.strictEqual(res.body.job.fields_filled, 17);
  })();

  await test("Usage telemetry reflects executed job runs and form distribution", async () => {
    const res = await request("GET", `/api/analytics?workspaceId=${newCompanyUser.activeWorkspaceId}`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.summary.totalJobs, 1);
    assert.strictEqual(res.body.summary.successRate, 100);
    assert.strictEqual(res.body.summary.formBreakdown.SPICE_PLUS, 1);
  })();

  // --- 9. PLATFORM SUPER ADMIN ---
  console.log("\n--- TEST GROUP 9: Platform Super Admin Console ---");
  await test("Admin overview provides platform-wide KPIs (MRR, Users, Jobs)", async () => {
    const res = await request("GET", "/api/admin/overview");
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.stats.totalUsers >= 6);
    assert.ok(res.body.stats.mrr > 0);
    assert.ok(res.body.stats.totalJobs >= 5);
  })();

  await test("Admin can inspect all users across all tenants", async () => {
    const res = await request("GET", "/api/admin/users");
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.users.length >= 6);
  })();

  await test("System diagnostics endpoint returns healthy process metrics", async () => {
    const res = await request("GET", "/api/admin/system");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.system.status, "healthy");
    assert.ok(res.body.system.memoryUsage);
  })();

  await test("Forensic audit log records security operations with timestamps", async () => {
    const res = await request("GET", "/api/admin/audit-logs");
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.logs.length >= 3);
  })();

  // --- 10. STATUTORY POST-FILL VALIDATION ---
  console.log("\n--- TEST GROUP 10: Statutory Post-Fill Validation ---");
  await test("Validation approves correct statutory CIN, DIN, and PIN code", async () => {
    const res = await request("POST", "/api/validate", {
      clientId: "cli_technova_001",
      filledFields: [
        { fieldId: "cin_1", targetPath: "company.cin", domValue: "U72200MH2018PTC309871" },
        { fieldId: "din_1", targetPath: "directors[0].din", domValue: "08123456" },
        { fieldId: "pin_1", targetPath: "company.registered_address.pin_code", domValue: "400013" }
      ]
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.summary.overallStatus, "ALL_VALID");
    assert.strictEqual(res.body.summary.matchedCount, 3);
  })();

  await test("Validation flags invalid DIN structure", async () => {
    const res = await request("POST", "/api/validate", {
      clientId: "cli_technova_001",
      filledFields: [
        { fieldId: "din_invalid", targetPath: "directors[0].din", domValue: "12345" } // only 5 digits
      ]
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.summary.overallStatus, "REQUIRES_ATTENTION");
    assert.strictEqual(res.body.validationResults[0].formatValid, false);
  })();

  // Summary
  console.log("\n=================================================");
  console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED  `);
  console.log("=================================================\n");

  server.close();
  if (failed > 0) process.exit(1);
}

runTests();
