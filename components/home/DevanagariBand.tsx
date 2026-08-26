'use client';

import React from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

export const DevanagariBand: React.FC = () => {
  return (
    <section
      className="w-full min-h-[70vh] bg-bidri-black text-ivory flex flex-col justify-center items-center py-20 px-6 relative overflow-hidden select-none"
      aria-label="Devanagari Expression"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center space-y-8">
        {/* Editorial 4 small and centred */}
        <Reveal>
          <div className="relative w-28 h-36 md:w-36 md:h-48 border border-silver/40 overflow-hidden shadow-2xl mx-auto mb-4">
            <Image
              src="/img/editorial/editorial-4.jpg"
              alt="Woman in red Paithani with silver Bidri choker"
              fill
              sizes="144px"
              className="object-cover object-center"
            />
          </div>
        </Reveal>

        {/* Tiro Devanagari Accent Line */}
        <Reveal delay={0.1}>
          <p className="font-devanagari text-2xl sm:text-4xl text-ivory font-normal tracking-wide">
            काली धातु, उजली चाँदी।
          </p>
        </Reveal>

        {/* English Translation beneath in Italiana 10px */}
        <Reveal delay={0.2}>
          <span className="font-eyebrow text-[10px] text-silver tracking-[0.42em] uppercase">
            BLACK METAL · PURE SILVER
          </span>
        </Reveal>
      </div>
    </section>
  );
};
