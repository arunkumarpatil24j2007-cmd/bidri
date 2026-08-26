import { HeroBanner } from '@/components/home/HeroBanner';
import { Marquee } from '@/components/ui/Marquee';
import { CollectionsIndex } from '@/components/home/CollectionsIndex';
import { EditorialBreak } from '@/components/home/EditorialBreak';
import { HorizontalCraft } from '@/components/home/HorizontalCraft';
import { FeaturedArtefacts } from '@/components/home/FeaturedArtefacts';
import { DevanagariBand } from '@/components/home/DevanagariBand';
import { ClosersSection } from '@/components/home/ClosersSection';

export default function HomePage() {
  return (
    <div className="w-full bg-ivory">
      {/* 5.3 Grand Hero Banner with Big Background Image & Text Overlay */}
      <HeroBanner />

      {/* 5.4 Marquee Rule */}
      <Marquee />

      {/* 5.5 The Collections Editorial Index */}
      <CollectionsIndex />

      {/* 5.6 Editorial Hero Break */}
      <EditorialBreak />

      {/* 5.7 The Craft in Six Unique Frames (Zero Repetition) */}
      <HorizontalCraft />

      {/* 5.8 Featured Artefacts */}
      <FeaturedArtefacts />

      {/* 5.9 The Devanagari Moment */}
      <DevanagariBand />

      {/* 5.10 Closers (Value row, Artisan spotlight, IG strip, Newsletter) */}
      <ClosersSection />
    </div>
  );
}
