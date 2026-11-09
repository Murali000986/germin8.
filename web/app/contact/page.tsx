"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    firmName: "",
    enquiryType: "General",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#F1A33B] uppercase mb-2 block">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#202020] tracking-tight">
            Let's Talk About <br />
            <span className="italic font-normal">Your Practice Workflows.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#757575] leading-relaxed">
            Have questions about firm subscription plans, extension security, or enterprise ontologies? Our compliance engineering team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#FFF8E9] border border-[#F5D45C]/50 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#202020]">
                Contact Information
              </h3>
              
              <div className="space-y-4 text-sm text-[#757575]">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#F1A33B] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#202020]">Email Us</div>
                    <div>support@germin8.example</div>
                    <div>partnerships@germin8.example</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#F1A33B] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#202020]">Helpline Hours</div>
                    <div>Mon – Sat, 9:30 AM to 7:00 PM IST</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F1A33B] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#202020]">Engineering Headquarters</div>
                    <div>Bandra Kurla Complex, Mumbai, Maharashtra</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#E8E8F8] border border-[#E8E8F8]">
              <h4 className="font-serif text-xl font-bold text-[#202020] mb-2">Dedicated Firm Onboarding</h4>
              <p className="text-xs sm:text-sm text-[#757575] leading-relaxed">
                Firms with over 25 seats receive a dedicated solutions engineer to assist with client entity bulk uploads and practice management configuration.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F7F7F7] p-8 sm:p-12 rounded-[32px] border border-[#E9E9E9]">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#202020] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="CA Rajesh Kumar"
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E9E9] bg-white text-sm focus:outline-none focus:border-[#F1A33B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#202020] mb-2">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@firm.in"
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E9E9] bg-white text-sm focus:outline-none focus:border-[#F1A33B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#202020] mb-2">
                        Firm / Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.firmName}
                        onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                        placeholder="Kumar & Associates"
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E9E9] bg-white text-sm focus:outline-none focus:border-[#F1A33B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#202020] mb-2">
                        Enquiry Type
                      </label>
                      <select
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E9E9E9] bg-white text-sm focus:outline-none focus:border-[#F1A33B]"
                      >
                        <option value="General">General Enquiry</option>
                        <option value="FirmPlan">Firm Plan Onboarding</option>
                        <option value="Enterprise">Custom Enterprise Solution</option>
                        <option value="Technical">Technical &amp; Extension Support</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#202020] mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your practice volume or specific compliance questions..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E9E9E9] bg-white text-sm focus:outline-none focus:border-[#F1A33B]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-cvpilot text-sm w-full justify-center py-3"
                  >
                    <span>{isSubmitting ? "Sending..." : "Submit Practice Enquiry"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FFF8E9] border border-[#F5D45C] text-[#F1A33B] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#202020]">Enquiry Received</h3>
                  <p className="text-sm text-[#757575] max-w-md mx-auto">
                    Thank you, {formData.fullName}. Our practice solutions team will contact you at <strong>{formData.email}</strong> within one business day.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
