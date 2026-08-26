import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Returns & Guarantee Policy',
  description: '14-day return privilege and lifetime patina restoration guarantee.',
};

export default function ReturnsPage() {
  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            PATRON GUARANTEE
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            Returns & Provenance Assurance
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[50ch]">
            We want you to live with your chosen Bidri artefact with complete peace of mind.
          </p>
        </div>

        <div className="space-y-8 divide-y divide-silver/30 border-y border-silver/40 font-body text-sm text-graphite font-light leading-relaxed">
          <div className="pt-6 space-y-2">
            <h2 className="font-display text-xl font-light text-bidri-black">
              1. 14-Day Return Privilege
            </h2>
            <p>
              If a numbered catalogue piece does not fulfill your expectations upon unboxing, you may initiate a return within 14 days of delivery. The artefact must remain in its original, unhandled condition with certificate deed and velvet packaging intact.
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <h2 className="font-display text-xl font-light text-bidri-black">
              2. Bespoke & Archival Commissions
            </h2>
            <p>
              One-of-one archival pieces and private monogrammed commissions are created specifically to patron specifications and cannot be returned once cast and patinated.
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <h2 className="font-display text-xl font-light text-bidri-black">
              3. Lifetime Re-blackening Warranty
            </h2>
            <p>
              Every registered deed holder receives complimentary lifetime atelier re-blackening in Bidar should surface contact or mineral exposure ever require refreshment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
