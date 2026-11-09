import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function WhyChooseSection() {
  return (
    <section className="py-24 bg-[#F7F7F7] border-y border-[#E9E9E9]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202020] tracking-tight">
            Why Choose Germin8
          </h2>
          <p className="text-[#757575] mt-4 text-base leading-relaxed">
            Deterministic DOM automation, verified statutory accuracy, and full auditability—everything CA firms need to file with total peace of mind.
          </p>

          <div className="mt-6 flex justify-center">
            <Link href="/pricing" className="btn-cvpilot text-sm">
              <span>Start Free Practice Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Metric Columns with Divider Lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-[#E9E9E9] text-left">
          
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#757575] mb-1">
              Experience Launched
            </div>
            <div className="font-serif text-3xl font-bold text-[#202020] mb-2">
              Since 2021
            </div>
            <p className="text-xs sm:text-sm text-[#757575] leading-relaxed">
              Built with a clear mission: eliminate repetitive manual drudgery from Indian statutory corporate filings.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#757575] mb-1">
              Statutory Filings Processed
            </div>
            <div className="font-serif text-3xl font-bold text-[#F1A33B] mb-2">
              100,000+
            </div>
            <p className="text-xs sm:text-sm text-[#757575] leading-relaxed">
              Thousands of e-forms injected seamlessly without a single browser freeze or portal session disconnect.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#757575] mb-1">
              Practitioner Success Score
            </div>
            <div className="font-serif text-3xl font-bold text-[#202020] mb-2">
              99.8%
            </div>
            <p className="text-xs sm:text-sm text-[#757575] leading-relaxed">
              Guaranteed first-pass pre-scrutiny pass rate across SPICe+, AOC-4, DIR-12, MGT-7, and ADT-1 forms.
            </p>
          </div>

        </div>

        {/* 3 Visual Thumbnail Cards inspired by CVPilot */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
          
          {/* Card 1: Form Templates */}
          <div className="relative rounded-2xl overflow-hidden h-44 bg-gradient-to-tr from-[#202020] to-[#404040] p-4 flex flex-col justify-end shadow-md group">
            <div className="absolute inset-0 bg-[#F1A33B]/10 opacity-30 group-hover:opacity-40 transition-opacity" />
            <div className="relative z-10 flex justify-center">
              <span className="bg-white/95 backdrop-blur-sm text-[#202020] text-xs font-semibold px-4 py-1.5 rounded-full shadow flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#059669]" />
                MCA Form Templates
              </span>
            </div>
          </div>

          {/* Card 2: Deterministic Injection */}
          <div className="relative rounded-2xl overflow-hidden h-44 bg-gradient-to-tr from-[#F1A33B] to-[#F5D45C] p-4 flex flex-col justify-end shadow-md group">
            <div className="absolute inset-0 bg-black/10 opacity-30 group-hover:opacity-40 transition-opacity" />
            <div className="relative z-10 flex justify-center">
              <span className="bg-white/95 backdrop-blur-sm text-[#202020] text-xs font-semibold px-4 py-1.5 rounded-full shadow flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#059669]" />
                Deterministic Injection
              </span>
            </div>
          </div>

          {/* Card 3: Fast & Secure */}
          <div className="relative rounded-2xl overflow-hidden h-44 bg-gradient-to-tr from-[#1E293B] to-[#334155] p-4 flex flex-col justify-end shadow-md group">
            <div className="absolute inset-0 bg-[#E8E8F8]/20 opacity-30 group-hover:opacity-40 transition-opacity" />
            <div className="relative z-10 flex justify-center">
              <span className="bg-white/95 backdrop-blur-sm text-[#202020] text-xs font-semibold px-4 py-1.5 rounded-full shadow flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#059669]" />
                Fast &amp; 100% Secure
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
