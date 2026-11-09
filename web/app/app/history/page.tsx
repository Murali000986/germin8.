"use client";

import React, { useState } from "react";
import { History, Search, Filter, CheckCircle2, ShieldCheck } from "lucide-react";

export default function AutomationHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const jobs = [
    { id: "JOB-2026-904", client: "Technova Solutions India Pvt Ltd", form: "SPICe+ Part B", speed: "1.18s", date: "Nov 09, 14:15", user: "Rajesh Sharma (Partner)", status: "SUCCESS" },
    { id: "JOB-2026-903", client: "Apex Global FinTech Limited", form: "Form AOC-4", speed: "1.34s", date: "Nov 09, 13:42", user: "Priya Mehta (Admin)", status: "SUCCESS" },
    { id: "JOB-2026-902", client: "GreenHorizon Agrotech LLP", form: "Form DIR-12", speed: "1.12s", date: "Nov 09, 12:10", user: "Ananya Desai (Accountant)", status: "SUCCESS" },
    { id: "JOB-2026-901", client: "Bharat Logistics & Warehousing", form: "Form MGT-7", speed: "1.45s", date: "Nov 09, 09:20", user: "Kunal Verma (Operator)", status: "SUCCESS" },
    { id: "JOB-2026-900", client: "Zenith Precision Tools Pvt Ltd", form: "Form ADT-1", speed: "1.08s", date: "Nov 08, 17:30", user: "Rajesh Sharma (Partner)", status: "SUCCESS" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
          Automation Execution History
        </h1>
        <p className="text-xs text-[#737373] mt-1">
          Complete, tamper-evident audit log of all statutory form injections executed by your firm.
        </p>
      </div>

      {/* History Table */}
      <div className="card-white p-0 overflow-hidden">
        <div className="p-4 border-b border-[#E8EAED] flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by job ID or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#E8EAED] bg-[#F8FAFC] text-xs text-[#171717] focus:outline-none focus:border-[#E5B52B]"
            />
          </div>
          <span className="text-xs text-[#737373]">Showing 5 of 1,482 jobs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E8EAED] text-[#737373] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Job ID</th>
                <th className="py-3 px-4 font-bold">Client Entity</th>
                <th className="py-3 px-4 font-bold">MCA Form</th>
                <th className="py-3 px-4 font-bold">Execution Speed</th>
                <th className="py-3 px-4 font-bold">Initiated By</th>
                <th className="py-3 px-4 font-bold">Date &amp; Time</th>
                <th className="py-3 px-4 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAED] text-[#171717]">
              {jobs.map((j) => (
                <tr key={j.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 px-4 font-mono font-bold">{j.id}</td>
                  <td className="py-3.5 px-4 font-bold">{j.client}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-[#F8FAFC] border border-[#E8EAED] px-2 py-0.5 rounded text-[10px] font-semibold">
                      {j.form}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#737373]">{j.speed}</td>
                  <td className="py-3.5 px-4 text-[#737373]">{j.user}</td>
                  <td className="py-3.5 px-4 text-[#737373]">{j.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[#16A36A] font-bold text-[10px] bg-[#F8FAFC] border border-[#E8EAED] px-2 py-0.5 rounded">
                      ● {j.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
