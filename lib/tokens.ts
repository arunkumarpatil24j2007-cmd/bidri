export const tokens = {
  colors: {
    ivory: '#FBFAF8',
    'bidri-black': '#14100F',
    graphite: '#3A3634',
    silver: '#C9C6C1',
    'silver-bright': '#EDEAE4',
    'antique-gold': '#8A6B3B',
    mist: '#F2F0EC',
  },
  typography: {
    display: {
      fontFamily: 'var(--font-cormorant)',
      fontWeight: '300',
      letterSpacing: '-0.02em',
      lineHeight: '1.05',
    },
    eyebrow: {
      fontFamily: 'var(--font-italiana)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.42em',
      fontSize: '11px',
    },
    body: {
      fontFamily: 'var(--font-jost)',
      fontWeight: '300',
      fontSize: '16px',
      lineHeight: '1.75',
      maxWidth: '58ch',
    },
    devanagari: {
      fontFamily: 'var(--font-tiro-devanagari)',
    },
  },
  grid: {
    maxContainer: '1440px',
    desktopGutter: '120px',
    desktopPaddingY: '160px',
    mobilePaddingY: '88px',
  },
  motion: {
    ease: [0.22, 1, 0.36, 1],
    duration: 0.9,
    stagger: 0.08,
  },
} as const;

export type Tokens = typeof tokens;
