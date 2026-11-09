# Germin8 â€” MCA Automation SaaS Platform

> **Deterministic, Zero-Defect Statutory Compliance for Indian CA Firms & Corporate Secretariats.**

Germin8 is an end-to-end MCA (Ministry of Corporate Affairs) automation platform engineered to streamline statutory filings (SPICe+ Part B, Form AOC-4, Form DIR-12, Form MGT-7/7A, Form ADT-1) on the MCA V3 portal in **1.2 seconds**.

---

## ðŸ›ï¸ System Architecture

`
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                        GERMIN8 ARCHITECTURE                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

  [ Client Entity Data Vault ]           [ Chartered Accountant / CS ]
              â”‚                                        â”‚
              â–¼                                        â–¼
    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”                     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
    â”‚ Central REST API  â”‚ â—„â”€â”€â”€ Ephemeral â”€â”€â”€â”€â–ºâ”‚ Germin8 Extensionâ”‚
    â”‚  & SQLite Engine  â”‚      Pairing PIN    â”‚  (Manifest v3)   â”‚
    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜                     â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
              â”‚                                        â”‚ Direct DOM Injection
              â–¼                                        â–¼ (1.2s prototype setter)
    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”                     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
    â”‚  Razorpay Billing â”‚                     â”‚  mca.gov.in (V3) â”‚
    â”‚   & RBAC Audit    â”‚                     â”‚  Statutory Forms â”‚
    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜                     â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                                       â”‚
                                                       â–¼ Human Verification
                                              â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                                              â”‚ USB DSC Token    â”‚
                                              â”‚ Final Legal Sign â”‚
                                              â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
`

---

## âœ¨ Core Highlights

- **Pure White Enterprise Design System**: Modern, crisp, accessible typography (Inter / Geist), subtle glassmorphism, and Recharts interactive telemetry.
- **27 Pre-Rendered Next.js 16 Routes**:
  - **Marketing**: /, /product, /solutions, /how-it-works, /pricing, /about, /security, /resources, /contact, /faq, /privacy, /terms.
  - **Customer Workspace**: /app/dashboard, /app/automation, /app/clients, /app/extension, /app/team, /app/subscription, /app/billing, /app/history, /app/api-credentials, /app/analytics, /app/settings.
  - **Super Admin**: /platform-admin (MRR, tenant quotas, device telemetry, forensic SHA-256 audit logs).
- **Direct DOM Prototype Ingestion**: Cleanly triggers synthetic Angular reactive form states on MCA V3 without input freezes.
- **Zero-Trust Security**: Ephemeral 6-digit rolling PINs connect browser extensions; zero portal passwords or Digital Signature (DSC) private keys ever touch external servers.
- **Comprehensive Test Coverage**: 52 automated tests (100% passing across SaaS platform and Form Automation Engine).

---

## ðŸš€ Quick Start

### 1. Web Application (Next.js 16 + React 19 + Tailwind v4)
`ash
cd web
pnpm install
pnpm run build
pnpm run start -p 3000
`
Open [http://localhost:3000](http://localhost:3000)

### 2. Backend Engine & API Server (Node.js + SQLite)
`ash
cd engine
node backend/src/server.js
`
API & Engine running at [http://localhost:4567](http://localhost:4567)

### 3. Load Chrome Extension
1. Open Google Chrome and navigate to chrome://extensions/
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the extension/ directory from this repository
5. Click the Germin8 puzzle piece icon and pair via the 6-character code from your dashboard

---

## ðŸ§ª Running Verification Tests
`ash
# Run SaaS Platform suite (27 tests)
node tests/test-saas-platform.js

# Run Form Automation Engine suite (25 tests)
node tests/test-end-to-end.js
`

---

## ðŸ“„ License
Commercial Software. Â© 2026 Germin8 Technologies Private Limited.
