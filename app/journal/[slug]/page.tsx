import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { journalArticles } from '@/content/journal';
import { Reveal } from '@/components/ui/Reveal';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);
  if (!article) return { title: 'Journal' };

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function JournalDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <article className="container-luxury max-w-3xl mx-auto space-y-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-xs font-body text-graphite/60 font-light">
            <li>
              <Link href="/" className="hover-link-rule">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/journal" className="hover-link-rule">
                Journal
              </Link>
            </li>
            <li>/</li>
            <li className="text-bidri-black truncate max-w-[200px]">{article.title}</li>
          </ol>
        </nav>

        {/* Title and Meta */}
        <div className="space-y-6 text-center">
          <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.4em] uppercase block">
            {article.author} · {article.date} · {article.readTime}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-bidri-black leading-tight">
            {article.title}
          </h1>
          <p className="font-display italic text-xl text-graphite font-light max-w-xl mx-auto">
            {article.subtitle}
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-mist border border-silver/40 overflow-hidden">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Article Body Content */}
        <div className="space-y-10 font-body text-base text-graphite font-light leading-[1.8] pt-4">
          {article.content.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              {sec.heading && (
                <h2 className="font-display text-2xl font-light text-bidri-black pt-4">
                  {sec.heading}
                </h2>
              )}
              <p className="max-w-[58ch]">{sec.paragraph}</p>
            </div>
          ))}
        </div>

        {/* Outro */}
        <div className="pt-12 border-t border-silver/30 flex justify-between items-center text-xs font-body">
          <Link href="/journal" className="font-eyebrow text-[10px] text-bidri-black tracking-[0.3em] uppercase hover-link-rule">
            ← ALL ESSAYS
          </Link>
          <span className="text-graphite/60 font-light">Bidar Atelier Archive</span>
        </div>
      </article>
    </div>
  );
}
