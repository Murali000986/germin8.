import React from "react";

export const metadata = {
  title: "Privacy Policy | Germin8",
  description: "Learn how Germin8 handles client data privacy, local encryption, and zero-trust principles.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-xs font-semibold tracking-widest text-[#F1A33B] uppercase mb-2 block">
          LEGAL &amp; PRIVACY
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#202020] mb-8">
          Privacy Policy
        </h1>
        <div className="text-xs text-[#757575] mb-8 pb-4 border-b border-[#E9E9E9]">
          Last Updated: November 2026 • Effective Immediately
        </div>

        <div className="space-y-8 text-sm text-[#757575] leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-[#202020] mb-2">1. Fundamental Zero-Trust Commitment</h2>
            <p>
              Germin8 Technologies (&quot;Germin8&quot;) is engineered specifically for regulated Indian accounting and corporate law professionals. We never collect, intercept, log, or store your Ministry of Corporate Affairs (MCA) portal login credentials, passwords, or Digital Signature Certificate (DSC) private keys.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#202020] mb-2">2. Client Data Stored in Vault</h2>
            <p>
              When you add client company records (such as CIN, registered address, authorized share capital, and director DINs) to your Germin8 workspace vault, this data is encrypted at rest using industry-standard AES-256 encryption. This data is utilized solely for populating form fields in authorized browser sessions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#202020] mb-2">3. Browser Extension Telemetry</h2>
            <p>
              Our Chrome Extension communicates only with your assigned Germin8 workspace API using ephemeral pairing tokens. The extension does not record your browsing history outside of verified mca.gov.in domain URL targets.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#202020] mb-2">4. Data Deletion and Portability</h2>
            <p>
              You maintain full ownership of all data entered into your workspace. You may export or permanently delete your client vault records at any time from your settings panel.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
