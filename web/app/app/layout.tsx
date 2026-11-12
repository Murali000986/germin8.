"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Building2,
  History,
  Laptop,
  Key,
  Users,
  Shield,
  CreditCard,
  Receipt,
  FileText,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

type NavGroup = {
  label: string;
  items: { label: string; href: string; icon: React.ElementType }[];
};

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Automation",
    items: [
      { label: "Automations", href: "/app/automation", icon: Zap },
      { label: "Clients", href: "/app/clients", icon: Building2 },
      { label: "History", href: "/app/history", icon: History },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { label: "Extension Fleet", href: "/app/extension", icon: Laptop },
      { label: "API Keys", href: "/app/api-credentials", icon: Key },
    ],
  },
  {
    label: "Team",
    items: [
      { label: "Team Members", href: "/app/team", icon: Users },
      { label: "Roles", href: "/app/roles", icon: Shield },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Subscription", href: "/app/subscription", icon: CreditCard },
      { label: "Billing", href: "/app/billing", icon: Receipt },
      { label: "Invoices", href: "/app/invoices", icon: FileText },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Settings", href: "/app/settings", icon: Settings },
    ],
  },
];

// Role-aware items: roles that can see each nav group
const groupVisibility: Record<string, string[]> = {
  Overview: ["owner", "admin", "accountant", "operator", "viewer"],
  Automation: ["owner", "admin", "accountant", "operator"],
  Infrastructure: ["owner", "admin"],
  Team: ["owner", "admin"],
  Finance: ["owner", "admin", "accountant"],
  Settings: ["owner", "admin", "accountant", "operator", "viewer"],
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [role, setRole] = useState("owner");
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("germin8_role") ?? "owner";
      setRole(stored);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleGroups = navGroups.filter((g) =>
    (groupVisibility[g.label] ?? []).includes(role)
  );

  const breadcrumb = (() => {
    for (const g of navGroups) {
      for (const item of g.items) {
        if (item.href === pathname) return [g.label, item.label];
      }
    }
    return ["App"];
  })();

  return (
    <div className="min-h-screen bg-white flex text-[#171717]">

      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── LEFT SIDEBAR ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-white border-r border-[#E8EAED] flex flex-col transition-transform duration-200 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-14 px-5 flex items-center justify-between border-b border-[#E8EAED] flex-shrink-0">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#171717] flex items-center justify-center">
              <span className="text-[#E5B52B] font-black text-[11px] tracking-tighter">G8</span>
            </div>
            <span className="text-[15px] font-extrabold text-[#171717] tracking-tight">
              GERMIN<span className="text-[#E5B52B]">8</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-md text-[#737373] hover:text-[#171717]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Workspace Selector */}
        <div className="px-3 py-3 border-b border-[#E8EAED] flex-shrink-0">
          <button
            onClick={() => setWorkspaceOpen((p) => !p)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-[#E8EAED] bg-white hover:bg-[#F9F9F9] transition-colors text-left"
          >
            <div className="w-6 h-6 rounded bg-[#E5B52B]/15 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-3.5 h-3.5 text-[#E5B52B]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-[#171717] truncate">Technova CA Practice</div>
              <div className="text-[10px] text-[#737373]">Company Plan</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#737373] flex-shrink-0" />
          </button>
          {workspaceOpen && (
            <div className="mt-1.5 rounded-lg border border-[#E8EAED] bg-white shadow-lg overflow-hidden">
              {["Technova CA Practice", "Singhania & Co", "+ New Workspace"].map((ws) => (
                <button
                  key={ws}
                  onClick={() => setWorkspaceOpen(false)}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-[#171717] hover:bg-[#F9F9F9] transition-colors"
                >
                  {ws}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {visibleGroups.map((group) => (
            <div key={group.label}>
              <div className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-[#737373]">
                {group.label}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`nav-item flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium transition-colors ${
                        isActive
                          ? "nav-item-active"
                          : "text-[#737373] hover:text-[#171717] hover:bg-[#F9F9F9]"
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isActive ? "text-[#171717]" : "text-[#737373]"
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom: Super Admin + User Strip */}
        <div className="flex-shrink-0 border-t border-[#E8EAED] p-3 space-y-2">
          {role === "owner" && (
            <Link
              href="/platform-admin"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[11px] text-[#737373] hover:bg-[#F9F9F9] border border-[#E8EAED] transition-colors"
            >
              <span className="font-semibold text-[#171717]">Super Admin Console</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
          <div className="flex items-center gap-2.5 px-1 py-1">
            <div className="w-8 h-8 rounded-full bg-[#171717] text-[#E5B52B] font-black text-xs flex items-center justify-center flex-shrink-0">
              RS
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-[#171717] truncate">Rajesh Sharma</div>
              <div className="text-[10px] text-[#737373] truncate capitalize">{role} · Technova Firm</div>
            </div>
            <button
              className="p-1 rounded-md text-[#737373] hover:text-[#DC5353] hover:bg-[#FEE2E2] transition-colors"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT WRAPPER ── */}
      <div className="flex-1 md:pl-60 flex flex-col min-w-0">

        {/* Top Navigation Bar */}
        <header
          className={`h-14 px-6 flex items-center justify-between sticky top-0 z-30 transition-shadow ${
            scrolled ? "glass-nav shadow-sm" : "bg-white border-b border-[#E8EAED]"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-md border border-[#E8EAED] text-[#171717]"
            >
              <Menu className="w-4 h-4" />
            </button>
            {/* Breadcrumb */}
            <nav className="hidden sm:flex items-center gap-1 text-xs text-[#737373]">
              <span className="font-medium">{breadcrumb[0]}</span>
              {breadcrumb[1] && breadcrumb[1] !== breadcrumb[0] && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="font-semibold text-[#171717]">{breadcrumb[1]}</span>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Global Search */}
            <div className="relative hidden sm:block">
              <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search clients, jobs, DINs…"
                className="w-56 pl-8 pr-3 py-1.5 rounded-lg border border-[#E8EAED] bg-white text-xs text-[#171717] placeholder:text-[#737373] focus:outline-none focus:ring-1 focus:ring-[#E5B52B] focus:border-[#E5B52B]"
              />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen((p) => !p)}
                className="p-2 rounded-lg text-[#737373] hover:text-[#171717] hover:bg-[#F9F9F9] relative transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-[#DC5353] absolute top-1.5 right-1.5 ring-2 ring-white" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-[#E8EAED] shadow-xl z-50">
                  <div className="px-4 py-3 border-b border-[#E8EAED] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171717]">Notifications</span>
                    <button className="text-[10px] text-[#E5B52B] font-semibold">Mark all read</button>
                  </div>
                  {[
                    { title: "JOB-2026-904 completed", sub: "SPICe+ Part B filed successfully", time: "12m ago", dot: "#16A36A" },
                    { title: "Team invite accepted", sub: "Priya Mehta joined as Accountant", time: "1h ago", dot: "#4385DF" },
                    { title: "Quota at 85%", sub: "847/1,000 filings used this month", time: "3h ago", dot: "#E5B52B" },
                  ].map((n) => (
                    <div key={n.title} className="px-4 py-3 border-b border-[#E8EAED] hover:bg-[#F9F9F9] cursor-pointer">
                      <div className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: n.dot }} />
                        <div>
                          <div className="text-[11px] font-semibold text-[#171717]">{n.title}</div>
                          <div className="text-[10px] text-[#737373]">{n.sub}</div>
                        </div>
                        <span className="ml-auto text-[10px] text-[#737373] flex-shrink-0">{n.time}</span>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-2 text-center">
                    <button className="text-[11px] text-[#737373] hover:text-[#171717]">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Plan Badge */}
            <div className="text-[11px] bg-[#FFF8E5] border border-[#E5B52B]/40 text-[#171717] px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5">
              <span>Company Plan</span>
              <span className="text-[10px] text-[#16A36A] font-bold">● Active</span>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="p-6 sm:p-8 flex-1 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
