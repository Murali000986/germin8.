import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Users, Shield, Building, Award } from "lucide-react";

export const metadata = {
  title: "Solutions by Practice Scale | Germin8 MCA Automation",
  description: "Explore tailored MCA filing automation workflows for independent Chartered Accountants, CA firms, and corporate legal teams.",
};

export default function SolutionsPage() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#F1A33B] uppercase mb-2 block">
            PRACTICE SOLUTIONS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#202020] tracking-tight">
            Engineered for <br />
            <span className="italic font-normal">Every Level of Compliance.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#757575] leading-relaxed">
            Whether you are a solo practitioner managing 30 company clients or a top-tier national firm filing thousands of annual returns, Germin8 adapts to your operating cadence.
          </p>
        </div>

        {/* Section 1: Individual */}
        <section id="individual" className="py-12 border-t border-[#E9E9E9]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-[#F1A33B] uppercase tracking-wider block mb-2">
                FOR SOLO PRACTITIONERS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202020] mb-4">
                Individual CA / CS Workspace
              </h2>
              <p className="text-sm text-[#757575] leading-relaxed mb-6">
                Never retype a client’s registered office address, DIN, or corporate identity number again. The Individual plan gives solo professionals a fast personal vault and connected browser extension.
              </p>
              <ul className="space-y-3 text-sm text-[#202020] font-medium mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#059669]" /> Up to 2 paired Chrome extension devices</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#059669]" /> 150 automated MCA e-form injections per month</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#059669]" /> Complete SPICe+, AOC-4, DIR-12, MGT-7 support</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#059669]" /> Local client entity data vault</li>
              </ul>
              <Link href="/pricing" className="btn-cvpilot text-sm">
                <span>Start Solo Practice Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-[#FFF8E9] rounded-3xl p-8 border border-[#F5D45C]/50 flex flex-col justify-center min-h-[300px]">
              <div className="text-xs font-semibold text-[#F1A33B] uppercase tracking-wider mb-2">SOLO PRODUCTIVITY GAIN</div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#202020] mb-2">~35 Hours / Month</div>
              <p className="text-xs sm:text-sm text-[#757575]">Average time saved during peak September and October MCA annual return deadlines.</p>
            </div>
          </div>
        </section>

        {/* Section 2: CA Firms */}
        <section id="firms" className="py-16 border-t border-[#E9E9E9]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-[#E8E8F8] rounded-3xl p-8 border border-[#E8E8F8] flex flex-col justify-center min-h-[300px] order-2 lg:order-1">
              <div className="text-xs font-semibold text-[#202020] uppercase tracking-wider mb-2">TEAM GOVERNANCE</div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#202020] mb-2">10-Seat RBAC</div>
              <p className="text-xs sm:text-sm text-[#757575]">Article assistants prepare and inject form data; Partners conduct final verification and attach DSC tokens.</p>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-bold text-[#F1A33B] uppercase tracking-wider block mb-2">
                FOR MID-SIZED &amp; REGIONAL FIRMS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202020] mb-4">
                Corporate CA Firm Workspace
              </h2>
              <p className="text-sm text-[#757575] leading-relaxed mb-6">
                Multi-seat collaboration with strict role boundaries. Article clerks and junior associates can auto-fill draft forms without exposing master partner credentials or client confidential passkeys.
              </p>
              <ul className="space-y-3 text-sm text-[#202020] font-medium mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#059669]" /> 10 Team Seats with Admin vs Preparer RBAC</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#059669]" /> 1,000 automated form injections per month</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#059669]" /> Centralized client vault (up to 500 entities)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#059669]" /> Immutable forensic audit logs for partner review</li>
              </ul>
              <Link href="/pricing" className="btn-cvpilot text-sm">
                <span>Start Firm 7-Day Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 3: Enterprise */}
        <section id="enterprise" className="py-16 border-t border-[#E9E9E9]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-[#F1A33B] uppercase tracking-wider block mb-2">
                FOR TIER-1 PRACTICES &amp; CORPORATIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202020] mb-4">
                Enterprise Compliance Scale
              </h2>
              <p className="text-sm text-[#757575] leading-relaxed mb-6">
                Tailored infrastructure for national accounting networks, corporate secretarial enterprises, and law firms requiring bespoke API integration and custom statutory ontologies.
              </p>
              <ul className="space-y-3 text-sm text-[#202020] font-medium mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#059669]" /> Unlimited firm team seats and unlimited filings</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#059669]" /> Custom statutory ontologies (LLP-8, LLP-11, CHG-1)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#059669]" /> On-premise relay node deployment available</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#059669]" /> 24/7 dedicated legal engineer support &amp; SLA</li>
              </ul>
              <Link href="/contact" className="btn-cvpilot text-sm">
                <span>Contact Enterprise Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-[#F7F7F7] rounded-3xl p-8 border border-[#E9E9E9] flex flex-col justify-center min-h-[300px]">
              <div className="text-xs font-semibold text-[#202020] uppercase tracking-wider mb-2">CUSTOM INTEGRATIONS</div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#202020] mb-2">REST &amp; Webhooks</div>
              <p className="text-xs sm:text-sm text-[#757575]">Synchronize client records directly from your SAP, Tally, or internal ERP practice management systems.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
