"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Users,
  Database,
  Terminal,
  Laptop
} from "lucide-react";

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      id: "individual",
      name: "Solo Practitioner",
      price: billingCycle === "annual" ? "₹2,399" : "₹2,999",
      description: "For independent Chartered Accountants and individual practitioners managing personal filing portfolios.",
      features: [
        "1 Practitioner Workspace Seat",
        "150 Form Injections per month",
        "Up to 50 Client Entities in Vault",
        "1 Workstation Chrome Extension Pairing",
        "Standard Email & Helpdesk Support",
      ],
      current: false,
    },
    {
      id: "company",
      name: "Corporate CA Firm",
      price: billingCycle === "annual" ? "₹7,199" : "₹8,999",
      description: "Engineered for multi-partner audit firms and corporate secretariats with articled assistants.",
      features: [
        "10 Team Seats with Granular RBAC",
        "1,000 Form Injections per month",
        "Up to 500 Client Entities in Vault",
        "Multi-Workstation Fleet Management",
        "Cryptographic SHA-256 Audit Trail",
        "Direct DOM Injection Engine (1.2s)",
        "Priority WhatsApp & Phone Support",
      ],
      current: true,
    },
    {
      id: "enterprise",
      name: "Corporate Legal Enterprise",
      price: billingCycle === "annual" ? "₹19,999" : "₹24,999",
      description: "For large compliance consultancies, holding companies, and high-volume corporate secretariats.",
      features: [
        "Unlimited Team Seats & Workstations",
        "Unlimited Monthly Form Injections",
        "Unlimited Client Entities in Vault",
        "Dedicated Private API Cluster",
        "Custom ERP & Tally Integration Adapters",
        "24/7 Dedicated Compliance Engineer SLA",
      ],
      current: false,
    },
  ];

  return (
    <div className="space-y-6 text-[#171717]">
      
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-bold uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-[#E5B52B]" />
          <span>SUBSCRIPTION &amp; CAPACITY QUOTAS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
          Subscription &amp; Capacity Quotas
        </h1>
        <p className="text-xs text-[#737373] mt-1">
          Monitor your firm's monthly statutory filing consumption, workstation seats, and platform tier limits.
        </p>
      </div>

      {/* Active Subscription Glass Card */}
      <div className="glass-card p-6 border-2 border-[#171717] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#171717] text-[#E5B52B] text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
              ACTIVE FIRM TIER
            </span>
            <span className="text-xs text-[#16A36A] font-bold">● Renews on Dec 09, 2026</span>
          </div>
          <h2 className="text-2xl font-black text-[#171717]">Corporate CA Firm Subscription</h2>
          <p className="text-xs text-[#737373] max-w-xl leading-relaxed">
            Multi-user firm workspace with 10 practitioner licenses, 1,000 monthly statutory e-form injections, and immutable SHA-256 audit trails.
          </p>
        </div>

        <div className="text-left md:text-right shrink-0">
          <div className="text-3xl font-black text-[#171717]">₹8,999<span className="text-xs font-normal text-[#737373]"> / mo</span></div>
          <div className="text-[11px] text-[#737373] mt-0.5">+ 18% Statutory GST (CGST + SGST)</div>
          <div className="mt-4 flex gap-2">
            <Link href="/app/billing" className="btn-primary text-xs py-2 px-4">
              Manage Payment Mandate
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Quota Progress Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#171717]">Form Injections</span>
            <Zap className="w-4 h-4 text-[#E5B52B]" />
          </div>
          <div className="text-2xl font-extrabold text-[#171717]">
            482 <span className="text-xs font-medium text-[#737373]">/ 1,000</span>
          </div>
          <div className="h-2 w-full bg-white border border-[#E8EAED] rounded-full overflow-hidden">
            <div className="h-full bg-[#E5B52B] rounded-full" style={{ width: "48.2%" }} />
          </div>
          <div className="text-[11px] text-[#737373]">518 fillings remaining (Resets in 27d)</div>
        </div>

        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#171717]">Team Seats</span>
            <Users className="w-4 h-4 text-[#171717]" />
          </div>
          <div className="text-2xl font-extrabold text-[#171717]">
            5 <span className="text-xs font-medium text-[#737373]">/ 10 Seats</span>
          </div>
          <div className="h-2 w-full bg-white border border-[#E8EAED] rounded-full overflow-hidden">
            <div className="h-full bg-[#171717] rounded-full" style={{ width: "50%" }} />
          </div>
          <div className="text-[11px] text-[#737373]">5 practitioner seats available</div>
        </div>

        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#171717]">Client Entities</span>
            <Building2 className="w-4 h-4 text-[#16A36A]" />
          </div>
          <div className="text-2xl font-extrabold text-[#171717]">
            128 <span className="text-xs font-medium text-[#737373]">/ 500</span>
          </div>
          <div className="h-2 w-full bg-white border border-[#E8EAED] rounded-full overflow-hidden">
            <div className="h-full bg-[#16A36A] rounded-full" style={{ width: "25.6%" }} />
          </div>
          <div className="text-[11px] text-[#737373]">372 client slots remaining</div>
        </div>

        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#171717]">Extension Fleet</span>
            <Laptop className="w-4 h-4 text-[#4385DF]" />
          </div>
          <div className="text-2xl font-extrabold text-[#171717]">
            4 <span className="text-xs font-medium text-[#737373]">Paired PCs</span>
          </div>
          <div className="h-2 w-full bg-white border border-[#E8EAED] rounded-full overflow-hidden">
            <div className="h-full bg-[#4385DF] rounded-full" style={{ width: "40%" }} />
          </div>
          <div className="text-[11px] text-[#737373]">All devices reporting healthy</div>
        </div>

      </div>

      {/* Plan Comparison Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[#171717]">Compare Practice Plans</h2>
            <p className="text-xs text-[#737373]">Scale seamlessly as your firm onboard more corporate entities</p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-white border border-[#E8EAED] rounded-lg">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-3 py-1 text-xs font-bold rounded ${billingCycle === "monthly" ? "bg-[#171717] text-white" : "text-[#737373]"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-3 py-1 text-xs font-bold rounded ${billingCycle === "annual" ? "bg-[#171717] text-white" : "text-[#737373]"}`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div 
              key={p.id}
              className={`glass-card p-6 flex flex-col justify-between space-y-6 ${p.current ? "border-2 border-[#171717] shadow-sm relative" : ""}`}
            >
              {p.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#171717] text-[#E5B52B] text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Your Current Tier
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-extrabold text-[#171717]">{p.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#171717]">{p.price}</span>
                    <span className="text-xs text-[#737373]"> / month</span>
                  </div>
                  <p className="text-xs text-[#737373] mt-2 leading-relaxed">{p.description}</p>
                </div>

                <ul className="space-y-2.5 text-xs text-[#171717] border-t border-[#E8EAED] pt-4">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#16A36A] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {p.current ? (
                <div className="w-full py-2.5 rounded-lg border border-[#E8EAED] bg-white text-center text-xs font-bold text-[#171717]">
                  Active Plan
                </div>
              ) : (
                <Link
                  href="/app/billing"
                  className="btn-primary text-xs justify-center w-full"
                >
                  Switch to {p.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
