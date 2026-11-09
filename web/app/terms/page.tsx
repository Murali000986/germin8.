import React from "react";

export const metadata = {
  title: "Terms of Service | Germin8",
  description: "Terms and conditions governing the use of the Germin8 MCA automation platform.",
};

export default function TermsPage() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-xs font-semibold tracking-widest text-[#F1A33B] uppercase mb-2 block">
          TERMS &amp; CONDITIONS
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#202020] mb-8">
          Terms of Service
        </h1>
        <div className="text-xs text-[#757575] mb-8 pb-4 border-b border-[#E9E9E9]">
          Last Updated: November 2026 • Effective for all active subscriptions
        </div>

        <div className="space-y-8 text-sm text-[#757575] leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-[#202020] mb-2">1. Nature of the Service</h2>
            <p>
              Germin8 provides intelligent client-side assistance software designed to expedite repetitive form-filling tasks on the MCA V3 portal. Germin8 is an automation aid, not a statutory filing agent or legal representative.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#202020] mb-2">2. Mandatory Human Review &amp; Professional Responsibility</h2>
            <p>
              The practicing Chartered Accountant, Company Secretary, or authorized filing professional retains full statutory responsibility for the veracity, completeness, and legal compliance of any returns filed. You agree to inspect all values populated by the software prior to executing statutory submissions or affixing digital signatures.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#202020] mb-2">3. Subscription Terms &amp; Fair Usage</h2>
            <p>
              Subscriptions are billed in advance according to the selected billing cycle (monthly or annual). Automated form injections are subject to plan limits (150 for Individual, 1,000 for Company). Additional quota may be provisioned through your workspace administrator.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#202020] mb-2">4. Disclaimer of Government Endorsement</h2>
            <p>
              Germin8 is an independent software application and is not associated with, sponsored by, or endorsed by the Ministry of Corporate Affairs, Government of India, or any statutory authority.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
