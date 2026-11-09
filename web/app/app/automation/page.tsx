"use client";

import React, { useState } from "react";
import { Zap, Check, ArrowRight, Play, FileText, CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";

export default function MCAAutomationPage() {
  const [selectedClient, setSelectedClient] = useState("cli_technova_001");
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(null);

  const forms = [
    {
      code: "spice_plus",
      title: "SPICe+ (Part B) — Company Incorporation",
      rule: "Rule 38 of Companies (Incorporation) Rules, 2014",
      fields: 17,
      eligible: true,
      lastRun: "12 mins ago"
    },
    {
      code: "aoc_4",
      title: "Form AOC-4 — Financial Statements",
      rule: "Section 137 of Companies Act, 2013",
      fields: 14,
      eligible: true,
      lastRun: "48 mins ago"
    },
    {
      code: "dir_12",
      title: "Form DIR-12 — Directors & KMP Appointment/Cessation",
      rule: "Section 170 of Companies Act, 2013",
      fields: 12,
      eligible: true,
      lastRun: "2 hours ago"
    },
    {
      code: "mgt_7",
      title: "Form MGT-7 / 7A — Annual Return of Company",
      rule: "Section 92 of Companies Act, 2013",
      fields: 16,
      eligible: true,
      lastRun: "5 hours ago"
    },
    {
      code: "adt_1",
      title: "Form ADT-1 — Notice to ROC for Auditor Appointment",
      rule: "Section 139 of Companies Act, 2013",
      fields: 9,
      eligible: true,
      lastRun: "Yesterday"
    }
  ];

  const handleRunFill = (formCode: string) => {
    setIsExecuting(true);
    setExecutionResult(null);

    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult({
        form: formCode,
        client: "TECHNOVA SOLUTIONS INDIA PVT LTD (U72200MH2018PTC309871)",
        fieldsInjected: 17,
        executionSpeed: "1.18s",
        checksum: "SHA-256: 7f3a9e2d41b... Verified",
        status: "SUCCESS"
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
          MCA Automation Hub
        </h1>
        <p className="text-xs text-[#737373] mt-1">
          Execute sub-second deterministic form injection against supported MCA V3 statutory schemas.
        </p>
      </div>

      {/* Target Client Picker & Extension Status Bar */}
      <div className="card-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-[#171717] uppercase tracking-wider shrink-0">
            Active Client Entity:
          </label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full sm:w-80 px-3 py-1.5 rounded-lg border border-[#E8EAED] bg-[#F8FAFC] text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#E5B52B]"
          >
            <option value="cli_technova_001">TECHNOVA SOLUTIONS INDIA PVT LTD (U72200MH2018PTC309871)</option>
            <option value="cli_apex_002">APEX GLOBAL FINTECH LIMITED (L65100DL2015PLC284719)</option>
            <option value="cli_green_003">GREENHORIZON AGROTECH LLP (AAB-4921)</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-[#16A36A]" />
          <span className="font-semibold text-[#171717]">Extension Fleet Online</span>
          <span className="text-[#737373]">(4 Paired Workstations)</span>
        </div>
      </div>

      {/* Execution Feedback Result Alert */}
      {executionResult && (
        <div className="p-4 rounded-xl border border-[#16A36A]/30 bg-[#F8FAFC] shadow-sm flex items-start gap-3 animate-in fade-in-50">
          <CheckCircle2 className="w-5 h-5 text-[#16A36A] shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <div className="font-bold text-[#171717] text-sm">
              Form Injected Successfully in {executionResult.executionSpeed}!
            </div>
            <div className="text-[#737373] mt-0.5">
              Target: <strong>{executionResult.client}</strong> • {executionResult.fieldsInjected} fields populated with verified prototype property setters.
            </div>
            <div className="font-mono text-[11px] text-[#16A36A] mt-1 font-semibold">
              {executionResult.checksum}
            </div>
          </div>
        </div>
      )}

      {/* Form List Cards */}
      <div className="space-y-4">
        {forms.map((f) => (
          <div key={f.code} className="card-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#171717]">{f.title}</span>
                <span className="bg-[#FFF8E5] text-[#171717] text-[10px] font-bold px-2 py-0.5 rounded border border-[#E5B52B]/40">
                  {f.fields} Statutory Fields
                </span>
              </div>
              <div className="text-xs text-[#737373]">{f.rule}</div>
              <div className="text-[11px] text-[#737373]">
                Last executed on portal: <span className="font-semibold text-[#171717]">{f.lastRun}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={isExecuting}
                onClick={() => handleRunFill(f.code)}
                className="btn-accent text-xs py-2 px-4"
              >
                <Play className="w-3.5 h-3.5 fill-[#171717]" />
                <span>{isExecuting ? "Injecting..." : "Auto-Fill Form"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
