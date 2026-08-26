import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { journalArticles } from '@/content/journal';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Journal & Metallurgy',
  description: 'Essays on 14th-century Deccan metallurgy, the chemistry of fort earth patinas, and the art of living with pure silver inlay.',
};

export default function JournalIndexPage() {
  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-5xl mx-auto space-y-24">
        {/* Header */}
        <div className="max-w-2xl space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            ATELIER ESSAYS
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            The Bidar Journal
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[50ch]">
            Reflections on court metallurgy, historical excavation, and the slow art of preserving pure silver in dark metal.
          </p>
        </div>

        {/* Articles List */}
        <div className="divide-y divide-silver/40 border-y border-silver/40">
          {journalArticles.map((article, idx) => (
            <article key={article.slug} className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <Reveal scale>
                  <Link href={`/journal/${article.slug}`} className="block relative aspect-[16/10] w-full bg-mist border border-silver/40 overflow-hidden group">
                    <Image
                      src={article.heroImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                </Reveal>
              </div>

              <div className="lg:col-span-7 space-y-4 lg:pl-6">
                <Reveal delay={0.1}>
                  <div className="flex items-center space-x-3 text-xs font-body text-graphite/60 font-light">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-light text-bidri-black hover:text-graphite transition-colors mt-2">
                    <Link href={`/journal/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="font-body text-sm text-graphite font-light leading-relaxed max-w-[50ch]">
                    {article.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/journal/${article.slug}`}
                      className="font-eyebrow text-[10px] text-bidri-black tracking-[0.3em] uppercase hover-link-rule"
                    >
                      READ ESSAY →
                    </Link>
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
