import React from 'react';
import { HeroBanner } from '@/components/home/HeroBanner';
import { Marquee } from '@/components/ui/Marquee';
import { BrandIntroSection } from '@/components/home/BrandIntroSection';
import { FeaturedArtefacts } from '@/components/home/FeaturedArtefacts';
import { StreetPopCampaign } from '@/components/home/StreetPopCampaign';
import { CollectionsIndex } from '@/components/home/CollectionsIndex';
import { LookbookSection } from '@/components/home/LookbookSection';
import { HorizontalCraft } from '@/components/home/HorizontalCraft';
import { MotifsSection } from '@/components/home/MotifsSection';
import { EditorialBreak } from '@/components/home/EditorialBreak';
import { CinematicBanner } from '@/components/home/CinematicBanner';
import { DevanagariBand } from '@/components/home/DevanagariBand';
import { ClosersSection } from '@/components/home/ClosersSection';

export default function HomePage() {
  return (
    <div className="w-full bg-ivory">
      {/* 1. Grand Hero Banner (Woman in Ilkal Saree holding Bidri Vase) */}
      <HeroBanner />

      {/* 2. Cultural Marquee Ticker */}
      <Marquee />

      {/* 3. Cultural Statement & 600-Year History */}
      <BrandIntroSection />

      {/* 4. The Featured Shop Edit (Interactive Product Grid & Quick View) */}
      <FeaturedArtefacts />

      {/* 5. Bidri × Street Pop Campaign (Sneakers + Ilkal Saree + Bidri Plate) */}
      <StreetPopCampaign />

      {/* 6. The Six Houses of Bidriware (Editorial Index) */}
      <CollectionsIndex />

      {/* 7. The New Deccan Anthology (Editorial Lookbook with Ilkal Sarees) */}
      <LookbookSection />

      {/* 8. The 600-Year Craft Alchemy (Interactive Steps & Master Artisan) */}
      <HorizontalCraft />

      {/* 9. Visual Grammar & Inlay Techniques (Tarkashi, Taihnishan, etc.) */}
      <MotifsSection />

      {/* 10. Cultural Still Life & Editorial Break */}
      <EditorialBreak />

      {/* 11. Cinematic Nocturne Campaign (Night City Lights & Illuminated Ewer) */}
      <CinematicBanner />

      {/* 12. Cultural Linguistic Band */}
      <DevanagariBand />

      {/* 13. Closers: Values, Artisan Guild, Journal & Newsletter */}
      <ClosersSection />
    </div>
  );
}

