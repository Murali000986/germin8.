"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, Zap, Lock, Terminal, Layers, ArrowUpRight, Check, Eye } from "lucide-react";

export default function HeroVisual() {
  const [activeTab, setActiveTab] = useState<"form" | "extension">("form");

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10 mb-6">
      
      {/* Main Crisp White Enterprise Browser Container */}
      <div className="relative rounded-2xl bg-white border border-[#E8EAED] shadow-xl overflow-hidden p-6 sm:p-8 text-left">
        
        {/* Top Browser Bar */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#E8EAED]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E8EAED]" />
            <div className="w-3 h-3 rounded-full bg-[#E8EAED]" />
            <div className="w-3 h-3 rounded-full bg-[#E8EAED]" />
            <span className="ml-3 text-xs font-mono text-[#737373] hidden sm:inline">
              mca.gov.in/v3/company-forms/spice-plus
            </span>
          </div>

          {/* Switcher & Extension indicator */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#FFF8E5] text-[#171717] text-xs font-medium px-2.5 py-1 rounded-md border border-[#E5B52B]/40">
              <span className="w-2 h-2 rounded-full bg-[#E5B52B]" />
              Extension Paired (v2.5)
            </span>
          </div>
        </div>

        {/* Product Workspace Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Form & Live Injector (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#171717]">
                  SPICe+ (Part B) — Company Incorporation
                </h3>
                <p className="text-xs text-[#737373]">
                  Client Entity: TECHNOVA SOLUTIONS INDIA PVT LTD
                </p>
              </div>
              <span className="inline-flex items-center gap-1 bg-[#F8FAFC] text-[#16A36A] text-xs font-semibold px-2.5 py-1 rounded-md border border-[#E8EAED]">
                <Check className="w-3.5 h-3.5" />
                17 / 17 Verified
              </span>
            </div>

            {/* Statutory Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              
              <div className="p-3 rounded-lg border border-[#E8EAED] bg-[#FFFFFF] shadow-2xs">
                <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-1">
                  Corporate Identity Number (CIN)
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#171717]">U72200MH2018PTC309871</span>
                  <span className="bg-[#FFF8E5] text-[#171717] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#E5B52B]/40">
                    AUTO
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[#E8EAED] bg-[#FFFFFF] shadow-2xs">
                <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-1">
                  Legal Company Name
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-bold text-[#171717]">TECHNOVA SOLUTIONS INDIA</span>
                  <span className="bg-[#FFF8E5] text-[#171717] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#E5B52B]/40">
                    AUTO
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[#E8EAED] bg-[#FFFFFF] shadow-2xs">
                <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-1">
                  Registrar of Companies (ROC)
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-bold text-[#171717]">ROC-MUMBAI</span>
                  <span className="bg-[#FFF8E5] text-[#171717] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#E5B52B]/40">
                    AUTO
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[#E8EAED] bg-[#FFFFFF] shadow-2xs">
                <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-1">
                  Authorized Share Capital (INR)
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#171717]">₹10,000,000</span>
                  <span className="bg-[#FFF8E5] text-[#171717] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#E5B52B]/40">
                    AUTO
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[#E8EAED] bg-[#FFFFFF] shadow-2xs">
                <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-1">
                  Director 1 DIN (Rajesh Kumar)
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#171717]">08123456</span>
                  <span className="bg-[#FFF8E5] text-[#171717] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#E5B52B]/40">
                    AUTO
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[#E8EAED] bg-[#FFFFFF] shadow-2xs">
                <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-1">
                  Director 2 DIN (Priya Mehta)
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#171717]">07918234</span>
                  <span className="bg-[#FFF8E5] text-[#171717] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#E5B52B]/40">
                    AUTO
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Status Row */}
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E8EAED] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#171717] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#16A36A]" />
                <span>Statutory Checksum Passed</span>
              </div>
              <span className="font-mono text-[#737373] text-[11px]">
                SHA-256: 7f3a9e2d...
              </span>
            </div>

          </div>

          {/* Right Column: Floating Extension & Analytics Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Speed Badge */}
            <div className="p-4 rounded-xl border border-[#E8EAED] bg-[#FFFFFF] shadow-sm text-left">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-md bg-[#FFF8E5] text-[#E5B52B] flex items-center justify-center font-bold text-xs">
                  <Zap className="w-3.5 h-3.5 fill-[#E5B52B]" />
                </div>
                <span className="text-xs font-bold text-[#171717]">1.2s Dispatch Speed</span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Direct prototype property setters cleanly update Angular change detectors without portal crashes.
              </p>
            </div>

            {/* Precision Pill Card */}
            <div className="p-4 rounded-xl border border-[#E8EAED] bg-[#FFFFFF] shadow-sm text-left">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-md bg-[#F8FAFC] text-[#16A36A] flex items-center justify-center font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-[#171717]">99.8% First-Pass Accuracy</span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Guaranteed zero defect notice risk on Companies Act 2013 filings.
              </p>
            </div>

            {/* Quick Extension Status */}
            <div className="p-4 rounded-xl border border-[#E8EAED] bg-[#F8FAFC] text-left text-xs space-y-2">
              <div className="flex justify-between items-center text-[#737373]">
                <span>Active Vault Clients:</span>
                <span className="font-bold text-[#171717]">142</span>
              </div>
              <div className="flex justify-between items-center text-[#737373]">
                <span>Pre-Scrutiny Engine:</span>
                <span className="font-bold text-[#16A36A]">Online</span>
              </div>
              <div className="flex justify-between items-center text-[#737373]">
                <span>DSC Signing Token:</span>
                <span className="font-bold text-[#171717]">Manual USB Only</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
