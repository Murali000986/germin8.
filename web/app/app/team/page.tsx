"use client";

import React, { useState } from "react";
import { Users, Plus, ShieldCheck, Mail, MoreHorizontal, UserCheck } from "lucide-react";

export default function TeamManagementPage() {
  const [members, setMembers] = useState([
    { id: "usr_1", name: "CA Rajesh Sharma", email: "rajesh@technova.com", role: "Owner", status: "Active", lastActive: "Just now" },
    { id: "usr_2", name: "CS Priya Mehta", email: "priya@technova.com", role: "Admin", status: "Active", lastActive: "15 mins ago" },
    { id: "usr_3", name: "Ananya Desai", email: "ananya.d@technova.com", role: "Accountant", status: "Active", lastActive: "1 hour ago" },
    { id: "usr_4", name: "Kunal Verma", email: "kunal.v@technova.com", role: "Operator", status: "Active", lastActive: "Yesterday" },
    { id: "usr_5", name: "Rohan Iyer", email: "rohan.i@technova.com", role: "Viewer", status: "Pending Invite", lastActive: "Invited Nov 08" },
  ]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
            Team &amp; Seat Management
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Manage practice seats, assign role permissions, and control employee filing access boundaries.
          </p>
        </div>

        <button className="btn-primary text-xs">
          <Plus className="w-3.5 h-3.5 text-[#E5B52B]" />
          <span>Invite Team Colleague</span>
        </button>
      </div>

      {/* Seat Allocation Progress Bar */}
      <div className="card-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#171717]">Company Workspace Seat Quota</span>
          <p className="text-xs text-[#737373]">
            You have used <strong>5 of 10</strong> included practitioner seats on your active Company plan.
          </p>
        </div>

        <div className="w-full sm:w-64 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-[#171717]">
            <span>5 Active Seats</span>
            <span className="text-[#737373]">5 Remaining</span>
          </div>
          <div className="h-2 w-full bg-[#F8FAFC] border border-[#E8EAED] rounded-full overflow-hidden">
            <div className="h-full bg-[#171717] rounded-full" style={{ width: "50%" }} />
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="card-white p-0 overflow-hidden">
        <div className="p-4 border-b border-[#E8EAED]">
          <h2 className="text-sm font-bold text-[#171717]">Workspace Members</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E8EAED] text-[#737373] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Colleague Name</th>
                <th className="py-3 px-4 font-bold">Email</th>
                <th className="py-3 px-4 font-bold">Assigned Role</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Last Active</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAED] text-[#171717]">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 px-4 font-bold">{m.name}</td>
                  <td className="py-3.5 px-4 text-[#737373]">{m.email}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      m.role === "Owner"
                        ? "bg-[#FFF8E5] text-[#171717] border-[#E5B52B]/40"
                        : m.role === "Admin"
                        ? "bg-[#F8FAFC] text-[#171717] border-[#171717]"
                        : "bg-[#F8FAFC] text-[#737373] border-[#E8EAED]"
                    }`}>
                      {m.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`font-bold text-[10px] ${m.status === "Active" ? "text-[#16A36A]" : "text-[#E5B52B]"}`}>
                      ● {m.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#737373]">{m.lastActive}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1 rounded text-[#737373] hover:text-[#171717]">
                      <MoreHorizontal className="w-4 h-4" />
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
