'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const yParallax = useTransform(scrollY, [0, 900], [0, shouldReduceMotion ? 0 : 80]);

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-start overflow-hidden select-none bg-bidri-black text-ivory">
      {/* 1. Big Full-Bleed Background Image */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 w-full h-[112%] -top-[6%] z-0"
      >
        <Image
          src="/img/hero/hero-bg.jpg"
          alt="Opulent Indian luxury Bidriware campaign — model holding pure silver inlay vase"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] lg:object-right"
        />
        {/* Cinematic Multi-Layer Gradient Overlays for High Drama & Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-bidri-black/95 via-bidri-black/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-bidri-black via-transparent to-bidri-black/40 z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ivory to-transparent z-20 opacity-15" />
      </motion.div>

      {/* 2. Hero Content Overlaid directly on top */}
      <div className="container-luxury relative z-30 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="max-w-2xl space-y-8">
          {/* Saree Pop Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center space-x-3 bg-ivory/10 backdrop-blur-md border border-ivory/20 px-4 py-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rani-pink animate-pulse" />
            <span className="font-eyebrow text-[10px] text-silver-bright tracking-[0.42em] uppercase">
              BIDAR · KARNATAKA · EST. 1422
            </span>
          </motion.div>

          {/* Grand Headline with Luminous Contrast */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display headline-clamp font-light text-ivory leading-[1.02] drop-shadow-sm"
          >
            Black metal.<br />
            <span className="text-silver-bright">Pure silver.</span><br />
            <span className="italic text-antique-gold font-normal">Six centuries.</span>
          </motion.h1>

          {/* Concise 14-Word Subtitle with Saree Pop Warmth */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-base sm:text-lg text-silver-bright/90 font-light leading-relaxed max-w-[54ch]"
          >
            Bidriware, made by the last master families of Bidar. Nothing here is machine‑made.
          </motion.p>

          {/* Luxury CTA Links with Indian Gold & Silver Accents */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 pt-4"
          >
            <Link
              href="/collections"
              className="h-13 px-8 bg-ivory text-bidri-black font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-rani-pink hover:text-ivory hover:border-rani-pink border border-ivory transition-all duration-300 flex items-center space-x-3 shadow-lg"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/craft"
              className="font-eyebrow text-[11px] text-silver-bright hover:text-antique-gold tracking-[0.35em] uppercase hover-link-rule py-2"
            >
              WATCH THE CRAFT
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="absolute bottom-6 inset-x-0 z-30 container-luxury hidden md:flex justify-between items-center text-xs font-body text-silver/70">
        <div className="flex items-center space-x-3">
          <span className="w-8 h-[1px] bg-silver/40" />
          <span className="font-eyebrow text-[9px] tracking-[0.3em] uppercase">
            GI TAG NO. 12 · 100% PURE SILVER INLAY
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-eyebrow text-[9px] tracking-widest uppercase">SCROLL TO DISCOVER</span>
          <span className="text-silver">↓</span>
        </div>
      </div>
    </section>
  );
};
