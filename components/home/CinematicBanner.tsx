'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export const CinematicBanner: React.FC = () => {
  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[640px] flex items-center justify-center overflow-hidden select-none bg-bidri-black text-ivory cv-auto">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/editorial/night_bidri_campaign.jpg"
          alt="Night campaign fashion model in indigo Ilkal saree holding illuminated silver Bidri ewer in city lights"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bidri-black/95 via-bidri-black/50 to-bidri-black/70 z-10" />
      </div>

      {/* Overlay Content */}
      <div className="container-luxury relative z-20 text-center py-20 max-w-2xl mx-auto space-y-6">
        <Reveal>
          <div className="inline-flex items-center space-x-2 bg-rani-pink/25 border border-rani-pink/50 px-4 py-1.5 backdrop-blur-md">
            <span className="font-eyebrow text-[10.5px] text-silver-bright tracking-[0.38em] uppercase font-medium">
              NOCTURNE EDIT 2026
            </span>
          </div>

          <h2 className="font-display headline-clamp font-light text-ivory leading-tight mt-4">
            HERITAGE<br />
            <span className="italic text-pop-yellow font-normal">WITHOUT THE RULES.</span>
          </h2>

          <p className="font-body text-base text-silver-bright/90 font-light max-w-lg mx-auto leading-relaxed mt-2">
            Elevate everyday spaces with authentic 14th-century silver craft. Designed to be lived with, touched, and passed down.
          </p>

          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-3 h-13 px-8 bg-rani-pink text-ivory font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-ivory hover:text-bidri-black transition-all duration-300 shadow-2xl"
            >
              <span>SHOP THE COLLECTION</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
