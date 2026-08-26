import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Care & Maintenance Guide',
  description: 'How to care for authentic zinc-and-silver Bidriware — the annual groundnut oil ritual and patina preservation.',
};

export default function CareGuidePage() {
  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-3xl mx-auto space-y-16">
        <div className="space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            LIFETIME PRESERVATION
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            The Ritual of Care & Patina
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[50ch] leading-relaxed">
            Authentic Bidriware is not plated. With modest periodic care, the pure silver remains locked within the dark alloy for centuries.
          </p>
        </div>

        <div className="space-y-12 divide-y divide-silver/30 border-y border-silver/40">
          <div className="pt-8 space-y-3">
            <h2 className="font-display text-2xl font-light text-bidri-black">
              1. Daily & Monthly Handling
            </h2>
            <p className="font-body text-sm text-graphite font-light leading-relaxed">
              Wipe your artefact gently with a clean, dry, lint-free cotton cloth. Handling with clean hands actually enhances the depth of the black patina through natural skin warmth.
            </p>
          </div>

          <div className="pt-8 space-y-3">
            <h2 className="font-display text-2xl font-light text-bidri-black">
              2. The Annual Groundnut Oil Massage
            </h2>
            <p className="font-body text-sm text-graphite font-light leading-relaxed">
              Once a year, apply a single drop of cold-pressed unrefined groundnut (peanut) or mustard oil onto a soft cloth. Buff the surface evenly. This restores the microscopic oil matrix of the fort earth oxidation and brings out the mirror glint of silver.
            </p>
          </div>

          <div className="pt-8 space-y-3">
            <h2 className="font-display text-2xl font-light text-bidri-black">
              3. What to Avoid
            </h2>
            <p className="font-body text-sm text-graphite font-light leading-relaxed">
              Never use commercial metal polishes, brass cleaners, acidic liquids (lemon, vinegar), or abrasive scrubbers. Do not store in damp basements or submerge vessels in standing water.
            </p>
          </div>

          <div className="pt-8 space-y-3">
            <h2 className="font-display text-2xl font-light text-bidri-black">
              4. Restoration & Archival Re-blackening
            </h2>
            <p className="font-body text-sm text-graphite font-light leading-relaxed">
              Should your heirloom suffer scratch damage or chemical bleaching over decades, our Bidar atelier offers complimentary archival re-blackening using authentic fort earth for registered deed holders.
            </p>
          </div>
        </div>

        <div className="text-center pt-8">
          <Link
            href="/authenticity"
            className="font-eyebrow text-[10px] text-bidri-black tracking-[0.3em] uppercase hover-link-rule"
          >
            VERIFY YOUR CERTIFICATE FOR COMPLIMENTARY RESTORATION →
          </Link>
        </div>
      </div>
    </div>
  );
}
