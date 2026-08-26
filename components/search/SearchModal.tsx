'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { products, Product } from '@/content/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matches = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.story.toLowerCase().includes(q) ||
        p.inlay.toLowerCase().includes(q)
    );
    setResults(matches);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-ivory/98 backdrop-blur-md flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Search Catalogue"
        >
          {/* Header with Close */}
          <div className="flex justify-between items-center pb-8 border-b border-silver/30">
            <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase">
              CATALOGUE SEARCH
            </span>
            <button
              onClick={onClose}
              className="p-2 text-bidri-black hover:text-graphite transition-colors focus-visible:outline-none"
              aria-label="Close search"
            >
              <X size={24} strokeWidth={1.2} />
            </button>
          </div>

          {/* Search Input */}
          <div className="max-w-3xl w-full mx-auto my-auto py-12">
            <div className="relative mb-12">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by object, collection or motif..."
                className="w-full bg-transparent border-b border-bidri-black py-4 font-display text-2xl sm:text-4xl text-bidri-black placeholder:text-graphite/40 focus:outline-none tracking-tight font-light"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-eyebrow text-graphite hover:text-bidri-black tracking-widest uppercase"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Results */}
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
              {query.trim() && results.length === 0 && (
                <p className="font-display text-xl text-graphite/60 italic font-light">
                  No artefacts found matching "{query}".
                </p>
              )}

              {results.map((product) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between py-3 border-b border-silver/20 hover:border-bidri-black transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 bg-mist flex-shrink-0 border border-silver/30">
                      <Image
                        src={product.images.hero}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-body text-sm font-normal text-bidri-black group-hover:text-graphite tracking-wide">
                        {product.name}
                      </h4>
                      <p className="font-body text-xs text-graphite/60 font-light">
                        {product.collection.replace('-', ' ')} · {product.inlay}
                      </p>
                    </div>
                  </div>
                  <span className="font-body text-sm text-bidri-black font-light">
                    {product.formattedPrice}
                  </span>
                </Link>
              ))}

              {!query && (
                <div className="space-y-3">
                  <span className="font-eyebrow text-[9px] text-graphite/50 tracking-[0.3em] uppercase block">
                    SUGGESTED DISCOVERIES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Royal Charm Choker', 'Surahi Ewer', 'Huqqa Base', 'Jaali Cuff', 'Paan-daan Box'].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-3 py-1 border border-silver/40 font-body text-xs text-graphite hover:border-bidri-black hover:text-bidri-black transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center pb-4 text-xs font-body text-graphite/50 font-light">
            Press ESC to exit search.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
