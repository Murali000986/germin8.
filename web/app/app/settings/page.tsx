"use client";

import React, { useState } from "react";
import {
  Settings,
  Shield,
  User,
  Lock,
  Check,
  Save,
  Bell,
  Laptop,
  QrCode,
  Smartphone,
  KeyRound,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  LogOut
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications" | "extension">("profile");
  const [saved, setSaved] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [totpCode, setTotpCode] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (totpCode.length === 6) {
      setTwoFactorEnabled(true);
      setShowQrModal(false);
      setTotpCode("");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl text-[#171717]">
      
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-bold uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-[#171717]" />
          <span>FIRM PREFERENCES &amp; SECURITY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
          Workspace Settings &amp; Security
        </h1>
        <p className="text-xs text-[#737373] mt-1">
          Manage practice firm registration records, two-factor authentication, notification webhooks, and extension security boundaries.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-[#E8EAED] gap-2 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === "profile"
              ? "border-[#171717] text-[#171717]"
              : "border-transparent text-[#737373] hover:text-[#171717]"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Firm Profile</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === "security"
              ? "border-[#171717] text-[#171717]"
              : "border-transparent text-[#737373] hover:text-[#171717]"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Authentication &amp; 2FA</span>
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === "notifications"
              ? "border-[#171717] text-[#171717]"
              : "border-transparent text-[#737373] hover:text-[#171717]"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Alerts &amp; Webhooks</span>
        </button>

        <button
          onClick={() => setActiveTab("extension")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === "extension"
              ? "border-[#171717] text-[#171717]"
              : "border-transparent text-[#737373] hover:text-[#171717]"
          }`}
        >
          <Laptop className="w-4 h-4" />
          <span>Extension Boundaries</span>
        </button>
      </div>

      {/* Save Success Alert */}
      {saved && (
        <div className="p-3 rounded-xl bg-white border border-[#16A36A] flex items-center gap-2 text-xs font-bold text-[#16A36A] animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Preferences updated and synchronized across all paired workstations.</span>
        </div>
      )}

      {/* Tab 1: Profile */}
      {activeTab === "profile" && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="glass-card p-6 space-y-5">
            <div className="border-b border-[#E8EAED] pb-3">
              <h2 className="text-sm font-bold text-[#171717]">Chartered Accountancy Practice Profile</h2>
              <p className="text-xs text-[#737373] mt-0.5">Used for pre-scrutiny header validation and statutory tax invoices</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase mb-1">Firm Legal Name</label>
                <input
                  type="text"
                  defaultValue="Technova CA Practice & Associates LLP"
                  className="w-full px-3 py-2 rounded-lg border border-[#E8EAED] bg-white text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase mb-1">ICAI / ICSI Firm Reg No (FRN)</label>
                <input
                  type="text"
                  defaultValue="108492W"
                  className="w-full px-3 py-2 rounded-lg border border-[#E8EAED] bg-white text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase mb-1">Goods &amp; Services Tax ID (GSTIN)</label>
                <input
                  type="text"
                  defaultValue="27AABCT3529Q1ZV"
                  className="w-full px-3 py-2 rounded-lg border border-[#E8EAED] bg-white text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase mb-1">Primary Partner Email</label>
                <input
                  type="email"
                  defaultValue="rajeshwari@apexcorp.com"
                  className="w-full px-3 py-2 rounded-lg border border-[#E8EAED] bg-white text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#171717] uppercase mb-1">Registered Practice Address</label>
                <textarea
                  rows={2}
                  defaultValue="Suite 804, Express Towers, Nariman Point, Mumbai, Maharashtra 400021"
                  className="w-full px-3 py-2 rounded-lg border border-[#E8EAED] bg-white text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button type="submit" className="btn-primary text-xs flex items-center gap-2 px-5 py-2">
                <Save className="w-3.5 h-3.5" />
                <span>Save Practice Profile</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Security & 2FA */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Two-Factor Authentication Card */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8EAED] pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#171717]">Two-Factor Authentication (TOTP)</h2>
                <p className="text-xs text-[#737373] mt-0.5">Protect firm client vaults with Google Authenticator or 1Password</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${
                twoFactorEnabled ? "bg-[#DCFCE7] text-[#16A36A]" : "bg-white border border-[#E8EAED] text-[#737373]"
              }`}>
                {twoFactorEnabled ? "ACTIVE (ENFORCED)" : "DISABLED"}
              </span>
            </div>

            <p className="text-xs text-[#737373] leading-relaxed">
              When 2FA is active, signing into your Germin8 console and generating ephemeral Chrome Extension pairing codes requires a rotating 6-digit TOTP code.
            </p>

            <div className="pt-2">
              {twoFactorEnabled ? (
                <button
                  onClick={() => setTwoFactorEnabled(false)}
                  className="btn-secondary text-xs text-[#DC5353] border-[#DC5353]/30 hover:border-[#DC5353]"
                >
                  Disable Two-Factor Authentication
                </button>
              ) : (
                <button
                  onClick={() => setShowQrModal(true)}
                  className="btn-primary text-xs flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4 text-[#E5B52B]" />
                  <span>Configure Authenticator App</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Workstation Sessions */}
          <div className="glass-card p-6 space-y-4">
            <div className="border-b border-[#E8EAED] pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#171717]">Active Login Sessions</h2>
                <p className="text-xs text-[#737373] mt-0.5">Devices currently signed into this practitioner account</p>
              </div>
              <button 
                onClick={() => alert("All secondary sessions terminated.")}
                className="text-xs font-bold text-[#DC5353] hover:underline"
              >
                Sign Out All Other Devices
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-[#E8EAED] bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E8EAED] flex items-center justify-center text-[#171717]">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#171717]">MacBook Pro 16″ • Chrome 130</div>
                    <div className="text-[11px] text-[#737373]">Mumbai, India • Active Now (Current Session)</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#16A36A] bg-[#DCFCE7] px-2 py-0.5 rounded">
                  THIS DEVICE
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-[#E8EAED] bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E8EAED] flex items-center justify-center text-[#171717]">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#171717]">iPhone 15 Pro • Safari Mobile</div>
                    <div className="text-[11px] text-[#737373]">Mumbai, India • Last active 4 hours ago</div>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Session revoked.")}
                  className="text-xs text-[#737373] hover:text-[#DC5353] font-semibold"
                >
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === "notifications" && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="border-b border-[#E8EAED] pb-3">
              <h2 className="text-sm font-bold text-[#171717]">Statutory Filing Alert Preferences</h2>
              <p className="text-xs text-[#737373] mt-0.5">Configure automated notifications across WhatsApp and Email</p>
            </div>

            <div className="space-y-4 divide-y divide-[#E8EAED] text-xs">
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#171717]">Filing Automation Completed</div>
                  <div className="text-[#737373] text-[11px]">Instant alert when an e-form injection finishes with 100% verified fields</div>
                </div>
                <input type="checkbox" defaultChecked className="accent-[#171717] w-4 h-4 cursor-pointer" />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#171717]">Pre-Scrutiny Defect Warning</div>
                  <div className="text-[#737373] text-[11px]">Alert when a PAN, DIN, or CIN structure fails local validation check</div>
                </div>
                <input type="checkbox" defaultChecked className="accent-[#171717] w-4 h-4 cursor-pointer" />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#171717]">New Chrome Extension Paired</div>
                  <div className="text-[#737373] text-[11px]">Security alert when a staff member links a new workstation via rolling PIN</div>
                </div>
                <input type="checkbox" defaultChecked className="accent-[#171717] w-4 h-4 cursor-pointer" />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#171717]">Monthly GST Tax Invoice Issued</div>
                  <div className="text-[#737373] text-[11px]">Email copy of monthly Razorpay subscription receipt with GST breakdown</div>
                </div>
                <input type="checkbox" defaultChecked className="accent-[#171717] w-4 h-4 cursor-pointer" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="btn-primary text-xs px-5 py-2">
                Save Notification Settings
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 4: Extension Boundaries */}
      {activeTab === "extension" && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="border-b border-[#E8EAED] pb-3">
              <h2 className="text-sm font-bold text-[#171717]">Chrome Extension Security Policies</h2>
              <p className="text-xs text-[#737373] mt-0.5">Control workstation session lifetimes and zero-trust boundaries</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase mb-1">
                  Ephemeral Pairing Code Time-To-Live (TTL)
                </label>
                <select className="w-full sm:w-72 px-3 py-2 rounded-lg border border-[#E8EAED] bg-white text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#171717]">
                  <option value="10">10 Minutes (Strict Security - Recommended)</option>
                  <option value="30">30 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
                <p className="text-[11px] text-[#737373] mt-1">Codes expire automatically if not linked to an active extension within this window.</p>
              </div>

              <div className="pt-3 border-t border-[#E8EAED]">
                <label className="block text-xs font-bold text-[#171717] uppercase mb-1">
                  Synthetic Angular Input Dispatch Delay
                </label>
                <select className="w-full sm:w-72 px-3 py-2 rounded-lg border border-[#E8EAED] bg-white text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#171717]">
                  <option value="50">50 ms (Ultra-Fast 1.2s Ingestion)</option>
                  <option value="100">100 ms (Standard)</option>
                  <option value="200">200 ms (High Portal Congestion Mode)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="btn-primary text-xs px-5 py-2">
                Save Extension Policies
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TOTP 2FA Setup Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-2xl max-w-sm w-full p-6 text-center space-y-5 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-base font-extrabold text-[#171717]">Scan Authenticator QR</h3>
              <p className="text-xs text-[#737373] mt-1">Open Google Authenticator and scan this setup barcode</p>
            </div>

            {/* Simulated QR Code Canvas */}
            <div className="w-44 h-44 mx-auto p-3 rounded-xl border border-[#E8EAED] bg-white flex items-center justify-center shadow-xs">
              <div className="w-full h-full border border-dashed border-[#171717]/30 rounded-lg flex flex-col items-center justify-center space-y-1">
                <QrCode className="w-16 h-16 text-[#171717]" />
                <span className="text-[9px] font-mono font-bold text-[#737373]">GERMIN8-TOTP-SECRET</span>
              </div>
            </div>

            <form onSubmit={handleVerify2FA} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#737373] uppercase mb-1">Enter 6-Digit TOTP Code</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="w-full text-center tracking-widest font-mono text-lg font-black py-2 rounded-lg border border-[#E8EAED] bg-white focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowQrModal(false)}
                  className="btn-secondary text-xs flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs flex-1"
                >
                  Verify &amp; Enable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
