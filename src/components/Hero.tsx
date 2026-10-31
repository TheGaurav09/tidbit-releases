import React, { useState, useEffect } from "react";
import { CloudShader } from "./ui/cloud-shader";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { APP_CONFIG } from "../lib/config";
import { triggerDirectDownload } from "../lib/download";

export function Hero({
  onOpenWaitlist,
  onOpenQr,
}: {
  onOpenWaitlist: () => void;
  onOpenQr: () => void;
}) {
  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerDirectDownload(APP_CONFIG.apkDownloadUrl, `tidbit-${APP_CONFIG.version}.apk`);
  };

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";
      setIsDark(isDarkMode);
    };

    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <CloudShader
        className="w-full pt-28 pb-16 md:pt-36 md:pb-24"
        speed={1}
        count={6}
        skyTopColor={isDark ? "#0c1322" : "#3876ba"}
        skyBottomColor={isDark ? "#1e293b" : "#8cbfe8"}
        cloudColor={isDark ? "#475569" : "#fbf8f2"}
      >
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md border border-white/60 dark:border-white/15 text-blue-900 dark:text-blue-300 text-xs font-semibold mb-5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>TidBit {APP_CONFIG.version} · Verified Android Release</span>
          </div>

          {/* Main Punchy Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] leading-[1.1] mb-5 font-display">
            The <span className="text-amber-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">Antidote</span> to Brainrot.<br />
            Bite-Sized Learning That Sticks.
          </h1>

          {/* Concise, Accurate Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)] leading-relaxed max-w-2xl mb-8 font-medium">
            Educational video reels, context-aware AI tutoring with Bud, and a digital library with neural audiobooks — 100% distraction-free with zero ads.
          </p>

          {/* CTA Button Group with Automatic Direct Download (No Page Redirection) */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
            <HoverBorderGradient
              as="button"
              onClick={handleDownloadClick}
              containerClassName="rounded-full shadow-lg"
              className="text-sm md:text-base font-semibold flex items-center gap-2.5 py-2.5 px-6 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download APK ({APP_CONFIG.apkSize})</span>
            </HoverBorderGradient>

            <button
              onClick={onOpenWaitlist}
              className="px-5 py-2.5 rounded-full bg-white/90 hover:bg-white border border-white/80 text-neutral-900 text-sm font-semibold transition-all shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              Play Store Waitlist
            </button>

            <button
              onClick={onOpenQr}
              className="px-4 py-2.5 rounded-full bg-white/80 hover:bg-white border border-white/70 text-neutral-800 text-sm font-medium transition-all cursor-pointer flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="5" height="5" x="3" y="3" rx="1" />
                <rect width="5" height="5" x="16" y="3" rx="1" />
                <rect width="5" height="5" x="3" y="16" rx="1" />
                <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                <path d="M21 21v.01" />
                <path d="M12 7v3a2 2 0 0 1-2 2H7" />
              </svg>
              <span>Mobile QR</span>
            </button>
          </div>

          {/* Trust Row */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] font-medium flex-wrap">
            <div className="flex items-center gap-2 bg-black/15 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Zero Ad Trackers</span>
            </div>
            <div className="flex items-center gap-2 bg-black/15 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
              <span>Encrypted Local Storage</span>
            </div>
            <div className="flex items-center gap-2 bg-black/15 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
              <span>Zero-Lag Video Playback</span>
            </div>
          </div>
        </div>
      </CloudShader>

      {/* Smooth bottom fade into showcase section */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--color-canvas)] to-transparent pointer-events-none z-10" />
    </section>
  );
}
