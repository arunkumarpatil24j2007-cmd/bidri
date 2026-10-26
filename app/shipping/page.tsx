import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Shipping Across India — Bidri Crafts',
  description: 'Fast, insured express courier delivery policy across all Indian PIN codes for authentic Bidriware handicrafts.',
};

export default function ShippingPage() {
  return (
    <div className="w-full bg-ivory pt-32 sm:pt-36 pb-32 select-none">
      <div className="container-luxury max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="font-eyebrow text-[10.5px] text-rani-pink tracking-[0.35em] uppercase font-medium block">
            TRANSIT & LOGISTICS
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-bidri-black">
            Free Insured Shipping Across India
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[50ch] leading-relaxed">
            Every handcrafted piece is packed in custom archival cushioned wooden boxes in Bidar, Karnataka, and shipped directly to your doorstep.
          </p>
        </div>

        <div className="space-y-8 divide-y divide-silver/30 border-y border-silver/40 font-body text-sm text-graphite font-light leading-relaxed">
          <div className="pt-6 space-y-2">
            <div className="flex items-center space-x-2 text-bidri-black font-medium">
              <Clock size={16} className="text-antique-gold" />
              <h2 className="font-display text-xl font-light">1. Delivery Timelines</h2>
            </div>
            <p>
              Orders are dispatched within 24–48 hours from our Bidar workshop. Transit time is 3–5 business days for major Indian metro cities (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Kolkata, Pune) and 5–7 business days for other regional PIN codes via Bluedart and Delhivery.
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <div className="flex items-center space-x-2 text-bidri-black font-medium">
              <ShieldCheck size={16} className="text-peacock-teal" />
              <h2 className="font-display text-xl font-light">2. 100% Insured Transit Packaging</h2>
            </div>
            <p>
              Bidriware requires specialized protection. Each piece is nestled in high-density velvet cushioning within reinforced boxes with a tamper-evident seal. Every parcel is 100% insured against loss or damage in transit.
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <div className="flex items-center space-x-2 text-bidri-black font-medium">
              <Truck size={16} className="text-rani-pink" />
              <h2 className="font-display text-xl font-light">3. Shipping Fees & Tracking</h2>
            </div>
            <p>
              Standard insured express shipping is <strong>100% Free</strong> on all orders anywhere in India. Real-time SMS and email tracking links are sent as soon as your parcel is scanned by our logistics partners.
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <div className="flex items-center space-x-2 text-bidri-black font-medium">
              <MapPin size={16} className="text-antique-gold" />
              <h2 className="font-display text-xl font-light">4. Dispatch Origin</h2>
            </div>
            <p>
              All shipments originate directly from the artisan workshops in Old City Bidar, Karnataka (PIN 585401), ensuring authentic provenance and immediate dispatch.
            </p>
          </div>
        </div>

        <div className="p-6 bg-mist/60 rounded-xl border border-silver/30 text-center space-y-3">
          <h3 className="font-display text-xl font-light text-bidri-black">Questions about delivery to your PIN code?</h3>
          <p className="font-body text-xs text-graphite max-w-md mx-auto">
            Our customer care team is available to assist you with special delivery requests or corporate bulk orders.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-2 font-eyebrow text-xs text-bidri-black hover:text-rani-pink tracking-widest uppercase hover-link-rule"
          >
            CONTACT CUSTOMER CARE →
          </Link>
        </div>
      </div>
    </div>
  );
}
