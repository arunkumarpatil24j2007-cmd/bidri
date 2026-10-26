'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full hero-viewport-height flex items-center justify-start overflow-hidden select-none bg-bidri-black text-ivory">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/img/hero/ilkal_hero_editorial.jpg"
          alt="Handcrafted Bidriware — authentic silver-inlaid metalware from Bidar, Karnataka"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_top] sm:object-[65%_top] lg:object-[right_top]"
        />
        {/* Refined gradient overlays for text readability while preserving the artisan & Bidriware vase */}
        <div className="absolute inset-0 bg-gradient-to-r from-bidri-black/95 via-bidri-black/75 to-transparent sm:via-bidri-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-bidri-black/85 via-transparent to-bidri-black/25 z-10" />
      </div>

      {/* Hero Content */}
      <div className="container-luxury relative z-30 py-12 sm:py-16 lg:py-20">
        <div className="max-w-xl space-y-6 sm:space-y-7">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ivory leading-[1.08] tracking-tight"
          >
            Authentic Bidriware.{' '}
            <span className="text-silver-bright block sm:inline font-light">Handcrafted in Bidar.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-base sm:text-lg text-silver-bright/90 font-light leading-relaxed max-w-[48ch]"
          >
            600-year-old craft. Pure silver inlay on darkened metal. GI-certified handicrafts made by master artisan families of Karnataka.
          </motion.p>

          {/* Redesigned CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2"
          >
            <Link
              href="/shop"
              className="group h-12 sm:h-13 px-7 sm:px-8 bg-rani-pink hover:bg-ilkal-red text-white font-body font-semibold text-sm sm:text-[15px] tracking-normal rounded-lg transition-all duration-200 inline-flex items-center justify-center space-x-2.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rani-pink focus:ring-offset-2 focus:ring-offset-bidri-black"
            >
              <span>Shop All Products</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/collections"
              className="h-12 sm:h-13 px-7 sm:px-8 bg-bidri-black/60 hover:bg-bidri-black/85 backdrop-blur-md text-ivory font-body font-semibold text-sm sm:text-[15px] tracking-normal rounded-lg border border-white/25 hover:border-white/45 transition-all duration-200 inline-flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-bidri-black"
            >
              <span>Browse Collections</span>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.4 }}
            className="pt-2 sm:pt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-body text-silver-bright/85"
          >
            <div className="flex items-center space-x-2">
              <span className="text-saffron font-bold text-sm">✦</span>
              <span className="font-medium">GI Tag No. 12 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-rani-pink font-bold text-sm">✦</span>
              <span className="font-medium">Pure Silver Inlay</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-peacock-teal font-bold text-sm">✦</span>
              <span className="font-medium">Free Shipping Across India</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
