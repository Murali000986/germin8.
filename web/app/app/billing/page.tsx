"use client";

import React from "react";
import { Receipt, Download, CreditCard, CheckCircle2 } from "lucide-react";

export default function BillingPage() {
  const invoices = [
    { id: "INV-2026-0089", date: "Nov 09, 2026", amount: "₹10,618.82", period: "Nov 09 - Dec 09, 2026", status: "PAID", gst: "₹1,619.82" },
    { id: "INV-2026-0074", date: "Oct 09, 2026", amount: "₹10,618.82", period: "Oct 09 - Nov 09, 2026", status: "PAID", gst: "₹1,619.82" },
    { id: "INV-2026-0061", date: "Sep 09, 2026", amount: "₹10,618.82", period: "Sep 09 - Oct 09, 2026", status: "PAID", gst: "₹1,619.82" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
          Billing &amp; Tax Invoices
        </h1>
        <p className="text-xs text-[#737373] mt-1">
          Review GST-compliant statutory tax invoices and payment method settings.
        </p>
      </div>

      {/* Payment Method Card */}
      <div className="card-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E8EAED] flex items-center justify-center text-[#171717]">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#171717]">Razorpay Mandate • HDFC Bank Corporate Card</div>
            <div className="text-xs text-[#737373]">Ending in •••• 4092 (Expires 08/29)</div>
          </div>
        </div>

        <button className="btn-secondary text-xs">
          Update Payment Card
        </button>
      </div>

      {/* Invoices Table */}
      <div className="card-white p-0 overflow-hidden">
        <div className="p-4 border-b border-[#E8EAED]">
          <h2 className="text-sm font-bold text-[#171717]">GST Tax Invoices</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E8EAED] text-[#737373] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Invoice Number</th>
                <th className="py-3 px-4 font-bold">Billing Date</th>
                <th className="py-3 px-4 font-bold">Coverage Period</th>
                <th className="py-3 px-4 font-bold">GST Included (18%)</th>
                <th className="py-3 px-4 font-bold">Total Amount</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">PDF Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAED] text-[#171717]">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 px-4 font-mono font-bold">{inv.id}</td>
                  <td className="py-3.5 px-4 text-[#737373]">{inv.date}</td>
                  <td className="py-3.5 px-4">{inv.period}</td>
                  <td className="py-3.5 px-4 font-mono">{inv.gst}</td>
                  <td className="py-3.5 px-4 font-mono font-bold">{inv.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[#16A36A] font-bold text-[10px] bg-[#F8FAFC] border border-[#E8EAED] px-2 py-0.5 rounded">
                      ● {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-xs font-semibold text-[#171717] hover:text-[#E5B52B] inline-flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
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
