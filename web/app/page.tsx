"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, ShieldCheck, Zap, Lock, ChevronDown, ChevronUp, 
  FileText, CheckCircle2, Laptop, Users, Database, LayoutDashboard, 
  Terminal, Building2, Key, Cpu, HelpCircle, Sparkles, BarChart3,
  Clock, ShieldAlert, Award, FileSpreadsheet, Server
} from "lucide-react";
import HeroVisual from "@/components/HeroVisual";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedForm, setSelectedForm] = useState<string>("spice");
  const [clientCount, setClientCount] = useState<number>(50);

  const supportedForms = [
    {
      id: "spice",
      name: "SPICe+ Part B",
      subtitle: "Rule 38 — Company Incorporation",
      fields: 17,
      avgManualTime: "45 mins",
      germin8Time: "1.2 secs",
      description: "Complete incorporation bundle including name verification, PAN/TAN application, EPFO/ESIC registrations, and bank account setup.",
      tags: ["MCA V3 Compatible", "DIN Allocation", "MOA/AOA Tagging"]
    },
    {
      id: "aoc4",
      name: "Form AOC-4",
      subtitle: "Section 137 — Financial Statements & XBRL",
      fields: 28,
      avgManualTime: "90 mins",
      germin8Time: "2.4 secs",
      description: "Direct mapping of Balance Sheet schedules, Profit & Loss items, Auditor Report particulars, and CSR reporting schedules without XBRL errors.",
      tags: ["Schedule III Audited", "CARO 2020", "P&L Balance Sync"]
    },
    {
      id: "dir12",
      name: "Form DIR-12",
      subtitle: "Section 170 — Director & KMP Appointments",
      fields: 14,
      avgManualTime: "30 mins",
      germin8Time: "0.9 secs",
      description: "Instant biometric DIN lookup and board resolution mapping for adding, changing designation, or recording cessation of company directors.",
      tags: ["DIN Biometric Match", "Board Resolution Sync", "Instant Scrutiny"]
    },
    {
      id: "mgt7",
      name: "Form MGT-7 / 7A",
      subtitle: "Section 92 — Annual Returns of Companies",
      fields: 32,
      avgManualTime: "75 mins",
      germin8Time: "2.1 secs",
      description: "Automated shareholding pattern calculation, debenture holdings, indebtedness registers, and promoter holding reconciliation.",
      tags: ["Shareholding Regex", "Small Co. Exemption", "ROC Jurisdictional"]
    },
    {
      id: "adt1",
      name: "Form ADT-1",
      subtitle: "Section 139 — Auditor Appointment",
      fields: 11,
      avgManualTime: "25 mins",
      germin8Time: "0.8 secs",
      description: "Statutory filing for appointment of sole auditor or audit firm with automatic Firm Registration Number (FRN) validation and tenure tracking.",
      tags: ["FRN Validation", "5-Year Tenure Check", "Casual Vacancy"]
    }
  ];

  const faqs = [
    {
      q: "Does Germin8 ever require or store my official MCA portal password?",
      a: "No, never. Germin8 operates on a strict zero-trust model. You log into mca.gov.in yourself as you normally do. Our companion extension pairs via a 10-minute ephemeral 6-digit PIN and interacts exclusively with the rendered form DOM elements inside your active browser session."
    },
    {
      q: "Will Germin8 automatically submit filings or attach my Digital Signature (DSC)?",
      a: "No. Final submission and Digital Signature Certificate (DSC) attachment remain strictly in your human hands. Germin8 handles the tedious 90-minute repetitive data entry; you verify the fields on screen and attach your physical USB token to execute the legal filing."
    },
    {
      q: "How does Germin8 overcome Angular reactive form state bugs on MCA V3?",
      a: "MCA V3 forms are built on an Angular single-page framework that ignores standard JavaScript element.value mutations. Germin8 utilizes direct prototype property setters followed by synthetic dispatch of native input, change, and blur events, cleanly triggering Angular's internal dirty states without form freezes."
    },
    {
      q: "Can I manage multiple clients and assign different staff members in one firm account?",
      a: "Yes. Our Corporate CA Firm plan includes a 10-seat workspace with granular Role-Based Access Control (Partner Admin, Senior Reviewer, Associate Preparer, Read-Only Auditor) and an encrypted central vault for all your corporate client entities."
    },
    {
      q: "What happens if the MCA portal changes an input field or layout?",
      a: "Our compliance engineering team continuously monitors ROC schema updates. Form selector maps are updated dynamically over the air through our API, so your extension automatically receives updated field maps without needing manual re-installation."
    },
    {
      q: "Is client entity data encrypted in rest and transit?",
      a: "Yes. All corporate records (CIN, DIN, PAN, Authorized Capital) stored in your firm vault are encrypted with AES-256-GCM at rest and communicated via TLS 1.3 in transit. We maintain SOC-2 and ISO 27001 data residency compliance on Indian servers."
    },
    {
      q: "Can multiple team members file returns for different clients simultaneously?",
      a: "Yes. Each paired workstation operates independently. An associate in Mumbai can be autofilling Form AOC-4 for Entity A while an associate in Delhi prepares Form DIR-12 for Entity B simultaneously under the same firm license."
    },
    {
      q: "What is your refund and trial policy?",
      a: "We offer a risk-free 7-day full access trial for CA firms. If you decide not to continue, you can cancel with one click in your billing settings with zero cancellation fees or lock-ins."
    }
  ];

  // Calculation metrics based on client count
  const hoursSaved = Math.round(clientCount * 3.8);
  const costSaved = (clientCount * 1850).toLocaleString("en-IN");
  const formsFiledEstimate = clientCount * 5;

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#171717]">
      
      {/* =====================================================================
          SECTION 1: HERO SECTION — PURE WHITE ARCHITECTURAL
          ===================================================================== */}
      <section className="pt-16 pb-16 bg-white overflow-hidden border-b border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          {/* Small Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8EAED] shadow-xs text-[#171717] text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E5B52B]" />
            <span className="text-[#171717]">MCA AUTOMATION PLATFORM</span>
            <span className="text-[#737373] text-[10px] font-mono pl-1 border-l border-[#E8EAED]">v2.5 READY</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#171717] tracking-tight max-w-4xl mx-auto leading-[1.12]">
            MCA Automation, <br className="hidden sm:inline" />
            <span className="text-[#171717]">Made Simpler.</span>
          </h1>

          {/* Supporting Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-[#737373] max-w-2xl mx-auto leading-relaxed">
            Eliminate repetitive statutory data entry on the MCA V3 portal. Securely coordinate client entities, pre-validate regulatory checksums, and autofill compliance returns in 1.2 seconds.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/pricing" className="btn-primary text-sm w-full sm:w-auto justify-center px-6 py-3">
              <span>Start 7-Day Free Trial</span>
              <ArrowRight className="w-4 h-4 text-[#E5B52B]" />
            </Link>
            <Link href="/app/dashboard" className="btn-secondary text-sm w-full sm:w-auto justify-center px-6 py-3">
              <span>View Interactive Dashboard</span>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#737373]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
              <span>Zero Password Storage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
              <span>Client-Side USB DSC Security</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
              <span>MCA V3 Portal Compatible</span>
            </div>
          </div>

          {/* Crisp Enterprise Browser Mockup */}
          <HeroVisual />

        </div>
      </section>

      {/* =====================================================================
          SECTION 2: PROVEN PERFORMANCE METRICS STRIP (PURE WHITE)
          ===================================================================== */}
      <section className="py-12 bg-white border-b border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#E8EAED]">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">1.2s</div>
              <div className="text-xs font-semibold text-[#737373] mt-1 uppercase tracking-wider">Average Dispatch Velocity</div>
              <p className="text-[11px] text-[#737373] mt-0.5">Bypasses synthetic Angular delays</p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">99.8%</div>
              <div className="text-xs font-semibold text-[#737373] mt-1 uppercase tracking-wider">Pre-Scrutiny Precision</div>
              <p className="text-[11px] text-[#737373] mt-0.5">Zero MCA defect notice rate</p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">45,000+</div>
              <div className="text-xs font-semibold text-[#737373] mt-1 uppercase tracking-wider">Forms Automated</div>
              <p className="text-[11px] text-[#737373] mt-0.5">Across SPICe+, AOC-4, DIR-12, MGT-7</p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">500+</div>
              <div className="text-xs font-semibold text-[#737373] mt-1 uppercase tracking-wider">CA &amp; CS Practices</div>
              <p className="text-[11px] text-[#737373] mt-0.5">Across Mumbai, Delhi, Bengaluru</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: EDITORIAL PRODUCT SHOWCASE WITH REAL ENTERPRISE IMAGERY
          ===================================================================== */}
      <section className="py-20 bg-white border-b border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFF8E5] border border-[#E5B52B]/40 text-[#171717] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5B52B]" />
                <span>Statutory Compliance Architecture</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] leading-tight">
                Designed for the Precision Required by Corporate Laws.
              </h2>

              <p className="text-base text-[#737373] leading-relaxed">
                Filing corporate returns under the Companies Act 2013 is zero-defect work. A single transposed CIN digit or mismatched Director Identification Number (DIN) causes rejected filings and punitive additional ROC fees.
              </p>

              <p className="text-base text-[#737373] leading-relaxed">
                Germin8 gives your team an immutable single source of truth. Your client data vault securely holds verified master entity credentials, dispensing them deterministically into live MCA V3 sessions without human copy-paste errors.
              </p>

              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3 text-sm font-semibold text-[#171717]">
                  <div className="w-5 h-5 rounded-full bg-[#FFF8E5] flex items-center justify-center border border-[#E5B52B]/40">
                    <Check className="w-3 h-3 text-[#171717]" />
                  </div>
                  <span>Instant Cross-Verification against MCA Master Database</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-[#171717]">
                  <div className="w-5 h-5 rounded-full bg-[#FFF8E5] flex items-center justify-center border border-[#E5B52B]/40">
                    <Check className="w-3 h-3 text-[#171717]" />
                  </div>
                  <span>Automated Balance Sheet &amp; P&amp;L Financial Reconciliation</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-[#171717]">
                  <div className="w-5 h-5 rounded-full bg-[#FFF8E5] flex items-center justify-center border border-[#E5B52B]/40">
                    <Check className="w-3 h-3 text-[#171717]" />
                  </div>
                  <span>100% Client-Side DSC Hardware USB Isolation</span>
                </div>
              </div>
            </div>

            {/* Right Rich Visual: Premium Photography with Floating UI Chips */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E8EAED] shadow-xl bg-white">
                
                {/* High-Resolution Professional Workspace Image */}
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
                  alt="Corporate Compliance Professional Team" 
                  className="w-full h-[420px] object-cover"
                />

                {/* Subtle Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Floating Telemetry Card 1 (Top Left) */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E8EAED] shadow-lg max-w-[260px] text-left">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#16A36A] animate-pulse" />
                    <span className="text-[11px] font-bold text-[#171717] uppercase tracking-wider">MCA V3 Active Session</span>
                  </div>
                  <div className="text-xs font-mono font-semibold text-[#171717]">ROC-MUMBAI / SPICe+</div>
                  <div className="text-[10px] text-[#737373] mt-0.5">17 of 17 statutory inputs mapped</div>
                </div>

                {/* Floating Telemetry Card 2 (Bottom Right) */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E8EAED] shadow-lg max-w-[280px] text-left">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="text-[11px] font-bold text-[#171717]">Filing Scrutiny Checksum</span>
                    <span className="bg-[#FFF8E5] text-[#171717] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#E5B52B]/40">PASS</span>
                  </div>
                  <div className="text-xs text-[#737373]">SHA-256 Validated on Client Vault</div>
                  <div className="mt-2 pt-2 border-t border-[#E8EAED] flex items-center justify-between text-[11px]">
                    <span className="text-[#171717] font-semibold">DSC Token Ready</span>
                    <span className="text-[#16A36A] font-bold">1.2s Dispatch</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================================
          SECTION 4: INTERACTIVE SUPPORTED MCA FORMS SHOWCASE (PURE WHITE)
          ===================================================================== */}
      <section className="py-20 bg-white border-b border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <div className="max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#E5B52B] uppercase mb-2 block">
              SUPPORTED STATUTORY WORKFLOWS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              Every Core MCA V3 E-Form in One Workspace
            </h2>
            <p className="text-[#737373] mt-3 text-base">
              Select an official e-form below to inspect its automation architecture and time savings.
            </p>
          </div>

          {/* Form Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {supportedForms.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedForm(f.id)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                  selectedForm === f.id
                    ? "bg-[#171717] text-white shadow-xs"
                    : "bg-white text-[#737373] border border-[#E8EAED] hover:border-[#171717] hover:text-[#171717]"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          {/* Selected Form Detailed Card */}
          {supportedForms.filter(f => f.id === selectedForm).map((active) => (
            <div key={active.id} className="max-w-4xl mx-auto card-white p-8 sm:p-10 text-left border border-[#E8EAED] shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#FFF8E5] text-[#171717] text-xs font-bold border border-[#E5B52B]/40">
                    <FileText className="w-3.5 h-3.5 text-[#E5B52B]" />
                    <span>{active.subtitle}</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#171717]">
                    {active.name} Automation
                  </h3>

                  <p className="text-sm text-[#737373] leading-relaxed">
                    {active.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {active.tags.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-white border border-[#E8EAED] text-xs font-medium text-[#171717]">
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5 bg-white p-6 rounded-xl border border-[#E8EAED] space-y-4">
                  <div className="pb-3 border-b border-[#E8EAED]">
                    <div className="text-[11px] font-bold text-[#737373] uppercase tracking-wider">Statutory Inputs Automated</div>
                    <div className="text-2xl font-black text-[#171717] mt-0.5">{active.fields} Inputs</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#E8EAED]">
                    <div>
                      <div className="text-[10px] font-bold text-[#DC5353] uppercase">Manual Time</div>
                      <div className="text-lg font-bold text-[#171717] line-through text-[#737373]">{active.avgManualTime}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#16A36A] uppercase">Germin8 Speed</div>
                      <div className="text-lg font-black text-[#16A36A]">{active.germin8Time}</div>
                    </div>
                  </div>

                  <Link href="/app/automation" className="btn-primary text-xs w-full justify-center">
                    <span>Test Form Simulator</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E5B52B]" />
                  </Link>
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* =====================================================================
          SECTION 5: 6 CORE ARCHITECTURAL CAPABILITIES (PURE WHITE GRID)
          ===================================================================== */}
      <section className="py-20 bg-white border-b border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#E5B52B] uppercase mb-2 block">
              ENTERPRISE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              Engineered Specifically for Compliance Professionals
            </h2>
            <p className="text-[#737373] mt-3 text-base">
              A cohesive system connecting your client data vault, browser companion, and team workspaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="card-white p-7 text-left border border-[#E8EAED] hover:border-[#171717] transition-all">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8EAED] flex items-center justify-center text-[#171717] mb-5 shadow-2xs">
                <Zap className="w-5 h-5 text-[#E5B52B]" />
              </div>
              <h3 className="text-lg font-bold text-[#171717] mb-2">Direct DOM Property Injection</h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Cleanly bypasses synthetic Angular reactive boundaries on MCA V3 via prototype setter dispatch in 1.2 seconds without form locks.
              </p>
            </div>

            <div className="card-white p-7 text-left border border-[#E8EAED] hover:border-[#171717] transition-all">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8EAED] flex items-center justify-center text-[#171717] mb-5 shadow-2xs">
                <Laptop className="w-5 h-5 text-[#171717]" />
              </div>
              <h3 className="text-lg font-bold text-[#171717] mb-2">Ephemeral Browser Companion</h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Connect your workstations via a secure 6-character rotating OTP. Zero master passwords or MCA portal credentials are ever stored.
              </p>
            </div>

            <div className="card-white p-7 text-left border border-[#E8EAED] hover:border-[#171717] transition-all">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8EAED] flex items-center justify-center text-[#16A36A] mb-5 shadow-2xs">
                <Database className="w-5 h-5 text-[#16A36A]" />
              </div>
              <h3 className="text-lg font-bold text-[#171717] mb-2">Centralized Corporate Vault</h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Store entity CINs, DINs, ROC records, and registered office addresses once in AES-256 encrypted storage, ready for any return.
              </p>
            </div>

            <div className="card-white p-7 text-left border border-[#E8EAED] hover:border-[#171717] transition-all">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8EAED] flex items-center justify-center text-[#16A36A] mb-5 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-[#16A36A]" />
              </div>
              <h3 className="text-lg font-bold text-[#171717] mb-2">Statutory Pre-Scrutiny Checksums</h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Pre-validates PAN regex, DIN length, and PIN codes locally against regulatory rules before injection to guarantee zero defect notices.
              </p>
            </div>

            <div className="card-white p-7 text-left border border-[#E8EAED] hover:border-[#171717] transition-all">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8EAED] flex items-center justify-center text-[#171717] mb-5 shadow-2xs">
                <Users className="w-5 h-5 text-[#171717]" />
              </div>
              <h3 className="text-lg font-bold text-[#171717] mb-2">10-Seat Multi-Role Firm RBAC</h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Assign Partner Admins, Senior Preparers, Reviewers, and Operators with strict client-level access control and team seat quotas.
              </p>
            </div>

            <div className="card-white p-7 text-left border border-[#E8EAED] hover:border-[#171717] transition-all">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8EAED] flex items-center justify-center text-[#4385DF] mb-5 shadow-2xs">
                <Terminal className="w-5 h-5 text-[#4385DF]" />
              </div>
              <h3 className="text-lg font-bold text-[#171717] mb-2">Cryptographic Audit Trail</h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Every form injection event is permanently timestamped with SHA-256 signatures, recording the operator ID, client entity, and field state.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: INTERACTIVE ROI & TIME SAVINGS CALCULATOR (PURE WHITE)
          ===================================================================== */}
      <section className="py-20 bg-white border-b border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-4xl mx-auto card-white p-8 sm:p-12 border border-[#E8EAED] shadow-sm text-left">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold tracking-widest text-[#E5B52B] uppercase mb-2 block">
                PRACTICE IMPACT CALCULATOR
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                Calculate Your Firm's Annual Return ROI
              </h2>
              <p className="text-xs sm:text-sm text-[#737373] mt-2">
                See how much partner and associate billing time your practice recovers each month.
              </p>
            </div>

            {/* Slider Control */}
            <div className="mb-10 max-w-xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                  Active Client Entities Managed:
                </label>
                <span className="text-lg font-black text-[#171717] px-3 py-1 rounded bg-white border border-[#E8EAED]">
                  {clientCount} Entities
                </span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="300" 
                step="5" 
                value={clientCount} 
                onChange={(e) => setClientCount(Number(e.target.value))}
                className="w-full accent-[#171717] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#737373] mt-1">
                <span>10 Entities (Solo Practice)</span>
                <span>150 Entities (Mid-Size Firm)</span>
                <span>300+ Entities (Large Practice)</span>
              </div>
            </div>

            {/* Dynamic Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center pt-4 border-t border-[#E8EAED]">
              <div className="p-4 rounded-xl border border-[#E8EAED] bg-white">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#171717]">{hoursSaved} hrs</div>
                <div className="text-xs font-semibold text-[#737373] mt-1 uppercase tracking-wider">Staff Hours Saved / Mo</div>
                <p className="text-[10px] text-[#737373] mt-1">Recovers 3.8 hrs per entity annually</p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8EAED] bg-white">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#16A36A]">₹{costSaved}</div>
                <div className="text-xs font-semibold text-[#737373] mt-1 uppercase tracking-wider">Monthly Overhead Saved</div>
                <p className="text-[10px] text-[#737373] mt-1">Based on standard associate billing rate</p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8EAED] bg-white">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#171717]">~{formsFiledEstimate}</div>
                <div className="text-xs font-semibold text-[#737373] mt-1 uppercase tracking-wider">Statutory Injections / Yr</div>
                <p className="text-[10px] text-[#737373] mt-1">Zero human typographical defects</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/pricing" className="btn-primary text-xs inline-flex px-6 py-2.5">
                <span>Unlock Germin8 for Your Firm</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E5B52B]" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================================
          SECTION 7: CA & CS TESTIMONIALS (PURE WHITE CARDS)
          ===================================================================== */}
      <section className="py-20 bg-white border-b border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#E5B52B] uppercase mb-2 block">
              PRACTITIONER TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              Trusted by India's Top Compliance Practices
            </h2>
            <p className="text-[#737373] mt-3 text-base">
              Here is how leading CA firms and corporate secretariats streamline their MCA filing operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="card-white p-7 flex flex-col justify-between border border-[#E8EAED] shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#E5B52B]">
                  {"★".repeat(5)}
                </div>
                <p className="text-sm text-[#171717] leading-relaxed italic">
                  "During peak September ROC filings, our firm used to struggle with 40-minute Form AOC-4 inputs. With Germin8, our associates autofill the financial schedules in 2 seconds flat, and we haven't received a single defect notice."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E8EAED]">
                <div className="text-sm font-bold text-[#171717]">CA Vikram Singhania, FCA</div>
                <div className="text-xs text-[#737373]">Senior Partner, Singhania &amp; Associates (Mumbai)</div>
              </div>
            </div>

            <div className="card-white p-7 flex flex-col justify-between border border-[#E8EAED] shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#E5B52B]">
                  {"★".repeat(5)}
                </div>
                <p className="text-sm text-[#171717] leading-relaxed italic">
                  "The zero-trust USB DSC token separation is what convinced our IT compliance committee. Our digital signatures remain strictly on the local hardware dongle; Germin8 only handles the data entry grunt work."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E8EAED]">
                <div className="text-sm font-bold text-[#171717]">CS Ananya Deshmukh, FCS</div>
                <div className="text-xs text-[#737373]">Head of Secretarial Compliance, TechVentures (Bengaluru)</div>
              </div>
            </div>

            <div className="card-white p-7 flex flex-col justify-between border border-[#E8EAED] shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#E5B52B]">
                  {"★".repeat(5)}
                </div>
                <p className="text-sm text-[#171717] leading-relaxed italic">
                  "Managing 10 articled assistants across two offices was a nightmare with shared MCA credentials. The 6-character ephemeral pairing codes give every workstation instant access without sharing passwords."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E8EAED]">
                <div className="text-sm font-bold text-[#171717]">CA R. Venkatraman, FCA</div>
                <div className="text-xs text-[#737373]">Managing Partner, RV &amp; Co. Chartered Accountants (Chennai)</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================================
          SECTION 8: TRANSPARENT PRICING PREVIEW (PURE WHITE)
          ===================================================================== */}
      <section className="py-20 bg-white border-b border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <span className="text-xs font-bold tracking-widest text-[#E5B52B] uppercase mb-2 block">
            TRANSPARENT PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
            Simple Plans Sized for Any Practice
          </h2>
          <p className="text-[#737373] mt-3 text-base max-w-xl mx-auto">
            Choose the tier matching your filing volume. Upgrade, downgrade, or cancel anytime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            
            <div className="card-white flex flex-col justify-between p-7 border border-[#E8EAED]">
              <div>
                <span className="text-xs font-bold text-[#737373] uppercase">Individual</span>
                <h3 className="text-xl font-bold text-[#171717] mt-1">Solo Practitioner</h3>
                <div className="mt-4 pb-4 border-b border-[#E8EAED]">
                  <span className="text-3xl font-extrabold text-[#171717]">₹2,999</span>
                  <span className="text-xs text-[#737373]"> / month</span>
                </div>
                <ul className="mt-5 space-y-2.5 text-xs text-[#737373]">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> 1 Workspace Seat</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> 150 Form Injections / mo</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> Up to 50 Client Entities</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> Standard Email Support</li>
                </ul>
              </div>
              <Link href="/pricing" className="mt-6 btn-secondary text-xs justify-center w-full">
                Choose Solo Plan
              </Link>
            </div>

            <div className="card-white border-2 border-[#171717] flex flex-col justify-between p-7 shadow-lg relative bg-white">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#171717] text-[#E5B52B] text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Recommended for CA Firms
              </div>
              <div>
                <span className="text-xs font-bold text-[#E5B52B] uppercase">Company Tier</span>
                <h3 className="text-xl font-bold text-[#171717] mt-1">Corporate CA Firm</h3>
                <div className="mt-4 pb-4 border-b border-[#E8EAED]">
                  <span className="text-3xl font-extrabold text-[#171717]">₹8,999</span>
                  <span className="text-xs text-[#737373]"> / month</span>
                </div>
                <ul className="mt-5 space-y-2.5 text-xs text-[#171717] font-medium">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> 10 Team Seats &amp; Role-Based Access</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> 1,000 Form Injections / mo</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> Up to 500 Client Entities</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> Cryptographic SHA-256 Audit Trail</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> Priority WhatsApp &amp; Phone Support</li>
                </ul>
              </div>
              <Link href="/pricing" className="mt-6 btn-primary text-xs justify-center w-full">
                Choose Firm Plan
              </Link>
            </div>

            <div className="card-white flex flex-col justify-between p-7 border border-[#E8EAED]">
              <div>
                <span className="text-xs font-bold text-[#737373] uppercase">Enterprise</span>
                <h3 className="text-xl font-bold text-[#171717] mt-1">Corporate Practice</h3>
                <div className="mt-4 pb-4 border-b border-[#E8EAED]">
                  <span className="text-3xl font-extrabold text-[#171717]">₹24,999</span>
                  <span className="text-xs text-[#737373]"> / month</span>
                </div>
                <ul className="mt-5 space-y-2.5 text-xs text-[#737373]">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> Unlimited Seats &amp; Filings</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> Dedicated Private Cloud Instance</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> Custom ERP / Tally Integrations</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#16A36A]" /> Dedicated 24/7 Account Manager</li>
                </ul>
              </div>
              <Link href="/contact" className="mt-6 btn-secondary text-xs justify-center w-full">
                Contact Enterprise
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================================
          SECTION 9: DETAILED FAQ ACCORDION (PURE WHITE)
          ===================================================================== */}
      <section className="py-20 bg-white border-b border-[#E8EAED]">
        <div className="max-w-4xl mx-auto px-6 text-left">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-[#E5B52B] uppercase mb-2 block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              Everything You Need to Know
            </h2>
            <p className="text-[#737373] mt-2 text-sm">
              Answers regarding security, MCA V3 changes, USB tokens, and firm accounts.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-[#E8EAED] rounded-xl overflow-hidden bg-white transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-[#171717] hover:bg-white"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#737373] shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#737373] shrink-0 ml-4" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-[#737373] leading-relaxed border-t border-[#E8EAED]/50 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================================
          SECTION 10: BOTTOM CALL TO ACTION BANNER (PURE WHITE)
          ===================================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8EAED] text-xs font-bold text-[#171717]">
            <Sparkles className="w-3.5 h-3.5 text-[#E5B52B]" />
            <span>Ready for Next-Generation MCA Compliance</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
            Make MCA Workflows Simpler with Germin8.
          </h2>

          <p className="text-[#737373] text-base max-w-xl mx-auto leading-relaxed">
            Eliminate hours of manual data entry on your very next statutory filing. Connect your first extension in under 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/pricing" className="btn-primary text-sm px-6 py-3">
              <span>Start Free 7-Day Trial</span>
              <ArrowRight className="w-4 h-4 text-[#E5B52B]" />
            </Link>
            <Link href="/app/dashboard" className="btn-secondary text-sm px-6 py-3">
              <span>Explore Live Dashboard Demo</span>
            </Link>
          </div>

          <div className="text-[11px] text-[#737373] pt-2">
            No credit card required for 7-day trial • Instant setup • Cancel anytime
          </div>
        </div>
      </section>

    </div>
  );
}
