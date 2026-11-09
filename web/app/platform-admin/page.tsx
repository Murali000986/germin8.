"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Terminal,
  ShieldCheck,
  Users,
  Building2,
  CreditCard,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Search,
  Filter,
  Check
} from "lucide-react";

export default function PlatformSuperAdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "plans" | "audit">("overview");

  const revenueData = [
    { month: "Jun", mrr: 14.2 },
    { month: "Jul", mrr: 17.8 },
    { month: "Aug", mrr: 21.0 },
    { month: "Sep", mrr: 24.6 },
    { month: "Oct", mrr: 26.8 },
    { month: "Nov", mrr: 28.45 },
  ];

  const planDist = [
    { name: "Company CA Firm", count: 240, color: "#171717" },
    { name: "Solo Individual", count: 120, color: "#E5B52B" },
    { name: "Enterprise Custom", count: 29, color: "#4385DF" },
  ];

  const auditEvents = [
    { id: "EVT-8921", time: "14:15:30", actor: "usr_partner_001", action: "JOB_INJECT_SUCCESS", target: "SPICe+ Part B (U72200MH2018PTC309871)", ip: "103.21.244.2" },
    { id: "EVT-8920", time: "14:10:12", actor: "usr_admin_04", action: "DEVICE_TOKEN_PAIRED", target: "dev_04 (Surface Book)", ip: "103.21.244.2" },
    { id: "EVT-8919", time: "13:58:44", actor: "sys_cron", action: "PLAN_QUOTA_RESET", target: "Tenant: ten_technova_ca", ip: "127.0.0.1" },
    { id: "EVT-8918", time: "13:42:01", actor: "usr_associate_02", action: "JOB_INJECT_SUCCESS", target: "Form AOC-4 (L65100DL2015PLC284719)", ip: "49.36.120.84" },
    { id: "EVT-8917", time: "12:15:19", actor: "usr_partner_001", action: "API_KEY_CREATED", target: "key_live_94a2", ip: "103.21.244.2" },
  ];

  const allUsers = [
    { id: "USR-01", name: "CA Rajesh Sharma", email: "rajesh@technova.com", tenant: "Technova CA Firm", role: "Owner", plan: "Company", status: "Active" },
    { id: "USR-02", name: "CS Priya Mehta", email: "priya@technova.com", tenant: "Technova CA Firm", role: "Admin", plan: "Company", status: "Active" },
    { id: "USR-03", name: "CA Vikram Singhania", email: "vikram@singhania-ca.in", tenant: "Singhania & Co", role: "Owner", plan: "Enterprise", status: "Active" },
    { id: "USR-04", name: "CS Amit Kulkarni", email: "amit@kulkarni-associates.com", tenant: "Solo Practice", role: "Owner", plan: "Individual", status: "Active" },
    { id: "USR-05", name: "CA Sunita Agarwal", email: "sunita@agarwalca.org", tenant: "Agarwal Tax Firm", role: "Owner", plan: "Company", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#171717] p-6 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EAED]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#171717] text-[#E5B52B] font-bold text-xs flex items-center justify-center">
              DEV
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#171717]">
                Platform Super Admin Console
              </h1>
              <p className="text-xs text-[#737373]">
                Engineering &amp; Fleet Telemetry • Germin8 Multi-Tenant Engine v2.5.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#16A36A] bg-white border border-[#E8EAED] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#16A36A]" />
              All Services Operational
            </span>
            <Link href="/app/dashboard" className="btn-secondary text-xs">
              <span>Customer View →</span>
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E8EAED] pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === "overview" ? "bg-[#171717] text-white" : "text-[#737373] hover:text-[#171717]"}`}
          >
            Platform Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === "users" ? "bg-[#171717] text-white" : "text-[#737373] hover:text-[#171717]"}`}
          >
            User Accounts &amp; Tenants
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === "audit" ? "bg-[#171717] text-white" : "text-[#737373] hover:text-[#171717]"}`}
          >
            Global Forensic Audit Logs
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* 8 Admin KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="card-white p-3">
                <div className="text-[10px] text-[#737373] font-bold uppercase">Total Users</div>
                <div className="text-xl font-extrabold text-[#171717] mt-0.5">412</div>
                <div className="text-[9px] text-[#16A36A] font-bold">+18 this wk</div>
              </div>

              <div className="card-white p-3">
                <div className="text-[10px] text-[#737373] font-bold uppercase">Companies</div>
                <div className="text-xl font-extrabold text-[#171717] mt-0.5">128</div>
                <div className="text-[9px] text-[#737373]">CA/CS Firms</div>
              </div>

              <div className="card-white p-3">
                <div className="text-[10px] text-[#737373] font-bold uppercase">Active Subs</div>
                <div className="text-xl font-extrabold text-[#16A36A] mt-0.5">389</div>
                <div className="text-[9px] text-[#737373]">94.4% Rate</div>
              </div>

              <div className="card-white p-3">
                <div className="text-[10px] text-[#737373] font-bold uppercase">Platform MRR</div>
                <div className="text-xl font-extrabold text-[#171717] mt-0.5">₹28.4L</div>
                <div className="text-[9px] text-[#16A36A] font-bold">+22% MoM</div>
              </div>

              <div className="card-white p-3">
                <div className="text-[10px] text-[#737373] font-bold uppercase">Total Jobs</div>
                <div className="text-xl font-extrabold text-[#171717] mt-0.5">48,290</div>
                <div className="text-[9px] text-[#737373]">1.2s avg</div>
              </div>

              <div className="card-white p-3">
                <div className="text-[10px] text-[#737373] font-bold uppercase">API Req / mo</div>
                <div className="text-xl font-extrabold text-[#171717] mt-0.5">1.2M</div>
                <div className="text-[9px] text-[#737373]">99.98% up</div>
              </div>

              <div className="card-white p-3">
                <div className="text-[10px] text-[#737373] font-bold uppercase">Fleet Devices</div>
                <div className="text-xl font-extrabold text-[#171717] mt-0.5">842</div>
                <div className="text-[9px] text-[#16A36A]">Active Tokens</div>
              </div>

              <div className="card-white p-3">
                <div className="text-[10px] text-[#737373] font-bold uppercase">Failed Jobs</div>
                <div className="text-xl font-extrabold text-[#DC5353] mt-0.5">14</div>
                <div className="text-[9px] text-[#737373]">0.02% error</div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 card-white">
                <h2 className="text-sm font-bold text-[#171717] mb-1">Monthly Recurring Revenue (MRR in ₹ Lakhs)</h2>
                <p className="text-xs text-[#737373] mb-6">Historical subscription revenue growth trajectory.</p>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                      <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E8EAED", borderRadius: "8px", fontSize: "11px" }} />
                      <Area type="monotone" dataKey="mrr" stroke="#171717" strokeWidth={2.5} fill="#F8FAFC" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-4 card-white">
                <h2 className="text-sm font-bold text-[#171717] mb-1">Subscription Tier Share</h2>
                <p className="text-xs text-[#737373] mb-4">Firm vs Individual breakdown.</p>

                <div className="h-48 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={planDist} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="count">
                        {planDist.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E8EAED", borderRadius: "8px", fontSize: "11px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1.5 pt-2 text-xs border-t border-[#E8EAED]">
                  {planDist.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[#737373]">{item.name}</span>
                      </div>
                      <span className="font-bold text-[#171717]">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USERS */}
        {activeTab === "users" && (
          <div className="card-white p-0 overflow-hidden">
            <div className="p-4 border-b border-[#E8EAED] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#171717]">All Registered Platform Users</h2>
              <span className="text-xs text-[#737373]">412 Active User Accounts</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] border-b border-[#E8EAED] text-[#737373] uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4 font-bold">User Name</th>
                    <th className="py-3 px-4 font-bold">Email</th>
                    <th className="py-3 px-4 font-bold">Company Tenant</th>
                    <th className="py-3 px-4 font-bold">Role</th>
                    <th className="py-3 px-4 font-bold">Subscription Plan</th>
                    <th className="py-3 px-4 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EAED] text-[#171717]">
                  {allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-[#F8FAFC]">
                      <td className="py-3.5 px-4 font-bold">{u.name}</td>
                      <td className="py-3.5 px-4 text-[#737373]">{u.email}</td>
                      <td className="py-3.5 px-4 font-medium">{u.tenant}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-[#F8FAFC] border border-[#E8EAED] px-2 py-0.5 rounded text-[10px] font-semibold">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#171717]">{u.plan}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-[#16A36A] font-bold text-[10px] bg-[#F8FAFC] border border-[#E8EAED] px-2 py-0.5 rounded">
                          ● {u.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: AUDIT */}
        {activeTab === "audit" && (
          <div className="card-white p-0 overflow-hidden">
            <div className="p-4 border-b border-[#E8EAED]">
              <h2 className="text-sm font-bold text-[#171717]">Global SHA-256 Tamper-Evident Audit Stream</h2>
              <p className="text-[11px] text-[#737373]">Live forensic security log stream across all workspaces.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#F8FAFC] border-b border-[#E8EAED] text-[#737373] uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4 font-bold">Event ID</th>
                    <th className="py-3 px-4 font-bold">Time (UTC)</th>
                    <th className="py-3 px-4 font-bold">Actor</th>
                    <th className="py-3 px-4 font-bold">Security Action</th>
                    <th className="py-3 px-4 font-bold">Target Resource</th>
                    <th className="py-3 px-4 font-bold text-right">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EAED] text-[#171717]">
                  {auditEvents.map((evt) => (
                    <tr key={evt.id} className="hover:bg-[#F8FAFC]">
                      <td className="py-3.5 px-4 font-bold">{evt.id}</td>
                      <td className="py-3.5 px-4 text-[#737373]">{evt.time}</td>
                      <td className="py-3.5 px-4 text-[#4385DF]">{evt.actor}</td>
                      <td className="py-3.5 px-4 font-bold text-[#16A36A]">{evt.action}</td>
                      <td className="py-3.5 px-4 font-sans text-xs">{evt.target}</td>
                      <td className="py-3.5 px-4 text-right text-[#737373]">{evt.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
