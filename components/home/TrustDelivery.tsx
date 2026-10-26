'use client';

import React from 'react';
import { Truck, ShieldCheck, CreditCard, RotateCcw, HeartHandshake, PhoneCall } from 'lucide-react';

export const TrustDelivery: React.FC = () => {
  const trustItems = [
    {
      icon: <Truck size={24} className="text-antique-gold" />,
      title: 'Free Shipping Across India',
      description: 'Insured express courier delivery to all major Indian PIN codes via Bluedart and Delhivery in 3–5 business days.',
    },
    {
      icon: <ShieldCheck size={24} className="text-peacock-teal" />,
      title: 'GI Tag No. 12 Certified',
      description: 'Every artefact includes an official Karnataka Geographical Indication certificate validating authentic Bidar provenance.',
    },
    {
      icon: <CreditCard size={24} className="text-rani-pink" />,
      title: 'Secure Indian Payments',
      description: '100% encrypted checkout supporting UPI (Google Pay, PhonePe, Paytm), Debit & Credit Cards, and Netbanking.',
    },
    {
      icon: <RotateCcw size={24} className="text-antique-gold" />,
      title: '7-Day Transit Guarantee',
      description: 'Custom archival wooden packaging ensures damage-free transit. Immediate free replacement if package is compromised.',
    },
    {
      icon: <HeartHandshake size={24} className="text-peacock-teal" />,
      title: 'Direct Artisan Fair-Trade',
      description: 'Zero middlemen. Proceeds directly support living wages, apprentice workshops, and healthcare for master families in Bidar.',
    },
    {
      icon: <PhoneCall size={24} className="text-rani-pink" />,
      title: 'Dedicated Customer Support',
      description: 'Assistance with product questions, gift curation, or corporate orders. Reachable via WhatsApp and phone.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-mist/60 border-t border-silver/35 select-none" id="trust" aria-label="Trust and Delivery">
      <div className="container-luxury">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="font-eyebrow text-[10.5px] text-rani-pink tracking-[0.35em] uppercase font-medium block">
            CONFIDENCE & TRUST
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black">
            Direct from Bidar to Your Doorstep
          </h2>
          <p className="font-body text-xs sm:text-sm text-graphite font-light">
            Reliable, insured delivery across India with verified provenance and secure payments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-ivory p-6 rounded-xl border border-silver/30 hover:border-silver/60 transition-all duration-300 shadow-xs space-y-3"
            >
              <div className="w-12 h-12 rounded-lg bg-mist flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-body text-base font-medium text-bidri-black">
                {item.title}
              </h3>
              <p className="font-body text-xs text-graphite font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
