import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Complimentary Shipping Policy',
  description: 'Worldwide insured courier shipping details for BIDRI CRAFTS artefacts.',
};

export default function ShippingPage() {
  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            TRANSIT & LOGISTICS
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            Complimentary Worldwide Shipping
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[50ch]">
            Every numbered artefact travels from Bidar in bespoke archival cases designed to withstand temperature and humidity variations.
          </p>
        </div>

        <div className="space-y-8 divide-y divide-silver/30 border-y border-silver/40 font-body text-sm text-graphite font-light leading-relaxed">
          <div className="pt-6 space-y-2">
            <h2 className="font-display text-xl font-light text-bidri-black">
              1. Delivery Timelines
            </h2>
            <p>
              Domestic India deliveries are dispatched via express air courier and arrive within 2–4 business days. International deliveries arrive within 4–7 business days via insured express partners (DHL Express / FedEx Priority).
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <h2 className="font-display text-xl font-light text-bidri-black">
              2. Full Insurance & Archival Packaging
            </h2>
            <p>
              Each shipment is insured to 100% of retail value from the moment it leaves our Bidar workshop until hand delivery to your door, requiring a physical signature on receipt.
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <h2 className="font-display text-xl font-light text-bidri-black">
              3. Customs & Import Duties
            </h2>
            <p>
              All duties and import taxes are calculated and absorbed by BIDRI CRAFTS under Delivered Duty Paid (DDP) protocols for the UK, EU, US, and UAE. No additional charges will be requested at delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
