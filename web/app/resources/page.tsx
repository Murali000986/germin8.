"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, BookOpen, FileText, Sparkles } from "lucide-react";

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const articles = [
    {
      title: "Mastering SPICe+ Part B: Common Pitfalls and Automation Strategies",
      category: "Incorporation",
      readTime: "6 min read",
      date: "Nov 2026",
      desc: "How to avoid capital clause mismatches and streamline PAN/TAN declarations during company incorporation."
    },
    {
      title: "AOC-4 Financial Filing: Reconciling Balance Sheets with SRN Checksums",
      category: "Financials",
      readTime: "8 min read",
      date: "Oct 2026",
      desc: "A step-by-step technical walkthrough on how Germin8 pre-validates CSR disclosures and auditor FRN details."
    },
    {
      title: "DIR-12 Best Practices: Managing Director Appointments & Resignations",
      category: "Governance",
      readTime: "5 min read",
      date: "Oct 2026",
      desc: "Handling DIR-2 consent forms, DIN validity checks, and effective date formatting on MCA V3."
    },
    {
      title: "MGT-7 Annual Returns: Automating Shareholding and Promoter Equity",
      category: "Annual Returns",
      readTime: "7 min read",
      date: "Sep 2026",
      desc: "Speed up heavy AGM shareholding declarations with centralized client vault data mapping."
    },
    {
      title: "Why MCA V3 Single Page Applications Break Traditional Form Fillers",
      category: "Technical Guide",
      readTime: "10 min read",
      date: "Aug 2026",
      desc: "An architectural analysis of Angular reactive forms, synthetic event bubbling, and prototype property setters."
    },
    {
      title: "Zero-Trust Compliance: Managing Article Clerk Permissions in CA Firms",
      category: "Practice Management",
      readTime: "6 min read",
      date: "Jul 2026",
      desc: "How multi-seat RBAC workspaces protect master partner credentials while delegating filing preparation."
    }
  ];

  const categories = ["All", "Incorporation", "Financials", "Governance", "Annual Returns", "Technical Guide", "Practice Management"];

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold tracking-widest text-[#F1A33B] uppercase mb-2 block">
            KNOWLEDGE BASE &amp; GUIDES
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#202020] tracking-tight">
            MCA Compliance <br />
            <span className="italic font-normal">Resource Hub.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#757575] leading-relaxed">
            Technical guides, statutory breakdowns, and practice management tips for Indian corporate secretarial and accounting professionals.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-12 border-b border-[#E9E9E9]">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-[#757575] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides, forms, or technical topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-[#E9E9E9] text-sm focus:outline-none focus:border-[#F1A33B] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-[#202020] text-white"
                    : "bg-[#F7F7F7] text-[#757575] hover:text-[#202020]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-[#E9E9E9] bg-white hover:border-[#F1A33B] transition-all duration-200 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between text-xs text-[#757575] mb-3">
                  <span className="bg-[#FFF8E9] text-[#F1A33B] font-semibold px-2.5 py-0.5 rounded-full border border-[#F5D45C]">
                    {item.category}
                  </span>
                  <span>{item.readTime}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#202020] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#757575] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E9E9E9] flex items-center justify-between text-xs font-semibold text-[#202020]">
                <span>{item.date}</span>
                <span className="text-[#F1A33B] inline-flex items-center gap-1 group-hover:underline">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#757575]">
            No resources match your search criteria. Try a different search term.
          </div>
        )}

      </div>
    </div>
  );
}
