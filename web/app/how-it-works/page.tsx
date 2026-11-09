import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Laptop, FileText, Lock, Users, Zap } from "lucide-react";

export const metadata = {
  title: "How It Works | Germin8 MCA Automation",
  description: "Learn the 8-step journey from workspace onboarding to sub-second MCA V3 statutory form injection and DSC sign-off.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Workspace Provisioning",
      desc: "Create your firm account. Invite partners and associate preparers, configuring workspace roles and client partition permissions.",
      badge: "Account Setup"
    },
    {
      num: "02",
      title: "Hardware Extension Pairing",
      desc: "Generate an ephemeral 6-character code in your dashboard. Enter it once into the Chrome extension to bind hardware cryptographic tokens.",
      badge: "Zero-Trust Security"
    },
    {
      num: "03",
      title: "Client Vault Synchronization",
      desc: "Store client entities once: corporate CIN, registered address, Director DINs, share capital, and statutory auditor details.",
      badge: "Encrypted Storage"
    },
    {
      num: "04",
      title: "Official Portal Login",
      desc: "Open mca.gov.in and log in with your practitioner credentials. Germin8 never intercepts or proxies your official MCA passwords.",
      badge: "Practitioner Auth"
    },
    {
      num: "05",
      title: "Dynamic Form Detection",
      desc: "Navigate to any supported e-form (SPICe+, AOC-4, DIR-12, MGT-7, ADT-1). The extension automatically identifies the active form schema.",
      badge: "DOM Inspection"
    },
    {
      num: "06",
      title: "Pre-Scrutiny Checksum",
      desc: "Validates field formatting, PAN regex, and statutory boundaries before injecting data, ensuring complete conformance with Companies Act rules.",
      badge: "Error Prevention"
    },
    {
      num: "07",
      title: "Sub-Second DOM Injection",
      desc: "Fills dozens of inputs in 1.2s using native prototype property setters that cleanly trigger Angular change detection events.",
      badge: "Prototype Setter"
    },
    {
      num: "08",
      title: "Human Verification & DSC Sign",
      desc: "The professional verifies filled values on screen, attaches the physical DSC USB token, and executes final statutory submission manually.",
      badge: "Human Gate"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#F1A33B] uppercase mb-2 block">
            HOW IT WORKS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#202020] tracking-tight">
            The 8-Step Journey to <br />
            <span className="italic font-normal">Effortless MCA Filing.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#757575] leading-relaxed">
            Germin8 is engineered around statutory professional liabilities. We handle the repetitive 90-minute data entry while keeping legal control strictly in your hands.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {steps.map((s, idx) => (
            <div 
              key={idx} 
              className={`p-8 rounded-3xl border transition-all duration-200 ${
                idx % 3 === 0 
                  ? "bg-[#FFF8E9] border-[#F5D45C]/50" 
                  : idx % 3 === 1 
                  ? "bg-[#E8E8F8] border-[#E8E8F8]" 
                  : "bg-[#F7F7F7] border-[#E9E9E9]"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-bold text-[#F1A33B]">{s.num}</span>
                <span className="bg-white text-[#202020] text-xs font-semibold px-3 py-1 rounded-full border border-[#E9E9E9]">
                  {s.badge}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#202020] mb-2">{s.title}</h3>
              <p className="text-sm text-[#757575] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl bg-white border border-[#E9E9E9] p-12 text-center shadow-sm max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-[#202020] mb-3">
            See the Difference in Your Next Filing
          </h2>
          <p className="text-sm text-[#757575] mb-6">
            Pair your extension in 60 seconds and experience 1.2-second form injection today.
          </p>
          <Link href="/pricing" className="btn-cvpilot text-sm">
            <span>Get Started with Germin8</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
