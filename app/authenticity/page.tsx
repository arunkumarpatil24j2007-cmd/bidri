'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { certificates, lookupCertificate, CertificateRecord } from '@/content/authenticity';
import { Wordmark } from '@/components/ui/Wordmark';

export default function AuthenticityPage() {
  const [certQuery, setCertQuery] = useState('');
  const [result, setResult] = useState<CertificateRecord | null | undefined>(undefined);
  const [hasSearched, setHasSearched] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certQuery.trim()) return;
    const found = lookupCertificate(certQuery);
    setResult(found || null);
    setHasSearched(true);
  };

  const sampleNumbers = ['BIDRI-1422-001', 'BIDRI-1422-002', 'BIDRI-1422-003', 'BIDRI-1422-007'];

  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            OFFICIAL REGISTRY · GI TAG NO. 12
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            Certificate & Provenance Verification
          </h1>
          <p className="font-body text-sm text-graphite font-light max-w-[50ch] mx-auto">
            Every genuine BIDRI CRAFTS artefact is stamped with a unique archival certificate and registered in our permanent Karnataka guild registry.
          </p>
        </div>

        {/* Lookup Form */}
        <div className="max-w-xl mx-auto mb-16">
          <form onSubmit={handleLookup} className="relative">
            <div className="flex flex-col sm:flex-row items-center border-b border-bidri-black pb-2">
              <input
                type="text"
                value={certQuery}
                onChange={(e) => {
                  setCertQuery(e.target.value);
                  setHasSearched(false);
                }}
                placeholder="Enter Certificate No. (e.g. BIDRI-1422-001)"
                className="w-full bg-transparent py-3 px-2 font-display text-xl text-bidri-black placeholder:text-graphite/40 focus:outline-none tracking-wide text-center sm:text-left"
              />
              <button
                type="submit"
                className="mt-4 sm:mt-0 px-6 py-2.5 font-eyebrow text-[11px] text-bidri-black tracking-[0.35em] uppercase hover-link-rule focus-visible:outline-none flex-shrink-0"
              >
                VERIFY →
              </button>
            </div>
          </form>

          {/* Sample quick pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-body text-graphite/60">
            <span>Sample numbers for verification:</span>
            {sampleNumbers.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setCertQuery(s);
                  const found = lookupCertificate(s);
                  setResult(found || null);
                  setHasSearched(true);
                }}
                className="font-mono text-[11px] text-bidri-black hover:underline cursor-pointer px-1.5 py-0.5 border border-silver/30"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results Presentation */}
        <AnimatePresence mode="wait">
          {hasSearched && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-ivory border border-silver/60 p-8 sm:p-14 shadow-xl relative overflow-hidden max-w-2xl mx-auto"
            >
              {/* Certificate Card Header */}
              <div className="text-center pb-8 border-b border-silver/30 space-y-3">
                <Wordmark size="md" className="mx-auto" />
                <span className="font-eyebrow text-[9px] text-graphite/60 tracking-[0.35em] uppercase block">
                  CERTIFICATE OF AUTHENTIC PROVENANCE
                </span>
                <span className="font-mono text-xs text-bidri-black tracking-widest block font-medium">
                  {result.certificateId}
                </span>
              </div>

              {/* Certificate Details Grid */}
              <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 font-body text-xs text-graphite">
                <div>
                  <span className="font-eyebrow text-[9px] text-graphite/50 tracking-[0.2em] uppercase block mb-1">
                    ARTEFACT NAME
                  </span>
                  <p className="font-display text-xl text-bidri-black font-light">{result.pieceName}</p>
                </div>

                <div>
                  <span className="font-eyebrow text-[9px] text-graphite/50 tracking-[0.2em] uppercase block mb-1">
                    COLLECTION
                  </span>
                  <p className="text-bidri-black font-normal">{result.collection}</p>
                </div>

                <div>
                  <span className="font-eyebrow text-[9px] text-graphite/50 tracking-[0.2em] uppercase block mb-1">
                    MASTER CRAFTSMAN
                  </span>
                  <p className="text-bidri-black font-normal">{result.artisanName}</p>
                </div>

                <div>
                  <span className="font-eyebrow text-[9px] text-graphite/50 tracking-[0.2em] uppercase block mb-1">
                    DATE CRAFTED
                  </span>
                  <p className="text-bidri-black font-normal">{result.dateCrafted}</p>
                </div>

                <div>
                  <span className="font-eyebrow text-[9px] text-graphite/50 tracking-[0.2em] uppercase block mb-1">
                    EDITION REGISTRY
                  </span>
                  <p className="text-bidri-black font-normal">
                    {result.editionNumber} of {result.editionTotal} Produced
                  </p>
                </div>

                <div>
                  <span className="font-eyebrow text-[9px] text-graphite/50 tracking-[0.2em] uppercase block mb-1">
                    ALLOY & INLAY
                  </span>
                  <p className="text-bidri-black font-normal">{result.silverPurity}</p>
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-silver/20">
                  <span className="font-eyebrow text-[9px] text-graphite/50 tracking-[0.2em] uppercase block mb-1">
                    GI REGISTRATION
                  </span>
                  <p className="text-graphite/80 font-light">{result.provenanceNote}</p>
                </div>
              </div>

              {/* SVG Silver-Foil Seal Stamp */}
              <div className="pt-8 border-t border-silver/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-3 text-xs text-graphite/70">
                  <CheckCircle2 size={16} className="text-bidri-black" />
                  <span>Verified in Karnataka State Archive Registry</span>
                </div>

                {/* Silver Foil SVG Seal */}
                <div className="flex items-center space-x-2 bg-mist px-4 py-2 border border-silver/40">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" stroke="#C9C6C1" strokeWidth="1" strokeDasharray="3 2" />
                    <circle cx="16" cy="16" r="11" fill="#EDEAE4" stroke="#8A6B3B" strokeWidth="0.5" />
                    <text x="16" y="15" fill="#14100F" fontSize="5.5" textAnchor="middle" fontFamily="var(--font-italiana)" letterSpacing="1">BIDRI</text>
                    <text x="16" y="21" fill="#8A6B3B" fontSize="4" textAnchor="middle" fontFamily="var(--font-jost)">SEAL</text>
                  </svg>
                  <span className="font-eyebrow text-[9px] text-bidri-black tracking-[0.2em] uppercase">
                    AUTHENTICATED
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {hasSearched && result === null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-12 max-w-md mx-auto"
            >
              <p className="font-display text-xl text-graphite italic font-light">
                No certificate found matching "{certQuery}". Please verify the number inscribed on your deed.
              </p>
              <p className="font-body text-xs text-graphite/60 font-light mt-3">
                For archival assistance, contact our curatorial desk at concierge@bidricrafts.com
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
