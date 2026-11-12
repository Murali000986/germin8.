"use client";

import React, { useState } from "react";
import Link from "next/link";
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
} from "recharts";
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Laptop,
  Plus,
  ArrowUpRight,
  Clock,
  User,
} from "lucide-react";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const activityData = [
  { date: "Oct 11", automations: 28 },
  { date: "Oct 13", automations: 44 },
  { date: "Oct 15", automations: 36 },
  { date: "Oct 17", automations: 55 },
  { date: "Oct 19", automations: 48 },
  { date: "Oct 21", automations: 62 },
  { date: "Oct 23", automations: 70 },
  { date: "Oct 25", automations: 59 },
  { date: "Oct 27", automations: 83 },
  { date: "Oct 29", automations: 75 },
  { date: "Oct 31", automations: 92 },
  { date: "Nov 02", automations: 88 },
  { date: "Nov 04", automations: 104 },
  { date: "Nov 06", automations: 97 },
  { date: "Nov 08", automations: 114 },
];

const filingDistData = [
  { name: "SPICe+", value: 640, color: "#171717" },
  { name: "AOC-4", value: 420, color: "#E5B52B" },
  { name: "DIR-12", value: 280, color: "#4385DF" },
  { name: "MGT-7", value: 180, color: "#16A36A" },
  { name: "ADT-1", value: 110, color: "#DC5353" },
];

const recentJobs = [
  { id: "JOB-2026-904", form: "SPICe+ Part B", client: "Technova Solutions India Pvt Ltd",   status: "SUCCESS",  duration: "1.18s", operator: "R. Sharma",    timestamp: "12 mins ago" },
  { id: "JOB-2026-903", form: "Form AOC-4",    client: "Apex Global FinTech Limited",         status: "SUCCESS",  duration: "1.34s", operator: "P. Mehta",     timestamp: "48 mins ago" },
  { id: "JOB-2026-902", form: "Form DIR-12",   client: "GreenHorizon Agrotech LLP",           status: "SUCCESS",  duration: "1.12s", operator: "A. Kumar",     timestamp: "2 hrs ago" },
  { id: "JOB-2026-901", form: "Form MGT-7",    client: "Bharat Logistics & Warehousing Co",   status: "FAILED",   duration: "—",     operator: "R. Sharma",    timestamp: "5 hrs ago" },
  { id: "JOB-2026-900", form: "Form ADT-1",    client: "Zenith Precision Tools Pvt Ltd",      status: "SUCCESS",  duration: "1.08s", operator: "P. Mehta",     timestamp: "7 hrs ago" },
  { id: "JOB-2026-899", form: "SPICe+ Part A", client: "NovaStar Retail India Private Ltd",   status: "SUCCESS",  duration: "1.42s", operator: "S. Rajan",     timestamp: "Yesterday" },
  { id: "JOB-2026-898", form: "Form AOC-4",    client: "Sunrise Infra & Developers Ltd",      status: "SUCCESS",  duration: "1.29s", operator: "A. Kumar",     timestamp: "Yesterday" },
  { id: "JOB-2026-897", form: "Form DIR-12",   client: "Meridian Healthcare Services LLP",    status: "PENDING",  duration: "—",     operator: "R. Sharma",    timestamp: "Yesterday" },
  { id: "JOB-2026-896", form: "Form MGT-7",    client: "BlueSky Commodities & Exports Pvt",  status: "SUCCESS",  duration: "1.55s", operator: "P. Mehta",     timestamp: "2 days ago" },
  { id: "JOB-2026-895", form: "Form ADT-1",    client: "Pacific Polymers & Chemicals Ltd",    status: "SUCCESS",  duration: "1.11s", operator: "S. Rajan",     timestamp: "2 days ago" },
];

const mcaForms = [
  { form: "SPICe+ Part A & B", fields: 142, lastUsed: "Today",      trend: "up" },
  { form: "Form AOC-4",        fields: 98,  lastUsed: "Today",      trend: "up" },
  { form: "Form DIR-12",       fields: 67,  lastUsed: "Yesterday",  trend: "up" },
  { form: "Form MGT-7",        fields: 88,  lastUsed: "Yesterday",  trend: "stable" },
  { form: "Form ADT-1",        fields: 54,  lastUsed: "2 days ago", trend: "down" },
];

const teamActivity = [
  { initials: "RS", name: "Rajesh Sharma",   action: "Launched SPICe+ job for Technova Solutions",   time: "12m ago",  color: "#171717" },
  { initials: "PM", name: "Priya Mehta",     action: "Added new client: Apex Global FinTech",         time: "1h ago",   color: "#4385DF" },
  { initials: "AK", name: "Amit Kumar",      action: "Filed Form DIR-12 for GreenHorizon Agrotech",   time: "2h ago",   color: "#16A36A" },
  { initials: "SR", name: "Swati Rajan",     action: "Generated invoice INV-2026-089",                time: "5h ago",   color: "#E5B52B" },
  { initials: "RS", name: "Rajesh Sharma",   action: "Created API key for extension fleet",           time: "Yesterday",color: "#171717" },
];

