"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, HelpCircle, ShieldCheck } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  const plans = [
    {
      id: "individual",
      name: "Individual",
      audience: "For Independent CA / CS Practitioners",
      monthlyPrice: 2999,
      yearlyPrice: 2399,
      description: "Everything a solo professional needs to eliminate manual data entry across recurring MCA filings.",
      features: [
        "1 Practitioner Workspace Seat",
        "Up to 2 Paired Chrome Extensions",
        "150 MCA Form Injections / month",
        "SPICe+, AOC-4, DIR-12, MGT-7, ADT-1",
        "Client Entity Vault (Up to 50 companies)",
        "Standard Email Support",
        "Pre-Scrutiny Checksum Validation"
      ],
      ctaText: "Start 7-Day Free Trial",
      ctaLink: "/contact?plan=individual",
      popular: false
    },
    {
      id: "company",
      name: "Company",
      audience: "For Chartered Accountancy & CS Firms",
      monthlyPrice: 8999,
      yearlyPrice: 7199,
      description: "Multi-seat collaborative workspace engineered for firms with article clerks and audit teams.",
      features: [
        "10 Multi-Seat Team Workspace",
        "Role-Based Access (Partner vs Preparer)",
        "1,000 MCA Form Injections / month",
        "Unlimited Chrome Extension Pairs",
        "Client Entity Vault (Up to 500 companies)",
        "Developer API Keys (500 req/min)",
        "Priority Email & Chat SLA",
        "Immutable Forensic Audit Trail Logs"
      ],
      ctaText: "Start Firm Free Trial",
      ctaLink: "/contact?plan=company",
      popular: true
    },
    {
      id: "custom",
      name: "Custom / Enterprise",
      audience: "For Large Practices & Corporate Legal Teams",
      monthlyPrice: 24999,
      yearlyPrice: 19999,
      description: "Dedicated infrastructure, custom ontologies, and enterprise SLA for high-volume filings.",
      features: [
        "Unlimited Firm Team Seats",
        "Custom Statutory Ontologies (LLP-8, CHG-1)",
        "Unlimited Monthly Form Injections",
        "Dedicated On-Premise Relay Option",
        "Custom ERP & Practice Management Sync",
        "SOC 2 Type II Compliant Audit Exports",
        "24/7 Dedicated Legal Tech Support",
        "Tailored SLA Guarantees"
      ],
      ctaText: "Contact Enterprise Sales",
      ctaLink: "/contact?plan=enterprise",
      popular: false
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-[#F1A33B] uppercase mb-2 block">
            SUBSCRIPTION PLANS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#202020] tracking-tight">
            Transparent Pricing. <br />
            <span className="italic font-normal">Predictable Compliance.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#757575] leading-relaxed">
            All plans include full e-form schema support, pre-scrutiny checksum validation, and secure browser extension pairing.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-[#F7F7F7] border border-[#E9E9E9]">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-[#202020] shadow-sm"
                  : "text-[#757575] hover:text-[#202020]"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === "yearly"
                  ? "bg-[#F1A33B] text-white shadow-sm"
                  : "text-[#757575] hover:text-[#202020]"
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {plans.map((plan) => {
            const price = billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className={`p-8 rounded-[32px] border transition-all duration-300 flex flex-col justify-between ${
                  plan.popular
                    ? "bg-[#FFF8E9]/60 border-2 border-[#F1A33B] shadow-xl relative"
                    : "bg-white border-[#E9E9E9] shadow-sm hover:border-[#F1A33B]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F1A33B] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow">
                    Most Popular for CA Firms
                  </div>
                )}

                <div>
                  <span className="text-xs font-bold text-[#757575] uppercase tracking-wider">
                    {plan.name}
                  </span>
                  <div className="text-xs text-[#F1A33B] font-semibold mt-0.5">
                    {plan.audience}
                  </div>

                  <div className="mt-6 pb-6 border-b border-[#E9E9E9]">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl sm:text-5xl font-bold text-[#202020]">
                        ₹{price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-[#757575]">/ month</span>
                    </div>
                    <div className="text-[11px] text-[#757575] mt-1">
                      {billingCycle === "yearly" ? `Billed annually (₹${(price * 12).toLocaleString("en-IN")}/yr + GST)` : "Billed monthly (+ GST)"}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#757575] mt-6 leading-relaxed">
                    {plan.description}
                  </p>

                  <ul className="mt-6 space-y-3 text-xs sm:text-sm">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[#202020]">
                        <Check className="w-4 h-4 text-[#059669] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E9E9E9]">
                  <Link
                    href={plan.ctaLink}
                    className={`w-full text-center justify-center text-sm ${
                      plan.popular ? "btn-cvpilot" : "btn-cvpilot-outline"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix */}
        <div className="pt-12 border-t border-[#E9E9E9]">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202020] mb-8 text-center">
            Detailed Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[#202020] text-xs uppercase tracking-wider text-[#202020]">
                  <th className="py-4 px-4 font-bold">Feature Capability</th>
                  <th className="py-4 px-4 font-bold">Individual</th>
                  <th className="py-4 px-4 font-bold">Company</th>
                  <th className="py-4 px-4 font-bold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E9E9] text-xs sm:text-sm text-[#757575]">
                <tr>
                  <td className="py-4 px-4 font-medium text-[#202020]">Team Seats Included</td>
                  <td className="py-4 px-4">1 Seat</td>
                  <td className="py-4 px-4 font-semibold text-[#202020]">10 Seats</td>
                  <td className="py-4 px-4 font-semibold text-[#202020]">Custom / Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-[#202020]">Monthly Form Injections</td>
                  <td className="py-4 px-4">150 Forms</td>
                  <td className="py-4 px-4 font-semibold text-[#202020]">1,000 Forms</td>
                  <td className="py-4 px-4 font-semibold text-[#202020]">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-[#202020]">Client Entity Vault</td>
                  <td className="py-4 px-4">50 Entities</td>
                  <td className="py-4 px-4 font-semibold text-[#202020]">500 Entities</td>
                  <td className="py-4 px-4 font-semibold text-[#202020]">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-[#202020]">Role-Based Access (Admin/Preparer)</td>
                  <td className="py-4 px-4">—</td>
                  <td className="py-4 px-4 text-[#059669] font-bold">✓ Included</td>
                  <td className="py-4 px-4 text-[#059669] font-bold">✓ Included</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-[#202020]">Forensic SHA-256 Audit Logs</td>
                  <td className="py-4 px-4">30 Days</td>
                  <td className="py-4 px-4 text-[#059669] font-bold">1 Year</td>
                  <td className="py-4 px-4 text-[#059669] font-bold">7 Years (Statutory)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-[#202020]">Developer API Access</td>
                  <td className="py-4 px-4">—</td>
                  <td className="py-4 px-4 text-[#059669] font-bold">500 req/min</td>
                  <td className="py-4 px-4 text-[#059669] font-bold">High-Throughput</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
