'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Shield, Package, User, LogOut } from 'lucide-react';
import { products, Product } from '@/content/products';
import { certificates } from '@/content/authenticity';
import { useWishlistStore } from '@/lib/wishlistStore';
import { ProductCard } from '@/components/ui/ProductCard';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'registry' | 'profile'>('wishlist');
  const { savedSlugs } = useWishlistStore();

  const savedProducts = products.filter((p) => savedSlugs.includes(p.slug));
  const patronCertificates = certificates.slice(0, 2);

  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-5xl mx-auto space-y-16">
        {/* Account Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-silver/30 pb-6 gap-4">
          <div>
            <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase block">
              PATRON ARCHIVE
            </span>
            <h1 className="font-display headline-sub font-light text-bidri-black">
              Account Ledger
            </h1>
          </div>

          <div className="flex items-center space-x-8 text-xs font-eyebrow text-graphite tracking-[0.25em] uppercase">
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`hover-link-rule cursor-pointer ${
                activeTab === 'wishlist' ? 'text-bidri-black font-semibold' : 'text-graphite/60'
              }`}
            >
              WISHLIST ({savedProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('registry')}
              className={`hover-link-rule cursor-pointer ${
                activeTab === 'registry' ? 'text-bidri-black font-semibold' : 'text-graphite/60'
              }`}
            >
              DEEDED REGISTRY
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`hover-link-rule cursor-pointer ${
                activeTab === 'profile' ? 'text-bidri-black font-semibold' : 'text-graphite/60'
              }`}
            >
              PROFILE
            </button>
          </div>
        </div>

        {/* Tab 1: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-8">
            <div className="flex justify-between items-baseline">
              <h2 className="font-display text-2xl font-light text-bidri-black">
                Saved Artefacts ({savedProducts.length})
              </h2>
              <span className="font-body text-xs text-graphite/60 font-light">
                Persisted to your private vault
              </span>
            </div>

            {savedProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4 border border-silver/30 p-8">
                <p className="font-display text-2xl text-graphite/60 italic font-light">
                  Your wishlist is empty.
                </p>
                <Link
                  href="/collections"
                  className="inline-block font-eyebrow text-[10px] text-bidri-black tracking-[0.3em] uppercase hover-link-rule"
                >
                  DISCOVER ARTEFACTS →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedProducts.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Deeded Registry */}
        {activeTab === 'registry' && (
          <div className="space-y-8">
            <div className="flex justify-between items-baseline">
              <h2 className="font-display text-2xl font-light text-bidri-black">
                Registered Deeds of Ownership
              </h2>
              <Link
                href="/authenticity"
                className="font-eyebrow text-[10px] text-bidri-black tracking-[0.25em] uppercase hover-link-rule"
              >
                LOOKUP CERTIFICATE →
              </Link>
            </div>

            <div className="space-y-6">
              {patronCertificates.map((cert) => (
                <div
                  key={cert.certificateId}
                  className="p-6 bg-mist border border-silver/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-body text-graphite"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-bidri-black font-semibold text-sm block">
                      {cert.certificateId}
                    </span>
                    <p className="font-display text-xl text-bidri-black font-light">{cert.pieceName}</p>
                    <p className="text-graphite/70">
                      Master: {cert.artisanName} · Registered: {cert.dateCrafted}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="border border-silver/50 bg-ivory px-3 py-1 font-eyebrow text-[9px] text-bidri-black tracking-widest uppercase">
                      VERIFIED DEED
                    </span>
                    <Link
                      href={`/authenticity`}
                      className="font-eyebrow text-[9px] text-graphite hover:text-bidri-black tracking-widest uppercase hover-link-rule"
                    >
                      VIEW CERTIFICATE →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-xl space-y-6 bg-mist border border-silver/40 p-8 text-xs font-body text-graphite">
            <h2 className="font-display text-2xl font-light text-bidri-black mb-4">
              Patron Preferences
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-bidri-black font-normal">Patron Registry ID:</strong> PTRN-1422-8921
              </p>
              <p>
                <strong className="text-bidri-black font-normal">Registered Atelier:</strong> Old City Bidar Guild
              </p>
              <p>
                <strong className="text-bidri-black font-normal">Dispatch Preference:</strong> White-glove insured courier
              </p>
              <p>
                <strong className="text-bidri-black font-normal">Biannual Gazette:</strong> Subscribed
              </p>
            </div>
            <div className="pt-4 border-t border-silver/30">
              <p className="text-[11px] text-graphite/70 font-light">
                To update your registry records or transfer an authenticated deed, contact the curatorial registry at registry@bidricrafts.com
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
