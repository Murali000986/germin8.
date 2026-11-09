"use client";

import React, { useState } from "react";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { BarChart3, TrendingUp, Calendar, Filter } from "lucide-react";

export default function AnalyticsPage() {
  const [range, setRange] = useState("30d");

  const dailyTrend = [
    { day: "01 Nov", forms: 34, duration: 1.15 },
    { day: "02 Nov", forms: 48, duration: 1.18 },
    { day: "03 Nov", forms: 52, duration: 1.12 },
    { day: "04 Nov", forms: 61, duration: 1.20 },
    { day: "05 Nov", forms: 70, duration: 1.16 },
    { day: "06 Nov", forms: 85, duration: 1.14 },
    { day: "07 Nov", forms: 92, duration: 1.19 },
    { day: "08 Nov", forms: 104, duration: 1.11 },
    { day: "09 Nov", forms: 114, duration: 1.18 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
            Usage Telemetry &amp; Analytics
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Detailed breakdown of form execution velocities, statutory pre-scrutiny pass rates, and seasonal trends.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-white border border-[#E8EAED] rounded-lg p-1">
          <button onClick={() => setRange("7d")} className={`px-2.5 py-1 rounded text-xs font-semibold ${range === "7d" ? "bg-[#171717] text-white" : "text-[#737373]"}`}>Last 7 Days</button>
          <button onClick={() => setRange("30d")} className={`px-2.5 py-1 rounded text-xs font-semibold ${range === "30d" ? "bg-[#171717] text-white" : "text-[#737373]"}`}>Last 30 Days</button>
          <button onClick={() => setRange("90d")} className={`px-2.5 py-1 rounded text-xs font-semibold ${range === "90d" ? "bg-[#171717] text-white" : "text-[#737373]"}`}>Last Quarter</button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card-white p-5">
          <div className="text-xs text-[#737373] font-semibold uppercase tracking-wider mb-1">Average Injection Velocity</div>
          <div className="text-3xl font-extrabold text-[#171717]">1.18s</div>
          <div className="text-xs text-[#16A36A] font-semibold mt-1">● 92% faster than manual portal entry</div>
        </div>
        <div className="card-white p-5">
          <div className="text-xs text-[#737373] font-semibold uppercase tracking-wider mb-1">Estimated Hours Saved</div>
          <div className="text-3xl font-extrabold text-[#171717]">~220 hrs</div>
          <div className="text-xs text-[#16A36A] font-semibold mt-1">Across 1,482 completed filings</div>
        </div>
        <div className="card-white p-5">
          <div className="text-xs text-[#737373] font-semibold uppercase tracking-wider mb-1">Statutory Checksum Pass Rate</div>
          <div className="text-3xl font-extrabold text-[#16A36A]">99.8%</div>
          <div className="text-xs text-[#737373] mt-1">Zero MCA defect notices issued</div>
        </div>
      </div>

      {/* Main Trend Chart */}
      <div className="card-white p-6">
        <h2 className="text-sm font-bold text-[#171717] mb-1">Daily Automated Injections Trend</h2>
        <p className="text-xs text-[#737373] mb-6">Aggregated volume of verified e-form submissions.</p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyTrend}>
              <defs>
                <linearGradient id="analyticsTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#171717" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#171717" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E8EAED", borderRadius: "8px", fontSize: "11px" }} />
              <Area type="monotone" dataKey="forms" stroke="#171717" strokeWidth={2.5} fill="url(#analyticsTrend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
