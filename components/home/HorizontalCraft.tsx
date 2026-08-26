'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { craftSteps } from '@/content/craft';

export const HorizontalCraft: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // 6 completely unique process steps with zero duplicate images
  const previewSteps = craftSteps.slice(0, 6);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ['0%', '-55%']);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-mist/60 border-t border-silver/40 select-none py-16 md:py-0 md:h-[240vh]"
      aria-label="The Eight Step Craft Preview"
    >
      {/* Sticky Container on Desktop */}
      <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-between py-12 md:py-20 overflow-hidden">
        {/* Section Header */}
        <div className="container-luxury flex items-baseline justify-between mb-8 md:mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 bg-saffron/10 px-2.5 py-1 mb-2 border border-saffron/30">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              <span className="font-eyebrow text-[9px] text-saffron tracking-[0.3em] uppercase">
                METALLURGICAL ALCHEMY
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black">
              The Craft in Six Unique Frames
            </h2>
          </div>
          <Link
            href="/craft"
            className="font-eyebrow text-[11px] text-bidri-black tracking-[0.35em] uppercase hover-link-rule hidden sm:inline-block"
          >
            THE FULL PROCESS →
          </Link>
        </div>

        {/* Frames Carousel / Stack */}
        <div className="container-luxury md:px-0">
          <motion.div
            style={{ x: shouldReduceMotion ? 0 : xTransform }}
            className="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-12 md:pl-[120px]"
          >
            {previewSteps.map((step) => (
              <div
                key={step.step}
                className="w-full md:w-[400px] flex-shrink-0 flex flex-col justify-between group bg-ivory p-4 border border-silver/40 card-hover-rich"
              >
                {/* 3:2 Unique Process Image */}
                <div className="relative aspect-[3/2] w-full bg-mist overflow-hidden mb-6">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-ivory/95 backdrop-blur-xs px-2.5 py-0.5 font-display text-xs text-bidri-black font-light border border-silver/30">
                    Frame {step.numeral} · {step.title.split(' ')[0]}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-light text-bidri-black">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs text-graphite font-light leading-relaxed max-w-[42ch]">
                    {step.caption}
                  </p>
                </div>
              </div>
            ))}

            {/* End Frame linking to full process */}
            <div className="w-full md:w-[340px] flex-shrink-0 flex flex-col justify-center items-center border border-silver/40 bg-ivory p-8 text-center space-y-6 shadow-sm">
              <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.4em] uppercase">
                BIDAR ATELIER
              </span>
              <p className="font-display text-2xl font-light text-bidri-black italic">
                From Molten Crucible to Pure Silver Luster
              </p>
              <Link
                href="/craft"
                className="h-11 px-6 bg-bidri-black text-ivory font-eyebrow text-[10px] tracking-[0.3em] uppercase hover:bg-rani-pink hover:text-ivory transition-colors flex items-center justify-center"
              >
                EXPLORE ALL 8 STEPS →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Mobile Link */}
        <div className="container-luxury sm:hidden mt-8 text-center">
          <Link
            href="/craft"
            className="font-eyebrow text-[11px] text-bidri-black tracking-[0.35em] uppercase hover-link-rule"
          >
            THE FULL PROCESS →
          </Link>
        </div>
      </div>
    </section>
  );
};
