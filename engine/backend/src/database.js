/**
 * Germin8 Backend - Complete Database & SaaS Entity Layer
 * Built with native Node.js SQLite (DatabaseSync)
 * Supports Multi-tenant Workspaces, RBAC, Subscriptions, Payments,
 * API Credentials, Extension Pairing, Automation Jobs & Audit Logs.
 */

import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { clients } from "./seed-data.js";
import { MCA_FORM_PROFILES } from "./mca-ontology.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "germin8.sqlite");

export function hashPassword(password) {
  const salt = "germin8_salt_2026_secure";
  return crypto.scryptSync(password, salt, 32).toString("hex");
}

export function generateToken(payload) {
  const secret = "germin8_jwt_secret_token_key_2026";
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(`${header}.${data}`).digest("base64url");
  return `${header}.${data}.${signature}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, data, signature] = parts;
  const secret = "germin8_jwt_secret_token_key_2026";
  const expectedSig = crypto.createHmac("sha256", secret).update(`${header}.${data}`).digest("base64url");
  if (signature !== expectedSig) return null;
  try {
    return JSON.parse(Buffer.from(data, "base64url").toString());
  } catch (e) {
    return null;
  }
}

export class Germin8Database {
  constructor(databasePath = dbPath) {
    this.db = new DatabaseSync(databasePath);
    this.initSchema();
    this.seedAll();
  }

  initSchema() {
    // Check and migrate existing tables if needed
    const safeAdd = (table, col, def) => {
      try {
        this.db.exec(`ALTER TABLE ${table} ADD COLUMN ${col} ${def};`);
      } catch (e) {
        // column already exists
      }
    };
    safeAdd("clients", "workspace_id", "TEXT DEFAULT 'ws_company_1'");
    safeAdd("audit_logs", "workspace_id", "TEXT");
    safeAdd("audit_logs", "user_id", "TEXT");
    safeAdd("audit_logs", "user_email", "TEXT");
    safeAdd("audit_logs", "action", "TEXT");
    safeAdd("audit_logs", "resource_type", "TEXT");
    safeAdd("audit_logs", "resource_id", "TEXT");
    safeAdd("audit_logs", "ip_address", "TEXT DEFAULT '127.0.0.1'");

    this.db.exec(`
      -- Core Clients
      CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY,
        workspace_id TEXT DEFAULT 'ws_company_1',
        client_code TEXT UNIQUE,
        legal_name TEXT,
        cin TEXT UNIQUE,
        class_of_company TEXT,
        status TEXT,
        data_json TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- Users
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        phone TEXT,
        role TEXT DEFAULT 'individual', -- platform_admin, company_owner, company_admin, accountant, operator, viewer
        is_platform_admin INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active', -- active, suspended, pending
        email_verified INTEGER DEFAULT 1,
        active_workspace_id TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- Companies / Firms
      CREATE TABLE IF NOT EXISTS companies (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        owner_id TEXT NOT NULL,
        plan_id TEXT DEFAULT 'plan_company',
        max_seats INTEGER DEFAULT 10,
        status TEXT DEFAULT 'active',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- Workspaces (Tenant isolation)
      CREATE TABLE IF NOT EXISTS workspaces (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL, -- individual, company
        name TEXT NOT NULL,
        owner_id TEXT NOT NULL,
        company_id TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- Workspace Memberships & RBAC
      CREATE TABLE IF NOT EXISTS workspace_members (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL, -- owner, admin, accountant, operator, viewer
        status TEXT DEFAULT 'active',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(workspace_id, user_id)
      );

      -- Workspace Invitations
      CREATE TABLE IF NOT EXISTS invitations (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT NOT NULL,
        invited_by TEXT NOT NULL,
        token TEXT UNIQUE NOT NULL,
        status TEXT DEFAULT 'pending', -- pending, accepted, expired, revoked
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        expires_at TEXT NOT NULL
      );

      -- Subscription Plans
      CREATE TABLE IF NOT EXISTS plans (
        id TEXT PRIMARY KEY,
        code TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        monthly_price INTEGER NOT NULL,
        annual_price INTEGER NOT NULL,
        max_users INTEGER NOT NULL,
        max_automations INTEGER NOT NULL,
        features_json TEXT NOT NULL,
        supported_forms_json TEXT NOT NULL,
        is_active INTEGER DEFAULT 1,
        is_visible INTEGER DEFAULT 1,
        sort_order INTEGER DEFAULT 1
      );

      -- Subscriptions
      CREATE TABLE IF NOT EXISTS subscriptions (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        plan_id TEXT NOT NULL,
        status TEXT DEFAULT 'active', -- active, trial, expired, cancelled, suspended
        billing_cycle TEXT DEFAULT 'monthly', -- monthly, annual
        current_period_start TEXT DEFAULT CURRENT_TIMESTAMP,
        current_period_end TEXT NOT NULL,
        automations_used INTEGER DEFAULT 0,
        auto_renew INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- Payments & Invoices
      CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY,
        subscription_id TEXT,
        workspace_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        amount INTEGER NOT NULL,
        currency TEXT DEFAULT 'INR',
        status TEXT DEFAULT 'success', -- success, pending, failed
        payment_gateway TEXT DEFAULT 'Razorpay',
        razorpay_order_id TEXT,
        razorpay_payment_id TEXT,
        invoice_number TEXT UNIQUE,
        invoice_pdf_url TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- Extension Paired Devices
      CREATE TABLE IF NOT EXISTS extension_devices (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        device_name TEXT NOT NULL,
        pairing_code TEXT,
        code_expires_at TEXT,
        extension_token TEXT UNIQUE,
        extension_version TEXT DEFAULT '2.5.0',
        browser_info TEXT,
        status TEXT DEFAULT 'paired', -- pending, paired, revoked
        last_ping_at TEXT DEFAULT CURRENT_TIMESTAMP,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- API Credentials
      CREATE TABLE IF NOT EXISTS api_credentials (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        key_prefix TEXT NOT NULL,
        hashed_secret TEXT NOT NULL,
        permissions_json TEXT NOT NULL,
        status TEXT DEFAULT 'active', -- active, revoked
        last_used_at TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- MCA Automation Jobs
      CREATE TABLE IF NOT EXISTS mca_automation_jobs (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        user_name TEXT,
        client_id TEXT,
        client_name TEXT NOT NULL,
        form_code TEXT NOT NULL,
        form_name TEXT NOT NULL,
        status TEXT DEFAULT 'completed', -- completed, failed, running, pending
        fields_detected INTEGER DEFAULT 0,
        fields_filled INTEGER DEFAULT 0,
        validation_status TEXT DEFAULT 'PASSED', -- PASSED, WARNING, FAILED
        duration_ms INTEGER DEFAULT 1420,
        error_message TEXT,
        started_at TEXT DEFAULT CURRENT_TIMESTAMP,
        completed_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- Mapping Rules
      CREATE TABLE IF NOT EXISTS mapping_rules (
        id TEXT PRIMARY KEY,
        site_pattern TEXT NOT NULL,
        form_name TEXT,
        dom_selector TEXT,
        dom_name TEXT,
        dom_id TEXT,
        label_pattern TEXT,
        target_path TEXT NOT NULL,
        confidence_boost REAL DEFAULT 1.0,
        is_verified INTEGER DEFAULT 1,
        created_by TEXT DEFAULT 'user',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- Site Profiles
      CREATE TABLE IF NOT EXISTS site_profiles (
        id TEXT PRIMARY KEY,
        code TEXT UNIQUE,
        name TEXT NOT NULL,
        description TEXT,
        url_patterns TEXT,
        signature_keywords TEXT,
        typical_field_count INTEGER,
        version TEXT DEFAULT '1.0.0',
        status TEXT DEFAULT 'GA', -- GA, BETA, UPCOMING
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- Audit Logs
      CREATE TABLE IF NOT EXISTS audit_logs (
        id TEXT PRIMARY KEY,
        workspace_id TEXT,
        user_id TEXT,
        user_email TEXT,
        action TEXT NOT NULL,
        resource_type TEXT,
        resource_id TEXT,
        details_json TEXT,
        ip_address TEXT DEFAULT '127.0.0.1',
        timestamp TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- Support Tickets
      CREATE TABLE IF NOT EXISTS support_tickets (
        id TEXT PRIMARY KEY,
        workspace_id TEXT,
        user_id TEXT NOT NULL,
        user_name TEXT,
        user_email TEXT,
        subject TEXT NOT NULL,
        priority TEXT DEFAULT 'Medium', -- Low, Medium, High, Urgent
        status TEXT DEFAULT 'Open', -- Open, In Progress, Resolved
        message TEXT NOT NULL,
        admin_reply TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- System Settings
      CREATE TABLE IF NOT EXISTS system_settings (
        key TEXT PRIMARY KEY,
        value_json TEXT NOT NULL,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- Indexes
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_clients_cin ON clients(cin);
      CREATE INDEX IF NOT EXISTS idx_clients_ws ON clients(workspace_id);
      CREATE INDEX IF NOT EXISTS idx_jobs_ws ON mca_automation_jobs(workspace_id);
      CREATE INDEX IF NOT EXISTS idx_audit_ws ON audit_logs(workspace_id);
    `);
  }

  seedAll() {
    this.seedClients();
    this.seedProfiles();
    this.seedPlans();
    this.seedUsersAndWorkspaces();
    this.seedSampleData();
  }

  seedClients() {
    const countRow = this.db.prepare("SELECT count(*) as count FROM clients").get();
    if (countRow.count === 0) {
      const insert = this.db.prepare(`
        INSERT INTO clients (id, workspace_id, client_code, legal_name, cin, class_of_company, status, data_json)
        VALUES (?, 'ws_company_1', ?, ?, ?, ?, ?, ?)
      `);

      for (const client of clients) {
        insert.run(
          client.id,
          client.client_code,
          client.company.legal_name,
          client.company.cin || client.company.llpin,
          client.company.class_of_company,
          client.company.status,
          JSON.stringify(client)
        );
      }
    }
  }

  seedProfiles() {
    const profileCount = this.db.prepare("SELECT count(*) as count FROM site_profiles").get();
    if (profileCount.count === 0) {
      const insertProfile = this.db.prepare(`
        INSERT INTO site_profiles (id, code, name, description, url_patterns, signature_keywords, typical_field_count, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const profile of MCA_FORM_PROFILES) {
        insertProfile.run(
          profile.id,
          profile.code,
          profile.name,
          profile.description,
          JSON.stringify(profile.urlPatterns),
          JSON.stringify(profile.signatureKeywords),
          profile.typicalFieldCount,
          profile.code === "SPICE_PLUS" || profile.code === "DIR_12" || profile.code === "AOC_4" ? "GA" : "BETA"
        );
      }
    }
  }

  seedPlans() {
    const planCount = this.db.prepare("SELECT count(*) as count FROM plans").get();
    if (planCount.count === 0) {
      const insert = this.db.prepare(`
        INSERT INTO plans (id, code, name, description, monthly_price, annual_price, max_users, max_automations, features_json, supported_forms_json, is_active, is_visible, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?)
      `);

      insert.run(
        "plan_individual",
        "individual",
        "Individual Professional",
        "Engineered for solo Chartered Accountants, Company Secretaries & independent filing practitioners.",
        1499,
        999, // ₹999/mo paid annually
        1,
        500,
        JSON.stringify([
          "1 Personal Workspace",
          "Chrome Extension Access (Unlimited browser tabs)",
          "500 MCA Form Automations / month",
          "SPICe+, AOC-4 & DIR-12 full autofill",
          "Client Document Extraction (PDF, Excel)",
          "1 Scoped API Key",
          "Standard Email Support",
          "Real-time Post-fill Statutory Validation"
        ]),
        JSON.stringify(["SPICE_PLUS", "AOC_4", "DIR_12"]),
        1
      );

      insert.run(
        "plan_company",
        "company",
        "CA Firm & Company",
        "Full-powered collaborative environment for growing accounting firms and corporate teams.",
        4999,
        3499, // ₹3499/mo paid annually
        10,
        2500,
        JSON.stringify([
          "Company Workspace with 10 Team Seats",
          "Role-Based Access Control (Admin, Accountant, Operator, Viewer)",
          "Shared Corporate Client Vault",
          "2,500 MCA Form Automations / month",
          "All GA & Beta MCA Forms (SPICe+, AOC-4, DIR-12, MGT-7)",
          "Extension Fleet Management (Pair all employee laptops)",
          "5 Production API Keys & Webhooks",
          "Priority 24/7 Support with SLA",
          "Centralized Audit Log & Activity Trail"
        ]),
        JSON.stringify(["SPICE_PLUS", "AOC_4", "DIR_12", "MGT_7", "ADT_1"]),
        2
      );

      insert.run(
        "plan_enterprise",
        "enterprise",
        "Custom Enterprise",
        "Tailored infrastructure for national CA firms, corporate secretarial networks & high-volume filers.",
        14999,
        11999,
        50,
        10000,
        JSON.stringify([
          "Unlimited Team Members & Scalable Seats",
          "Custom Automation Quotas (10,000+ forms)",
          "Custom Form Schema Mapping on Demand",
          "Dedicated Account Manager & Rapid Onboarding",
          "Custom Single Sign-On (SSO / SAML)",
          "Direct Database Connectors & ERP Sync",
          "Custom SLA with 99.9% Uptime Guarantee",
          "On-Premise / Private Cloud Deployment Options"
        ]),
        JSON.stringify(["SPICE_PLUS", "AOC_4", "DIR_12", "MGT_7", "ADT_1", "SH_7"]),
        3
      );
    }
  }

  seedUsersAndWorkspaces() {
    const userCount = this.db.prepare("SELECT count(*) as count FROM users").get();
    if (userCount.count === 0) {
      const defaultPassword = hashPassword("Germin8@2026");

      // 1. Super Admin
      this.db.prepare(`
        INSERT INTO users (id, email, password_hash, full_name, phone, role, is_platform_admin, active_workspace_id)
        VALUES ('usr_admin', 'admin@germin8.com', ?, 'Vikramaditya Rao', '+91 98200 12345', 'platform_admin', 1, 'ws_admin')
      `).run(defaultPassword);

      this.db.prepare(`
        INSERT INTO workspaces (id, type, name, owner_id)
        VALUES ('ws_admin', 'company', 'Germin8 Platform Operations', 'usr_admin')
      `).run();

      // 2. Company Owner (Apex Corporate Advisory LLP)
      this.db.prepare(`
        INSERT INTO users (id, email, password_hash, full_name, phone, role, is_platform_admin, active_workspace_id)
        VALUES ('usr_owner', 'owner@apexcorp.com', ?, 'CA Rajeshwari Iyer', '+91 98450 78901', 'company_owner', 0, 'ws_company_1')
      `).run(defaultPassword);

      this.db.prepare(`
        INSERT INTO companies (id, name, owner_id, plan_id, max_seats)
        VALUES ('comp_apex', 'Apex Corporate Advisory LLP', 'usr_owner', 'plan_company', 10)
      `).run();

      this.db.prepare(`
        INSERT INTO workspaces (id, type, name, owner_id, company_id)
        VALUES ('ws_company_1', 'company', 'Apex Corporate Advisory LLP', 'usr_owner', 'comp_apex')
      `).run();

      this.db.prepare(`
        INSERT INTO workspace_members (id, workspace_id, user_id, role)
        VALUES ('mem_1', 'ws_company_1', 'usr_owner', 'owner')
      `).run();

      // 3. Company Accountant
      this.db.prepare(`
        INSERT INTO users (id, email, password_hash, full_name, phone, role, is_platform_admin, active_workspace_id)
        VALUES ('usr_accountant', 'accountant@apexcorp.com', ?, 'Amitesh Verma, ACA', '+91 98111 22334', 'accountant', 0, 'ws_company_1')
      `).run(defaultPassword);

      this.db.prepare(`
        INSERT INTO workspace_members (id, workspace_id, user_id, role)
        VALUES ('mem_2', 'ws_company_1', 'usr_accountant', 'accountant')
      `).run();

      // 4. Company Operator
      this.db.prepare(`
        INSERT INTO users (id, email, password_hash, full_name, phone, role, is_platform_admin, active_workspace_id)
        VALUES ('usr_operator', 'operator@apexcorp.com', ?, 'Sneha Kulkarni', '+91 97222 33445', 'operator', 0, 'ws_company_1')
      `).run(defaultPassword);

      this.db.prepare(`
        INSERT INTO workspace_members (id, workspace_id, user_id, role)
        VALUES ('mem_3', 'ws_company_1', 'usr_operator', 'operator')
      `).run();

      // 5. Individual CA Practitioner
      this.db.prepare(`
        INSERT INTO users (id, email, password_hash, full_name, phone, role, is_platform_admin, active_workspace_id)
        VALUES ('usr_individual', 'ca.rajesh@gmail.com', ?, 'CA Rajesh Sharma, FCA', '+91 98999 55667', 'individual', 0, 'ws_ind_1')
      `).run(defaultPassword);

      this.db.prepare(`
        INSERT INTO workspaces (id, type, name, owner_id)
        VALUES ('ws_ind_1', 'individual', 'Sharma & Associates', 'usr_individual')
      `).run();

      this.db.prepare(`
        INSERT INTO workspace_members (id, workspace_id, user_id, role)
        VALUES ('mem_ind_1', 'ws_ind_1', 'usr_individual', 'owner')
      `).run();

      // 6. Subscriptions
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      const nextYearIso = nextYear.toISOString();

      this.db.prepare(`
        INSERT INTO subscriptions (id, workspace_id, user_id, plan_id, status, billing_cycle, current_period_end, automations_used)
        VALUES ('sub_company_1', 'ws_company_1', 'usr_owner', 'plan_company', 'active', 'annual', ?, 342)
      `).run(nextYearIso);

      this.db.prepare(`
        INSERT INTO subscriptions (id, workspace_id, user_id, plan_id, status, billing_cycle, current_period_end, automations_used)
        VALUES ('sub_ind_1', 'ws_ind_1', 'usr_individual', 'plan_individual', 'active', 'monthly', ?, 84)
      `).run(nextYearIso);

      // 7. Payments
      this.db.prepare(`
        INSERT INTO payments (id, subscription_id, workspace_id, user_id, amount, currency, status, invoice_number)
        VALUES ('pay_1', 'sub_company_1', 'ws_company_1', 'usr_owner', 41988, 'INR', 'success', 'INV-2026-0042')
      `).run();

      this.db.prepare(`
        INSERT INTO payments (id, subscription_id, workspace_id, user_id, amount, currency, status, invoice_number)
        VALUES ('pay_2', 'sub_ind_1', 'ws_ind_1', 'usr_individual', 1499, 'INR', 'success', 'INV-2026-0089')
      `).run();

      // 8. Extension Paired Devices
      this.db.prepare(`
        INSERT INTO extension_devices (id, workspace_id, user_id, device_name, extension_token, extension_version, browser_info, status)
        VALUES ('dev_1', 'ws_company_1', 'usr_owner', 'MacBook Pro 16" (Chrome 128)', 'g8_ext_token_apex_2026', '2.5.0', 'Google Chrome 128.0.0.0 on macOS', 'paired')
      `).run();

      // 9. API Credentials
      const secret = "g8_live_sk_apexcorp_98234710293847";
      const hashed = crypto.createHash("sha256").update(secret).digest("hex");
      this.db.prepare(`
        INSERT INTO api_credentials (id, workspace_id, user_id, name, key_prefix, hashed_secret, permissions_json)
        VALUES ('cred_1', 'ws_company_1', 'usr_owner', 'Production ERP Webhook Key', 'g8_live_sk_apex...', ?, ?)
      `).run(hashed, JSON.stringify(["clients:read", "automation:execute", "logs:read"]));
    }
  }

  seedSampleData() {
    const jobCount = this.db.prepare("SELECT count(*) as count FROM mca_automation_jobs").get();
    if (jobCount.count === 0) {
      const sampleJobs = [
        {
          id: "job_1001",
          workspace_id: "ws_company_1",
          user_id: "usr_owner",
          user_name: "CA Rajeshwari Iyer",
          client_id: "client_technova_001",
          client_name: "TECHNOVA SOLUTIONS INDIA PRIVATE LIMITED",
          form_code: "SPICE_PLUS",
          form_name: "SPICe+ Part B (Company Incorporation)",
          status: "completed",
          fields_detected: 17,
          fields_filled: 17,
          validation_status: "PASSED",
          duration_ms: 1240,
          started_at: "2026-11-09 10:15:00"
        },
        {
          id: "job_1002",
          workspace_id: "ws_company_1",
          user_id: "usr_accountant",
          user_name: "Amitesh Verma, ACA",
          client_id: "client_apex_002",
          client_name: "APEX GLOBAL MANUFACTURING LIMITED",
          form_code: "DIR_12",
          form_name: "DIR-12 (Appointment of Directors)",
          status: "completed",
          fields_detected: 12,
          fields_filled: 12,
          validation_status: "PASSED",
          duration_ms: 890,
          started_at: "2026-11-09 11:42:00"
        },
        {
          id: "job_1003",
          workspace_id: "ws_company_1",
          user_id: "usr_operator",
          user_name: "Sneha Kulkarni",
          client_id: "client_green_003",
          client_name: "GREENHORIZON AGRI-VENTURES LLP",
          form_code: "AOC_4",
          form_name: "AOC-4 (Financial Statements Filing)",
          status: "completed",
          fields_detected: 24,
          fields_filled: 24,
          validation_status: "PASSED",
          duration_ms: 1820,
          started_at: "2026-11-09 14:05:00"
        },
        {
          id: "job_1004",
          workspace_id: "ws_company_1",
          user_id: "usr_operator",
          user_name: "Sneha Kulkarni",
          client_id: "client_technova_001",
          client_name: "TECHNOVA SOLUTIONS INDIA PRIVATE LIMITED",
          form_code: "MGT_7",
          form_name: "MGT-7 (Annual Return)",
          status: "completed",
          fields_detected: 19,
          fields_filled: 19,
          validation_status: "PASSED",
          duration_ms: 1350,
          started_at: "2026-11-09 16:30:00"
        }
      ];

      const stmt = this.db.prepare(`
        INSERT INTO mca_automation_jobs 
        (id, workspace_id, user_id, user_name, client_id, client_name, form_code, form_name, status, fields_detected, fields_filled, validation_status, duration_ms, started_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const j of sampleJobs) {
        stmt.run(j.id, j.workspace_id, j.user_id, j.user_name, j.client_id, j.client_name, j.form_code, j.form_name, j.status, j.fields_detected, j.fields_filled, j.validation_status, j.duration_ms, j.started_at);
      }

      // Seed audit logs
      this.addAuditLog({
        workspace_id: "ws_company_1",
        user_id: "usr_owner",
        user_email: "owner@apexcorp.com",
        action: "EXTENSION_PAIRED",
        resource_type: "extension_device",
        resource_id: "dev_1",
        details: { device: 'MacBook Pro 16"', browser: "Chrome 128" }
      });
      this.addAuditLog({
        workspace_id: "ws_company_1",
        user_id: "usr_owner",
        user_email: "owner@apexcorp.com",
        action: "AUTOMATION_EXECUTED",
        resource_type: "form_fill",
        resource_id: "job_1001",
        details: { form: "SPICe+ Part B", client: "TECHNOVA SOLUTIONS", fields: 17 }
      });
    }
  }

  // --- Auth & Users ---
  getUserByEmail(email) {
    return this.db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase().trim());
  }

  getUserById(id) {
    return this.db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  }

  createUser(userData) {
    const id = userData.id || `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const hash = userData.password ? hashPassword(userData.password) : userData.password_hash;
    const stmt = this.db.prepare(`
      INSERT INTO users (id, email, password_hash, full_name, phone, role, is_platform_admin, active_workspace_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      userData.email.toLowerCase().trim(),
      hash,
      userData.full_name,
      userData.phone || "",
      userData.role || "individual",
      userData.is_platform_admin ? 1 : 0,
      userData.active_workspace_id || ""
    );
    return this.getUserById(id);
  }

  getWorkspaceById(id) {
    return this.db.prepare("SELECT * FROM workspaces WHERE id = ?").get(id);
  }

  createWorkspace(ws) {
    const id = ws.id || `ws_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    this.db.prepare(`
      INSERT INTO workspaces (id, type, name, owner_id, company_id)
      VALUES (?, ?, ?, ?, ?)
    `).run(id, ws.type, ws.name, ws.owner_id, ws.company_id || null);
    return this.getWorkspaceById(id);
  }

  getWorkspaceMembers(workspaceId) {
    return this.db.prepare(`
      SELECT wm.id, wm.workspace_id, wm.user_id, wm.role, wm.status, wm.created_at,
             u.email, u.full_name, u.phone
      FROM workspace_members wm
      JOIN users u ON u.id = wm.user_id
      WHERE wm.workspace_id = ?
      ORDER BY wm.created_at ASC
    `).all(workspaceId);
  }

  addWorkspaceMember(workspaceId, userId, role = "accountant") {
    const id = `mem_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    this.db.prepare(`
      INSERT OR REPLACE INTO workspace_members (id, workspace_id, user_id, role, status)
      VALUES (?, ?, ?, ?, 'active')
    `).run(id, workspaceId, userId, role);
    return { id, workspaceId, userId, role };
  }

  removeWorkspaceMember(workspaceId, userId) {
    return this.db.prepare("DELETE FROM workspace_members WHERE workspace_id = ? AND user_id = ?").run(workspaceId, userId);
  }

  // --- Plans & Subscriptions ---
  getPlans() {
    const rows = this.db.prepare("SELECT * FROM plans WHERE is_visible = 1 ORDER BY sort_order ASC").all();
    return rows.map(r => ({
      ...r,
      features: JSON.parse(r.features_json),
      supported_forms: JSON.parse(r.supported_forms_json)
    }));
  }

  getPlanById(id) {
    const r = this.db.prepare("SELECT * FROM plans WHERE id = ? OR code = ?").get(id, id);
    if (!r) return null;
    return {
      ...r,
      features: JSON.parse(r.features_json),
      supported_forms: JSON.parse(r.supported_forms_json)
    };
  }

  updatePlan(id, planData) {
    const stmt = this.db.prepare(`
      UPDATE plans 
      SET monthly_price = ?, annual_price = ?, max_users = ?, max_automations = ?,
          features_json = ?, supported_forms_json = ?, is_active = ?, is_visible = ?
      WHERE id = ? OR code = ?
    `);
    stmt.run(
      planData.monthly_price,
      planData.annual_price,
      planData.max_users,
      planData.max_automations,
      JSON.stringify(planData.features || []),
      JSON.stringify(planData.supported_forms || []),
      planData.is_active ? 1 : 0,
      planData.is_visible ? 1 : 0,
      id,
      id
    );
    return this.getPlanById(id);
  }

  getWorkspaceSubscription(workspaceId) {
    const row = this.db.prepare(`
      SELECT s.*, p.name as plan_name, p.code as plan_code, p.max_users, p.max_automations, p.features_json, p.supported_forms_json
      FROM subscriptions s
      JOIN plans p ON p.id = s.plan_id
      WHERE s.workspace_id = ?
      ORDER BY s.created_at DESC
      LIMIT 1
    `).get(workspaceId);

    if (!row) return null;
    return {
      ...row,
      features: JSON.parse(row.features_json),
      supported_forms: JSON.parse(row.supported_forms_json)
    };
  }

  createSubscription(sub) {
    const id = sub.id || `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const end = new Date();
    if (sub.billing_cycle === "annual") {
      end.setFullYear(end.getFullYear() + 1);
    } else {
      end.setMonth(end.getMonth() + 1);
    }

    this.db.prepare(`
      INSERT OR REPLACE INTO subscriptions 
      (id, workspace_id, user_id, plan_id, status, billing_cycle, current_period_end)
      VALUES (?, ?, ?, ?, 'active', ?, ?)
    `).run(id, sub.workspace_id, sub.user_id, sub.plan_id, sub.billing_cycle || "monthly", end.toISOString());

    return this.getWorkspaceSubscription(sub.workspace_id);
  }

  // --- Payments & Invoices ---
  recordPayment(payment) {
    const id = payment.id || `pay_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const invoice_number = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    this.db.prepare(`
      INSERT INTO payments (id, subscription_id, workspace_id, user_id, amount, currency, status, payment_gateway, razorpay_order_id, razorpay_payment_id, invoice_number)
      VALUES (?, ?, ?, ?, ?, ?, 'success', 'Razorpay', ?, ?, ?)
    `).run(
      id,
      payment.subscription_id || null,
      payment.workspace_id,
      payment.user_id,
      payment.amount,
      payment.currency || "INR",
      payment.razorpay_order_id || `order_${Date.now()}`,
      payment.razorpay_payment_id || `pay_rzp_${Date.now()}`,
      invoice_number
    );
    return { id, invoice_number, ...payment, status: "success" };
  }

  getWorkspaceInvoices(workspaceId) {
    return this.db.prepare(`
      SELECT * FROM payments WHERE workspace_id = ? ORDER BY created_at DESC
    `).all(workspaceId);
  }

  // --- Clients ---
  getClients(query = "", workspaceId = null) {
    let sql = "SELECT id, workspace_id, client_code, legal_name, cin, class_of_company, status FROM clients";
    const params = [];
    const conditions = [];

    if (workspaceId) {
      conditions.push("workspace_id = ?");
      params.push(workspaceId);
    }

    if (query) {
      conditions.push("(legal_name LIKE ? OR cin LIKE ? OR client_code LIKE ?)");
      const term = `%${query.trim()}%`;
      params.push(term, term, term);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }
    sql += " ORDER BY legal_name ASC";

    return this.db.prepare(sql).all(...params);
  }

  getClientById(id) {
    const row = this.db.prepare("SELECT data_json FROM clients WHERE id = ? OR client_code = ? OR cin = ?").get(id, id, id);
    if (!row) return null;
    return JSON.parse(row.data_json);
  }

  saveClient(client, workspaceId = "ws_company_1") {
    const id = client.id || `cli_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const client_code = client.client_code || `G8-${Math.floor(1000 + Math.random() * 9000)}`;
    const legal_name = client.company?.legal_name || client.legal_name || "Unnamed Client";
    const cin = client.company?.cin || client.company?.llpin || client.cin || "";
    const class_of_company = client.company?.class_of_company || client.class_of_company || "Private";
    const status = client.company?.status || client.status || "Active";

    const fullClient = {
      id,
      client_code,
      workspace_id: workspaceId,
      company: {
        legal_name,
        cin,
        class_of_company,
        status,
        ...(client.company || {}),
        registered_address: client.company?.registered_address || {
          address_line_1: client.address_line_1 || "Plot 42, Bandra-Kurla Complex",
          address_line_2: client.address_line_2 || "Bandra East",
          city: client.city || "Mumbai",
          state: client.state || "Maharashtra",
          pin_code: client.pin_code || "400051"
        },
        financial_profile: client.company?.financial_profile || {
          financial_year_from: "2023-04-01",
          financial_year_to: "2024-03-31",
          turnover: client.turnover || 15000000,
          net_profit: client.net_profit || 2800000
        }
      },
      directors: client.directors || [
        { din: "08472910", name: "Rajesh Kumar Sharma", designation: "Director", appointment_date: "2018-04-12" },
        { din: "07918234", name: "Priya Ramesh Mehta", designation: "Director", appointment_date: "2018-04-12" }
      ]
    };

    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO clients 
      (id, workspace_id, client_code, legal_name, cin, class_of_company, status, data_json, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);
    stmt.run(id, workspaceId, client_code, legal_name, cin, class_of_company, status, JSON.stringify(fullClient));
    return fullClient;
  }

  deleteClient(id) {
    return this.db.prepare("DELETE FROM clients WHERE id = ?").run(id);
  }

  // --- Chrome Extension Pairing ---
  generatePairingCode(workspaceId, userId, deviceName = "Chrome Browser") {
    // Generate 6-char alphanumeric uppercase code
    const code = crypto.randomBytes(3).toString("hex").toUpperCase();
    const id = `dev_${Date.now()}`;
    const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

    this.db.prepare(`
      INSERT OR REPLACE INTO extension_devices 
      (id, workspace_id, user_id, device_name, pairing_code, code_expires_at, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `).run(id, workspaceId, userId, deviceName, code, expires);

    return { deviceId: id, pairingCode: code, expiresAt: expires };
  }

  exchangePairingCode(code, clientInfo = {}) {
    const row = this.db.prepare(`
      SELECT * FROM extension_devices 
      WHERE pairing_code = ? AND status = 'pending'
    `).get(code.toUpperCase().trim());

    if (!row) {
      return { success: false, error: "Invalid pairing code" };
    }

    if (new Date(row.code_expires_at) < new Date()) {
      return { success: false, error: "Pairing code has expired. Please generate a new code from your dashboard." };
    }

    const token = `g8_ext_${crypto.randomBytes(24).toString("hex")}`;
    this.db.prepare(`
      UPDATE extension_devices 
      SET status = 'paired', extension_token = ?, extension_version = ?, browser_info = ?, pairing_code = NULL, last_ping_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(token, clientInfo.version || "2.5.0", clientInfo.browser || "Chrome", row.id);

    return {
      success: true,
      extensionToken: token,
      deviceId: row.id,
      workspaceId: row.workspace_id,
      userId: row.user_id
    };
  }

  getWorkspaceDevices(workspaceId) {
    return this.db.prepare("SELECT * FROM extension_devices WHERE workspace_id = ? ORDER BY created_at DESC").all(workspaceId);
  }

  revokeDevice(deviceId) {
    return this.db.prepare("UPDATE extension_devices SET status = 'revoked', extension_token = NULL WHERE id = ?").run(deviceId);
  }

  // --- API Credentials ---
  createApiCredential(workspaceId, userId, name, permissions = ["clients:read", "automation:execute"]) {
    const id = `cred_${Date.now()}`;
    const secret = `g8_live_sk_${crypto.randomBytes(24).toString("hex")}`;
    const prefix = `${secret.substring(0, 14)}...`;
    const hashed = crypto.createHash("sha256").update(secret).digest("hex");

    this.db.prepare(`
      INSERT INTO api_credentials (id, workspace_id, user_id, name, key_prefix, hashed_secret, permissions_json)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, workspaceId, userId, name, prefix, hashed, JSON.stringify(permissions));

    return {
      id,
      name,
      prefix,
      secret, // returned ONLY once at creation
      permissions
    };
  }

  getApiCredentials(workspaceId) {
    const rows = this.db.prepare("SELECT id, name, key_prefix, permissions_json, status, last_used_at, created_at FROM api_credentials WHERE workspace_id = ? ORDER BY created_at DESC").all(workspaceId);
    return rows.map(r => ({
      ...r,
      permissions: JSON.parse(r.permissions_json)
    }));
  }

  revokeApiCredential(id) {
    return this.db.prepare("UPDATE api_credentials SET status = 'revoked' WHERE id = ?").run(id);
  }

  // --- Automation Jobs ---
  createJob(job) {
    const id = job.id || `job_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;
    this.db.prepare(`
      INSERT INTO mca_automation_jobs 
      (id, workspace_id, user_id, user_name, client_id, client_name, form_code, form_name, status, fields_detected, fields_filled, validation_status, duration_ms, error_message)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      job.workspace_id,
      job.user_id,
      job.user_name || "Operator",
      job.client_id || null,
      job.client_name,
      job.form_code,
      job.form_name,
      job.status || "completed",
      job.fields_detected || 0,
      job.fields_filled || 0,
      job.validation_status || "PASSED",
      job.duration_ms || 1200,
      job.error_message || null
    );

    // Increment subscription usage
    this.db.prepare(`
      UPDATE subscriptions SET automations_used = automations_used + 1 WHERE workspace_id = ?
    `).run(job.workspace_id);

    return this.getJobById(id);
  }

  getJobById(id) {
    return this.db.prepare("SELECT * FROM mca_automation_jobs WHERE id = ?").get(id);
  }

  getJobs(workspaceId = null, limit = 50) {
    if (workspaceId) {
      return this.db.prepare("SELECT * FROM mca_automation_jobs WHERE workspace_id = ? ORDER BY started_at DESC LIMIT ?").all(workspaceId, limit);
    }
    return this.db.prepare("SELECT * FROM mca_automation_jobs ORDER BY started_at DESC LIMIT ?").all(limit);
  }

  // --- Platform Admin Aggregations ---
  getPlatformStats() {
    const totalUsers = this.db.prepare("SELECT count(*) as count FROM users").get().count;
    const totalCompanies = this.db.prepare("SELECT count(*) as count FROM companies").get().count;
    const activeSubs = this.db.prepare("SELECT count(*) as count FROM subscriptions WHERE status = 'active'").get().count;
    const totalJobs = this.db.prepare("SELECT count(*) as count FROM mca_automation_jobs").get().count;
    const completedJobs = this.db.prepare("SELECT count(*) as count FROM mca_automation_jobs WHERE status = 'completed'").get().count;
    const activeDevices = this.db.prepare("SELECT count(*) as count FROM extension_devices WHERE status = 'paired'").get().count;

    // Monthly Recurring Revenue estimate
    const subRows = this.db.prepare(`
      SELECT p.monthly_price, p.annual_price, s.billing_cycle 
      FROM subscriptions s
      JOIN plans p ON p.id = s.plan_id
      WHERE s.status = 'active'
    `).all();

    let mrr = 0;
    for (const s of subRows) {
      if (s.billing_cycle === "annual") {
        mrr += Math.round(s.annual_price);
      } else {
        mrr += s.monthly_price;
      }
    }

    return {
      totalUsers,
      totalCompanies,
      activeSubscriptions: activeSubs,
      totalJobs,
      completedJobs,
      successRate: totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 99,
      activeDevices,
      mrr,
      annualRunRate: mrr * 12
    };
  }

  getAllUsers() {
    return this.db.prepare(`
      SELECT u.id, u.email, u.full_name, u.phone, u.role, u.is_platform_admin, u.status, u.created_at,
             w.name as workspace_name, w.type as workspace_type,
             s.status as subscription_status, p.name as plan_name
      FROM users u
      LEFT JOIN workspaces w ON w.id = u.active_workspace_id
      LEFT JOIN subscriptions s ON s.workspace_id = u.active_workspace_id
      LEFT JOIN plans p ON p.id = s.plan_id
      ORDER BY u.created_at DESC
    `).all();
  }

  setUserStatus(userId, status) {
    return this.db.prepare("UPDATE users SET status = ? WHERE id = ?").run(status, userId);
  }

  // --- Audit Logs ---
  addAuditLog(log) {
    const id = log.id || `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const stmt = this.db.prepare(`
      INSERT INTO audit_logs 
      (id, workspace_id, user_id, user_email, action, resource_type, resource_id, details_json, ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      log.workspace_id || null,
      log.user_id || null,
      log.user_email || "system",
      log.action,
      log.resource_type || "general",
      log.resource_id || "",
      JSON.stringify(log.details || {}),
      log.ip_address || "127.0.0.1"
    );
    return { id, ...log };
  }

  getAuditLogs(limit = 50, workspaceId = null) {
    let rows;
    if (workspaceId) {
      rows = this.db.prepare("SELECT * FROM audit_logs WHERE workspace_id = ? ORDER BY timestamp DESC LIMIT ?").all(workspaceId, limit);
    } else {
      rows = this.db.prepare("SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT ?").all(limit);
    }
    return rows.map(r => ({
      ...r,
      details: r.details_json ? JSON.parse(r.details_json) : null
    }));
  }

  // --- Mapping Rules ---
  saveMappingRule(rule) {
    const id = rule.id || `rule_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO mapping_rules 
      (id, site_pattern, form_name, dom_selector, dom_name, dom_id, label_pattern, target_path, confidence_boost, is_verified, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      rule.site_pattern || "*",
      rule.form_name || "",
      rule.dom_selector || "",
      rule.dom_name || "",
      rule.dom_id || "",
      rule.label_pattern || "",
      rule.target_path,
      rule.confidence_boost || 1.0,
      rule.is_verified ? 1 : 0,
      rule.created_by || "user"
    );
    return { id, ...rule };
  }

  getMappingRules(formName = "") {
    if (formName) {
      return this.db.prepare("SELECT * FROM mapping_rules WHERE form_name = ? OR form_name = ''").all(formName);
    }
    return this.db.prepare("SELECT * FROM mapping_rules ORDER BY created_at DESC").all();
  }

  deleteMappingRule(id) {
    return this.db.prepare("DELETE FROM mapping_rules WHERE id = ?").run(id);
  }

  getSiteProfiles() {
    const rows = this.db.prepare("SELECT * FROM site_profiles ORDER BY name ASC").all();
    return rows.map(r => ({
      ...r,
      urlPatterns: r.url_patterns ? JSON.parse(r.url_patterns) : [],
      signatureKeywords: r.signature_keywords ? JSON.parse(r.signature_keywords) : []
    }));
  }
}

export const dbInstance = new Germin8Database();
