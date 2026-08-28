'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export const BrandIntroSection: React.FC = () => {
  return (
    <section className="section-luxury container-luxury bg-ivory select-none" id="story">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Cultural Statement (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <Reveal>
            <div className="inline-flex items-center space-x-2 bg-rani-pink/10 border border-rani-pink/30 px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rani-pink" />
              <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.38em] uppercase font-medium">
                A 600-YEAR METALLURGICAL REVOLUTION
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-light text-bidri-black leading-tight mt-2">
              NOT JUST METAL.<br />
              <span className="italic text-rani-pink font-normal">A CULTURAL STATEMENT.</span>
            </h2>

            <p className="font-body text-base text-graphite font-light leading-relaxed mt-4">
              Originating under the 14th-century Bahmani Sultanate of Bidar in northern Karnataka, Bidriware is one of the world&apos;s most scientifically astonishing metalcrafts. 
            </p>

            <p className="font-body text-base text-graphite font-light leading-relaxed">
              Every single line of pure silver wire is hand-chiselled and hammered into raw zinc-copper alloy. When submerged into a warm paste of special unoxidized fort mud gathered inside the ruins of Bidar Fort, a natural chemical alchemy occurs: the base metal turns velvety obsidian black, while the pure silver glows with unyielding celestial brilliance.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-silver/30 mt-6">
              <div>
                <div className="font-display text-3xl sm:text-4xl text-bidri-black font-light">35+</div>
                <div className="font-eyebrow text-[9.5px] text-graphite/70 tracking-wider uppercase mt-1">Days Hand-Chiselling</div>
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl text-antique-gold font-light">600+</div>
                <div className="font-eyebrow text-[9.5px] text-graphite/70 tracking-wider uppercase mt-1">Years Living Lineage</div>
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl text-rani-pink font-light">100%</div>
                <div className="font-eyebrow text-[9.5px] text-graphite/70 tracking-wider uppercase mt-1">Pure Fine Silver</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: Media Card with Macro Inlay (6 cols) */}
        <div className="lg:col-span-6">
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] w-full bg-mist border border-silver/40 overflow-hidden group shadow-xl">
              <Image
                src="/img/process/macro_bidri_inlay.jpg"
                alt="Macro texture of pure silver wire inlaid into blackened Bidriware metal"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-bidri-black/90 via-bidri-black/40 to-transparent p-6 text-ivory">
                <span className="font-eyebrow text-[9px] text-saffron tracking-[0.3em] uppercase block mb-1">
                  MACRO CRAFT TEXTURE
                </span>
                <p className="font-display text-xl sm:text-2xl font-light">
                  Tarkashi & Taihnishan Silver Inlay
                </p>
                <p className="font-body text-xs text-silver-bright/80 font-light mt-1">
                  100-gauge pure silver beaten flush into chiselled arabesque grooves.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
