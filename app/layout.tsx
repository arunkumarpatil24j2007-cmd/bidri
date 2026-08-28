import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cormorant, italiana, jost, tiroDevanagari } from './fonts';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Footer } from '@/components/layout/Footer';
import { LayoutClientContainer } from '@/components/layout/LayoutClientContainer';

export const viewport: Viewport = {
  themeColor: '#FBFAF8',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bidricrafts.com'),
  title: {
    default: 'BIDRI CRAFTS — Authentic 14th-Century Zinc & Silver Inlay Metalware',
    template: '%s · BIDRI CRAFTS',
  },
  description:
    'Handmade in Bidar, Karnataka. GI-tagged authentic Bidri metalcraft with pure silver wire inlay. Black metal, pure silver, and six centuries of heritage.',
  keywords: [
    'Bidriware',
    'Bidri craft',
    'Bidar',
    'pure silver inlay',
    'GI tagged Karnataka',
    'Indian luxury heritage',
    'Bahmani court',
  ],
  authors: [{ name: 'BIDRI CRAFTS Maison' }],
  creator: 'BIDRI CRAFTS',
  publisher: 'BIDRI CRAFTS',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://bidricrafts.com',
    title: 'BIDRI CRAFTS — Authentic 14th-Century Zinc & Silver Inlay Metalware',
    description:
      'Bidriware, made by the last master families of Bidar. Black metal, pure silver, and six centuries of heritage.',
    siteName: 'BIDRI CRAFTS',
    images: [
      {
        url: '/img/hero/hero-1.jpg',
        width: 1200,
        height: 630,
        alt: 'BIDRI CRAFTS Campaign — South Asian model with pure silver inlay Bidri vase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIDRI CRAFTS — Authentic 14th-Century Zinc & Silver Inlay Metalware',
    description: 'Black metal. Pure silver. Six centuries.',
    images: ['/img/hero/hero-1.jpg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BIDRI CRAFTS',
    url: 'https://bidricrafts.com',
    logo: 'https://bidricrafts.com/img/hero/hero-1.jpg',
    description: 'Authentic 14th-century GI-tagged Bidri metalcraft with pure silver inlay from Bidar, Karnataka.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chowbara Road, Old City',
      addressLocality: 'Bidar',
      addressRegion: 'Karnataka',
      postalCode: '585401',
      addressCountry: 'IN',
    },
  };

  return (
    <html
      lang="en-GB"
      className={`${cormorant.variable} ${italiana.variable} ${jost.variable} ${tiroDevanagari.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="bg-ivory text-graphite antialiased selection:bg-bidri-black selection:text-ivory">
        {/* Skip Link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-bidri-black focus:text-ivory focus:font-eyebrow focus:text-xs"
        >
          Skip to main content
        </a>

        <SmoothScroll>
          <AnnouncementBar />
          <LayoutClientContainer>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </LayoutClientContainer>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

