'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { craftSteps } from '@/content/craft';
import { Wordmark } from '@/components/ui/Wordmark';

export default function CraftPage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Blackening filter interpolation for step 6
  const blackenProgress = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const [blackenVal, setBlackenVal] = useState(0);

  useMotionValueEvent(blackenProgress, 'change', (latest) => {
    setBlackenVal(latest);
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const total = craftSteps.length;
    const index = Math.min(Math.floor(latest * total), total - 1);
    setActiveStepIndex(index);
  });

  const activeStep = craftSteps[activeStepIndex] || craftSteps[0];

  return (
    <div className="w-full bg-ivory select-none">
      {/* Intro Hero */}
      <section className="min-h-[70vh] container-luxury pt-40 pb-20 flex flex-col justify-between">
        <div className="max-w-3xl space-y-6">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            DECCAN METALLURGY · EST. 1422
          </span>
          <h1 className="font-display headline-clamp font-light text-bidri-black leading-[1.05]">
            The Eight Steps<br />
            of Black & Silver
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[52ch] leading-relaxed">
            Authentic Bidriware requires zinc, copper, pure silver ribbon, and earth harvested from the ancient ramparts of Bidar Fort. No modern chemical plating can imitate its cold, velvety finish.
          </p>
        </div>

        <div className="pt-12 flex items-center space-x-4 text-xs font-body text-graphite/60">
          <span>Scroll to begin the metallurgical transformation</span>
          <span className="text-silver">↓</span>
        </div>
      </section>

      {/* Scrollytelling Section */}
      <div ref={containerRef} className="relative w-full border-t border-silver/40">
        <div className="container-luxury py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Fixed 1px Progress Rail (Left 1 col) */}
          <div className="hidden lg:flex col-span-1 sticky top-36 flex-col items-center space-y-6 py-6">
            <div className="w-[1px] h-64 bg-silver/30 relative">
              <motion.div
                style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
                className="w-[1px] bg-bidri-black absolute top-0 left-0"
              />
            </div>
            <span className="font-display text-sm text-bidri-black font-light">
              {activeStep.numeral} / 08
            </span>
          </div>

          {/* Left Column: Advancing Text Steps (Left 5 cols) */}
          <div className="col-span-12 lg:col-span-5 space-y-[60vh] py-24">
            {craftSteps.map((step, idx) => (
              <div
                key={step.step}
                className={`transition-opacity duration-500 ${
                  activeStepIndex === idx ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className="space-y-6 max-w-[420px]">
                  <span className="font-display text-lg text-silver italic font-light">
                    Step {step.numeral} of 08
                  </span>

                  <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black">
                    {step.title}
                  </h2>

                  <p className="font-body text-base text-graphite font-light leading-relaxed">
                    {step.caption}
                  </p>

                  <p className="font-body text-xs text-graphite/80 font-light leading-relaxed border-l border-silver/50 pl-4 py-1">
                    {step.detail}
                  </p>

                  {step.isBlackening && (
                    <div className="p-4 bg-mist border border-silver/40 space-y-2 mt-4">
                      <span className="font-eyebrow text-[9px] text-bidri-black tracking-[0.2em] uppercase block">
                        THE BIDAR FORT SECRET
                      </span>
                      <p className="text-xs text-graphite font-light">
                        The soil harvested from Bidar Fort contains centuries-old potassium nitrate and ammonium deposits that react exclusively with zinc, leaving embedded silver gleaming.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Pinned Imagery (Right 6 cols) */}
          <div className="hidden lg:block lg:col-span-6 sticky top-28 py-12">
            <div className="relative aspect-[4/3] w-full bg-mist border border-silver/40 overflow-hidden shadow-sm">
              <Image
                src={activeStep.image}
                alt={activeStep.title}
                fill
                sizes="(max-width: 1200px) 50vw, 45vw"
                className="object-cover object-center transition-all duration-700"
                style={
                  activeStep.isBlackening
                    ? {
                        filter: `grayscale(${Math.max(0, 1 - blackenVal)}) brightness(${
                          1.3 - blackenVal * 0.5
                        }) contrast(${1 + blackenVal * 0.3})`,
                      }
                    : undefined
                }
              />

              {/* Step Marker Badge */}
              <div className="absolute top-4 right-4 bg-ivory/95 backdrop-blur-xs px-3 py-1 font-eyebrow text-[10px] text-bidri-black tracking-[0.25em] uppercase border border-silver/30">
                FRAME {activeStep.numeral}
              </div>

              {/* Blackening Live Indicator */}
              {activeStep.isBlackening && (
                <div className="absolute bottom-4 left-4 right-4 bg-bidri-black/85 backdrop-blur-xs p-3 text-ivory flex justify-between items-center text-xs">
                  <span className="font-eyebrow text-[9px] tracking-[0.2em] uppercase">
                    OXIDATION PROGRESS
                  </span>
                  <span className="font-display font-light">
                    {Math.round(blackenVal * 100)}% BLACK PATINA
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-between items-center text-xs font-body text-graphite/60">
              <span>Atelier Documentation · Bidar Workshop</span>
              <span>100% Handcrafted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Outro CTA */}
      <section className="section-luxury container-luxury text-center border-t border-silver/40 select-none">
        <div className="max-w-xl mx-auto space-y-6">
          <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase block">
            HEIRLOOM INTEGRITY
          </span>
          <h2 className="font-display text-4xl font-light text-bidri-black">
            Experience the Artefacts
          </h2>
          <p className="font-body text-sm text-graphite font-light">
            Every piece crafted through this eight-step discipline is numbered and registered in the permanent archive.
          </p>
          <div className="pt-4">
            <Link
              href="/collections"
              className="inline-block h-12 px-8 bg-bidri-black text-ivory font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-ivory hover:text-bidri-black border border-bidri-black transition-colors leading-[46px]"
            >
              EXPLORE CATALOGUE →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
