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
      className="w-full h-[34px] bg-bidri-black text-ivory flex items-center justify-center overflow-hidden px-4 select-none relative z-50"
      role="region"
      aria-label="Announcement"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-eyebrow text-[10px] text-ivory tracking-[0.4em] text-center uppercase"
        >
          {messages[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
