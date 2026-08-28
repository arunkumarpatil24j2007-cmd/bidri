'use client';

import React from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

export const EditorialBreak: React.FC = () => {
  return (
    <section className="w-full bg-ivory select-none" aria-label="Cultural Flatlay Break">
      {/* Full-bleed Banner with Cultural Flatlay */}
      <div className="w-full relative aspect-[21/9] min-h-[340px] bg-mist overflow-hidden border-y border-silver/40">
        <Image
          src="/img/editorial/bidri_flatlay_pop.jpg"
          alt="Desi street pop flatlay with royal blue Ilkal saree, silver Bidri hookah base, fresh marigolds, and cutting chai"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bidri-black/60 via-transparent to-bidri-black/60" />
        <div className="absolute bottom-6 left-6 sm:left-12 bg-ivory/95 backdrop-blur-md px-4 py-2 border border-silver/30">
          <span className="font-eyebrow text-[9px] text-rani-pink tracking-[0.3em] uppercase block font-medium">
            STILL LIFE ESSAY
          </span>
          <span className="font-display text-base text-bidri-black font-light">
            Ilkal Handloom Silk × Bahmani Silver Inlay × Fresh Marigold
          </span>
        </div>
      </div>

      {/* Quote offset */}
      <div className="container-luxury py-14 sm:py-20 grid grid-cols-1 md:grid-cols-12 items-center">
        <div className="md:col-start-4 md:col-span-8 space-y-3">
          <Reveal>
            <blockquote className="font-display text-2xl sm:text-3xl text-bidri-black font-light italic leading-snug">
              &ldquo;When you wear an Ilkal saree and hold a piece of Bidriware, you carry two thousand years of Karnataka’s artisan memory in a single breath.&rdquo;
            </blockquote>
            <p className="font-eyebrow text-[10px] text-graphite/70 tracking-[0.3em] uppercase pt-2">
              — DECCAN TEXTILE & METALCRAFT CHRONICLES
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

