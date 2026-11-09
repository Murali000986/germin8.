import React from "react";
import { Check, ShieldCheck, ArrowRight, Zap, RefreshCw } from "lucide-react";

export default function FeatureCards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#F1A33B] uppercase mb-2 block">
            CORE CAPABILITIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202020] tracking-tight">
            Features That Make Germin8 Stand Out
          </h2>
          <p className="text-[#757575] mt-4 text-base leading-relaxed">
            From deterministic DOM injection to statutory checksum pre-scrutiny, everything accounting professionals need for effortless compliance.
          </p>
        </div>

        {/* 2x2 Asymmetrical Feature Grid inspired by CVPilot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Feature 1: Engine Injects It for You */}
          <div className="bg-[#FFF8E9]/70 rounded-[28px] border border-[#F5D45C]/40 p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-white text-[#F1A33B] text-xs font-bold px-3 py-1 rounded-full border border-[#F5D45C]/50">
                  Sub-Second Injection
                </span>
                <Zap className="w-5 h-5 text-[#F1A33B]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#202020] mb-2">
                Engine Injects It for You
              </h3>
              <p className="text-sm text-[#757575] leading-relaxed">
                Bypasses synthetic Angular reactive boundaries in MCA V3 using direct prototype property setters. Updates fields cleanly in 1.2s without browser freezes.
              </p>
            </div>

            {/* Embedded UI Mockup */}
            <div className="mt-8 bg-white rounded-2xl p-5 border border-[#E9E9E9] shadow-sm">
              <div className="text-xs font-semibold text-[#757575] mb-2 uppercase tracking-wider">
                Active MCA V3 Payload
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 rounded-lg bg-[#F7F7F7]">
                  <span className="text-[#757575]">CIN:</span>
                  <span className="font-mono font-semibold text-[#202020]">U72200MH2018PTC309871</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-[#F7F7F7]">
                  <span className="text-[#757575]">Company:</span>
                  <span className="font-semibold text-[#202020]">TECHNOVA SOLUTIONS INDIA</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-[#F7F7F7]">
                  <span className="text-[#757575]">ROC:</span>
                  <span className="font-semibold text-[#202020]">ROC-MUMBAI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Guided Filing Flow */}
          <div className="bg-[#E8E8F8]/60 rounded-[28px] border border-[#E8E8F8] p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-white text-[#202020] text-xs font-bold px-3 py-1 rounded-full border border-[#E9E9E9]">
                  Step-by-Step
                </span>
                <Check className="w-5 h-5 text-[#059669]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#202020] mb-2">
                Guided Filing Flow
              </h3>
              <p className="text-sm text-[#757575] leading-relaxed">
                Build your client returns step by step with zero guesswork. Germin8 guides you through verification before physical DSC digital signature.
              </p>
            </div>

            {/* Step Checkbox Preview inspired by CVPilot */}
            <div className="mt-8 bg-white rounded-2xl p-5 border border-[#E9E9E9] shadow-sm space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-[#F7F7F7]">
                <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs">✓</div>
                <div className="text-xs font-semibold text-[#202020]">Step 1 • Corporate Client Selected</div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-[#F7F7F7]">
                <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs">✓</div>
                <div className="text-xs font-semibold text-[#202020]">Step 2 • Active MCA e-Form Detected</div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-[#F7F7F7]">
                <div className="w-5 h-5 rounded-full bg-[#F1A33B] text-white flex items-center justify-center text-xs">⚡</div>
                <div className="text-xs font-semibold text-[#202020]">Step 3 • Injected & DSC Token Ready</div>
              </div>
            </div>
          </div>

          {/* Feature 3: Statutory Checksum Score */}
          <div className="bg-[#F7F7F7] rounded-[28px] border border-[#E9E9E9] p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-white text-[#F1A33B] text-xs font-bold px-3 py-1 rounded-full border border-[#E9E9E9]">
                  Quality Assurance
                </span>
                <ShieldCheck className="w-5 h-5 text-[#F1A33B]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#202020] mb-2">
                Pre-Scrutiny Checksum Score
              </h3>
              <p className="text-sm text-[#757575] leading-relaxed">
                See how compliant your form is before filing. Instantly detect mismatched DINs, invalid postal codes, or corrupted balance figures.
              </p>
            </div>

            {/* Radial Gauge Preview inspired by CVPilot */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-[#E9E9E9] shadow-sm flex items-center justify-center gap-6">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#E9E9E9]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#F1A33B]"
                    strokeDasharray="99.8, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-lg font-bold text-[#202020]">99.8%</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-[#059669]">Checksum Passed</div>
                <div className="text-xs text-[#757575] mt-1">Zero defect notice risk</div>
              </div>
            </div>
          </div>

          {/* Feature 4: Match Any MCA Form Instantly */}
          <div className="bg-white rounded-[28px] border border-[#E9E9E9] p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-[#FFF8E9] text-[#F1A33B] text-xs font-bold px-3 py-1 rounded-full border border-[#F5D45C]">
                  Universal Scanner
                </span>
                <RefreshCw className="w-5 h-5 text-[#F1A33B]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#202020] mb-2">
                Match Any MCA Form Instantly
              </h3>
              <p className="text-sm text-[#757575] leading-relaxed">
                Open any e-form on mca.gov.in and let Germin8 understand what fields are needed, auto-mapping from your centralized client vault.
              </p>
            </div>

            {/* Input Link Field Mockup inspired by CVPilot */}
            <div className="mt-8 bg-[#F7F7F7] rounded-2xl p-5 border border-[#E9E9E9]">
              <div className="text-[11px] text-[#757575] mb-2 font-medium">
                Active MCA Portal URL Detected:
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E9E9E9] flex items-center justify-between text-xs font-mono text-[#202020]">
                <span>mca.gov.in/v3/company-forms/spice-plus</span>
                <span className="text-[#059669] font-bold">✓ Ready</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
