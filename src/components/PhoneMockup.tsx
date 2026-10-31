import React from "react";

export type ScreenType = "shorts" | "bud" | "books" | "apps" | "notes";

interface PhoneMockupProps {
  screen?: ScreenType;
  className?: string;
}

const screenImageMap: Record<ScreenType, { src: string; alt: string }> = {
  shorts: {
    src: "/images/screen-shorts.jpg",
    alt: "TidBit Shorts Feed - Curated lesson and active learning reel",
  },
  bud: {
    src: "/images/screen-bud.jpg",
    alt: "TidBit Bud AI Tutor - Context-aware interactive concept check",
  },
  books: {
    src: "/images/screen-books.jpg",
    alt: "TidBit BookNest - E-Reader with neural audiobook narration",
  },
  apps: {
    src: "/images/screen-apps.jpg",
    alt: "TidBit Vocab Arena - Spelling Bee, Wordle and brain workouts",
  },
  notes: {
    src: "/images/screen-notes.jpg",
    alt: "TidBit Yaad Notes - Modular notebook for doodles and audio memos",
  },
};

export function PhoneMockup({
  screen = "shorts",
  className = "",
}: PhoneMockupProps) {
  const current = screenImageMap[screen] || screenImageMap.shorts;

  return (
    <div className={`relative w-full max-w-[290px] sm:max-w-[310px] mx-auto select-none ${className}`}>
      {/* Sleek Hardware Bezel */}
      <div className="relative w-full aspect-[9/18.5] rounded-[42px] bg-[#0C0E12] p-[7px] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.12)]">
        {/* Punch Hole Camera Notch
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full bg-black border border-white/10 z-30 pointer-events-none" /> */}

        {/* Screen Viewport with Authentic UI Image */}
        <div className="relative w-full h-full rounded-[35px] overflow-hidden bg-black">
          <img
            src={current.src}
            alt={current.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top select-none pointer-events-none"
          />

          {/* Glare Reflection overlay for hardware realism */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[35px] bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
