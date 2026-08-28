'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export const LookbookSection: React.FC = () => {
  return (
    <section className="section-luxury container-luxury bg-ivory select-none" id="lookbook">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-rani-pink/10 border border-rani-pink/30 px-3 py-1">
          <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.38em] uppercase font-medium">
            VISUAL ANTHOLOGY
          </span>
        </div>
        <h2 className="font-display headline-sub font-light text-bidri-black">
          The New Deccan Anthology
        </h2>
        <p className="font-body text-sm sm:text-base text-graphite font-light max-w-xl mx-auto leading-relaxed">
          Unconventional styling celebrating the raw versatility of Bidri metalcraft and Karnataka Ilkal handlooms.
        </p>
      </div>

      {/* 2-Column Lookbook Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {/* Look 01 */}
        <Reveal delay={0}>
          <div className="group flex flex-col bg-mist border border-silver/40 overflow-hidden card-hover-rich">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/img/editorial/ilkal_lookbook_duo.jpg"
                alt="Two Indian models in emerald and mustard Ilkal sarees with handcrafted Bidri goblets and cuff"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-8 space-y-3 bg-ivory">
              <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.3em] uppercase block font-medium">
                LOOK 01 — THE FORTRESS COURTYARD
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-bidri-black">
                Emerald Ilkal × Mustard Drape with Bidri Goblet
              </h3>
              <p className="font-body text-xs sm:text-sm text-graphite font-light leading-relaxed">
                Styled with handcrafted silver tribal earrings, hammered Bidri cuffs, and a floral-inlaid wine goblet in sun-drenched Bidar sandstone arches.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="font-eyebrow text-[10.5px] text-bidri-black hover:text-rani-pink tracking-[0.3em] uppercase hover-link-rule"
                >
                  SHOP THIS LOOK →
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Look 02 */}
        <Reveal delay={0.15}>
          <div className="group flex flex-col bg-mist border border-silver/40 overflow-hidden card-hover-rich">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/img/editorial/ilkal_vintage_car.jpg"
                alt="Young Indian woman in black and red Ilkal saree with vintage Ambassador car holding Bidri jewellery casket"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-8 space-y-3 bg-ivory">
              <span className="font-eyebrow text-[10px] text-antique-gold tracking-[0.3em] uppercase block font-medium">
                LOOK 02 — THE AMBASSADOR NOSTALGIA
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-bidri-black">
                Black & Crimson Ilkal Drape with Inlay Casket
              </h3>
              <p className="font-body text-xs sm:text-sm text-graphite font-light leading-relaxed">
                Paired with retro tinted sunglasses, classic Kolhapuri sandals, and a hand-chiselled pure silver Bidri jewellery box on iconic Indian city streets.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="font-eyebrow text-[10.5px] text-bidri-black hover:text-rani-pink tracking-[0.3em] uppercase hover-link-rule"
                >
                  SHOP THIS LOOK →
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
