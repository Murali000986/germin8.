"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X, Shield, LayoutDashboard, Terminal } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If inside the dashboard or admin, do not render public marketing navbar
  if (pathname.startsWith("/app") || pathname.startsWith("/platform-admin")) {
    return null;
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Product", href: "/product" },
    { label: "Solutions", href: "/solutions" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Resources", href: "/resources" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#171717] flex items-center justify-center text-[#E5B52B] font-bold text-sm tracking-tight shadow-sm">
            G8
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-[#171717] leading-none">
              GERMIN<span className="text-[#E5B52B]">8</span>
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-[#737373] uppercase mt-0.5">
              MCA Automation Platform
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#171717] font-semibold bg-[#F8FAFC]"
                    : "text-[#737373] hover:text-[#171717] hover:bg-[#F8FAFC]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/app/dashboard"
            className="text-xs font-semibold text-[#171717] hover:text-[#E5B52B] px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 border border-[#E8EAED] bg-white shadow-xs"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/platform-admin"
            className="text-xs font-semibold text-[#737373] hover:text-[#171717] px-3 py-1.5 rounded-md transition-colors"
          >
            Super Admin
          </Link>

          <Link
            href="/pricing"
            className="btn-primary text-xs py-2 px-4"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E5B52B]" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#171717] hover:bg-[#F8FAFC]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E8EAED] px-6 py-5 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#171717] py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#E8EAED] flex flex-col gap-2">
            <Link
              href="/app/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-secondary text-center justify-center text-xs"
            >
              Customer Dashboard
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary text-center justify-center text-xs"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
