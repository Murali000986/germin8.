"use client";

import React, { useState } from "react";
import { Building2, Plus, Search, Filter, Eye, MoreHorizontal, CheckCircle2 } from "lucide-react";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const clients = [
    {
      id: "cli_technova_001",
      name: "TECHNOVA SOLUTIONS INDIA PVT LTD",
      cin: "U72200MH2018PTC309871",
      type: "Private Limited",
      roc: "ROC-MUMBAI",
      capital: "₹10,000,000",
      directors: 3,
      lastFiling: "Nov 09, 2026",
      status: "Active"
    },
    {
      id: "cli_apex_002",
      name: "APEX GLOBAL FINTECH LIMITED",
      cin: "L65100DL2015PLC284719",
      type: "Public Limited",
      roc: "ROC-DELHI",
      capital: "₹50,000,000",
      directors: 5,
      lastFiling: "Nov 08, 2026",
      status: "Active"
    },
    {
      id: "cli_green_003",
      name: "GREENHORIZON AGROTECH LLP",
      cin: "LLP-AAB-4921",
      type: "LLP",
      roc: "ROC-BANGALORE",
      capital: "₹2,500,000",
      directors: 2,
      lastFiling: "Nov 04, 2026",
      status: "Active"
    },
    {
      id: "cli_bharat_004",
      name: "BHARAT LOGISTICS & WAREHOUSING CORP",
      cin: "U63090MH2019PTC321456",
      type: "Private Limited",
      roc: "ROC-MUMBAI",
      capital: "₹15,000,000",
      directors: 3,
      lastFiling: "Oct 29, 2026",
      status: "Active"
    },
    {
      id: "cli_zenith_005",
      name: "ZENITH PRECISION TOOLS PVT LTD",
      cin: "U28100PN2017PTC173849",
      type: "Private Limited",
      roc: "ROC-PUNE",
      capital: "₹8,000,000",
      directors: 2,
      lastFiling: "Oct 21, 2026",
      status: "Active"
    }
  ];

  const filtered = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.cin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === "All" || c.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
            Client Entity Vault
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            48 corporate client records encrypted and ready for instant MCA V3 form mapping.
          </p>
        </div>

        <button className="btn-primary text-xs">
          <Plus className="w-3.5 h-3.5 text-[#E5B52B]" />
          <span>Add Corporate Client</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="card-white flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by company name or CIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#E8EAED] bg-[#F8FAFC] text-xs text-[#171717] focus:outline-none focus:border-[#E5B52B]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#737373]" />
          <span className="text-xs text-[#737373]">Entity Type:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1 rounded-md border border-[#E8EAED] bg-[#F8FAFC] text-xs font-semibold text-[#171717]"
          >
            <option value="All">All Types</option>
            <option value="Private Limited">Private Limited</option>
            <option value="Public Limited">Public Limited</option>
            <option value="LLP">LLP</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="card-white p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E8EAED] text-[#737373] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Company Legal Name</th>
                <th className="py-3 px-4 font-bold">CIN / Reg No</th>
                <th className="py-3 px-4 font-bold">Class</th>
                <th className="py-3 px-4 font-bold">ROC</th>
                <th className="py-3 px-4 font-bold">Auth Capital</th>
                <th className="py-3 px-4 font-bold">Directors</th>
                <th className="py-3 px-4 font-bold">Last Filing</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAED] text-[#171717]">
              {filtered.map((client) => (
                <tr key={client.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 px-4 font-bold">{client.name}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#737373]">{client.cin}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-[#F8FAFC] border border-[#E8EAED] px-2 py-0.5 rounded text-[10px] font-semibold">
                      {client.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">{client.roc}</td>
                  <td className="py-3.5 px-4 font-mono font-medium">{client.capital}</td>
                  <td className="py-3.5 px-4">{client.directors} Directors</td>
                  <td className="py-3.5 px-4 text-[#737373]">{client.lastFiling}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1 rounded text-[#737373] hover:text-[#171717]">
                      <Eye className="w-4 h-4" />
                    </button>
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
