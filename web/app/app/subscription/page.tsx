"use client";

import React from "react";
import Link from "next/link";
import { CreditCard, Check, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
          Subscription &amp; Quotas
        </h1>
        <p className="text-xs text-[#737373] mt-1">
          Review your current plan tier, manage billing cycles, and track monthly statutory form injection quotas.
        </p>
      </div>

      {/* Current Active Plan Card */}
      <div className="card-white border-2 border-[#171717] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#FFF8E5] text-[#171717] text-[10px] font-bold px-2.5 py-0.5 rounded border border-[#E5B52B]/40 uppercase tracking-wider">
              Active Tier
            </span>
            <span className="text-xs text-[#16A36A] font-bold">● Renews Dec 09, 2026</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#171717]">
            Corporate CA Firm Plan
          </h2>
          <p className="text-xs text-[#737373] max-w-lg leading-relaxed">
            Includes 10 practitioner team seats, 1,000 monthly MCA form injections, unlimited Chrome extension pairs, and tamper-evident SHA-256 audit trails.
          </p>
        </div>

        <div className="text-left md:text-right shrink-0">
          <div className="text-3xl font-extrabold text-[#171717]">₹8,999</div>
          <div className="text-xs text-[#737373] mt-0.5">Billed monthly (+ 18% GST)</div>
          <div className="mt-4 flex gap-2">
            <Link href="/pricing" className="btn-primary text-xs py-2 px-3">
              Upgrade to Enterprise
            </Link>
          </div>
        </div>
      </div>

      {/* Quota Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="card-white space-y-3">
          <div className="flex justify-between text-xs font-bold text-[#171717]">
            <span>Monthly Form Injections</span>
            <span>482 / 1,000</span>
          </div>
          <div className="h-2 w-full bg-[#F8FAFC] border border-[#E8EAED] rounded-full overflow-hidden">
            <div className="h-full bg-[#E5B52B] rounded-full" style={{ width: "48.2%" }} />
          </div>
          <p className="text-[11px] text-[#737373]">518 automated filings remaining this period.</p>
        </div>

        <div className="card-white space-y-3">
          <div className="flex justify-between text-xs font-bold text-[#171717]">
            <span>Team Workspace Seats</span>
            <span>5 / 10 Seats</span>
          </div>
          <div className="h-2 w-full bg-[#F8FAFC] border border-[#E8EAED] rounded-full overflow-hidden">
            <div className="h-full bg-[#171717] rounded-full" style={{ width: "50%" }} />
          </div>
          <p className="text-[11px] text-[#737373]">5 colleague seats available to invite.</p>
        </div>

        <div className="card-white space-y-3">
          <div className="flex justify-between text-xs font-bold text-[#171717]">
            <span>Client Entities Vault</span>
            <span>48 / 500 Companies</span>
          </div>
          <div className="h-2 w-full bg-[#F8FAFC] border border-[#E8EAED] rounded-full overflow-hidden">
            <div className="h-full bg-[#16A36A] rounded-full" style={{ width: "9.6%" }} />
          </div>
          <p className="text-[11px] text-[#737373]">452 entity slots available.</p>
        </div>

      </div>

    </div>
  );
}
