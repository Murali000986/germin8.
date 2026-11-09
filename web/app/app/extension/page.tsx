"use client";

import React, { useState } from "react";
import { Laptop, Key, RefreshCw, ShieldCheck, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";

export default function ExtensionPairingPage() {
  const [pairingCode, setPairingCode] = useState<string | null>("G8-7F3A");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const pairedDevices = [
    { id: "dev_01", name: "Rajesh Workstation (Chrome 131)", ip: "192.168.1.42", pairedAt: "Nov 02, 2026", status: "ONLINE", version: "v2.5.0" },
    { id: "dev_02", name: "Priya MacBook Air (Chrome 130)", ip: "192.168.1.58", pairedAt: "Nov 04, 2026", status: "ONLINE", version: "v2.5.0" },
    { id: "dev_03", name: "Audit Station 01 (Brave)", ip: "192.168.1.91", pairedAt: "Nov 07, 2026", status: "ONLINE", version: "v2.5.0" },
    { id: "dev_04", name: "Ananya Surface Book (Edge)", ip: "192.168.1.104", pairedAt: "Nov 09, 2026", status: "ONLINE", version: "v2.5.0" },
  ];

  const generateNewCode = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let code = "G8-";
      for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
      setPairingCode(code);
      setIsGenerating(false);
    }, 600);
  };

  const copyCode = () => {
    if (!pairingCode) return;
    navigator.clipboard.writeText(pairingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
          Chrome Extension Pairing
        </h1>
        <p className="text-xs text-[#737373] mt-1">
          Manage authorized browser companion devices connecting to your Technova firm workspace.
        </p>
      </div>

      {/* Ephemeral Pairing Code Card */}
      <div className="card-white grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E5B52B]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">One-Time Ephemeral Pairing Code</span>
          </div>
          <h3 className="text-lg font-bold text-[#171717]">
            Pair a New Workstation or Associate Laptop
          </h3>
          <p className="text-xs text-[#737373] leading-relaxed">
            Open the Germin8 Extension popup on your browser, navigate to Tab 6 (Settings), and enter this 6-character ephemeral pairing code. Valid for 10 minutes.
          </p>
        </div>

        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-[#F8FAFC] border border-[#E8EAED]">
          <div className="font-mono text-2xl font-extrabold text-[#171717] tracking-widest mb-3">
            {pairingCode || "------"}
          </div>

          <div className="flex items-center gap-2 w-full">
            <button
              onClick={copyCode}
              className="flex-1 btn-secondary text-xs justify-center py-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#16A36A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Code"}</span>
            </button>
            <button
              onClick={generateNewCode}
              disabled={isGenerating}
              className="btn-primary text-xs py-1.5 px-3"
              title="Generate New Code"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            </button>
          </div>
          <span className="text-[10px] text-[#737373] mt-2">Expires in 9:42 mins</span>
        </div>
      </div>

      {/* Paired Devices Fleet Table */}
      <div className="card-white p-0 overflow-hidden">
        <div className="p-4 border-b border-[#E8EAED] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#171717]">Authorized Extension Fleet</h2>
            <p className="text-[11px] text-[#737373]">4 devices paired with active hardware scoped tokens.</p>
          </div>
          <span className="text-xs font-semibold text-[#16A36A] bg-[#F8FAFC] border border-[#E8EAED] px-2.5 py-1 rounded-md">
            All Fleet Tokens Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E8EAED] text-[#737373] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Device Name &amp; Browser</th>
                <th className="py-3 px-4 font-bold">IP Address</th>
                <th className="py-3 px-4 font-bold">Version</th>
                <th className="py-3 px-4 font-bold">Paired At</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Revoke</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAED] text-[#171717]">
              {pairedDevices.map((dev) => (
                <tr key={dev.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                    <Laptop className="w-3.5 h-3.5 text-[#737373]" />
                    <span>{dev.name}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#737373]">{dev.ip}</td>
                  <td className="py-3.5 px-4 font-mono">{dev.version}</td>
                  <td className="py-3.5 px-4 text-[#737373]">{dev.pairedAt}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[#16A36A] font-bold text-[10px] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E8EAED]">
                      ● {dev.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-[10px] font-bold text-[#DC5353] hover:underline">
                      Revoke Access
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
