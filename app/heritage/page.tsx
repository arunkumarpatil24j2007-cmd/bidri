import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Six Centuries of Heritage · Since 1422',
  description: 'The history of Bidriware — from the 15th-century Bahmani Sultanate court in Bidar to Geographical Indication Tag No. 12.',
};

export default function HeritagePage() {
  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-5xl mx-auto space-y-32">
        {/* Header */}
        <div className="max-w-2xl space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            CHRONICLE · 1422 TO THE PRESENT
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            The Bahmani Court & The Sacred Earth of Bidar
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[52ch] leading-relaxed">
            Bidriware was born in 1422 when Sultan Ahmad Shah Bahmani moved his capital to the Deccan plateau and united Persian inlayers with local metal founders.
          </p>
        </div>

        {/* Section 1: Persian Lineage & Court Patronage */}
        <section className="border-t border-silver/40 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <span className="font-display text-sm text-silver italic font-light">
                Chapter I
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black mt-1">
                The Sultan’s Royal Atelier
              </h2>
              <p className="font-body text-sm text-graphite font-light leading-relaxed">
                When craftsmen from Shiraz and Tabriz met the metal founders of Bidar, they established a singular art form. Using an alloy predominantly composed of zinc with a fraction of copper, they developed vessels capable of receiving deep chisels without fracturing.
              </p>
              <p className="font-body text-sm text-graphite font-light leading-relaxed">
                Imperial surahis, huqqa bases, and paan-daan caskets quickly became the signature ceremonial gifts exchanged between Deccan sultans and visiting Mughal and European envoys.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal scale>
              <div className="relative aspect-[4/3] w-full bg-mist border border-silver/40 overflow-hidden">
                <Image
                  src="/img/hero/hero-1.jpg"
                  alt="Traditional Bidriware vase held in hands"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 2: The Mineral Geology of Bidar Fort */}
        <section className="border-t border-silver/40 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <Reveal>
              <span className="font-display text-sm text-silver italic font-light">
                Chapter II
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black mt-1">
                The Soil Beneath the Fortress
              </h2>
              <p className="font-body text-sm text-graphite font-light leading-relaxed">
                The distinguishing jet-black patina cannot be recreated elsewhere. The soil collected from beneath the medieval bastions of Bidar Fort contains a rare balance of alkaline nitrate salts shielded from rain and sunlight for centuries.
              </p>
              <p className="font-body text-sm text-graphite font-light leading-relaxed">
                When heated in a solution of this earth and ammonium chloride, only the zinc-copper alloy oxidises to a deep matte black, while pure silver wire emerges completely untarnished.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <Reveal scale>
              <div className="relative aspect-[4/3] w-full bg-mist border border-silver/40 overflow-hidden">
                <Image
                  src="/img/editorial/editorial-1.jpg"
                  alt="Bidri Surahi Ewer in historic context"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 3: Geographical Indication Tag No. 12 */}
        <section className="border-t border-silver/40 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <span className="font-display text-sm text-silver italic font-light">
                Chapter III
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black mt-1">
                Legal Heritage & GI Tag No. 12
              </h2>
              <p className="font-body text-sm text-graphite font-light leading-relaxed">
                To protect against counterfeit electroplating and machine-stamped imitations, Bidriware was granted official Geographical Indication (GI) registration under GI Tag No. 12 by the Government of India.
              </p>
              <p className="font-body text-sm text-graphite font-light leading-relaxed">
                Only pieces cast, chiselled, inlaid with pure silver, and patinated with authentic Bidar Fort earth within the geographical boundaries of Bidar, Karnataka may legally bear the name Bidriware.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 bg-mist border border-silver/40 space-y-4 text-center">
              <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase block">
                STATUTORY DESIGNATION
              </span>
              <p className="font-display text-2xl font-light text-bidri-black">
                Geographical Indication Registry
              </p>
              <p className="text-xs font-body text-graphite/80 font-light max-w-sm mx-auto leading-relaxed">
                Class 6 & 14 (Metalcraft & Adornments). Preserved exclusively in Bidar, Karnataka, India.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
