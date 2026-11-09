"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Laptop,
  Building2,
  ArrowUpRight,
  TrendingUp,
  Filter,
  Plus
} from "lucide-react";

export default function DashboardOverviewPage() {
  const [timeRange, setTimeRange] = useState("30d");

  // Chart Data
  const activityData = [
    { date: "Oct 24", automations: 42 },
    { date: "Oct 28", automations: 58 },
    { date: "Nov 01", automations: 75 },
    { date: "Nov 04", automations: 64 },
    { date: "Nov 07", automations: 92 },
    { date: "Nov 09", automations: 114 },
  ];

  const statusData = [
    { name: "Successful", value: 1479, color: "#16A36A" },
    { name: "Pre-Scrutiny Corrected", value: 48, color: "#E5B52B" },
    { name: "Failed / Aborted", value: 3, color: "#DC5353" },
  ];

  const formData = [
    { form: "SPICe+", count: 640 },
    { form: "AOC-4", count: 420 },
    { form: "DIR-12", count: 280 },
    { form: "MGT-7", count: 180 },
    { form: "ADT-1", count: 110 },
  ];

  const recentJobs = [
    { id: "JOB-2026-904", client: "Technova Solutions India Pvt Ltd", form: "SPICe+ Part B", speed: "1.18s", time: "12 mins ago", status: "SUCCESS" },
    { id: "JOB-2026-903", client: "Apex Global FinTech Limited", form: "Form AOC-4", speed: "1.34s", time: "48 mins ago", status: "SUCCESS" },
    { id: "JOB-2026-902", client: "GreenHorizon Agrotech LLP", form: "Form DIR-12", speed: "1.12s", time: "2 hours ago", status: "SUCCESS" },
    { id: "JOB-2026-901", client: "Bharat Logistics & Warehousing", form: "Form MGT-7", speed: "1.45s", time: "5 hours ago", status: "SUCCESS" },
    { id: "JOB-2026-900", client: "Zenith Precision Tools Pvt Ltd", form: "Form ADT-1", speed: "1.08s", time: "Yesterday", status: "SUCCESS" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
            Practice Overview
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Real-time telemetry and automation activity across your Technova CA firm workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/app/automation" className="btn-accent text-xs">
            <Zap className="w-3.5 h-3.5" />
            <span>Launch Form Autofill</span>
          </Link>
          <Link href="/app/clients" className="btn-secondary text-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Client</span>
          </Link>
        </div>
      </div>

      {/* 6 Core Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="card-white p-4">
          <div className="flex items-center justify-between text-[#737373] mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Runs</span>
            <Zap className="w-4 h-4 text-[#E5B52B]" />
          </div>
          <div className="text-2xl font-extrabold text-[#171717]">1,482</div>
          <div className="text-[10px] text-[#16A36A] font-semibold flex items-center gap-0.5 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% this month</span>
          </div>
        </div>

        <div className="card-white p-4">
          <div className="flex items-center justify-between text-[#737373] mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Successful</span>
            <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
          </div>
          <div className="text-2xl font-extrabold text-[#16A36A]">1,479</div>
          <div className="text-[10px] text-[#737373] mt-1">99.8% Pass Rate</div>
        </div>

        <div className="card-white p-4">
          <div className="flex items-center justify-between text-[#737373] mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Failed</span>
            <AlertTriangle className="w-4 h-4 text-[#DC5353]" />
          </div>
          <div className="text-2xl font-extrabold text-[#DC5353]">3</div>
          <div className="text-[10px] text-[#737373] mt-1">Portal timeout aborts</div>
        </div>

        <div className="card-white p-4">
          <div className="flex items-center justify-between text-[#737373] mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Quota Left</span>
            <Clock className="w-4 h-4 text-[#4385DF]" />
          </div>
          <div className="text-2xl font-extrabold text-[#171717]">518</div>
          <div className="text-[10px] text-[#737373] mt-1">of 1,000 monthly forms</div>
        </div>

        <div className="card-white p-4">
          <div className="flex items-center justify-between text-[#737373] mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Extensions</span>
            <Laptop className="w-4 h-4 text-[#171717]" />
          </div>
          <div className="text-2xl font-extrabold text-[#171717]">4</div>
          <div className="text-[10px] text-[#16A36A] font-semibold mt-1">All online (v2.5)</div>
        </div>

        <div className="card-white p-4">
          <div className="flex items-center justify-between text-[#737373] mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Clients</span>
            <Building2 className="w-4 h-4 text-[#171717]" />
          </div>
          <div className="text-2xl font-extrabold text-[#171717]">48</div>
          <div className="text-[10px] text-[#737373] mt-1">In encrypted vault</div>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Activity Chart (8 cols) */}
        <div className="lg:col-span-8 card-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-[#171717]">Automation Activity</h2>
              <p className="text-[11px] text-[#737373]">Daily form injections processed through connected extensions.</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs bg-[#F8FAFC] border border-[#E8EAED] rounded-md p-1">
              <button onClick={() => setTimeRange("7d")} className={`px-2 py-0.5 rounded text-[10px] font-semibold ${timeRange === "7d" ? "bg-white text-[#171717] shadow-2xs" : "text-[#737373]"}`}>7d</button>
              <button onClick={() => setTimeRange("30d")} className={`px-2 py-0.5 rounded text-[10px] font-semibold ${timeRange === "30d" ? "bg-white text-[#171717] shadow-2xs" : "text-[#737373]"}`}>30d</button>
              <button onClick={() => setTimeRange("90d")} className={`px-2 py-0.5 rounded text-[10px] font-semibold ${timeRange === "90d" ? "bg-white text-[#171717] shadow-2xs" : "text-[#737373]"}`}>90d</button>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E5B52B" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#E5B52B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E8EAED", borderRadius: "8px", fontSize: "11px" }} />
                <Area type="monotone" dataKey="automations" stroke="#E5B52B" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAuto)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Donut Chart (4 cols) */}
        <div className="lg:col-span-4 card-white">
          <h2 className="text-sm font-bold text-[#171717] mb-1">Execution Status</h2>
          <p className="text-[11px] text-[#737373] mb-4">Statutory pre-scrutiny pass distribution.</p>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E8EAED", borderRadius: "8px", fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 text-xs border-t border-[#E8EAED]">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#737373]">{item.name}</span>
                </div>
                <span className="font-bold text-[#171717]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Form Activity Breakdown & Recent Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form Distribution Bar Chart (5 cols) */}
        <div className="lg:col-span-5 card-white">
          <h2 className="text-sm font-bold text-[#171717] mb-1">Form Activity Breakdown</h2>
          <p className="text-[11px] text-[#737373] mb-4">Volume distribution across supported MCA e-forms.</p>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formData} layout="vertical" margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="form" stroke="#171717" fontSize={11} tickLine={false} axisLine={false} width={70} />
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E8EAED", borderRadius: "8px", fontSize: "11px" }} />
                <Bar dataKey="count" fill="#171717" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Table (7 cols) */}
        <div className="lg:col-span-7 card-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-[#171717]">Recent Injections</h2>
              <p className="text-[11px] text-[#737373]">Latest executions processed across your firm fleet.</p>
            </div>
            <Link href="/app/history" className="text-xs font-semibold text-[#171717] hover:text-[#E5B52B] flex items-center gap-1">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8EAED] text-[#737373] uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 font-bold">Client Entity</th>
                  <th className="py-2.5 font-bold">Form</th>
                  <th className="py-2.5 font-bold">Speed</th>
                  <th className="py-2.5 font-bold">Time</th>
                  <th className="py-2.5 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAED] text-[#171717]">
                {recentJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-[#F8FAFC]">
                    <td className="py-3 font-medium max-w-[180px] truncate">{job.client}</td>
                    <td className="py-3">
                      <span className="bg-[#F8FAFC] border border-[#E8EAED] px-2 py-0.5 rounded text-[10px] font-semibold text-[#171717]">
                        {job.form}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-[11px] text-[#737373]">{job.speed}</td>
                    <td className="py-3 text-[#737373]">{job.time}</td>
                    <td className="py-3 text-right">
                      <span className="bg-[#F8FAFC] text-[#16A36A] font-bold text-[10px] px-2 py-0.5 rounded border border-[#E8EAED]">
                        ● Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
