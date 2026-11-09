"use client";

import React, { useState } from "react";
import { Key, Plus, ShieldCheck, Eye, EyeOff, Copy, Check, AlertTriangle } from "lucide-react";

export default function ApiCredentialsPage() {
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [newKeySecret, setNewKeySecret] = useState<string | null>(null);

  const keys = [
    { id: "key_live_01", name: "Tally Practice Management Sync", prefix: "g8_live_94a2•••", scope: "Forms:Fill, Clients:Read", lastUsed: "12 mins ago", created: "Oct 12, 2026", status: "Active" },
    { id: "key_live_02", name: "Internal Webhook Dispatcher", prefix: "g8_live_37e1•••", scope: "Jobs:Read, Telemetry:Read", lastUsed: "3 hours ago", created: "Nov 01, 2026", status: "Active" },
  ];

  const handleCreateKey = () => {
    const rawSecret = "g8_live_sec_" + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    setNewKeySecret(rawSecret);
    setShowSecretModal(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
            API Credentials &amp; Keys
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Programmatic REST API keys for integrating practice management software and internal pipelines.
          </p>
        </div>

        <button onClick={handleCreateKey} className="btn-primary text-xs">
          <Plus className="w-3.5 h-3.5 text-[#E5B52B]" />
          <span>Generate New API Key</span>
        </button>
      </div>

      {/* Security Notice */}
      <div className="card-white p-4 flex items-center gap-3 border-l-4 border-l-[#16A36A]">
        <ShieldCheck className="w-5 h-5 text-[#16A36A] shrink-0" />
        <div className="text-xs text-[#737373]">
          <strong className="text-[#171717]">Zero-Plaintext Storage:</strong> API keys are hashed with SHA-256 upon generation. Full secrets are never displayed again after initial creation.
        </div>
      </div>

      {/* API Keys Table */}
      <div className="card-white p-0 overflow-hidden">
        <div className="p-4 border-b border-[#E8EAED]">
          <h2 className="text-sm font-bold text-[#171717]">Active API Credentials</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E8EAED] text-[#737373] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Key Label</th>
                <th className="py-3 px-4 font-bold">Key Identifier</th>
                <th className="py-3 px-4 font-bold">Scoped Permissions</th>
                <th className="py-3 px-4 font-bold">Last Used</th>
                <th className="py-3 px-4 font-bold">Created</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Revoke</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAED] text-[#171717]">
              {keys.map((k) => (
                <tr key={k.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 px-4 font-bold">{k.name}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#737373]">{k.prefix}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#171717]">{k.scope}</td>
                  <td className="py-3.5 px-4 text-[#737373]">{k.lastUsed}</td>
                  <td className="py-3.5 px-4 text-[#737373]">{k.created}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[#16A36A] font-bold text-[10px] bg-[#F8FAFC] border border-[#E8EAED] px-2 py-0.5 rounded">
                      ● {k.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-[10px] font-bold text-[#DC5353] hover:underline">
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secret Reveal Modal */}
      {showSecretModal && newKeySecret && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E8EAED] shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-[#171717]">Copy Your New API Secret</h3>
            <p className="text-xs text-[#737373]">
              Make sure to copy this secret now. You will not be able to view it again.
            </p>
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E8EAED] font-mono text-xs text-[#171717] break-all">
              {newKeySecret}
            </div>
            <button
              onClick={() => setShowSecretModal(false)}
              className="btn-primary text-xs w-full justify-center"
            >
              I Have Saved My Secret
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
