'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

interface Step {
  id: string;
  num: string;
  title: string;
  summary: string;
  image: string;
}

const steps: Step[] = [
  {
    id: 'cast',
    num: '01',
    title: 'Molten Alloy Casting',
    summary: 'Zinc and copper (16:1 ratio) are melted in red-hot earthen crucibles and poured into custom sand moulds, forming the rough grey metallic body.',
    image: '/img/process/step-1-cast.jpg',
  },
  {
    id: 'chisel',
    num: '02',
    title: 'Freehand Steel Chiselling',
    summary: 'Master ustads coat the cast with copper sulphate to turn it temporarily black, then hand-carve microscopic grooves using pointed steel burins.',
    image: '/img/process/step-2-chisel.jpg',
  },
  {
    id: 'inlay',
    num: '03',
    title: 'Pure Silver Wire Inlay',
    summary: 'Hundred-gauge pure 99.9% silver wire or thin sheet ribbons are hammered delicately into the chiselled grooves using a polished light hammer.',
    image: '/img/process/macro_bidri_inlay.jpg',
  },
  {
    id: 'soil',
    num: '04',
    title: 'Bidar Fort Soil Alchemy',
    summary: 'A secret paste made with potassium-nitrate-rich soil excavated from inside Bidar Fort is heated and rubbed over the heated vessel, instantly blackening the alloy while silver sparkles untouched.',
    image: '/img/process/step-6-blacken.jpg',
  },
  {
    id: 'buff',
    num: '05',
    title: 'Groundnut Oil Buffing',
    summary: 'Natural cold-pressed groundnut oil and soft charcoal powder are hand-buffed onto the surface to seal the velvety matte black finish and prevent oxidation.',
    image: '/img/process/step-7-buff.jpg',
  },
];

export const HorizontalCraft: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // default to silver inlay

  const current = steps[activeStepIndex];

  return (
    <section className="section-luxury bg-bidri-black text-ivory select-none cv-auto" id="craft">
      <div className="container-luxury">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14 border-b border-white/15 pb-8">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-saffron/20 border border-saffron/40 px-3 py-1">
              <Sparkles size={13} className="text-pop-yellow" />
              <span className="font-eyebrow text-[10px] text-pop-yellow tracking-[0.38em] uppercase font-medium">
                THE 600-YEAR METALLURGICAL ALCHEMY
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-ivory leading-tight">
              Made by Hand.<br />
              <span className="italic text-antique-gold font-normal">Darkened by Bidar Earth.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              href="/craft"
              className="font-eyebrow text-[10.5px] text-silver-bright hover:text-pop-yellow tracking-[0.35em] uppercase hover-link-rule"
            >
              LEARN FULL PROCESS →
            </Link>
          </div>
        </div>

        {/* Main Interactive Craft Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Master Artisan & Craft Photo (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <div className="relative aspect-[4/3] w-full bg-white/5 border border-white/20 overflow-hidden shadow-2xl group">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-bidri-black/90 backdrop-blur-xs text-silver-bright px-3 py-1 text-xs font-display">
                  Stage {current.num} · {current.title}
                </div>
              </div>
            </Reveal>

            {/* Artisan Quote Box */}
            <div className="bg-white/5 border border-white/10 p-5 space-y-2">
              <p className="font-display text-lg sm:text-xl text-silver-bright italic font-light leading-relaxed">
                &ldquo;The silver is not plated. It is embedded into the heart of the metal by hand, destined to outlive generations.&rdquo;
              </p>
              <p className="font-eyebrow text-[9.5px] text-antique-gold tracking-widest uppercase font-medium">
                — Master Shah Rasheed Ahmed Quadri (Padma Shri Awardee, Bidar)
              </p>
            </div>
          </div>

          {/* Right: Interactive Step Tabs & Details (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <Reveal delay={0.1}>
              <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.35em] uppercase block mb-3 font-medium">
                INTERACTIVE PROCESS JOURNEY
              </span>

              <div className="space-y-2">
                {steps.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`w-full text-left p-4 sm:p-5 border transition-all duration-300 cursor-pointer flex items-start justify-between ${
                      activeStepIndex === idx
                        ? 'bg-ivory text-bidri-black border-rani-pink shadow-xl'
                        : 'bg-white/5 text-silver-bright border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center space-x-3">
                        <span className={`font-display text-sm font-medium ${activeStepIndex === idx ? 'text-rani-pink' : 'text-antique-gold'}`}>
                          {s.num}
                        </span>
                        <h3 className="font-display text-xl font-normal">
                          {s.title}
                        </h3>
                      </div>
                      {activeStepIndex === idx && (
                        <p className="font-body text-xs text-graphite font-light leading-relaxed pt-2">
                          {s.summary}
                        </p>
                      )}
                    </div>

                    <span className={`text-lg font-light ${activeStepIndex === idx ? 'text-rani-pink' : 'text-white/40'}`}>
                      {activeStepIndex === idx ? '●' : '○'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center space-x-2.5 bg-rani-pink text-ivory font-eyebrow text-[10.5px] tracking-[0.3em] uppercase px-7 py-3 hover:bg-ivory hover:text-bidri-black transition-colors"
                >
                  <span>ACQUIRE A HANDCRAFTED PIECE</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

