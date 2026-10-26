import React from 'react';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { FeaturedArtefacts } from '@/components/home/FeaturedArtefacts';
import { CollectionsIndex } from '@/components/home/CollectionsIndex';
import { CraftsmanshipIntro } from '@/components/home/CraftsmanshipIntro';
import { TrustDelivery } from '@/components/home/TrustDelivery';

export default function HomePage() {
  return (
    <div className="w-full bg-ivory">
      {/* 2. Compact Hero Section */}
      <HeroBanner />

      {/* 3. Shop by Category — visual category tiles */}
      <CategoryTiles />

      {/* 4. Bestsellers — product grid with square image cards & visible INR prices */}
      <FeaturedArtefacts />

      {/* 5. Shop Collections — clear image-led collection cards */}
      <CollectionsIndex />

      {/* 6. Craftsmanship — short introduction to authentic Bidri craft */}
      <CraftsmanshipIntro />

      {/* 7. Trust and Delivery — verified Indian shipping, GI Tag, payments */}
      <TrustDelivery />
    </div>
  );
}
