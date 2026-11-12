"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import {
  Shield,
  Users,
  Building2,
  Laptop,
  Activity,
  AlertTriangle,
  TrendingUp,
  Search,
  RefreshCw,
  ArrowUpRight,
  Power,
  UserX,
  Link2Off,
  Download,
  Megaphone,
  Settings,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const mrrData = [
  { month: "Dec", mrr: 11.2 },
  { month: "Jan", mrr: 13.8 },
  { month: "Feb", mrr: 16.4 },
  { month: "Mar", mrr: 18.9 },
  { month: "Apr", mrr: 20.1 },
  { month: "May", mrr: 21.8 },
  { month: "Jun", mrr: 23.5 },
  { month: "Jul", mrr: 24.6 },
  { month: "Aug", mrr: 25.9 },
  { month: "Sep", mrr: 26.8 },
  { month: "Oct", mrr: 27.5 },
  { month: "Nov", mrr: 28.4 },
];

const planDist = [
  { name: "Firm Plan",       count: 240, color: "#171717" },
  { name: "Solo Plan",       count: 120, color: "#E5B52B" },
  { name: "Enterprise",      count:  29, color: "#4385DF" },
];

const revenueMonthly = [
  { month: "Jun", newSubs: 24, churned: 3,  mrr: 23.5, txns: 182 },
  { month: "Jul", newSubs: 19, churned: 2,  mrr: 24.6, txns: 201 },
  { month: "Aug", newSubs: 31, churned: 4,  mrr: 25.9, txns: 219 },
  { month: "Sep", newSubs: 22, churned: 5,  mrr: 26.8, txns: 234 },
  { month: "Oct", newSubs: 18, churned: 3,  mrr: 27.5, txns: 248 },
  { month: "Nov", newSubs: 27, churned: 2,  mrr: 28.4, txns: 261 },
];

const usersData = [
  { id: "USR-001", name: "CA Rajesh Sharma",    email: "rajesh@technova.com",         plan: "Firm",       workspace: "Technova CA Practice",  status: "Active",    lastLogin: "10m ago" },
  { id: "USR-002", name: "CS Priya Mehta",       email: "priya@technova.com",          plan: "Firm",       workspace: "Technova CA Practice",  status: "Active",    lastLogin: "1h ago" },
  { id: "USR-003", name: "CA Vikram Singhania",  email: "vikram@singhania-ca.in",      plan: "Enterprise", workspace: "Singhania & Co",         status: "Active",    lastLogin: "2h ago" },
  { id: "USR-004", name: "CS Amit Kulkarni",     email: "amit@kulkarni-associates.com",plan: "Solo",       workspace: "Solo Practice",          status: "Active",    lastLogin: "5h ago" },
  { id: "USR-005", name: "CA Sunita Agarwal",    email: "sunita@agarwalca.org",        plan: "Firm",       workspace: "Agarwal Tax Firm",        status: "Active",    lastLogin: "1d ago" },
  { id: "USR-006", name: "CMA Deepak Nair",      email: "deepak@nairco.in",            plan: "Solo",       workspace: "Nair & Associates",       status: "Suspended", lastLogin: "3d ago" },
  { id: "USR-007", name: "CA Meera Krishnan",    email: "meera@kk-law.com",            plan: "Enterprise", workspace: "KK Law & Finance",         status: "Active",    lastLogin: "2d ago" },
];

const companiesData = [
  { id: "CO-001", name: "Technova CA Practice",  owner: "CA Rajesh Sharma",   plan: "Firm",       seats: "7/10",  mrr: "₹14,000", status: "Active" },
  { id: "CO-002", name: "Singhania & Co",         owner: "CA Vikram Singhania",plan: "Enterprise", seats: "18/25", mrr: "₹35,000", status: "Active" },
  { id: "CO-003", name: "Agarwal Tax Firm",       owner: "CA Sunita Agarwal",  plan: "Firm",       seats: "4/10",  mrr: "₹14,000", status: "Active" },
  { id: "CO-004", name: "Solo Practice (Amit K)", owner: "CS Amit Kulkarni",   plan: "Solo",       seats: "1/1",   mrr: "₹2,999",  status: "Active" },
  { id: "CO-005", name: "Nair & Associates",      owner: "CMA Deepak Nair",    plan: "Solo",       seats: "1/1",   mrr: "₹0",      status: "Suspended" },
  { id: "CO-006", name: "KK Law & Finance",       owner: "CA Meera Krishnan",  plan: "Enterprise", seats: "12/25", mrr: "₹35,000", status: "Active" },
];

