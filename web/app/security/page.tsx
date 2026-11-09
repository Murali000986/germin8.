import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, Key, FileCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Statutory Security & Compliance | Germin8",
  description: "Learn how Germin8 implements zero-trust architecture, ephemeral token pairing, and mandatory DSC human verification.",
};

export default function SecurityPage() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#F1A33B] uppercase mb-2 block">
            STATUTORY COMPLIANCE &amp; SECURITY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#202020] tracking-tight">
            Security Designed for <br />
            <span className="italic font-normal">Regulated Professionals.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#757575] leading-relaxed">
            As a Chartered Accountant or Company Secretary, your legal and statutory liability is paramount. Germin8 is designed strictly to uphold those boundaries without compromise.
          </p>
        </div>

        {/* Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="p-8 rounded-3xl bg-[#FFF8E9] border border-[#F5D45C]/50 space-y-4">
            <Lock className="w-8 h-8 text-[#F1A33B]" />
            <h3 className="font-serif text-2xl font-bold text-[#202020]">Zero Portal Passwords</h3>
            <p className="text-sm text-[#757575] leading-relaxed">
              We never prompt for or store your MCA portal password. You log in directly at mca.gov.in; the extension only communicates with the rendered DOM inside your active browser session.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#E8E8F8] border border-[#E8E8F8] space-y-4">
            <Key className="w-8 h-8 text-[#202020]" />
            <h3 className="font-serif text-2xl font-bold text-[#202020]">Ephemeral Pairing Codes</h3>
            <p className="text-sm text-[#757575] leading-relaxed">
              Extension devices authenticate via 6-character ephemeral pairing codes that expire in 10 minutes. Cryptographic hardware tokens can be force-revoked from the dashboard instantly.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#F7F7F7] border border-[#E9E9E9] space-y-4">
            <ShieldCheck className="w-8 h-8 text-[#059669]" />
            <h3 className="font-serif text-2xl font-bold text-[#202020]">Mandatory DSC Gate</h3>
            <p className="text-sm text-[#757575] leading-relaxed">
              Germin8 stops strictly at field injection. It will never click the final submission button. The practicing CA/CS must attach their physical DSC USB token and sign manually.
            </p>
          </div>

        </div>

        {/* Audit Trail Section */}
        <div className="p-10 rounded-[32px] bg-[#F7F7F7] border border-[#E9E9E9] mb-16">
          <div className="max-w-2xl mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202020]">
              Tamper-Evident SHA-256 Audit Trail
            </h2>
            <p className="text-sm text-[#757575] mt-2">
              Every single injection is recorded with a cryptographic checksum, timestamp, user ID, and client entity reference.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E9E9E9] font-mono text-xs text-[#202020] space-y-1">
            <div className="text-[#757575]">// AUDIT RECORD SAMPLE</div>
            <div>&#123;</div>
            <div className="pl-4">&quot;event&quot;: &quot;mca_form_injected&quot;,</div>
            <div className="pl-4">&quot;form&quot;: &quot;SPICe+ Part B&quot;,</div>
            <div className="pl-4">&quot;client_cin&quot;: &quot;U72200MH2018PTC309871&quot;,</div>
            <div className="pl-4">&quot;operator_id&quot;: &quot;usr_partner_001&quot;,</div>
            <div className="pl-4">&quot;fields_injected&quot;: 17,</div>
            <div className="pl-4">&quot;checksum_sha256&quot;: &quot;e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855&quot;,</div>
            <div className="pl-4">&quot;status&quot;: &quot;VERIFIED_SUCCESS&quot;</div>
            <div>&#125;</div>
          </div>
        </div>

      </div>
    </div>
  );
}
