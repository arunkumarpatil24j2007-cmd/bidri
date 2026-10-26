'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  'HANDMADE IN BIDAR, KARNATAKA · GI CERTIFIED',
  'FREE SHIPPING ACROSS INDIA ON ALL ORDERS',
  'AUTHENTIC BIDRIWARE · PURE SILVER INLAY · SINCE 1422',
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full h-9 bg-bidri-black text-ivory flex items-center justify-center overflow-hidden px-4 select-none border-b border-white/10 shrink-0"
      role="region"
      aria-label="Announcement"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-eyebrow text-[9px] sm:text-[10px] text-ivory tracking-[0.28em] sm:tracking-[0.38em] text-center uppercase font-medium line-clamp-1"
        >
          {messages[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
