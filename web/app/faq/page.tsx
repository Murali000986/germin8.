"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Search, ArrowRight } from "lucide-react";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>("gen-0");

  const categories = [
    {
      title: "General & Concept",
      items: [
        {
          id: "gen-0",
          q: "What is Germin8 and who is it designed for?",
          a: "Germin8 is a specialized statutory form automation platform built for Indian Chartered Accountants, Company Secretaries, and corporate legal teams who file e-forms on the Ministry of Corporate Affairs (MCA V3) portal."
        },
        {
          id: "gen-1",
          q: "Is Germin8 affiliated with the Ministry of Corporate Affairs?",
          a: "No. Germin8 is an independent software tool providing browser-based assistance. It is neither endorsed by nor affiliated with the Ministry of Corporate Affairs or any governmental body."
        }
      ]
    },
    {
      title: "Security & Passwords",
      items: [
        {
          id: "sec-0",
          q: "Does Germin8 ask for or store my official MCA portal password?",
          a: "Never. Germin8 operates on a strict zero-trust model. The practitioner logs in directly to mca.gov.in; our paired browser extension interacts exclusively with the rendered DOM inside your active browser session."
        },
        {
          id: "sec-1",
          q: "Can Germin8 automatically submit forms without my knowledge?",
          a: "No. Germin8 strictly stops after pre-scrutiny and field injection. Final submission and attaching your physical Digital Signature Certificate (DSC) USB token must be performed manually by the certified professional."
        }
      ]
    },
    {
      title: "Forms & Accuracy",
      items: [
        {
          id: "form-0",
          q: "Which MCA e-forms are currently supported?",
          a: "Production support is live for SPICe+ Part B (Incorporation), Form AOC-4 (Financial Statements), Form DIR-12 (Directors/KMP), Form MGT-7/7A (Annual Returns), and Form ADT-1 (Auditor Notice). Custom firm ontologies for LLP and CHG forms are available on Enterprise plans."
        },
        {
          id: "form-1",
          q: "What is the pre-scrutiny checksum score?",
          a: "Before injecting data into the DOM, Germin8 runs checksum validation against PAN regular expressions, DIN lengths, and postal PIN boundaries to ensure zero defect notice risk from the portal."
        }
      ]
    },
    {
      title: "Subscription & Billing",
      items: [
        {
          id: "bill-0",
          q: "Can I upgrade or downgrade my plan anytime?",
          a: "Yes. You can switch between Individual, Company, and Enterprise tiers at any point from your billing dashboard. Pro-rata adjustments are calculated automatically."
        },
        {
          id: "bill-1",
          q: "Do you issue valid GST invoices?",
          a: "Yes. All subscription payments receive an automated GST tax invoice with your firm's GSTIN and legal billing particulars."
        }
      ]
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-[#F1A33B] uppercase mb-2 block">
            HELP &amp; FREQUENTLY ASKED
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#202020] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base text-[#757575]">
            Everything you need to know about MCA V3 automation, security boundaries, and practice pricing.
          </p>

          <div className="mt-8 relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-[#757575] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions by keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-[#E9E9E9] text-sm focus:outline-none focus:border-[#F1A33B]"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((cat, cIdx) => {
            const filteredItems = cat.items.filter(
              item => item.q.toLowerCase().includes(searchTerm.toLowerCase()) || item.a.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredItems.length === 0) return null;

            return (
              <div key={cIdx}>
                <h3 className="font-serif text-2xl font-bold text-[#202020] mb-6 pb-2 border-b border-[#E9E9E9]">
                  {cat.title}
                </h3>
                <div className="space-y-4">
                  {filteredItems.map((item) => {
                    const isOpen = openFaq === item.id;
                    return (
                      <div key={item.id} className="bg-[#F7F7F7] rounded-2xl border border-[#E9E9E9] overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : item.id)}
                          className="w-full p-5 text-left flex items-center justify-between font-serif text-base sm:text-lg font-bold text-[#202020]"
                        >
                          <span>{item.q}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-[#F1A33B] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#757575] shrink-0" />}
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-sm text-[#757575] leading-relaxed border-t border-[#E9E9E9]/60 pt-3 bg-white">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <div className="mt-20 p-8 rounded-3xl bg-[#FFF8E9] border border-[#F5D45C]/50 text-center">
          <h3 className="font-serif text-xl font-bold text-[#202020] mb-2">Have a question not listed here?</h3>
          <p className="text-sm text-[#757575] mb-4">Our compliance engineering team is available Mon–Sat to assist your firm.</p>
          <Link href="/contact" className="btn-cvpilot text-sm">
            <span>Contact Support</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