const devicesData = [
  { id: "DEV-A4F2", workspace: "Technova CA Practice", pairedAt: "Nov 1, 2026", lastPing: "2m ago",   status: "Online" },
  { id: "DEV-B9C1", workspace: "Technova CA Practice", pairedAt: "Oct 20, 2026", lastPing: "5m ago",  status: "Online" },
  { id: "DEV-C3E8", workspace: "Singhania & Co",        pairedAt: "Oct 15, 2026", lastPing: "12m ago", status: "Online" },
  { id: "DEV-D7A5", workspace: "Singhania & Co",        pairedAt: "Sep 28, 2026", lastPing: "1h ago",  status: "Idle" },
  { id: "DEV-E1F9", workspace: "KK Law & Finance",      pairedAt: "Sep 10, 2026", lastPing: "3d ago",  status: "Offline" },
  { id: "DEV-F6B3", workspace: "Agarwal Tax Firm",      pairedAt: "Aug 22, 2026", lastPing: "7h ago",  status: "Idle" },
];

const auditEvents = [
  { hash: "7f83b165", action: "JOB_INJECT_SUCCESS",   user: "CA Rajesh Sharma",   email: "rajesh@technova.com",         ts: "2026-11-09 14:15:30", ip: "103.21.244.2",  details: "SPICe+ Part B — CIN: U72200MH2018PTC309871" },
  { hash: "2c624232", action: "DEVICE_TOKEN_PAIRED",  user: "CS Priya Mehta",     email: "priya@technova.com",          ts: "2026-11-09 14:10:12", ip: "103.21.244.2",  details: "Device DEV-A4F2 paired via extension v2.5.0" },
  { hash: "9d987099", action: "PLAN_QUOTA_RESET",     user: "sys_cron",            email: "system@germin8.in",           ts: "2026-11-09 13:58:44", ip: "127.0.0.1",     details: "Monthly quota reset for workspace ten_technova_ca" },
  { hash: "c4ca4238", action: "USER_SUSPENDED",       user: "Platform Admin",      email: "admin@germin8.in",            ts: "2026-11-09 13:42:01", ip: "10.0.0.1",      details: "USR-006 (CMA Deepak Nair) suspended — billing issue" },
  { hash: "eccbc87e", action: "API_KEY_CREATED",      user: "CA Vikram Singhania", email: "vikram@singhania-ca.in",      ts: "2026-11-09 12:15:19", ip: "49.36.120.84",  details: "New API key: key_live_94a2b… (Singhania & Co)" },
  { hash: "a87ff679", action: "JOB_INJECT_FAILED",    user: "CA Meera Krishnan",   email: "meera@kk-law.com",           ts: "2026-11-09 11:08:43", ip: "122.183.44.12", details: "Form AOC-4 — Portal timeout after 30s" },
  { hash: "1679091c", action: "TEAM_INVITE_SENT",     user: "CA Sunita Agarwal",   email: "sunita@agarwalca.org",        ts: "2026-11-09 10:34:22", ip: "157.49.12.88",  details: "Invite sent to rohan.jha@agarwalca.org (Operator role)" },
  { hash: "8277e091", action: "PLAN_UPGRADED",        user: "CA Rajesh Sharma",    email: "rajesh@technova.com",         ts: "2026-11-08 18:21:05", ip: "103.21.244.2",  details: "Solo → Firm Plan · Razorpay txn: pay_P4bXm9q2F7K1" },
];

