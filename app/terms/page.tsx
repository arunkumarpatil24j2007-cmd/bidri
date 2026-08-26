import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Provenance & Commission',
  description: 'Terms governing acquisitions, GI Tag authenticity, and private commissions.',
};

export default function TermsPage() {
  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            LEGAL PROTOCOL
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            Terms of Provenance & Acquisition
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[50ch]">
            Governing all transactions, certificate registrations, and bespoke commissions under the jurisdiction of Karnataka, India.
          </p>
        </div>

        <div className="space-y-8 divide-y divide-silver/30 border-y border-silver/40 font-body text-sm text-graphite font-light leading-relaxed">
          <div className="pt-6 space-y-2">
            <h2 className="font-display text-xl font-light text-bidri-black">
              1. GI Tag Integrity & Certification
            </h2>
            <p>
              All artefacts sold through this portal are guaranteed genuine Bidriware manufactured in accordance with the Geographical Indications of Goods (Registration and Protection) Act, 1999 under GI Tag No. 12.
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <h2 className="font-display text-xl font-light text-bidri-black">
              2. Handcrafted Variations
            </h2>
            <p>
              Because every piece is cast in clay and chiselled entirely freehand by master artisans without mechanical templates, slight variations in floral engraving lineation and natural fort earth patina are the hallmark of authentic mastercraft.
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <h2 className="font-display text-xl font-light text-bidri-black">
              3. Bespoke Commission Agreements
            </h2>
            <p>
              Private commissions require a 50% earnest commitment upon approval of the design blueprint and 50% upon completion and archival deed verification prior to dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
