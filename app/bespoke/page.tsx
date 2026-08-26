'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

export default function BespokePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [objectChoice, setObjectChoice] = useState('Imperial Vessel / Urn');
  const [motifChoice, setMotifChoice] = useState('Persian Poppy Tendril');
  const [scaleChoice, setScaleChoice] = useState('Statement (30–45 cm)');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen bg-ivory pt-36 pb-32 flex flex-col justify-between select-none">
      <div className="container-luxury max-w-3xl mx-auto flex-1 flex flex-col justify-center">
        {/* Step Indicator 01 / 03 */}
        {!isSubmitted && (
          <div className="mb-12 flex justify-between items-center border-b border-silver/30 pb-4">
            <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase">
              PRIVATE COMMISSION ENQUIRY
            </span>
            <span className="font-display text-lg text-bidri-black font-light">
              0{step} / 03
            </span>
          </div>
        )}

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 space-y-6"
          >
            <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase block">
              COMMISSION INITIATED
            </span>
            <h1 className="font-display headline-sub font-light text-bidri-black">
              Thank You, {clientName || 'Patron'}.
            </h1>
            <p className="font-body text-base text-graphite font-light max-w-[48ch] mx-auto leading-relaxed">
              Our Master of Atelier will review your commission brief for the {objectChoice} with {motifChoice} inlay. We will contact you within two business days.
            </p>
            <div className="p-4 bg-mist border border-silver/40 max-w-sm mx-auto text-xs font-body text-graphite">
              Lead time for private commissions: <strong>8–16 weeks</strong> from clay casting to fort soil patination.
            </div>
            <div className="pt-6">
              <Link
                href="/"
                className="font-eyebrow text-[11px] text-bidri-black tracking-[0.35em] uppercase hover-link-rule"
              >
                RETURN TO MAISON →
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              {/* SCREEN 1: Object */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-8"
                >
                  <h2 className="font-display text-3xl sm:text-5xl font-light text-bidri-black leading-tight">
                    What typology of object would you like to commission?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {[
                      'Imperial Vessel / Urn',
                      'Ceremonial Casket / Paan-daan',
                      'Wearable Adornment / Choker',
                      'Hospitality / Barware Set',
                      'Architectural Screen Panel',
                      'Bespoke Desk Instrument',
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setObjectChoice(item)}
                        className={`p-6 text-left border transition-all duration-300 cursor-pointer ${
                          objectChoice === item
                            ? 'border-bidri-black bg-mist'
                            : 'border-silver/40 bg-ivory hover:border-silver'
                        }`}
                      >
                        <span className="font-display text-xl font-light text-bidri-black block">
                          {item}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end pt-6">
                    <button
                      onClick={() => setStep(2)}
                      className="px-8 py-3.5 bg-bidri-black text-ivory font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-graphite transition-colors flex items-center space-x-3 cursor-pointer"
                    >
                      <span>CONTINUE</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SCREEN 2: Motif & Scale */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-8"
                >
                  <h2 className="font-display text-3xl sm:text-5xl font-light text-bidri-black leading-tight">
                    Select your preferred historical motif and scale.
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase block mb-3">
                        INLAY MOTIF TRADITION
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          'Persian Poppy Tendril',
                          'Mahmud Gawan Jaali',
                          'Imperial Royal Rosette',
                        ].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMotifChoice(m)}
                            className={`p-4 text-left border transition-all text-xs font-body ${
                              motifChoice === m
                                ? 'border-bidri-black bg-mist text-bidri-black font-normal'
                                : 'border-silver/40 text-graphite hover:border-silver'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase block mb-3">
                        SCALE & SILHOUETTE
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          'Intimate (10–20 cm)',
                          'Statement (30–45 cm)',
                          'Monumental (50 cm +)',
                        ].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setScaleChoice(s)}
                            className={`p-4 text-left border transition-all text-xs font-body ${
                              scaleChoice === s
                                ? 'border-bidri-black bg-mist text-bidri-black font-normal'
                                : 'border-silver/40 text-graphite hover:border-silver'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 font-eyebrow text-[11px] text-graphite tracking-[0.25em] uppercase hover-link-rule flex items-center space-x-2"
                    >
                      <ArrowLeft size={14} />
                      <span>BACK</span>
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-8 py-3.5 bg-bidri-black text-ivory font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-graphite transition-colors flex items-center space-x-3 cursor-pointer"
                    >
                      <span>CONTINUE</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SCREEN 3: Contact */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-8"
                >
                  <h2 className="font-display text-3xl sm:text-5xl font-light text-bidri-black leading-tight">
                    Where shall our curator send the commission proposal?
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div>
                      <label className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase block mb-2">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-transparent border-b border-bidri-black py-2.5 font-body text-base text-bidri-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase block mb-2">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="your@domain.com"
                        className="w-full bg-transparent border-b border-bidri-black py-2.5 font-body text-base text-bidri-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase block mb-2">
                        ADDITIONAL VISION & INSCRIPTION NOTES (OPTIONAL)
                      </label>
                      <textarea
                        rows={3}
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        placeholder="Specific dimensions, heraldry or family seals..."
                        className="w-full bg-transparent border-b border-silver/60 py-2.5 font-body text-sm text-bidri-black focus:border-bidri-black focus:outline-none"
                      />
                    </div>

                    <div className="p-4 bg-mist border border-silver/40 text-xs font-body text-graphite/80">
                      Standard private commissions require a production timeline of <strong>8–16 weeks</strong>.
                    </div>

                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-3 font-eyebrow text-[11px] text-graphite tracking-[0.25em] uppercase hover-link-rule flex items-center space-x-2"
                      >
                        <ArrowLeft size={14} />
                        <span>BACK</span>
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3.5 bg-bidri-black text-ivory font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-graphite transition-colors cursor-pointer"
                      >
                        SUBMIT COMMISSION BRIEF
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
