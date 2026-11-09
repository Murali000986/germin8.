import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Zap, ShieldCheck, Database, Layers, Terminal } from "lucide-react";

export const metadata = {
  title: "Product & Architecture | Germin8 MCA Automation",
  description: "Deep dive into the Germin8 MCA V3 deterministic injection engine, supported e-forms, and client vault architecture.",
};

export default function ProductPage() {
  const forms = [
    {
      code: "SPICe+ Part B",
      name: "Integrated Company Incorporation",
      rule: "Rule 38 of Companies (Incorporation) Rules, 2014",
      fields: 17,
      highlights: ["Capital Structure & Class", "Registered Office & PIN", "Director DIN & PAN", "EPFO / ESIC Declarations"]
    },
    {
      code: "Form AOC-4",
      name: "Financial Statements & Balance Sheet",
      rule: "Section 137 of Companies Act, 2013",
      fields: 14,
      highlights: ["Balance Sheet Particulars", "P&L Turnover Figures", "CSR Disclosure Data", "Auditor FRN & Report Date"]
    },
    {
      code: "Form DIR-12",
      name: "Directors & KMP Particulars",
      rule: "Section 7(1)(c), 168 & 170 of Companies Act, 2013",
      fields: 12,
      highlights: ["Director DIN Validator", "Designation Match", "Appointment / Cessation Date", "Consent & Declaration"]
    },
    {
      code: "Form MGT-7 / 7A",
      name: "Annual Return of Company",
      rule: "Section 92(1) of Companies Act, 2013",
      fields: 16,
      highlights: ["Shareholding Pattern", "Promoter Equity Shares", "Board Meeting Quorums", "Penalties & Punishments"]
    },
    {
      code: "Form ADT-1",
      name: "Notice of Auditor Appointment",
      rule: "Section 139 of Companies Act, 2013",
      fields: 9,
      highlights: ["Auditor Firm Reg Number", "Tenure of Appointment", "Annual General Meeting Date", "Casual Vacancy Check"]
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#F1A33B] uppercase mb-2 block">
            PRODUCT ARCHITECTURE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#202020] tracking-tight">
            Deterministic Injection. <br />
            <span className="italic font-normal">Statutory Precision.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#757575] leading-relaxed">
            The MCA V3 portal runs on dynamic Angular Single Page Applications with complex synthetic change detection. Here is how Germin8 ensures 99.8% first-pass accuracy without browser crashes.
          </p>
        </div>

        {/* Engine Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 rounded-3xl bg-[#FFF8E9] border border-[#F5D45C]/50">
            <Zap className="w-8 h-8 text-[#F1A33B] mb-4" />
            <h3 className="font-serif text-2xl font-bold text-[#202020] mb-2">Prototype Setters</h3>
            <p className="text-sm text-[#757575] leading-relaxed">
              Standard JavaScript value assignments fail to inform Angular reactive forms. Germin8 invokes native prototype property setters to cleanly trigger input, change, and dirty validation states.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#E8E8F8] border border-[#E8E8F8]">
            <ShieldCheck className="w-8 h-8 text-[#059669] mb-4" />
            <h3 className="font-serif text-2xl font-bold text-[#202020] mb-2">Pre-Scrutiny Checksum</h3>
            <p className="text-sm text-[#757575] leading-relaxed">
              Calculates PAN regular expressions, DIN checksums, and postal pin boundaries before injection. If an entity profile has incomplete data, you are alerted before entering the portal.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#F7F7F7] border border-[#E9E9E9]">
            <Database className="w-8 h-8 text-[#202020] mb-4" />
            <h3 className="font-serif text-2xl font-bold text-[#202020] mb-2">Encrypted Vault</h3>
            <p className="text-sm text-[#757575] leading-relaxed">
              Your client records are stored in AES-256 encrypted storage. Export, sync, and organize thousands of corporate entities with zero cloud credential vulnerability.
            </p>
          </div>
        </div>

        {/* Supported Forms Detailed List */}
        <div id="forms" className="pt-12 border-t border-[#E9E9E9]">
          <div className="max-w-2xl mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202020]">
              Supported Statutory e-Forms
            </h2>
            <p className="text-[#757575] mt-3 text-sm">
              Each form is mapped against official Ministry of Corporate Affairs V3 schema specifications.
            </p>
          </div>

          <div className="space-y-6">
            {forms.map((form) => (
              <div key={form.code} className="p-8 rounded-3xl border border-[#E9E9E9] bg-white hover:border-[#F1A33B] transition-colors shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-serif text-xl font-bold text-[#202020]">{form.code}</span>
                    <span className="bg-[#FFF8E9] text-[#F1A33B] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#F5D45C]">
                      {form.fields} Mapped Fields
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#202020]">{form.name}</h4>
                  <p className="text-xs text-[#757575] mt-1">{form.rule}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {form.highlights.map((h, i) => (
                    <span key={i} className="text-xs bg-[#F7F7F7] border border-[#E9E9E9] px-3 py-1.5 rounded-xl text-[#757575]">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 p-12 rounded-3xl bg-[#F7F7F7] border border-[#E9E9E9] text-center max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#202020] mb-4">
            Ready to test Germin8 on your next filing?
          </h3>
          <p className="text-sm text-[#757575] mb-6">
            Try our 7-day free trial. No credit card required. Connect extension in 60 seconds.
          </p>
          <Link href="/pricing" className="btn-cvpilot text-sm">
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
