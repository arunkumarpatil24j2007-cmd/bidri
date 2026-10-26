'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShieldCheck, User } from 'lucide-react';
import { products } from '@/content/products';
import { certificates } from '@/content/authenticity';
import { useWishlistStore } from '@/lib/wishlistStore';
import { ProductCard } from '@/components/ui/ProductCard';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'registry' | 'profile'>('wishlist');
  const { savedSlugs } = useWishlistStore();

  const savedProducts = products.filter((p) => savedSlugs.includes(p.slug));
  const patronCertificates = certificates.slice(0, 2);

  return (
    <div className="w-full bg-ivory pt-32 sm:pt-36 pb-32 select-none min-h-screen">
      <div className="container-luxury max-w-5xl mx-auto space-y-12">
        {/* Account Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-silver/30 pb-5 gap-4">
          <div>
            <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.35em] uppercase font-medium block">
              PATRON VAULT
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-light text-bidri-black mt-0.5">
              My Wishlist & Account
            </h1>
          </div>

          <div className="flex items-center space-x-6 text-xs font-eyebrow text-graphite tracking-[0.2em] uppercase">
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
              GI CERTIFICATES
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
          <div className="space-y-6">
            <div className="flex justify-between items-baseline">
              <h2 className="font-display text-2xl font-light text-bidri-black">
                Saved Artefacts ({savedProducts.length})
              </h2>
              <span className="font-body text-xs text-graphite/60 font-light">
                Persisted to your browser
              </span>
            </div>

            {savedProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-mist/40 rounded-xl border border-silver/30 p-8">
                <Heart size={32} className="text-graphite/30 mx-auto" />
                <p className="font-display text-2xl text-graphite/70 italic font-light">
                  Your wishlist is currently empty.
                </p>
                <p className="font-body text-xs text-graphite max-w-sm mx-auto">
                  Click the heart icon on any handcrafted piece to save it for later.
                </p>
                <Link
                  href="/shop"
                  className="inline-block mt-3 px-6 py-2.5 bg-bidri-black text-ivory font-eyebrow text-xs tracking-widest uppercase hover:bg-rani-pink transition-colors rounded-lg shadow-sm"
                >
                  DISCOVER ARTEFACTS →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {savedProducts.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Deeded Registry */}
        {activeTab === 'registry' && (
          <div className="space-y-6">
            <div className="flex justify-between items-baseline">
              <h2 className="font-display text-2xl font-light text-bidri-black">
                Registered GI Certificates
              </h2>
              <span className="font-body text-xs text-peacock-teal font-medium flex items-center space-x-1">
                <ShieldCheck size={14} />
                <span>GI Registry Tag No. 12</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patronCertificates.map((cert) => (
                <div
                  key={cert.certificateId}
                  className="bg-ivory rounded-xl border border-silver/40 p-6 space-y-4 shadow-xs"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-eyebrow text-[9.5px] text-antique-gold tracking-widest uppercase font-medium">
                        OFFICIAL CERTIFICATE
                      </span>
                      <h3 className="font-display text-xl font-light text-bidri-black mt-0.5">
                        {cert.pieceName}
                      </h3>
                    </div>
                    <span className="font-mono text-xs bg-mist px-2.5 py-1 rounded border border-silver/30 text-graphite">
                      {cert.certificateId}
                    </span>
                  </div>

                  <p className="font-body text-xs text-graphite font-light leading-relaxed">
                    Crafted in Bidar by {cert.artisanName}. Inlaid with {cert.silverPurity}.
                  </p>

                  <div className="pt-3 border-t border-silver/20 flex justify-between text-[11px] font-body text-graphite/70">
                    <span>Date: {cert.dateCrafted}</span>
                    <span className="text-peacock-teal font-medium">✓ {cert.hallmarkRegistryNumber}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-xl bg-ivory rounded-xl border border-silver/40 p-6 sm:p-8 space-y-6">
            <h2 className="font-display text-2xl font-light text-bidri-black">
              Patron Profile
            </h2>
            <div className="space-y-3 font-body text-xs">
              <div className="p-3 bg-mist/60 rounded-lg flex justify-between">
                <span className="text-graphite/70">Operating Country:</span>
                <span className="font-medium text-bidri-black">India (₹ INR)</span>
              </div>
              <div className="p-3 bg-mist/60 rounded-lg flex justify-between">
                <span className="text-graphite/70">Preferred Delivery Courier:</span>
                <span className="font-medium text-bidri-black">Bluedart / Delhivery Express</span>
              </div>
              <div className="p-3 bg-mist/60 rounded-lg flex justify-between">
                <span className="text-graphite/70">Transit Insurance:</span>
                <span className="font-medium text-peacock-teal">100% Comprehensive</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
