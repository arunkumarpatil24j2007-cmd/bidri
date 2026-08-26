'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-4xl mx-auto space-y-20">
        <div className="space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            CONCIERGE & ATELIER
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            Contact the Curatorial Desk
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[50ch] leading-relaxed">
            For bespoke commissions, private viewing requests, or certificate inquiries, our concierge team is at your disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-silver/40 pt-16">
          <div className="md:col-span-5 space-y-8 text-xs font-body text-graphite font-light">
            <div className="space-y-2">
              <span className="font-eyebrow text-[9px] text-graphite/60 tracking-widest uppercase block">
                MAIN ATELIER
              </span>
              <p className="text-bidri-black leading-relaxed">
                Chowbara Road, Old City<br />
                Bidar 585401, Karnataka<br />
                India
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-eyebrow text-[9px] text-graphite/60 tracking-widest uppercase block">
                DIRECT CORRESPONDENCE
              </span>
              <p className="text-bidri-black">concierge@bidricrafts.com</p>
              <p className="text-bidri-black">+91 (0) 8482 254 142</p>
            </div>

            <div className="space-y-2">
              <span className="font-eyebrow text-[9px] text-graphite/60 tracking-widest uppercase block">
                HOURS
              </span>
              <p className="text-graphite/80 leading-relaxed">
                Monday to Saturday<br />
                10:00 – 18:30 IST
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            {submitted ? (
              <div className="p-8 bg-mist border border-silver/40 text-center space-y-3">
                <Check size={20} className="mx-auto text-bidri-black" />
                <h3 className="font-display text-2xl font-light text-bidri-black">
                  Dispatch Received
                </h3>
                <p className="font-body text-xs text-graphite font-light">
                  Our curatorial desk will attend to your inquiry within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                <div>
                  <label className="font-eyebrow text-[9px] text-graphite/60 tracking-widest uppercase block mb-1">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-mist border border-silver/40 p-3 text-xs font-body text-bidri-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-eyebrow text-[9px] text-graphite/60 tracking-widest uppercase block mb-1">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-mist border border-silver/40 p-3 text-xs font-body text-bidri-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-eyebrow text-[9px] text-graphite/60 tracking-widest uppercase block mb-1">
                    MESSAGE OR COMMISSION DETAILS
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full bg-mist border border-silver/40 p-3 text-xs font-body text-bidri-black focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-bidri-black text-ivory font-eyebrow text-[10px] tracking-[0.3em] uppercase hover:bg-graphite transition-colors cursor-pointer"
                >
                  TRANSMIT MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
