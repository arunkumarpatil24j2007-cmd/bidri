'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MarqueeProps {
  text?: string;
  speedSeconds?: number;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  text = 'ZINC · COPPER · PURE SILVER · SOIL OF BIDAR FORT · HAND CHISELLED · ONE OF ONE · ',
  speedSeconds = 40,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const repeatedText = Array(6).fill(text).join('');

  return (
    <div className={`w-full overflow-hidden bg-ivory select-none ${className}`}>
      {/* 1px silver line */}
      <div className="w-full h-[1px] bg-silver/40" />

      {/* Marquee scroll container */}
      <div className="py-3 flex whitespace-nowrap overflow-hidden">
        {shouldReduceMotion ? (
          <div className="font-eyebrow text-[10px] text-graphite/70 tracking-[0.42em] uppercase">
            {repeatedText}
          </div>
        ) : (
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: speedSeconds,
            }}
          >
            <span className="font-eyebrow text-[10px] text-graphite/70 tracking-[0.42em] uppercase">
              {repeatedText}
            </span>
            <span className="font-eyebrow text-[10px] text-graphite/70 tracking-[0.42em] uppercase">
              {repeatedText}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};
