"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Building2,
  History,
  Laptop,
  Key,
  BarChart3,
  Users,
  CreditCard,
  Receipt,
  Settings,
  HelpCircle,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [workspace, setWorkspace] = useState("Technova CA Practice");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: "Overview", href: "/app/dashboard", icon: LayoutDashboard },
    { label: "MCA Automation", href: "/app/automation", icon: Zap },
    { label: "My Clients", href: "/app/clients", icon: Building2 },
    { label: "Automation History", href: "/app/history", icon: History },
    { label: "Extension", href: "/app/extension", icon: Laptop },
    { label: "API Credentials", href: "/app/api-credentials", icon: Key },
    { label: "Analytics", href: "/app/analytics", icon: BarChart3 },
    { label: "Team", href: "/app/team", icon: Users },
    { label: "Subscription", href: "/app/subscription", icon: CreditCard },
    { label: "Billing", href: "/app/billing", icon: Receipt },
    { label: "Settings", href: "/app/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-[#171717]">
      
      {/* ── LEFT SIDEBAR ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E8EAED] flex flex-col justify-between transition-transform duration-200 md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div>
          {/* Logo */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-[#E8EAED]">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#171717] flex items-center justify-center text-[#E5B52B] font-bold text-xs">
                G8
              </div>
              <span className="text-lg font-extrabold text-[#171717]">
                GERMIN<span className="text-[#E5B52B]">8</span>
              </span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-[#737373]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-[#FFF8E5] text-[#171717] font-semibold border-l-3 border-[#E5B52B]"
                      : "text-[#737373] hover:text-[#171717] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#E5B52B]" : "text-[#737373]"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile / Support Strip */}
        <div className="p-4 border-t border-[#E8EAED] bg-white space-y-2">
          <Link
            href="/platform-admin"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#737373] hover:bg-[#F8FAFC] border border-[#E8EAED]"
          >
            <span className="font-medium text-[#171717]">Super Admin Console</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          
          <div className="flex items-center gap-3 pt-2">
            <div className="w-8 h-8 rounded-full bg-[#171717] text-[#E5B52B] font-bold text-xs flex items-center justify-center">
              CA
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="text-xs font-bold text-[#171717] truncate">Rajesh Sharma</div>
              <div className="text-[10px] text-[#737373] truncate">Partner • Technova Firm</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT WRAPPER ── */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b border-[#E8EAED] px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-md border border-[#E8EAED] text-[#171717]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Workspace Selector */}
            <div className="flex items-center gap-2 bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E8EAED] text-xs font-semibold text-[#171717]">
              <Building2 className="w-3.5 h-3.5 text-[#E5B52B]" />
              <span>{workspace}</span>
              <ChevronDown className="w-3 h-3 text-[#737373]" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block w-64">
              <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search clients, jobs, DINs..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#E8EAED] bg-[#F8FAFC] text-xs text-[#171717] focus:outline-none focus:border-[#E5B52B]"
              />
            </div>

            {/* Notification & Status */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg text-[#737373] hover:text-[#171717] hover:bg-[#F8FAFC] relative">
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-[#16A36A] absolute top-1.5 right-1.5" />
              </button>

              <Link
                href="/pricing"
                className="text-xs bg-[#FFF8E5] border border-[#E5B52B]/40 text-[#171717] px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5"
              >
                <span>Company Plan</span>
                <span className="text-[10px] text-[#16A36A]">● Active</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="p-6 sm:p-8 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}
