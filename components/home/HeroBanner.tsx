'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full min-h-[65vh] sm:min-h-[72vh] flex items-center justify-start overflow-hidden select-none bg-bidri-black text-ivory">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/img/hero/ilkal_hero_editorial.jpg"
          alt="Handcrafted Bidriware — authentic silver-inlaid metalware from Bidar, Karnataka"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] lg:object-right"
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-bidri-black/90 via-bidri-black/65 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-bidri-black/60 via-transparent to-bidri-black/30 z-10" />
      </div>

      {/* Hero Content */}
      <div className="container-luxury relative z-30 pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="max-w-xl space-y-6">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ivory leading-[1.08]"
          >
            Authentic Bidriware.{' '}
            <span className="text-silver-bright">Handcrafted in Bidar.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-base sm:text-lg text-silver-bright/90 font-light leading-relaxed max-w-[48ch]"
          >
            600-year-old craft. Pure silver inlay on darkened metal. GI-certified handicrafts made by master artisan families of Karnataka.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2"
          >
            <Link
              href="/shop"
              className="h-12 px-8 bg-rani-pink text-ivory font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-ivory hover:text-bidri-black border border-rani-pink hover:border-ivory transition-all duration-300 flex items-center space-x-3 shadow-lg rounded-lg"
            >
              <span>SHOP ALL PRODUCTS</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/collections"
              className="h-12 px-7 bg-ivory/10 backdrop-blur-md text-ivory font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-ivory hover:text-bidri-black border border-ivory/30 transition-all duration-300 flex items-center space-x-2 rounded-lg"
            >
              <span>BROWSE COLLECTIONS</span>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-3 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-body text-silver-bright/80"
          >
            <div className="flex items-center space-x-1.5">
              <span className="text-saffron font-bold">✦</span>
              <span>GI Tag No. 12 Certified</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-rani-pink font-bold">✦</span>
              <span>Pure Silver Inlay</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-peacock-teal font-bold">✦</span>
              <span>Free Shipping in India</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
