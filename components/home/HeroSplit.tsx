'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const HeroSplit: React.FC = () => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const yParallax = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : 120]);

  return (
    <section className="relative w-full min-h-screen pt-[34px] flex flex-col justify-between overflow-hidden bg-ivory select-none">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 w-full min-h-[calc(100vh-34px)] items-stretch">
        {/* Left Column (58% on desktop: 7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between pt-32 pb-16 px-6 sm:px-12 lg:pl-[120px] lg:pr-16 z-10">
          <div className="space-y-10 my-auto max-w-[480px]">
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-eyebrow text-[11px] text-graphite/70 tracking-[0.42em] uppercase block"
            >
              BIDAR · KARNATAKA · EST. 1422
            </motion.span>

            {/* Headline - 3 lines in Cormorant Light */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display headline-clamp font-light text-bidri-black leading-[1.05]"
            >
              Black metal.<br />
              Pure silver.<br />
              Six centuries.
            </motion.h1>

            {/* Exact 14-word body text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-[16px] text-graphite font-light leading-relaxed max-w-[58ch]"
            >
              Bidriware, made by the last master families of Bidar. Nothing here is machine‑made.
            </motion.p>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-10 pt-4"
            >
              <Link
                href="/collections"
                className="font-eyebrow text-[11px] text-bidri-black tracking-[0.35em] uppercase hover-link-rule py-1"
              >
                EXPLORE THE COLLECTION →
              </Link>
              <Link
                href="/craft"
                className="font-eyebrow text-[11px] text-graphite/80 hover:text-bidri-black tracking-[0.35em] uppercase hover-link-rule py-1"
              >
                WATCH THE CRAFT
              </Link>
            </motion.div>
          </div>

          {/* Bottom Left Scroll Indicator */}
          <div className="hidden lg:flex items-center space-x-3 pt-8">
            <div className="w-[1px] h-10 bg-silver/60" />
            <span className="font-eyebrow text-[9px] text-graphite/60 tracking-[0.3em] uppercase -rotate-90 origin-left translate-y-3">
              SCROLL
            </span>
          </div>
        </div>

        {/* Right Column (42% on desktop: 5 cols) */}
        <div className="lg:col-span-5 relative min-h-[500px] lg:min-h-full bg-mist overflow-hidden">
          <motion.div
            style={{ y: yParallax }}
            className="relative w-full h-[115%] -top-[7.5%]"
            data-cursor="view"
          >
            <Image
              src="/img/hero/hero-1.jpg"
              alt="South Asian model in charcoal Chanderi silk sari holding authentic Bidriware silver inlay vase"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
