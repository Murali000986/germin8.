"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Download,
  Receipt,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  ExternalLink,
  X,
  Check
} from "lucide-react";

export default function BillingPage() {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"individual" | "company" | "enterprise">("company");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle");

  const [invoices, setInvoices] = useState([
    { id: "INV-2026-0089", date: "Nov 09, 2026", period: "Nov 09, 2026 – Dec 08, 2026", amount: 10618.82, gst: 1619.82, status: "PAID", method: "Razorpay Mandate" },
    { id: "INV-2026-0074", date: "Oct 09, 2026", period: "Oct 09, 2026 – Nov 08, 2026", amount: 10618.82, gst: 1619.82, status: "PAID", method: "Razorpay Mandate" },
    { id: "INV-2026-0061", date: "Sep 09, 2026", period: "Sep 09, 2026 – Oct 08, 2026", amount: 10618.82, gst: 1619.82, status: "PAID", method: "Razorpay UPI" },
    { id: "INV-2026-0048", date: "Aug 09, 2026", period: "Aug 09, 2026 – Sep 08, 2026", amount: 10618.82, gst: 1619.82, status: "PAID", method: "HDFC Netbanking" },
  ]);

  const transactions = [
    { id: "pay_rzp_nov_09", date: "09 Nov 2026, 14:32", amount: "₹10,618.82", method: "HDFC Corp Card •••• 4092", status: "SUCCESS" },
    { id: "pay_rzp_oct_09", date: "09 Oct 2026, 14:30", amount: "₹10,618.82", method: "HDFC Corp Card •••• 4092", status: "SUCCESS" },
    { id: "pay_rzp_sep_09", date: "09 Sep 2026, 15:10", amount: "₹10,618.82", method: "UPI / tech@okaxis", status: "SUCCESS" },
    { id: "pay_rzp_aug_09", date: "09 Aug 2026, 11:45", amount: "₹10,618.82", method: "Netbanking / HDFC", status: "SUCCESS" },
  ];

  const handleSimulatePayment = () => {
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
      const newInvoiceNumber = `INV-2026-${String(Math.floor(Math.random() * 900) + 100)}`;
      setInvoices([
        {
          id: newInvoiceNumber,
          date: new Date().toLocaleDateString("en-IN", { month: "short", day: "2-digit", year: "numeric" }),
          period: "Nov 09, 2026 – Nov 09, 2027",
          amount: billingCycle === "annual" ? 85990.40 : 10618.82,
          gst: billingCycle === "annual" ? 13117.44 : 1619.82,
          status: "PAID",
          method: "Razorpay Gateway"
        },
        ...invoices
      ]);
    }, 1800);
  };

  return (
    <div className="space-y-6 text-[#171717]">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-[#E8EAED] text-[11px] font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#16A36A]" />
            <span>PAYMENT GATEWAY &amp; TAX BILLING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            Billing &amp; Tax Invoices
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Review GST statutory invoices, manage Razorpay subscriptions, and configure payment methods.
          </p>
        </div>

        <button 
          onClick={() => { setShowCheckoutModal(true); setPaymentStatus("idle"); }}
          className="btn-primary text-xs flex items-center gap-2 px-4 py-2.5"
        >
          <Zap className="w-4 h-4 text-[#E5B52B]" />
          <span>Change Subscription Plan</span>
        </button>
      </div>

      {/* Active Plan & Payment Method Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Active Plan Glass Card */}
        <div className="md:col-span-7 glass-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#E5B52B] uppercase tracking-wider bg-[#FFF8E5] px-2 py-0.5 rounded border border-[#E5B52B]/40">
                ACTIVE PLAN
              </span>
              <span className="text-xs font-bold text-[#16A36A] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Renews Dec 09, 2026
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-[#171717]">Corporate CA Firm Subscription</h2>
            <p className="text-xs text-[#737373] mt-1 leading-relaxed">
              10 seats included • 1,000 monthly MCA statutory form injections • Multi-workstation extension fleet • Automated GST invoicing.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E8EAED] flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-black text-[#171717]">₹8,999<span className="text-xs font-normal text-[#737373]"> / month</span></div>
              <div className="text-[11px] text-[#737373]">+ 18% Statutory GST (CGST 9% + SGST 9%)</div>
            </div>
            <button 
              onClick={() => { setShowCheckoutModal(true); setPaymentStatus("idle"); }}
              className="btn-secondary text-xs"
            >
              Manage Tier
            </button>
          </div>
        </div>

        {/* Payment Method Glass Card */}
        <div className="md:col-span-5 glass-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                PAYMENT METHOD
              </span>
              <span className="text-[10px] font-mono text-[#737373]">RAZORPAY MANDATE</span>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8EAED] flex items-center justify-center text-[#171717] shadow-2xs">
                <CreditCard className="w-5 h-5 text-[#171717]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#171717]">HDFC Corporate MasterCard</div>
                <div className="text-xs text-[#737373]">•••• •••• •••• 4092 (Exp 08/29)</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8EAED] flex items-center justify-between">
            <span className="text-[11px] text-[#16A36A] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Auto-Debit Enabled
            </span>
            <button 
              onClick={() => alert("Razorpay card update token dispatched.")}
              className="text-xs font-bold text-[#171717] underline hover:text-[#E5B52B]"
            >
              Update Card
            </button>
          </div>
        </div>

      </div>

      {/* GST Invoices Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-[#E8EAED] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#171717]">GST Statutory Tax Invoices</h2>
            <p className="text-[11px] text-[#737373] mt-0.5">Compliant tax deduction receipts for firm IT return filing</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white border-b border-[#E8EAED] text-[#737373] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5 font-bold">Invoice #</th>
                <th className="py-3.5 px-5 font-bold">Date</th>
                <th className="py-3.5 px-5 font-bold">Billing Period</th>
                <th className="py-3.5 px-5 font-bold">GST (18%)</th>
                <th className="py-3.5 px-5 font-bold">Total Amount</th>
                <th className="py-3.5 px-5 font-bold">Status</th>
                <th className="py-3.5 px-5 font-bold text-right">Tax Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAED]">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-[#171717]">{inv.id}</td>
                  <td className="py-3.5 px-5 text-[#737373]">{inv.date}</td>
                  <td className="py-3.5 px-5 text-[#737373]">{inv.period}</td>
                  <td className="py-3.5 px-5 font-mono text-[#737373]">₹{inv.gst.toFixed(2)}</td>
                  <td className="py-3.5 px-5 font-mono font-bold text-[#171717]">₹{inv.amount.toFixed(2)}</td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#16A36A]">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button 
                      onClick={() => alert(`Downloading statutory tax receipt ${inv.id}`)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#E8EAED] bg-white text-[11px] font-semibold text-[#171717] hover:border-[#171717] shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5 text-[#171717]" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Razorpay Transactions Feed */}
      <div className="glass-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#171717]">Razorpay Settlement Ledger</h2>
            <p className="text-xs text-[#737373]">Direct payment gateway reference IDs and webhook reconciliation status</p>
          </div>
          <span className="text-[10px] font-mono bg-white px-2.5 py-1 rounded border border-[#E8EAED] text-[#737373]">
            API WEBHOOKS: VERIFIED
          </span>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-3.5 rounded-xl border border-[#E8EAED] bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] flex items-center justify-center text-[#16A36A]">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-[#171717]">{tx.id}</div>
                  <div className="text-[11px] text-[#737373]">{tx.method} • {tx.date}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono font-bold text-[#171717]">{tx.amount}</div>
                <div className="text-[10px] font-bold text-[#16A36A]">{tx.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Razorpay Checkout Simulator Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-2xl max-w-lg w-full p-6 text-left space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#E8EAED] pb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#171717] flex items-center justify-center text-white text-xs font-black">
                  RZP
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#171717]">Razorpay Secure Checkout</h3>
                  <p className="text-[10px] text-[#737373]">256-Bit SSL Encrypted Statutory Mandate</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCheckoutModal(false)}
                className="text-[#737373] hover:text-[#171717]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {paymentStatus === "idle" && (
              <div className="space-y-4">
                {/* Billing Cycle Switcher */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8EAED]">
                  <div>
                    <span className="text-xs font-bold text-[#171717]">Billing Cycle</span>
                    <span className="ml-2 text-[10px] text-[#16A36A] font-bold">Save 20% on Annual</span>
                  </div>
                  <div className="flex gap-1 p-1 rounded-lg border border-[#E8EAED] bg-white">
                    <button
                      onClick={() => setBillingCycle("monthly")}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded ${billingCycle === "monthly" ? "bg-[#171717] text-white" : "text-[#737373]"}`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle("annual")}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded ${billingCycle === "annual" ? "bg-[#171717] text-white" : "text-[#737373]"}`}
                    >
                      Annual
                    </button>
                  </div>
                </div>

                {/* Tier Selection */}
                <div className="space-y-2">
                  <div 
                    onClick={() => setSelectedTier("individual")}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedTier === "individual" ? "border-[#171717] shadow-xs" : "border-[#E8EAED]"}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs font-bold text-[#171717]">Solo Practitioner</div>
                        <div className="text-[11px] text-[#737373]">1 Seat • 150 Injections / mo</div>
                      </div>
                      <div className="text-xs font-black text-[#171717]">₹2,999 / mo</div>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedTier("company")}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedTier === "company" ? "border-[#171717] shadow-xs" : "border-[#E8EAED]"}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs font-bold text-[#171717]">Corporate CA Firm (Recommended)</div>
                        <div className="text-[11px] text-[#737373]">10 Seats • 1,000 Injections / mo</div>
                      </div>
                      <div className="text-xs font-black text-[#171717]">₹8,999 / mo</div>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedTier("enterprise")}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedTier === "enterprise" ? "border-[#171717] shadow-xs" : "border-[#E8EAED]"}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs font-bold text-[#171717]">Corporate Legal Enterprise</div>
                        <div className="text-[11px] text-[#737373]">Unlimited Seats &amp; Injections</div>
                      </div>
                      <div className="text-xs font-black text-[#171717]">₹24,999 / mo</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8EAED] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#737373]">Total Payable:</div>
                    <div className="text-lg font-black text-[#171717]">
                      {selectedTier === "company" 
                        ? (billingCycle === "annual" ? "₹85,990.40" : "₹10,618.82")
                        : (selectedTier === "individual" ? "₹3,538.82" : "₹29,498.82")}
                    </div>
                  </div>
                  <button 
                    onClick={handleSimulatePayment}
                    className="btn-primary text-xs flex items-center gap-2 px-5 py-2.5"
                  >
                    <span>Confirm &amp; Pay with Razorpay</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E5B52B]" />
                  </button>
                </div>
              </div>
            )}

            {paymentStatus === "processing" && (
              <div className="py-12 text-center space-y-4">
                <div className="w-10 h-10 border-3 border-[#171717] border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="text-xs font-bold text-[#171717]">Communicating with Razorpay API Gateway...</div>
                <p className="text-[11px] text-[#737373]">Computing HMAC-SHA256 signature and issuing GST tax invoice.</p>
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A36A] mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#171717]">Subscription Successfully Activated!</h4>
                  <p className="text-xs text-[#737373] mt-1">Payment verified via Razorpay webhook. Your statutory invoice has been issued.</p>
                </div>
                <button 
                  onClick={() => setShowCheckoutModal(false)}
                  className="btn-primary text-xs px-6 py-2"
                >
                  Return to Billing Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
