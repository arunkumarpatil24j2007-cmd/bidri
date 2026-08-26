import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { artisans } from '@/content/artisans';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Master Artisans of Bidar',
  description: 'Meet the seventh-generation master families preserving authentic zinc-and-silver Bidri metalcraft in Bidar, Karnataka.',
};

export default function ArtisansPage() {
  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-6xl mx-auto space-y-28">
        {/* Header */}
        <div className="max-w-2xl space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            THE GUILD
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            The Master Makers of Bidar
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[50ch] leading-relaxed">
            In the narrow lanes around Bidar Fort, four master lineages continue the practice of freehand chiselling and fort soil patination without mechanical shortcuts.
          </p>
        </div>

        {/* Artisans Grid */}
        <div className="space-y-24">
          {artisans.map((artisan, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <section
                key={artisan.id}
                className="border-t border-silver/40 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Portrait (5 cols) */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <Reveal scale>
                    <div className="relative aspect-[3/4] w-full bg-mist border border-silver/40 overflow-hidden">
                      <Image
                        src={artisan.image}
                        alt={artisan.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-center"
                      />
                    </div>
                  </Reveal>
                </div>

                {/* Narrative (7 cols) */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isReversed ? 'lg:order-1 lg:pr-12' : 'lg:order-2 lg:pl-12'
                  }`}
                >
                  <Reveal delay={0.1}>
                    <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase block">
                      {artisan.lineage} · {artisan.experience}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black mt-2">
                      {artisan.name}
                    </h2>
                    <p className="font-display italic text-xl text-bidri-black font-light leading-snug mt-3">
                      “{artisan.quote}”
                    </p>
                  </Reveal>

                  <Reveal delay={0.15}>
                    <p className="font-body text-sm text-graphite font-light leading-relaxed">
                      {artisan.bio}
                    </p>
                    <div className="pt-4 border-t border-silver/30 mt-4 flex items-center justify-between text-xs font-body">
                      <span className="text-graphite/70">Signature Specialty:</span>
                      <span className="text-bidri-black font-normal">{artisan.signatureSpecialty}</span>
                    </div>
                  </Reveal>
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer Commission CTA */}
        <section className="p-12 bg-mist border border-silver/40 text-center space-y-4">
          <h3 className="font-display text-2xl font-light text-bidri-black">
            Commission a Master Artisan
          </h3>
          <p className="font-body text-xs text-graphite font-light max-w-md mx-auto">
            Work directly with our master craftsmen on bespoke heirlooms, private monogramming, or imperial court recreations.
          </p>
          <div className="pt-2">
            <Link
              href="/bespoke"
              className="font-eyebrow text-[11px] text-bidri-black tracking-[0.3em] uppercase hover-link-rule"
            >
              COMMISSION AN ARTEFACT →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
