import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Users, Target } from "lucide-react";

export const metadata = {
  title: "About Us | Germin8 MCA Automation",
  description: "Learn about the mission, founding philosophy, and engineering standards behind the Germin8 platform.",
};

export default function AboutPage() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#F1A33B] uppercase mb-2 block">
            ABOUT GERMIN8
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#202020] tracking-tight">
            Built by Practitioners, <br />
            <span className="italic font-normal">for Practitioners.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#757575] leading-relaxed">
            Our mission is simple: eliminate the hundreds of hours Chartered Accountants and Company Secretaries lose every year to manual re-keying on government portals.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 text-[#757575] text-base leading-relaxed">
            <h2 className="font-serif text-3xl font-bold text-[#202020]">
              The Problem We Set Out to Solve
            </h2>
            <p>
              In 2021, when the Ministry of Corporate Affairs launched the MCA V3 portal, the digital filing landscape changed dramatically. Forms moved to complex single-page web applications with nested reactive validators.
            </p>
            <p>
              For corporate compliance professionals, this meant hours spent manually typing the exact same 21-digit CINs, 8-digit DINs, and authorized capital figures across dozens of forms. A single mistyped character meant defect notices, client penalties, and endless re-submissions.
            </p>
            <p>
              We built Germin8 as the antidote: a deterministic, zero-trust browser automation layer that pairs with the practitioner's browser to inject verified client data with mathematical precision.
            </p>
          </div>

          <div className="bg-[#FFF8E9] p-8 sm:p-12 rounded-[32px] border border-[#F5D45C]/50 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F1A33B]">
              OUR CORE PHILOSOPHIES
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white text-[#F1A33B] flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#202020]">Zero-Trust Security</h4>
                  <p className="text-xs text-[#757575] mt-1">We never ask for, proxy, or store government portal passwords. Your credentials remain strictly yours.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white text-[#F1A33B] flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#202020]">Mandatory Human Gate</h4>
                  <p className="text-xs text-[#757575] mt-1">We automate the data entry drudgery, but the final statutory review and DSC token signature remain with the licensed professional.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white text-[#F1A33B] flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#202020]">Deterministic Reliability</h4>
                  <p className="text-xs text-[#757575] mt-1">Every injection is verified against statutory schemas and backed by immutable SHA-256 audit logs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-12 rounded-3xl bg-[#F7F7F7] border border-[#E9E9E9] text-center max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#202020] mb-3">
            Join the Modern Filing Era
          </h3>
          <p className="text-sm text-[#757575] mb-6">
            Explore how Germin8 can transform your practice’s statutory workflow today.
          </p>
          <Link href="/pricing" className="btn-cvpilot text-sm">
            <span>Explore Pricing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
