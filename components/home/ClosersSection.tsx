'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, ShieldCheck, Sparkles, Check, ArrowRight, BookOpen } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { artisans } from '@/content/artisans';

export const ClosersSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeArticleModal, setActiveArticleModal] = useState<number | null>(null);

  const leadArtisan = artisans[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  const articles = [
    {
      id: 1,
      vol: 'VOLUME 01 · WEAVING & METALLURGY',
      title: 'Why Bidriware & Ilkal Matter: The Geometry of Deccan Handlooms',
      excerpt: 'An exploration of how 14th-century Bahmani astronomers and Karnataka weavers encoded cosmological symmetry into metal and silk.',
      image: '/img/editorial/bidri_flatlay_pop.jpg',
      fullText: 'Across the Deccan plateau, two ancient craft traditions have coexisted for centuries: the blackened zinc-copper alloy of Bidar and the lustrous cotton-silk sarees of Ilkal. While Bidriware draws from Persian astral geometry and Bahmani floral jaals, Ilkal handlooms carry the iconic red tope-teni temple pallu and kasuti embroidery. Together, they represent an unapologetic statement of South Indian cultural sovereignty.',
    },
    {
      id: 2,
      vol: 'VOLUME 02 · ARTISAN SPOTLIGHT',
      title: 'The Ustads of Bidar: 4 Generations of Quadri & Rauf Families',
      excerpt: 'Meeting the master families in Bidar’s historic old city preserving the endangered art of pure silver wire Tarkashi inlay.',
      image: '/img/artisan/artisan_bidar_inlay.jpg',
      fullText: 'In the narrow, sun-dappled lanes of Bidar, master craftsman Shah Rasheed Ahmed Quadri works on a low wooden bench with the same steel burins his grandfather held. "Every line we chisel is done freehand by memory," he explains. "The fort mud we use to darken the metal comes from underground chambers built by the Bahmani kings in 1422. It cannot be replicated anywhere else in the world."',
    },
    {
      id: 3,
      vol: 'VOLUME 03 · STREET CULTURE',
      title: 'How Modern India is Wearing Heritage: Sneakers, Sarees & Silver',
      excerpt: 'Why the new generation of Indian creatives refuses to save handlooms and Bidri metalcraft strictly for wedding rituals.',
      image: '/img/editorial/ilkal_street_pop_saree.jpg',
      fullText: 'Contemporary Indian style is experiencing a fearless renaissance. On city rooftops, university boulevards, and creative studios, young women are draping vibrant Ilkal sarees over oversized graphic tees and chunky white sneakers, holding handcrafted Bidriware pieces as statement accessories. It is living culture — proud, vibrant, and made for right now.',
    },
  ];

  return (
    <div className="w-full bg-ivory select-none cv-auto" id="journal">

      {/* 1. Value Row */}
      <section className="border-y border-silver/40 py-14 bg-mist/50" aria-label="Authenticity Values">
        <div className="container-luxury grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          {/* Item 1 */}
          <Reveal delay={0}>
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-rani-pink/10 border border-rani-pink/30 flex items-center justify-center text-rani-pink">
                <Sparkles size={18} strokeWidth={1.5} />
              </div>
              <h3 className="font-eyebrow text-[11.5px] text-bidri-black tracking-[0.3em] uppercase font-semibold">
                HANDMADE IN BIDAR
              </h3>
              <p className="font-body text-xs text-graphite font-light leading-relaxed">
                Every single line chiselled freehand by master artisan families without moulds or laser machines.
              </p>
            </div>
          </Reveal>

          {/* Item 2 */}
          <Reveal delay={0.08}>
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-saffron/10 border border-saffron/30 flex items-center justify-center text-antique-gold">
                <Award size={18} strokeWidth={1.5} />
              </div>
              <h3 className="font-eyebrow text-[11.5px] text-bidri-black tracking-[0.3em] uppercase font-semibold">
                GI CERTIFIED CRAFT (NO. 12)
              </h3>
              <p className="font-body text-xs text-graphite font-light leading-relaxed">
                Protected by the official Geographical Indication Tag No. 12 Karnataka Registry.
              </p>
            </div>
          </Reveal>

          {/* Item 3 */}
          <Reveal delay={0.16}>
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-peacock-teal/10 border border-peacock-teal/30 flex items-center justify-center text-peacock-teal">
                <ShieldCheck size={18} strokeWidth={1.5} />
              </div>
              <h3 className="font-eyebrow text-[11.5px] text-bidri-black tracking-[0.3em] uppercase font-semibold">
                100% DIRECT FAIR-TRADE
              </h3>
              <p className="font-body text-xs text-graphite font-light leading-relaxed">
                Zero middlemen. Artisans receive 100% fair living wages, healthcare funds, and direct ownership.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Artisan Guild Spotlight */}
      <section className="section-luxury container-luxury border-b border-silver/40" id="artisans" aria-label="Artisan Spotlight">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Portrait Left (5 cols) */}
          <div className="md:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/3] sm:aspect-[3/4] w-full bg-mist border border-silver/40 overflow-hidden shadow-xl group">
                <Image
                  src="/img/artisan/artisan_bidar_inlay.jpg"
                  alt="Master artisan Shah Rasheed Ahmed Quadri hammering silver in Bidar workshop"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 bg-bidri-black/90 text-silver-bright px-3 py-1 font-eyebrow text-[9px] tracking-widest uppercase">
                  MASTER USTAD · BIDAR CLUSTER
                </div>
              </div>
            </Reveal>
          </div>

          {/* Details Right (7 cols) */}
          <div className="md:col-span-7 space-y-6 md:pl-6">
            <Reveal delay={0.1}>
              <div className="inline-flex items-center space-x-2 bg-peacock-teal/10 border border-peacock-teal/30 px-3 py-1">
                <span className="font-eyebrow text-[10px] text-peacock-teal tracking-[0.38em] uppercase font-medium">
                  THE DECCAN ARTISAN GUILD
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-light text-bidri-black leading-tight mt-2">
                Meet the Ustads of Bidar
              </h2>

              <p className="font-body text-base text-graphite font-light leading-relaxed">
                Bidriware survives today because of five resilient family workshops in Bidar, led by living masters like Padma Shri Shah Rasheed Ahmed Quadri, Abdul Rauf, and Zareena Begum.
              </p>

              <p className="font-body text-sm text-graphite font-light leading-relaxed">
                By purchasing directly through our cooperative platform, you guarantee sustainable living wages, fund young apprentice training schools, and ensure this 600-year Indian metallurgy endures for future generations.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/artisans"
                  className="font-eyebrow text-[11px] text-bidri-black hover:text-rani-pink tracking-[0.35em] uppercase hover-link-rule"
                >
                  MEET THE MAKERS & WORKSHOPS →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Cultural Journal & Dispatches */}
      <section className="section-luxury container-luxury border-b border-silver/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-silver/40 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-rani-pink/10 border border-rani-pink/30 px-3 py-1 mb-2">
              <BookOpen size={12} className="text-rani-pink" />
              <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.38em] uppercase font-medium">
                CULTURAL DISPATCHES & ESSAYS
              </span>
            </div>
            <h2 className="font-display headline-sub font-light text-bidri-black">
              The Bidri Journal
            </h2>
          </div>
          <p className="font-body text-xs sm:text-sm text-graphite font-light max-w-md">
            Stories on contemporary Indian aesthetics, craft sociology, handlooms, and street pop culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <Reveal key={art.id} delay={idx * 0.08}>
              <article className="bg-mist p-5 border border-silver/40 card-hover-rich flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] w-full bg-[#FBFAF8] border border-silver/20 overflow-hidden shadow-xs">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="font-eyebrow text-[9.5px] text-rani-pink tracking-widest uppercase font-medium block">
                    {art.vol}
                  </span>
                  <h3 className="font-display text-2xl font-light text-bidri-black group-hover:text-rani-pink transition-colors">
                    {art.title}
                  </h3>
                  <p className="font-body text-xs text-graphite font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-silver/30 mt-4">
                  <button
                    onClick={() => setActiveArticleModal(art.id)}
                    className="font-eyebrow text-[10.5px] text-bidri-black hover:text-rani-pink tracking-[0.3em] uppercase hover-link-rule cursor-pointer"
                  >
                    READ ESSAY →
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. Ethical Newsletter Section */}
      <section className="py-20 sm:py-24 container-luxury text-center max-w-2xl mx-auto space-y-6">
        <Reveal>
          <span className="font-eyebrow text-[10.5px] text-rani-pink tracking-[0.4em] uppercase font-medium block">
            JOIN THE COLLECTOR COMMUNITY
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black">
            Receive Private Drops & Artisan Stories
          </h2>
          <p className="font-body text-xs sm:text-sm text-graphite font-light leading-relaxed">
            Subscribe to receive lookbook previews, documentary releases, and <strong>10% off</strong> your first handcrafted Bidri acquisition with code <span className="text-rani-pink font-semibold">DECCAN10</span>.
          </p>

          <form onSubmit={handleSubscribe} className="pt-4 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 bg-ivory border border-silver/50 text-xs font-body text-bidri-black focus:outline-none focus:border-rani-pink"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-bidri-black text-ivory font-eyebrow text-[10.5px] tracking-[0.3em] uppercase hover:bg-rani-pink transition-colors cursor-pointer"
            >
              {isSubscribed ? 'JOINED!' : 'JOIN →'}
            </button>
          </form>

          {isSubscribed ? (
            <p className="text-xs font-body text-peacock-teal font-medium flex items-center justify-center space-x-1.5 pt-2">
              <Check size={14} />
              <span>Welcome to the circle! Use code <strong>DECCAN10</strong> at checkout for 10% off.</span>
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="pt-4 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-ivory border border-silver/50 text-xs font-body text-bidri-black focus:outline-none focus:border-rani-pink"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-bidri-black text-ivory font-eyebrow text-[10.5px] tracking-[0.3em] uppercase hover:bg-rani-pink transition-colors cursor-pointer"
              >
                JOIN →
              </button>
            </form>
          )}
        </Reveal>
      </section>

      {/* Article Full Text Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-bidri-black/60 backdrop-blur-xs">
          <div className="bg-ivory border border-silver/40 p-8 max-w-2xl w-full shadow-2xl relative">
            <button
              onClick={() => setActiveArticleModal(null)}
              className="absolute top-4 right-4 text-bidri-black hover:text-rani-pink cursor-pointer font-bold text-lg"
            >
              ✕
            </button>
            {(() => {
              const art = articles.find((a) => a.id === activeArticleModal);
              if (!art) return null;
              return (
                <div className="space-y-4">
                  <span className="font-eyebrow text-[10px] text-rani-pink tracking-widest uppercase font-medium">
                    {art.vol}
                  </span>
                  <h3 className="font-display text-3xl font-light text-bidri-black">
                    {art.title}
                  </h3>
                  <div className="relative aspect-[16/9] w-full bg-mist overflow-hidden my-4 border border-silver/30">
                    <Image src={art.image} alt={art.title} fill className="object-cover" />
                  </div>
                  <p className="font-body text-sm text-graphite font-light leading-relaxed">
                    {art.fullText}
                  </p>
                  <div className="pt-4 border-t border-silver/30 flex justify-between items-center">
                    <Link
                      href="/shop"
                      onClick={() => setActiveArticleModal(null)}
                      className="font-eyebrow text-[10px] text-rani-pink tracking-widest uppercase hover-link-rule"
                    >
                      EXPLORE CURATED PIECES →
                    </Link>
                    <button
                      onClick={() => setActiveArticleModal(null)}
                      className="px-4 py-2 bg-bidri-black text-ivory text-xs font-eyebrow uppercase cursor-pointer"
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

