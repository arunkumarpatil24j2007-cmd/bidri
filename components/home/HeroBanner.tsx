'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const yParallax = useTransform(scrollY, [0, 900], [0, shouldReduceMotion ? 0 : 70]);

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-start overflow-hidden select-none bg-bidri-black text-ivory">
      {/* 1. Full-Bleed Background Image (Woman in Ilkal Saree with Bidri Vase) */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 w-full h-[112%] -top-[6%] z-0"
      >
        <Image
          src="/img/hero/ilkal_hero_editorial.jpg"
          alt="Indian woman in authentic red Ilkal saree holding an ornate handcrafted silver-inlaid Bidriware vase"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] lg:object-right"
        />
        {/* Cinematic Multi-Layer Gradient Overlays for High Legibility & Drama */}
        <div className="absolute inset-0 bg-gradient-to-r from-bidri-black/95 via-bidri-black/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-bidri-black via-transparent to-bidri-black/40 z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ivory to-transparent z-20 opacity-15" />
      </motion.div>

      {/* 2. Hero Content Overlaid directly on top */}
      <div className="container-luxury relative z-30 pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="max-w-2xl space-y-7">
          {/* Saree Pop Cultural Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center space-x-3 bg-ivory/10 backdrop-blur-md border border-ivory/20 px-4 py-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-rani-pink animate-pulse" />
            <span className="font-eyebrow text-[10px] text-silver-bright tracking-[0.38em] uppercase">
              ಬಿದ್ರಿ ಕಲೆ · BAHMANI BIDRIWARE × ILKAL HANDLOOM
            </span>
          </motion.div>

          {/* Grand Headline with Indian Pop Street Warmth */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display headline-clamp font-light text-ivory leading-[1.03] drop-shadow-sm"
          >
            BLACK METAL.<br />
            <span className="text-silver-bright">PURE SILVER.</span><br />
            <span className="italic text-antique-gold font-normal">MADE FOR NOW.</span>
          </motion.h1>

          {/* Story-driven Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-base sm:text-lg text-silver-bright/90 font-light leading-relaxed max-w-[52ch]"
          >
            Authentic Bidriware forged by the last master families of Bidar, styled alongside Karnataka’s iconic handwoven Ilkal sarees. Where 600 years of Deccan royal craft meets bold contemporary Indian street culture.
          </motion.p>

          {/* Luxury CTA Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-3"
          >
            <Link
              href="/shop"
              className="h-13 px-8 bg-rani-pink text-ivory font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-ivory hover:text-bidri-black border border-rani-pink transition-all duration-300 flex items-center space-x-3 shadow-xl"
            >
              <span>SHOP THE COLLECTION</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="#street-pop"
              className="h-13 px-7 bg-ivory/10 backdrop-blur-md text-ivory font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-ivory hover:text-bidri-black border border-ivory/30 transition-all duration-300 flex items-center space-x-2"
            >
              <span>BIDRI × STREET</span>
            </Link>
          </motion.div>

          {/* Ribbon Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-body text-silver-bright/80 border-t border-white/15"
          >
            <div className="flex items-center space-x-1.5">
              <span className="text-rani-pink font-bold">✦</span>
              <span>99.9% Pure Fine Silver</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-saffron font-bold">✦</span>
              <span>GI Tag No. 12 Certified</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-peacock-teal font-bold">✦</span>
              <span>Direct Artisan Cooperative</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-pop-yellow font-bold">✦</span>
              <span>Worldwide Express Courier</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

