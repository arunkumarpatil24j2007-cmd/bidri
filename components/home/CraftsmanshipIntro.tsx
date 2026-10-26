'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CraftsmanshipIntro: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 container-luxury select-none" id="craftsmanship" aria-label="Authentic Craftsmanship">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Visual of Craft in action */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden border border-silver/40 shadow-xl bg-mist">
            <Image
              src="/img/artisan/artisan_bidar_inlay.jpg"
              alt="Master artisan chiselling silver inlay on Bidri metal in Bidar workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-bidri-black/85 backdrop-blur-xs p-3.5 rounded-lg text-ivory border border-white/10">
              <span className="font-eyebrow text-[9.5px] text-antique-gold tracking-widest uppercase block">
                OLD CITY ATELIER · BIDAR, KARNATAKA
              </span>
              <p className="font-body text-xs font-light text-silver-bright/90 mt-0.5">
                Master craftsmen chiselling pure silver wire freehand into cast zinc-copper alloy.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Concise Introduction */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-saffron/10 border border-saffron/30 px-3 py-1 rounded-full">
            <ShieldCheck size={14} className="text-antique-gold" />
            <span className="font-eyebrow text-[10px] text-antique-gold tracking-[0.3em] uppercase font-medium">
              600-YEAR HERITAGE · GI TAG NO. 12
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-bidri-black leading-tight">
            The Alchemy of Pure Silver & Fort Soil
          </h2>

          <p className="font-body text-sm sm:text-base text-graphite font-light leading-relaxed">
            Originating in 14th-century Bidar under the Bahmani sultans, Bidriware is one of India&apos;s most revered metallurgical art forms. Cast from an alloy of 94% zinc and 6% copper, each artefact is hand-chiselled with burins and inlaid with pure 99.9% fine silver wire (Tarkashi) or sheet (Mehtabi).
          </p>

          <p className="font-body text-sm text-graphite font-light leading-relaxed">
            The striking contrast is achieved through an ancient oxidizing paste made from soil collected within the historic walls of Bidar Fort, containing unique nitrates that turn the alloy velvet-black while the silver gleams with permanent brilliance.
          </p>

          {/* Key Facts Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start space-x-2.5 p-3 rounded-lg bg-mist/60 border border-silver/30">
              <CheckCircle2 size={16} className="text-peacock-teal flex-shrink-0 mt-0.5" />
              <div className="text-xs font-body">
                <strong className="text-bidri-black font-medium block">Pure 99.9% Fine Silver</strong>
                <span className="text-graphite/70">No synthetic foil or electroplating. Solid silver wire hammered flush.</span>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 p-3 rounded-lg bg-mist/60 border border-silver/30">
              <CheckCircle2 size={16} className="text-peacock-teal flex-shrink-0 mt-0.5" />
              <div className="text-xs font-body">
                <strong className="text-bidri-black font-medium block">100% Freehand Artisanal Work</strong>
                <span className="text-graphite/70">Every line engraved by hereditary artisan families without machines or moulds.</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/about"
              className="font-eyebrow text-xs text-bidri-black hover:text-rani-pink tracking-[0.25em] uppercase hover-link-rule"
            >
              LEARN MORE ABOUT OUR ARTISANS & CRAFT →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
