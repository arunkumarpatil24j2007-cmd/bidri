'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<'default' | 'view' | 'hidden'>('default');
  const [hasMouse, setHasMouse] = useState(false);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!mediaQuery.matches) return;

    setHasMouse(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewTarget = target.closest('[data-cursor="view"]');
      if (viewTarget) {
        setCursorState('view');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => setCursorState('hidden');
    const handleMouseEnter = () => setCursorState('default');

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!hasMouse || cursorState === 'hidden') return null;

  const isView = cursorState === 'view';

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isView ? 56 : 8,
        height: isView ? 56 : 8,
        backgroundColor: isView ? '#14100F' : '#14100F',
        opacity: isView ? 0.95 : 0.8,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full text-ivory select-none"
    >
      {isView && (
        <span className="font-eyebrow text-[9px] text-[#FBFAF8] tracking-[0.25em] pl-[2px]">
          VIEW
        </span>
      )}
    </motion.div>
  );
};
