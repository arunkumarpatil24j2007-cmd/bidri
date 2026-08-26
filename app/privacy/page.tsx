import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Charter',
  description: 'Patron privacy charter and archival record protection policy.',
};

export default function PrivacyPage() {
  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            PATRON CHARTER
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            Privacy & Archival Discretion
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[50ch]">
            We uphold strict discretion concerning our patrons, private collectors, and deed registries.
          </p>
        </div>

        <div className="space-y-8 divide-y divide-silver/30 border-y border-silver/40 font-body text-sm text-graphite font-light leading-relaxed">
          <div className="pt-6 space-y-2">
            <h2 className="font-display text-xl font-light text-bidri-black">
              1. Information Collection
            </h2>
            <p>
              We collect information strictly necessary to process orders, assign official Karnataka State GI Certificate numbers, and facilitate private curator appointments. We never share or sell patron data to third-party marketing networks.
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <h2 className="font-display text-xl font-light text-bidri-black">
              2. Archival Registry Records
            </h2>
            <p>
              When a certificate is recorded in the permanent guild ledger, owner identity is encrypted and kept private unless the patron explicitly consents to public provenance recording.
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <h2 className="font-display text-xl font-light text-bidri-black">
              3. Communications
            </h2>
            <p>
              Subscribers to the Bidar Gazette receive two issues annually. You may revoke subscription or request complete deletion of your records at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
