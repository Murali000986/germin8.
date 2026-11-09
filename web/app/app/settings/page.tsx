"use client";

import React, { useState } from "react";
import { Settings, Shield, User, Lock, Check, Save } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
          Workspace Settings &amp; Security
        </h1>
        <p className="text-xs text-[#737373] mt-1">
          Configure firm profile, account security preferences, and extension telemetry boundaries.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Practice Profile */}
        <div className="card-white space-y-4">
          <h2 className="text-sm font-bold text-[#171717] border-b border-[#E8EAED] pb-3">
            Practice Firm Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#171717] uppercase mb-1">Firm Legal Name</label>
              <input
                type="text"
                defaultValue="Technova CA Practice & Associates"
                className="w-full px-3 py-2 rounded-lg border border-[#E8EAED] bg-[#F8FAFC] text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#E5B52B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171717] uppercase mb-1">ICAI / ICSI Firm Reg No (FRN)</label>
              <input
                type="text"
                defaultValue="108492W"
                className="w-full px-3 py-2 rounded-lg border border-[#E8EAED] bg-[#F8FAFC] text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#E5B52B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171717] uppercase mb-1">Primary Partner Email</label>
              <input
                type="email"
                defaultValue="rajesh@technova.com"
                className="w-full px-3 py-2 rounded-lg border border-[#E8EAED] bg-[#F8FAFC] text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#E5B52B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171717] uppercase mb-1">Billing GSTIN</label>
              <input
                type="text"
                defaultValue="27AABCT3098K1ZM"
                className="w-full px-3 py-2 rounded-lg border border-[#E8EAED] bg-[#F8FAFC] text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#E5B52B]"
              />
            </div>
          </div>
        </div>

        {/* Security & Authentication */}
        <div className="card-white space-y-4">
          <h2 className="text-sm font-bold text-[#171717] border-b border-[#E8EAED] pb-3">
            Security &amp; Session Boundaries
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#F8FAFC] border border-[#E8EAED]">
              <div>
                <div className="font-bold text-[#171717]">Two-Factor Authentication (2FA)</div>
                <div className="text-[#737373]">Require authenticator app verification upon login for all firm partners.</div>
              </div>
              <span className="bg-[#F8FAFC] text-[#16A36A] font-bold px-2 py-0.5 rounded border border-[#E8EAED]">
                Enabled
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#F8FAFC] border border-[#E8EAED]">
              <div>
                <div className="font-bold text-[#171717]">Extension Ephemeral Code TTL</div>
                <div className="text-[#737373]">Maximum pairing code validity window for new companion devices.</div>
              </div>
              <span className="font-bold text-[#171717]">10 Minutes</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary text-xs">
            {saved ? <Check className="w-3.5 h-3.5 text-[#16A36A]" /> : <Save className="w-3.5 h-3.5 text-[#E5B52B]" />}
            <span>{saved ? "Settings Saved" : "Save Changes"}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
