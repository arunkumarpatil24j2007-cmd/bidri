'use client';

import React from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

export const EditorialBreak: React.FC = () => {
  return (
    <section className="w-full bg-ivory select-none" aria-label="Editorial Break">
      {/* Full-bleed 21:9 Banner */}
      <div className="w-full relative aspect-[21/9] min-h-[320px] bg-mist overflow-hidden border-y border-silver/40">
        <Image
          src="/img/editorial/editorial-5.jpg"
          alt="Two models standing in wide ivory studio with authentic Bidriware pieces"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Quote offset to right column */}
      <div className="container-luxury py-16 md:py-24 grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-start-6 md:col-span-7">
          <Reveal>
            <blockquote className="font-display text-2xl sm:text-3xl text-bidri-black font-light italic leading-snug">
              “The silver is not plated. It is buried in the metal, by hand, and stays for generations.”
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
