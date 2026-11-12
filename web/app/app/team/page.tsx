"use client";

import React, { useState } from "react";
import {
  Users,
  Plus,
  Shield,
  ShieldCheck,
  Mail,
  MoreHorizontal,
  Check,
  X,
  UserCheck,
  Building2,
  Trash2,
  KeyRound,
  Sparkles,
  ArrowRight
} from "lucide-react";

type Role = "Owner" | "Admin" | "Accountant" | "Operator" | "Viewer";

interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Pending";
  lastActive: string;
}

export default function TeamManagementPage() {
  const [members, setMembers] = useState<Member[]>([
    { id: "usr_1", name: "CA Rajeshwari Iyer", email: "rajeshwari@apexcorp.com", role: "Owner", status: "Active", lastActive: "Just now" },
    { id: "usr_2", name: "CS Priya Mehta", email: "priya@apexcorp.com", role: "Admin", status: "Active", lastActive: "12 mins ago" },
    { id: "usr_3", name: "Vikas Patil, ACA", email: "vikas.p@apexcorp.com", role: "Accountant", status: "Active", lastActive: "1 hour ago" },
    { id: "usr_4", name: "Kunal Verma", email: "kunal.v@apexcorp.com", role: "Operator", status: "Active", lastActive: "Yesterday" },
    { id: "usr_5", name: "Rohan Deshmukh", email: "rohan.d@apexcorp.com", role: "Viewer", status: "Pending", lastActive: "Invited Nov 08" },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Accountant");
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    const newMember: Member = {
      id: `usr_${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      status: "Pending",
      lastActive: "Just invited"
    };

    setMembers([...members, newMember]);
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setShowInviteModal(false);
      setInviteName("");
      setInviteEmail("");
    }, 1500);
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const roleBadge = (role: Role) => {
    switch (role) {
      case "Owner":
        return "bg-[#171717] text-white border border-[#171717]";
      case "Admin":
        return "bg-white text-[#171717] border border-[#171717] font-bold";
      case "Accountant":
        return "bg-[#FFF8E5] text-[#171717] border border-[#E5B52B]/50 font-semibold";
      case "Operator":
        return "bg-white text-[#171717] border border-[#E8EAED]";
      case "Viewer":
        return "bg-white text-[#737373] border border-[#E8EAED]";
    }
  };

  const permissionsMatrix = [
    { action: "Autofill MCA V3 Statutory Forms", owner: true, admin: true, accountant: true, operator: true, viewer: false },
    { action: "Access & Edit Client Entity Vault", owner: true, admin: true, accountant: true, operator: false, viewer: false },
    { action: "Pair Workstation Chrome Extension", owner: true, admin: true, accountant: true, operator: true, viewer: false },
    { action: "Generate Production API Secret Keys", owner: true, admin: true, accountant: false, operator: false, viewer: false },
    { action: "Invite & Manage Team Seats", owner: true, admin: true, accountant: false, operator: false, viewer: false },
    { action: "Manage Razorpay Billing & Subscriptions", owner: true, admin: false, accountant: true, operator: false, viewer: false },
    { action: "Inspect Cryptographic SHA-256 Audit Trail", owner: true, admin: true, accountant: false, operator: false, viewer: true },
    { action: "Access Super Admin Console", owner: true, admin: false, accountant: false, operator: false, viewer: false },
  ];

  return (
    <div className="space-y-6 text-[#171717]">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E5B52B]" />
            <span>ROLE-BASED ACCESS CONTROL (RBAC)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            Team &amp; Seat Management
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Allocate practitioner seats, assign filing permissions, and enforce data boundaries across your CA firm.
          </p>
        </div>

        <button 
          onClick={() => setShowInviteModal(true)}
          className="btn-primary text-xs flex items-center gap-2 px-4 py-2.5"
        >
          <Plus className="w-4 h-4 text-[#E5B52B]" />
          <span>Invite Team Colleague</span>
        </button>
      </div>

      {/* Seat Allocation Glass Card */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[#171717]">Firm Workspace Seat Allocation</h2>
            <span className="bg-[#FFF8E5] text-[#171717] text-[10px] font-bold px-2 py-0.5 rounded border border-[#E5B52B]/40">
              COMPANY TIER
            </span>
          </div>
          <p className="text-xs text-[#737373] max-w-xl">
            You have active licenses for <strong>{members.length} of 10</strong> included practitioner seats. Each seat permits independent Chrome extension pairing and MCA V3 form preparation.
          </p>
        </div>

        <div className="w-full md:w-72 space-y-2">
          <div className="flex justify-between text-xs font-bold text-[#171717]">
            <span>{members.length} Active Seats</span>
            <span className="text-[#737373]">{10 - members.length} Remaining</span>
          </div>
          <div className="h-2 w-full bg-white border border-[#E8EAED] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#171717] rounded-full transition-all duration-500" 
              style={{ width: `${(members.length / 10) * 100}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-[#E8EAED] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#171717]">Workspace Members ({members.length})</h2>
            <p className="text-[11px] text-[#737373] mt-0.5">Active staff, partners, and external reviewers</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white border-b border-[#E8EAED] text-[#737373] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5 font-bold">Colleague</th>
                <th className="py-3.5 px-5 font-bold">Assigned Role</th>
                <th className="py-3.5 px-5 font-bold">Status</th>
                <th className="py-3.5 px-5 font-bold">Last Active</th>
                <th className="py-3.5 px-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAED]">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white border border-[#E8EAED] flex items-center justify-center font-bold text-[#171717] text-xs shadow-2xs">
                        {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-[#171717]">{member.name}</div>
                        <div className="text-[11px] text-[#737373]">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] ${roleBadge(member.role)}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`inline-flex items-center gap-1.5 font-semibold text-[11px] ${
                      member.status === "Active" ? "text-[#16A36A]" : "text-[#E5B52B]"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${member.status === "Active" ? "bg-[#16A36A]" : "bg-[#E5B52B]"}`} />
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-[#737373] font-medium">
                    {member.lastActive}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    {member.role !== "Owner" ? (
                      <button 
                        onClick={() => removeMember(member.id)}
                        className="text-[#737373] hover:text-[#DC5353] p-1 transition-colors"
                        title="Remove member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-[10px] text-[#737373] uppercase font-bold">Workspace Creator</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="glass-card p-6">
        <div className="mb-4">
          <h2 className="text-sm font-bold text-[#171717]">Granular Role Permissions Matrix</h2>
          <p className="text-xs text-[#737373] mt-0.5">Statutory compliance boundaries enforced across individual roles</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white border-b border-[#E8EAED] text-[#737373] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Platform Capability</th>
                <th className="py-3 px-3 font-bold text-center">Owner</th>
                <th className="py-3 px-3 font-bold text-center">Admin</th>
                <th className="py-3 px-3 font-bold text-center">Accountant</th>
                <th className="py-3 px-3 font-bold text-center">Operator</th>
                <th className="py-3 px-3 font-bold text-center">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAED]">
              {permissionsMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/60 transition-colors">
                  <td className="py-2.5 px-4 font-medium text-[#171717]">{item.action}</td>
                  <td className="py-2.5 px-3 text-center">{item.owner ? <Check className="w-3.5 h-3.5 text-[#16A36A] mx-auto" /> : <X className="w-3.5 h-3.5 text-[#DC5353] mx-auto" />}</td>
                  <td className="py-2.5 px-3 text-center">{item.admin ? <Check className="w-3.5 h-3.5 text-[#16A36A] mx-auto" /> : <X className="w-3.5 h-3.5 text-[#DC5353] mx-auto" />}</td>
                  <td className="py-2.5 px-3 text-center">{item.accountant ? <Check className="w-3.5 h-3.5 text-[#16A36A] mx-auto" /> : <X className="w-3.5 h-3.5 text-[#DC5353] mx-auto" />}</td>
                  <td className="py-2.5 px-3 text-center">{item.operator ? <Check className="w-3.5 h-3.5 text-[#16A36A] mx-auto" /> : <X className="w-3.5 h-3.5 text-[#DC5353] mx-auto" />}</td>
                  <td className="py-2.5 px-3 text-center">{item.viewer ? <Check className="w-3.5 h-3.5 text-[#16A36A] mx-auto" /> : <X className="w-3.5 h-3.5 text-[#DC5353] mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-2xl max-w-md w-full p-6 text-left space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#E8EAED] pb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#171717]">Invite Practice Colleague</h3>
                <p className="text-xs text-[#737373]">Send an onboarding link with pre-assigned permissions</p>
              </div>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="text-[#737373] hover:text-[#171717]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {inviteSuccess ? (
              <div className="p-4 rounded-xl bg-white border border-[#16A36A] text-center space-y-2">
                <Check className="w-6 h-6 text-[#16A36A] mx-auto" />
                <div className="text-xs font-bold text-[#16A36A]">Invitation Link Generated &amp; Dispatched</div>
                <div className="text-[11px] text-[#737373]">Valid for 48 hours with assigned {inviteRole} privileges.</div>
              </div>
            ) : (
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#171717] uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="e.g. CA Sunil Gavaskar"
                    className="w-full px-3 py-2 rounded-lg border border-[#E8EAED] bg-white text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171717] uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@firmdomain.com"
                    className="w-full px-3 py-2 rounded-lg border border-[#E8EAED] bg-white text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171717] uppercase mb-1">Assigned Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as Role)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8EAED] bg-white text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  >
                    <option value="Admin">Admin (Full Management &amp; Settings)</option>
                    <option value="Accountant">Accountant (Client Vault &amp; Billing Access)</option>
                    <option value="Operator">Operator (Filing Runner &amp; Extension Pairing)</option>
                    <option value="Viewer">Viewer (Read-Only Audit &amp; Status Logs)</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="btn-secondary text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
