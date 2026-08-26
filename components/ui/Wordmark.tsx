import React from 'react';

interface WordmarkProps {
  className?: string;
  variant?: 'dark' | 'light' | 'current';
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'giant';
}

export const Wordmark: React.FC<WordmarkProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
}) => {
  const fillColor =
    variant === 'light' ? '#FBFAF8' : variant === 'dark' ? '#14100F' : 'currentColor';
  const lineColor =
    variant === 'light' ? 'rgba(201, 198, 193, 0.6)' : 'rgba(201, 198, 193, 0.7)';

  // Dimensions by size
  const sizeMap = {
    sm: { width: 110, height: 32 },
    md: { width: 140, height: 40 },
    lg: { width: 180, height: 50 },
    hero: { width: 220, height: 60 },
    giant: { width: 340, height: 95 },
  };

  const { width, height } = sizeMap[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none transition-colors duration-300 ${className}`}
      aria-label="BIDRI CRAFTS"
      role="img"
    >
      {/* BIDRI text in Italiana style */}
      <text
        x="100"
        y="28"
        fill={fillColor}
        textAnchor="middle"
        fontFamily="var(--font-italiana), 'Italiana', serif"
        fontSize="24"
        letterSpacing="0.42em"
        fontWeight="400"
      >
        BIDRI
      </text>

      {/* 1px Silver Rule 12px above CRAFTS spanning width of BIDRI */}
      <line
        x1="22"
        y1="38"
        x2="178"
        y2="38"
        stroke={lineColor}
        strokeWidth="0.75"
      />

      {/* CRAFTS text in Jost 300 style */}
      <text
        x="100"
        y="50"
        fill={fillColor}
        textAnchor="middle"
        fontFamily="var(--font-jost), 'Jost', sans-serif"
        fontSize="8.5"
        letterSpacing="0.6em"
        fontWeight="300"
      >
        CRAFTS
      </text>
    </svg>
  );
};
