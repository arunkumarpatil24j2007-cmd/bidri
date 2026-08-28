'use client';

import React from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

interface Motif {
  id: string;
  nameEng: string;
  nameOriginal: string;
  title: string;
  description: string;
  image: string;
}

const motifs: Motif[] = [
  {
    id: 'tarkashi',
    nameEng: 'TARKASHI',
    nameOriginal: 'ತಾರಕಾಶಿ · तारकशी',
    title: 'The Continuous Silver Wire',
    description: 'Fine hundred-gauge silver wire tapped into hairline grooves to form gossamer geometric grids, starry mandalas, and flowing Persian arabesques.',
    image: '/img/process/macro_bidri_inlay.jpg',
  },
  {
    id: 'taihnishan',
    nameEng: 'TAIHNISHAN',
    nameOriginal: 'ತಹ್ನೀಶಾನ್ · तहनीशान',
    title: 'The Sheet Inlay of Leaves',
    description: 'Intricately hand-cut pure silver sheets hammered flush into shallow scooped depressions to form solid petals, peacock feathers, and royal medallions.',
    image: '/img/product/peacock-tray-14-hero.jpg',
  },
  {
    id: 'zarnishan',
    nameEng: 'ZARNISHAN',
    nameOriginal: 'ಝರ್ನೀಶಾನ್ · ज़रनिशान',
    title: 'The High Relief Inlay',
    description: 'Silver inlaid in low relief so that the precious metal rises slightly above the velvet dark alloy body, creating tactile dimensionality when touched.',
    image: '/img/product/bahmani-court-huqqa-base-hero.jpg',
  },
  {
    id: 'mehtabi',
    nameEng: 'MEHTABI',
    nameOriginal: 'ಮೆಹ್ತಾಬಿ · मेहताब',
    title: 'The Moonlit Silver Field',
    description: 'Large surface areas sheets of silver inlaid with reversed designs chiselled into the metal, creating an inverted shimmering silver moon effect.',
    image: '/img/product/lotus-bowl-hero.jpg',
  },
];

export const MotifsSection: React.FC = () => {
  return (
    <section className="section-luxury container-luxury bg-ivory select-none cv-auto" id="motifs">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-silver/40 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-peacock-teal/10 border border-peacock-teal/30 px-3 py-1 mb-2">
            <span className="font-eyebrow text-[10px] text-peacock-teal tracking-[0.38em] uppercase font-medium">
              VISUAL GRAMMAR & TECHNIQUES
            </span>
          </div>
          <h2 className="font-display headline-sub font-light text-bidri-black">
            The Four Inlay Techniques
          </h2>
        </div>
        <p className="font-body text-xs sm:text-sm text-graphite font-light max-w-md">
          Bahmani geometric symmetry and celestial Persian motifs encoded into dark metal.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {motifs.map((m, idx) => (
          <Reveal key={m.id} delay={idx * 0.06}>
            <div className="bg-mist p-4 border border-silver/40 card-hover-rich flex flex-col justify-between h-full group">
              <div>
                <div className="relative aspect-square w-full bg-[#FBFAF8] border border-silver/20 overflow-hidden mb-4 shadow-xs">
                  <Image
                    src={m.image}
                    alt={m.nameEng}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-bidri-black/90 text-silver-bright font-eyebrow text-[8px] tracking-widest px-2 py-0.5 uppercase">
                    {m.nameEng}
                  </div>
                </div>

                <span className="font-devanagari text-xs text-antique-gold font-normal block mb-1">
                  {m.nameOriginal}
                </span>
                <h3 className="font-display text-xl font-light text-bidri-black mb-2">
                  {m.title}
                </h3>
                <p className="font-body text-xs text-graphite font-light leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
