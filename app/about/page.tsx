import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About The House',
  description: 'The philosophy of BIDRI CRAFTS — a house dedicated to preserving authentic zinc-copper alloy and pure silver inlay metalware.',
};

export default function AboutPage() {
  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-4xl mx-auto space-y-24">
        <div className="space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            THE MAISON PHILOSOPHY
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            A Museum in the Morning Light
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[54ch] leading-relaxed">
            Black metal, pure silver, and an enormous amount of empty white. BIDRI CRAFTS exists to protect the 14th-century craft of Bidar from mass industrial dilution.
          </p>
        </div>

        <div className="relative aspect-[16/9] w-full bg-mist border border-silver/40 overflow-hidden">
          <Image
            src="/img/editorial/editorial-5.jpg"
            alt="BIDRI CRAFTS Atelier Campaign"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-body text-sm text-graphite font-light leading-relaxed">
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-light text-bidri-black">
              Uncompromising Antiquity
            </h2>
            <p>
              We do not use synthetic patinas, modern lacquers, or electroplated coatings. Every vessel begins as raw molten zinc and copper in crucibles and ends in a boiling bath of mineral-rich soil harvested from Bidar Fort.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-light text-bidri-black">
              Guild Stewardship
            </h2>
            <p>
              By working exclusively with master families in the Old City of Bidar, we ensure fair master compensation, apprentice education, and the preservation of freehand chiselling techniques without mechanical templates.
            </p>
          </div>
        </div>

        <div className="p-8 bg-mist border border-silver/40 text-center space-y-4">
          <h3 className="font-display text-2xl font-light text-bidri-black">
            Visit the Atelier
          </h3>
          <p className="font-body text-xs text-graphite font-light max-w-md mx-auto">
            Our historical workshops in Old City Bidar welcome patrons by private appointment.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="font-eyebrow text-[10px] text-bidri-black tracking-[0.3em] uppercase hover-link-rule"
            >
              REQUEST PRIVATE ATELIER VISIT →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
