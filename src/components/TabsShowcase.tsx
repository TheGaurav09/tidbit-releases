import React from "react";
import { motion } from "motion/react";
import { Tabs } from "./ui/tabs";
import { PhoneMockup, ScreenType } from "./PhoneMockup";
import { BudMascot } from "./BudMascot";

interface TabItem {
  id: ScreenType;
  title: string;
  badge: string;
  headline: string;
  description: string;
}

const modules: TabItem[] = [
  {
    id: "shorts",
    title: "Shorts Feed",
    badge: "Zero-Distraction Feed",
    headline: "Educational Shorts Without the Brainrot",
    description:
      "Every video is vetted for high-yield learning. Features categorized difficulty tags, synchronized concept takeaways, and client-side playback caching for zero buffering.",
  },
  {
    id: "bud",
    title: "Bud AI Assistant",
    badge: "Context-Aware Tutor",
    headline: "Instant Quizzes & Concept Checks for Every Reel",
    description:
      "Bud analyzes the current video transcript to formulate interactive multiple-choice checks, concept flashcards, and step-by-step explanations on demand.",  
  },
  {
    id: "books",
    title: "BookNest E-Reader",
    badge: "Digital Library & Audio",
    headline: "Comfortable Typography & Neural Audiobooks",
    description:
      "A serene digital library with customizable reading themes (Sepia, Warm Light, Crisp Serif), chapter bookmarks, and neural voice narration synchronized with highlighted text.",
  },
  {
    id: "apps",
    title: "Brain Games Hub",
    badge: "Cognitive Training",
    headline: "Vocab Arena: Spelling Bee, Wordle & Logic",
    description:
      "Five-minute daily micro-games designed to stimulate vocabulary retention, mental arithmetic speed, and logical deduction without addictive reward loops.",
  },
  {
    id: "notes",
    title: "Yaad Notes",
    badge: "Visual Idea Canvas",
    headline: "Sticky Idea Cards & Quick Audio Memos",
    description:
      "Jot notes, record audio snippets, and sketch diagrams while learning. Categorized with pastel themes and synchronized directly with video lesson timestamps.",
  },
];

export function TabsShowcase() {
  // Desktop Tabs Configuration
  const desktopTabs = modules.map((mod) => ({
    title: mod.title,
    value: mod.id,
    content: (
      <div className="w-full h-full rounded-3xl p-6 md:p-8 bg-white border border-black/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-8 transition-colors">
        <div className="flex-1 flex flex-col gap-4 text-left">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200/60 text-xs font-semibold w-fit">
              {mod.badge}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 font-display">
            {mod.headline}
          </h3>

          <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-md">
            {mod.description}
          </p>
        </div>

        <div className="w-full md:w-auto flex justify-center shrink-0">
          <PhoneMockup screen={mod.id} className="max-w-[220px] md:max-w-[240px]" />
        </div>
      </div>
    ),
  }));

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* DESKTOP VIEW: Aceternity UI Tabs with side-by-side modules (compact mobile mockup) */}
      <div className="hidden md:flex h-[36rem] [perspective:1000px] relative flex-col w-full items-start justify-start">
        <Tabs tabs={desktopTabs} />
      </div>

      {/* MOBILE VIEW: Stacked Tactile Phone Deck (Clean card stack, zero shadow compounding) */}
      <div className="md:hidden flex flex-col gap-8 px-3 relative pb-12">
        {modules.map((mod, idx) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="sticky flex flex-col items-center"
            style={{
              top: `${68 + idx * 8}px`,
              zIndex: idx + 10,
            }}
          >
            <div className="w-full max-w-[310px] rounded-3xl bg-white border border-black/[0.08] p-4 sm:p-5 shadow-[0_10px_30px_-6px_rgba(0,0,0,0.08)] flex flex-col items-center transition-all">
              {/* Floating Step Badge */}

              <h4 className="text-base font-bold text-neutral-900 text-center mb-1 font-display leading-snug">
                {mod.headline}
              </h4>
              <p className="text-xs text-neutral-500 text-center mb-4 line-clamp-2 leading-relaxed">
                {mod.description}
              </p>

              {/* Hardware Phone Card with clean hardware shadow */}
              <div className="w-full max-w-[205px] sm:max-w-[220px]">
                <PhoneMockup screen={mod.id} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
