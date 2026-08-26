'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { collections } from '@/content/collections';
import { Reveal } from '@/components/ui/Reveal';

export const CollectionsIndex: React.FC = () => {
  const [hoveredCollection, setHoveredCollection] = useState<string | null>(null);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.4 };
  const mouseX = useSpring(-500, springConfig);
  const mouseY = useSpring(-500, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const active = collections.find((c) => c.slug === hoveredCollection);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="section-luxury container-luxury relative select-none"
      aria-label="Collections Index"
    >
      <div className="mb-16 flex items-baseline justify-between border-b border-silver/40 pb-6">
        <div>
          <span className="font-eyebrow text-[11px] text-rani-pink tracking-[0.42em] uppercase block">
            ROYAL TYPOLOGIES
          </span>
          <h2 className="font-display headline-sub font-light text-bidri-black mt-1">
            The Six Houses of Bidriware
          </h2>
        </div>
        <span className="hidden sm:inline-block font-body text-xs text-graphite/70 font-light">
          Six Curated Typologies · 24 Master Artefacts
        </span>
      </div>

      {/* Editorial Index Rows */}
      <div className="divide-y divide-silver/40 border-b border-silver/40">
        {collections.map((item, idx) => (
          <Reveal key={item.slug} delay={idx * 0.05}>
            <Link
              href={`/collections/${item.slug}`}
              onMouseEnter={() => setHoveredCollection(item.slug)}
              onMouseLeave={() => setHoveredCollection(null)}
              className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 md:py-10 transition-all duration-400 hover:pl-4 focus-visible:outline-none"
            >
              <div className="flex items-baseline space-x-8 md:space-x-14">
                <span className="font-display text-lg text-antique-gold italic font-light">
                  {item.numeral}
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-light text-bidri-black group-hover:text-rani-pink transition-colors">
                  {item.name}
                </h3>
              </div>

              <div className="flex items-center space-x-6 mt-2 md:mt-0">
                <span className="font-eyebrow text-[11px] text-graphite/70 group-hover:text-bidri-black tracking-[0.3em] uppercase transition-colors">
                  {item.descriptor}
                </span>
                <span className="text-silver group-hover:text-rani-pink transition-colors font-light text-xl">
                  →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Floating 420x520 Cursor Card (Desktop Only) */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="fixed pointer-events-none z-30 hidden lg:block w-[420px] h-[520px] bg-ivory border border-silver/60 shadow-2xl overflow-hidden p-3"
          >
            <div className="relative w-full h-full bg-mist overflow-hidden">
              <Image
                src={active.image}
                alt={active.name}
                fill
                sizes="420px"
                className="object-cover object-center"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-bidri-black/85 via-bidri-black/40 to-transparent p-6 text-ivory">
                <span className="font-eyebrow text-[9px] text-antique-gold tracking-[0.3em] uppercase block">
                  HOUSE {active.numeral} · {active.descriptor}
                </span>
                <p className="font-display text-2xl font-light">{active.name}</p>
                <p className="font-body text-xs text-silver-bright/80 font-light mt-1">
                  {active.headline}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