type Tab = "users" | "companies" | "devices" | "audit" | "revenue";

// ── Helpers ───────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  if (status === "Active" || status === "Online")
    return <span className="badge-active px-2 py-0.5 rounded-full text-[10px] font-bold">{status}</span>;
  if (status === "Suspended" || status === "Offline")
    return <span className="badge-suspended px-2 py-0.5 rounded-full text-[10px] font-bold">{status}</span>;
  return <span className="badge-trial px-2 py-0.5 rounded-full text-[10px] font-bold">{status}</span>;
}

function ActionBtn({ label, icon: Icon, danger }: { label: string; icon: React.ElementType; danger?: boolean }) {
  return (
    <button
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold border transition-colors ${
        danger
          ? "border-[#FEE2E2] text-[#DC5353] hover:bg-[#FEE2E2]"
          : "border-[#E8EAED] text-[#737373] hover:text-[#171717] hover:bg-[#F9F9F9]"
      }`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PlatformAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [userSearch, setUserSearch] = useState("");
  const [expandedAudit, setExpandedAudit] = useState<string | null>(null);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const filteredUsers = usersData.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const kpiCards = [
    { label: "MRR",            value: "₹28.4L",  sub: "+22% MoM",   color: "#16A36A",  icon: TrendingUp,    danger: false },
    { label: "Total Users",    value: "412",      sub: "+18 this wk",color: "#4385DF",  icon: Users,         danger: false },
    { label: "Active Firms",   value: "128",      sub: "CA/CS firms", color: "#171717",  icon: Building2,     danger: false },
    { label: "Device Fleet",   value: "842",      sub: "Active tokens",color: "#171717", icon: Laptop,        danger: false },
    { label: "Jobs Today",     value: "1,247",    sub: "1.2s avg",   color: "#E5B52B",  icon: Activity,      danger: false },
    { label: "Failed Jobs",    value: "14",       sub: "0.02% error",color: "#DC5353",  icon: AlertTriangle, danger: true },
  ];

  const tabs: { id: Tab; label: string }[] = [
    { id: "users",     label: "Users" },
    { id: "companies", label: "Companies" },
    { id: "devices",   label: "Devices" },
    { id: "audit",     label: "Audit Log" },
    { id: "revenue",   label: "Revenue" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#171717]">
      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-7">

        {/* ── Admin Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8EAED]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#171717] flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#E5B52B]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-black uppercase tracking-widest bg-[#FEE2E2] text-[#DC5353] px-2 py-0.5 rounded-full border border-[#DC5353]/30">
                  PLATFORM ADMIN
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-[#171717] tracking-tight">Super Admin Console</h1>
              <p className="text-xs text-[#737373]">Germin8 Multi-Tenant Engine v2.5.0 · Engineering & Fleet Telemetry</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#16A36A] bg-white border border-[#E8EAED] px-3 py-2 rounded-xl shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#16A36A] animate-pulse" />
              All Systems Operational
            </div>
            <div className="text-xs text-[#737373] bg-[#F9F9F9] border border-[#E8EAED] px-3 py-2 rounded-xl">
              Last sync: <span className="font-semibold text-[#171717]">2m ago</span>
            </div>
            <Link href="/app/dashboard" className="btn-secondary text-xs py-2 px-3">
              Customer View <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── ROW 1: 6 KPI Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="glass-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#737373]">{card.label}</span>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${card.color}18` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: card.color }} />
                  </div>
                </div>
                <div
                  className="text-2xl font-extrabold leading-none"
                  style={{ color: card.danger ? "#DC5353" : "#171717" }}
                >
                  {card.value}
                </div>
                <div className="text-[10px] mt-1.5 font-semibold" style={{ color: card.color }}>
                  {card.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── ROW 2: MRR Chart + Plan Donut ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* MRR Area Chart */}
          <div className="lg:col-span-7 card-white">
            <h2 className="text-sm font-bold text-[#171717]">MRR Trend</h2>
            <p className="text-[11px] text-[#737373] mt-0.5 mb-5">Monthly recurring revenue in ₹ Lakhs (12 months)</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mrrData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#171717" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#171717" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8EAED" vertical={false} />
                  <XAxis dataKey="month" stroke="#737373" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#737373" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E8EAED", borderRadius: "8px", fontSize: "11px" }}
                    formatter={(v: any) => [`₹${v}L`, "MRR"]}
                  />
                  <Area type="monotone" dataKey="mrr" stroke="#171717" strokeWidth={2.5} fill="url(#mrrGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Plan Donut + Churn */}
          <div className="lg:col-span-5 card-white flex flex-col gap-5">
            <div>
              <h2 className="text-sm font-bold text-[#171717]">Subscription Split</h2>
              <p className="text-[11px] text-[#737373] mt-0.5">Plan tier distribution across workspaces</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-36 w-36 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={planDist} innerRadius={36} outerRadius={56} paddingAngle={3} dataKey="count">
                      {planDist.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", borderColor: "#E8EAED" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {planDist.map((p) => (
                  <div key={p.name} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-[11px] text-[#737373]">{p.name}</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#171717]">{p.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-[#E8EAED] flex items-center justify-between">
              <span className="text-[11px] text-[#737373]">Monthly Churn Rate</span>
              <span className="text-sm font-extrabold text-[#DC5353]">1.8%</span>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="border-b border-[#E8EAED]">
          <div className="flex items-center gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === t.id
                    ? "border-[#171717] text-[#171717]"
                    : "border-transparent text-[#737373] hover:text-[#171717]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Users Tab ── */}
        {activeTab === "users" && (
          <div className="card-white p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8EAED] flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold text-[#171717]">All Platform Users</h2>
                <p className="text-[11px] text-[#737373]">{usersData.length} registered accounts</p>
              </div>
              <div className="relative w-56">
                <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search users…"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#E8EAED] text-xs text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#E5B52B]"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8EAED] text-[#737373] text-[10px] uppercase tracking-wider bg-[#F9F9F9]">
                    <th className="px-5 py-3 font-bold">Name & Email</th>
                    <th className="px-4 py-3 font-bold">Plan</th>
                    <th className="px-4 py-3 font-bold">Workspace</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 font-bold">Last Login</th>
                    <th className="px-4 py-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EAED]">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-[#F9F9F9] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#171717] text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">
                            {u.name.split(" ").slice(-2).map((p) => p[0]).join("")}
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-[#171717]">{u.name}</div>
                            <div className="text-[10px] text-[#737373]">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F9F9F9] border border-[#E8EAED] text-[#171717]">{u.plan}</span>
                      </td>
                      <td className="px-4 py-3.5 text-[11px] text-[#737373]">{u.workspace}</td>
                      <td className="px-4 py-3.5"><StatusBadge status={u.status} /></td>
                      <td className="px-4 py-3.5 text-[11px] text-[#737373]">{u.lastLogin}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <ActionBtn label="Suspend" icon={UserX} danger />
                          <ActionBtn label="Make Admin" icon={Shield} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Companies Tab ── */}
        {activeTab === "companies" && (
          <div className="card-white p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8EAED]">
              <h2 className="text-sm font-bold text-[#171717]">All Companies</h2>
              <p className="text-[11px] text-[#737373]">{companiesData.length} registered workspaces</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8EAED] text-[#737373] text-[10px] uppercase tracking-wider bg-[#F9F9F9]">
                    <th className="px-5 py-3 font-bold">Company Name</th>
                    <th className="px-4 py-3 font-bold">Owner</th>
                    <th className="px-4 py-3 font-bold">Plan</th>
                    <th className="px-4 py-3 font-bold">Seats Used</th>
                    <th className="px-4 py-3 font-bold">MRR Contribution</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EAED]">
                  {companiesData.map((co) => (
                    <tr key={co.id} className="hover:bg-[#F9F9F9] transition-colors">
                      <td className="px-5 py-3.5 font-bold text-[#171717] text-[11px]">{co.name}</td>
                      <td className="px-4 py-3.5 text-[11px] text-[#737373]">{co.owner}</td>
                      <td className="px-4 py-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F9F9F9] border border-[#E8EAED] text-[#171717]">{co.plan}</span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[11px] text-[#737373]">{co.seats}</td>
                      <td className="px-4 py-3.5 font-bold text-[#171717] text-[11px]">{co.mrr}</td>
                      <td className="px-4 py-3.5"><StatusBadge status={co.status} /></td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <ActionBtn label="Suspend" icon={Power} danger />
                          <ActionBtn label="View" icon={ArrowUpRight} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Devices Tab ── */}
        {activeTab === "devices" && (
          <div className="card-white p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8EAED]">
              <h2 className="text-sm font-bold text-[#171717]">Device Fleet</h2>
              <p className="text-[11px] text-[#737373]">842 total registered devices across all workspaces</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8EAED] text-[#737373] text-[10px] uppercase tracking-wider bg-[#F9F9F9]">
                    <th className="px-5 py-3 font-bold">Device ID</th>
                    <th className="px-4 py-3 font-bold">Workspace</th>
                    <th className="px-4 py-3 font-bold">Paired At</th>
                    <th className="px-4 py-3 font-bold">Last Ping</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EAED]">
                  {devicesData.map((dev) => (
                    <tr key={dev.id} className="hover:bg-[#F9F9F9] transition-colors">
                      <td className="px-5 py-3.5 font-mono font-bold text-[11px] text-[#4385DF]">{dev.id}</td>
                      <td className="px-4 py-3.5 text-[11px] text-[#737373]">{dev.workspace}</td>
                      <td className="px-4 py-3.5 text-[11px] text-[#737373]">{dev.pairedAt}</td>
                      <td className="px-4 py-3.5 text-[11px] text-[#737373]">{dev.lastPing}</td>
                      <td className="px-4 py-3.5"><StatusBadge status={dev.status} /></td>
                      <td className="px-4 py-3.5">
                        <ActionBtn label="Force Unpair" icon={Link2Off} danger />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Audit Log Tab ── */}
        {activeTab === "audit" && (
          <div className="card-white p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8EAED]">
              <h2 className="text-sm font-bold text-[#171717]">SHA-256 Tamper-Evident Audit Stream</h2>
              <p className="text-[11px] text-[#737373]">Live forensic security log across all workspaces · hash-chained entries</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8EAED] text-[#737373] text-[10px] uppercase tracking-wider bg-[#F9F9F9]">
                    <th className="px-5 py-3 font-bold">SHA-256</th>
                    <th className="px-4 py-3 font-bold">Action</th>
                    <th className="px-4 py-3 font-bold">User</th>
                    <th className="px-4 py-3 font-bold">Timestamp</th>
                    <th className="px-4 py-3 font-bold">IP</th>
                    <th className="px-4 py-3 font-bold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EAED]">
                  {auditEvents.map((evt) => (
                    <React.Fragment key={evt.hash}>
                      <tr className="hover:bg-[#F9F9F9] transition-colors">
                        <td className="px-5 py-3.5 font-mono text-[10px] text-[#737373]">{evt.hash}…</td>
                        <td className="px-4 py-3.5">
                          <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                            evt.action.includes("FAILED") || evt.action.includes("SUSPENDED")
                              ? "bg-[#FEE2E2] text-[#DC5353]"
                              : evt.action.includes("SUCCESS") || evt.action.includes("PAIRED")
                              ? "bg-[#DCFCE7] text-[#16A36A]"
                              : "bg-[#EFF6FF] text-[#4385DF]"
                          }`}>
                            {evt.action}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="text-[11px] font-semibold text-[#171717]">{evt.user}</div>
                          <div className="text-[10px] text-[#737373]">{evt.email}</div>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-[10px] text-[#737373]">{evt.ts}</td>
                        <td className="px-4 py-3.5 font-mono text-[10px] text-[#737373]">{evt.ip}</td>
                        <td className="px-4 py-3.5">
                          <button
                            onClick={() => setExpandedAudit(expandedAudit === evt.hash ? null : evt.hash)}
                            className="flex items-center gap-1 text-[10px] text-[#737373] hover:text-[#171717] font-semibold transition-colors"
                          >
                            {expandedAudit === evt.hash ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                            Details
                          </button>
                        </td>
                      </tr>
                      {expandedAudit === evt.hash && (
                        <tr>
                          <td colSpan={6} className="px-5 py-3 bg-[#F9F9F9] border-b border-[#E8EAED]">
                            <div className="text-[11px] text-[#737373] font-mono">{evt.details}</div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Revenue Tab ── */}
        {activeTab === "revenue" && (
          <div className="space-y-5">
            <div className="card-white">
              <h2 className="text-sm font-bold text-[#171717] mb-1">MRR Bar Chart (₹ Lakhs)</h2>
              <p className="text-[11px] text-[#737373] mb-5">Monthly revenue comparison with new and churned subscriptions</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueMonthly} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", borderColor: "#E8EAED" }} />
                    <Bar dataKey="mrr" fill="#171717" radius={[4, 4, 0, 0]} name="MRR (₹L)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card-white p-0 overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E8EAED]">
                <h2 className="text-sm font-bold text-[#171717]">Monthly Revenue Breakdown</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8EAED] text-[#737373] text-[10px] uppercase tracking-wider bg-[#F9F9F9]">
                      <th className="px-5 py-3 font-bold">Month</th>
                      <th className="px-4 py-3 font-bold">New Subs</th>
                      <th className="px-4 py-3 font-bold">Churned</th>
                      <th className="px-4 py-3 font-bold">MRR (₹ Lakhs)</th>
                      <th className="px-4 py-3 font-bold">Transactions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8EAED]">
                    {revenueMonthly.map((row) => (
                      <tr key={row.month} className="hover:bg-[#F9F9F9] transition-colors">
                        <td className="px-5 py-3.5 font-bold text-[#171717]">{row.month} 2026</td>
                        <td className="px-4 py-3.5 text-[#16A36A] font-bold">+{row.newSubs}</td>
                        <td className="px-4 py-3.5 text-[#DC5353] font-bold">−{row.churned}</td>
                        <td className="px-4 py-3.5 font-bold text-[#171717]">₹{row.mrr}L</td>
                        <td className="px-4 py-3.5 text-[#737373]">{row.txns}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Floating Emergency Actions Panel ── */}
        <div className="fixed bottom-6 right-6 z-50">
          {emergencyOpen && (
            <div className="mb-3 bg-white border border-[#E8EAED] rounded-2xl shadow-2xl overflow-hidden w-72">
              <div className="px-4 py-3 border-b border-[#E8EAED] bg-[#FEF2F2]">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#DC5353]">Emergency Actions</span>
              </div>
              <div className="p-3 space-y-2">
                <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-[#E8EAED] hover:bg-[#F9F9F9] text-xs font-semibold text-[#171717] transition-colors">
                  <Megaphone className="w-4 h-4 text-[#E5B52B]" />
                  Broadcast Alert to All Users
                </button>
                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-[#E8EAED]">
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4 text-[#737373]" />
                    <span className="text-xs font-semibold text-[#171717]">Maintenance Mode</span>
                  </div>
                  <button
                    onClick={() => setMaintenanceMode((p) => !p)}
                    className={`w-9 h-5 rounded-full transition-colors relative ${
                      maintenanceMode ? "bg-[#DC5353]" : "bg-[#E8EAED]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        maintenanceMode ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-[#E8EAED] hover:bg-[#F9F9F9] text-xs font-semibold text-[#171717] transition-colors">
                  <Download className="w-4 h-4 text-[#4385DF]" />
                  Export All Platform Data
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => setEmergencyOpen((p) => !p)}
            className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all ${
              emergencyOpen ? "bg-[#171717] text-white" : "bg-[#DC5353] text-white"
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
