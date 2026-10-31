import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "What makes TidBit different from traditional video apps?",
    a: "Traditional platforms rely on hyper-stimulating algorithms tuned for maximum ad impressions. TidBit replaces doomscrolling with vetted 60-second micro-lessons, synchronized active recall checks with Bud AI, and a serene digital library — completely free of commercial advertisements and clickbait.",
  },
  {
    q: "How does Bud AI help convert video watching into real retention?",
    a: "Passive video watching leads to the 'illusion of competence.' Bud analyzes the exact lesson transcript in real time to generate interactive 3-question checks, concept flashcards, and step-by-step explanations, ensuring what you learn is transferred into long-term working memory.",
  },
  {
    q: "Does TidBit work offline when travelling or studying off-grid?",
    a: "Yes. BookNest supports full offline downloads for books and audiobooks, while Yaad Notes and cognitive games store your data securely in on-device storage. You can continue reading, writing, and exercising your brain with zero internet connectivity.",
  },
  {
    q: "How is user privacy protected?",
    a: "TidBit operates under a strict privacy-first charter: zero third-party advertising trackers, zero data brokering, and zero selling of personal reading habits. All authentication tokens and study cards are encrypted locally using hardware-backed keystore security.",
  },
  {
    q: "What Android versions and device architectures are supported?",
    a: "TidBit is optimized for Android 8.0 (API level 26) through Android 15+. The standalone APK supports both ARM64-v8a and x86_64 architectures with efficient memory and battery utilization.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <section className="py-16 md:py-24 px-4 max-w-3xl mx-auto" id="faq">
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Everything You Need to Know
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mt-2 font-display">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
          Clear answers about TidBit’s distraction-free philosophy, AI tutor, and privacy guarantees.
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                isOpen
                  ? "border-blue-500/40 shadow-[0_8px_24px_rgba(36,87,214,0.06)] ring-1 ring-blue-500/20"
                  : "border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-black/[0.14] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none group"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-semibold text-neutral-900 tracking-tight leading-snug">
                  {faq.q}
                </span>

                {/* Elegant Animated Plus/Close Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    isOpen
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-100 text-neutral-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                  }`}
                >
                  <motion.svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </motion.svg>
                </div>
              </button>

              {/* Smooth Height and Opacity Transition */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      transition: {
                        height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.25, delay: 0.05 },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: {
                        height: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.15 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-600 leading-relaxed border-t border-black/[0.04]">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
