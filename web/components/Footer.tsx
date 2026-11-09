"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Lock } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // If inside the dashboard or admin, do not render public marketing footer
  if (pathname.startsWith("/app") || pathname.startsWith("/platform-admin")) {
    return null;
  }

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E8EAED] pt-16 pb-12 text-[#171717]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E8EAED]">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#171717] flex items-center justify-center text-[#E5B52B] font-bold text-xs">
                G8
              </div>
              <span className="text-xl font-bold text-[#171717]">
                GERMIN<span className="text-[#E5B52B]">8</span>
              </span>
            </Link>
            <p className="text-sm text-[#737373] leading-relaxed max-w-sm">
              The intelligent MCA V3 e-filing automation platform engineered for Chartered Accountants, Company Secretaries, and Corporate Law Firms.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#737373] pt-2">
              <span className="inline-flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-md border border-[#E8EAED]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A36A]" />
                Zero Password Storage
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-md border border-[#E8EAED]">
                <Lock className="w-3.5 h-3.5 text-[#E5B52B]" />
                Mandatory DSC Sign-off
              </span>
            </div>
          </div>

          {/* Column: Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-[#737373]">
              <li><Link href="/product" className="hover:text-[#171717] transition-colors">Overview</Link></li>
              <li><Link href="/product#forms" className="hover:text-[#171717] transition-colors">Supported Forms</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#171717] transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-[#171717] transition-colors">Pricing &amp; Plans</Link></li>
              <li><Link href="/security" className="hover:text-[#171717] transition-colors">Statutory Security</Link></li>
            </ul>
          </div>

          {/* Column: Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-[#737373]">
              <li><Link href="/solutions#individual" className="hover:text-[#171717] transition-colors">Solo Practitioners</Link></li>
              <li><Link href="/solutions#firms" className="hover:text-[#171717] transition-colors">CA &amp; CS Firms</Link></li>
              <li><Link href="/solutions#enterprise" className="hover:text-[#171717] transition-colors">Corporate Legal Teams</Link></li>
              <li><Link href="/resources" className="hover:text-[#171717] transition-colors">Resource Hub</Link></li>
              <li><Link href="/faq" className="hover:text-[#171717] transition-colors">Frequently Asked</Link></li>
            </ul>
          </div>

          {/* Column: App Portals & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-4">
              Portals &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-[#737373]">
              <li><Link href="/app/dashboard" className="text-[#171717] font-semibold hover:text-[#E5B52B] transition-colors">Customer Dashboard →</Link></li>
              <li><Link href="/platform-admin" className="text-[#171717] font-semibold hover:text-[#E5B52B] transition-colors">Super Admin Console →</Link></li>
              <li><Link href="/about" className="hover:text-[#171717] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#171717] transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-[#171717] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#171717] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <div>
            © {new Date().getFullYear()} Germin8 Technologies Private Limited. All rights reserved.
          </div>
          <div className="text-center md:text-right max-w-xl text-[11px] leading-relaxed">
            Statutory Notice: Germin8 is an independent software tool providing browser-based assistance for MCA V3 filings. It is not affiliated with or endorsed by the Ministry of Corporate Affairs, Government of India.
          </div>
        </div>

      </div>
    </footer>
  );
}