// ── SVG Progress Ring ─────────────────────────────────────────────────────────
function ProgressRing({ pct, color, size = 56 }: { pct: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="progress-ring">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E8EAED" strokeWidth={6} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="progress-ring__circle"
      />
    </svg>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  if (status === "SUCCESS") return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#16A36A]">
      <CheckCircle2 className="w-2.5 h-2.5" /> Success
    </span>
  );
  if (status === "FAILED") return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEE2E2] text-[#DC5353]">
      <AlertTriangle className="w-2.5 h-2.5" /> Failed
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF8E5] text-[#E5B52B]">
      <Clock className="w-2.5 h-2.5" /> Pending
    </span>
  );
}

// ── Main Page Component ───────────────────────────────────────────────────────
export default function DashboardOverviewPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [page, setPage] = useState(1);
  const jobsPerPage = 5;
  const totalPages = Math.ceil(recentJobs.length / jobsPerPage);
  const pagedJobs = recentJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

  const quotaPct = Math.round((847 / 1000) * 100);

  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
            Practice Overview
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Real-time automation telemetry across your Technova CA firm workspace.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/app/automation" className="btn-accent text-xs">
            <Zap className="w-3.5 h-3.5" />
            Launch Autofill
          </Link>
          <Link href="/app/clients" className="btn-secondary text-xs">
            <Plus className="w-3.5 h-3.5" />
            Add Client
          </Link>
        </div>
      </div>

      {/* ── ROW 1: 4 Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Automations */}
        <div className="glass-card p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-2">
                Total Automations
              </div>
              <div className="text-3xl font-extrabold text-[#171717] leading-none">1,482</div>
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A36A] text-[10px] font-bold">
                <TrendingUp className="w-2.5 h-2.5" />
                +12% vs last month
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#FFF8E5] flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-[#E5B52B]" />
            </div>
          </div>
        </div>

        {/* Success Rate */}
        <div className="glass-card p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-2">
                Success Rate
              </div>
              <div className="text-3xl font-extrabold text-[#16A36A] leading-none">99.8%</div>
              <div className="mt-2 text-[10px] text-[#737373]">1,479 successful · 3 failed</div>
            </div>
            <div className="relative flex-shrink-0">
              <ProgressRing pct={99.8} color="#16A36A" size={56} />
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
              </div>
            </div>
          </div>
        </div>

        {/* Quota Used */}
        <div className="glass-card p-5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-2">
            Quota Used
          </div>
          <div className="text-3xl font-extrabold text-[#171717] leading-none">847</div>
          <div className="text-[10px] text-[#737373] mt-1">of 1,000 monthly filings</div>
          <div className="mt-3 w-full h-1.5 bg-[#E8EAED] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${quotaPct}%`,
                background: quotaPct > 90 ? "#DC5353" : quotaPct > 75 ? "#E5B52B" : "#16A36A",
              }}
            />
          </div>
          <div className="text-[10px] text-[#737373] mt-1">{quotaPct}% used · 153 remaining</div>
        </div>

        {/* Active Devices */}
        <div className="glass-card p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-2">
                Active Devices
              </div>
              <div className="text-3xl font-extrabold text-[#171717] leading-none">4</div>
              <div className="mt-2 text-[10px] text-[#16A36A] font-bold">All online · v2.5.0</div>
            </div>
            <div className="flex flex-col gap-1 flex-shrink-0">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-[#171717]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ROW 2: Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Area Chart – 60% */}
        <div className="lg:col-span-7 card-white">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-[#171717]">Automation Activity</h2>
              <p className="text-[11px] text-[#737373] mt-0.5">Last 30 days · daily form injections</p>
            </div>
            <div className="flex items-center gap-1 bg-[#F9F9F9] border border-[#E8EAED] rounded-lg p-1">
              {["7d", "30d", "90d"].map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors ${
                    timeRange === r
                      ? "bg-white text-[#171717] shadow-sm"
                      : "text-[#737373] hover:text-[#171717]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="autoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E5B52B" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#E5B52B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} interval={2} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E8EAED", borderRadius: "8px", fontSize: "11px" }}
                  labelStyle={{ fontWeight: 700, color: "#171717" }}
                />
                <Area
                  type="monotone"
                  dataKey="automations"
                  stroke="#E5B52B"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#autoGrad)"
                  dot={false}
                  activeDot={{ r: 4, fill: "#E5B52B", strokeWidth: 2, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart – 40% */}
        <div className="lg:col-span-5 card-white">
          <h2 className="text-sm font-bold text-[#171717]">Filing Distribution</h2>
          <p className="text-[11px] text-[#737373] mt-0.5 mb-4">Volume by MCA form type</p>

          <div className="flex items-center gap-4">
            <div className="h-44 w-44 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={filingDistData}
                    innerRadius={44}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {filingDistData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E8EAED", borderRadius: "8px", fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {filingDistData.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] text-[#737373]">{item.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#171717]">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ROW 3: Recent Automation Jobs Table ── */}
      <div className="card-white p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8EAED] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#171717]">Recent Automation Jobs</h2>
            <p className="text-[11px] text-[#737373] mt-0.5">Latest executions across your firm fleet</p>
          </div>
          <Link href="/app/history" className="text-xs font-semibold text-[#171717] hover:text-[#E5B52B] flex items-center gap-1 transition-colors">
            View All <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8EAED] text-[#737373] text-[10px] uppercase tracking-wider">
                <th className="px-6 py-3 font-bold">Job ID</th>
                <th className="px-4 py-3 font-bold">Form Type</th>
                <th className="px-4 py-3 font-bold">Client Entity</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold">Duration</th>
                <th className="px-4 py-3 font-bold">Operator</th>
                <th className="px-4 py-3 font-bold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAED]">
              {pagedJobs.map((job) => (
                <tr key={job.id} className="hover:bg-[#F9F9F9] transition-colors">
                  <td className="px-6 py-3.5 font-mono text-[11px] text-[#4385DF] font-semibold">{job.id}</td>
                  <td className="px-4 py-3.5">
                    <span className="bg-[#F9F9F9] border border-[#E8EAED] px-2 py-0.5 rounded text-[10px] font-semibold text-[#171717]">
                      {job.form}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[#171717] font-medium max-w-[200px] truncate">{job.client}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-[#737373]">{job.duration}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#171717] text-white text-[8px] font-bold flex items-center justify-center">
                        {job.operator.split(" ").map((p) => p[0]).join("")}
                      </div>
                      <span className="text-[11px] text-[#737373]">{job.operator}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#737373] text-[11px]">{job.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-3 border-t border-[#E8EAED] flex items-center justify-between">
          <span className="text-[11px] text-[#737373]">
            Showing {(page - 1) * jobsPerPage + 1}–{Math.min(page * jobsPerPage, recentJobs.length)} of {recentJobs.length} jobs
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 text-[11px] font-semibold border border-[#E8EAED] rounded-lg disabled:opacity-40 hover:bg-[#F9F9F9] transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-7 h-7 text-[11px] font-bold rounded-lg transition-colors ${
                  page === i + 1
                    ? "bg-[#171717] text-white"
                    : "border border-[#E8EAED] text-[#737373] hover:bg-[#F9F9F9]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 text-[11px] font-semibold border border-[#E8EAED] rounded-lg disabled:opacity-40 hover:bg-[#F9F9F9] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── ROW 4: MCA Form Coverage + Team Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* MCA Form Coverage */}
        <div className="card-white">
          <h2 className="text-sm font-bold text-[#171717] mb-1">MCA Form Coverage</h2>
          <p className="text-[11px] text-[#737373] mb-4">Supported forms with field counts and last usage</p>
          <div className="space-y-3">
            {mcaForms.map((form) => (
              <div key={form.form} className="flex items-center justify-between py-2.5 border-b border-[#E8EAED] last:border-0">
                <div>
                  <div className="text-[12px] font-semibold text-[#171717]">{form.form}</div>
                  <div className="text-[10px] text-[#737373] mt-0.5">{form.fields} auto-fill fields</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#737373]">{form.lastUsed}</span>
                  {form.trend === "up" && <TrendingUp className="w-3.5 h-3.5 text-[#16A36A]" />}
                  {form.trend === "down" && <TrendingDown className="w-3.5 h-3.5 text-[#DC5353]" />}
                  {form.trend === "stable" && <div className="w-3.5 h-0.5 bg-[#737373] rounded-full" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Activity */}
        <div className="card-white">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-[#171717]">Team Activity</h2>
            <Link href="/app/team" className="text-[11px] font-semibold text-[#737373] hover:text-[#171717] flex items-center gap-1 transition-colors">
              View Team <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-[11px] text-[#737373] mb-4">Recent actions by your team members</p>
          <div className="space-y-3.5">
            {teamActivity.map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                  style={{ backgroundColor: act.color }}
                >
                  {act.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-[#171717]">{act.name}</div>
                  <div className="text-[11px] text-[#737373] truncate">{act.action}</div>
                </div>
                <div className="text-[10px] text-[#737373] flex-shrink-0 mt-0.5">{act.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
