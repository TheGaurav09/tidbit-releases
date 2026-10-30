import React from "react";
import { CloudShader } from "./ui/cloud-shader";
import { Button } from "./ui/moving-border";
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

  return (
    <section className="relative w-full overflow-hidden bg-[#4C87C5]">
      {/* Crisp, bright Aceternity Cloud Shader with #4C87C5 background to match initial shader render */}
      <CloudShader
        className="w-full pt-28 pb-24 md:pt-36 md:pb-36 bg-[#4C87C5]"
        speed={1}
        count={6}
        skyTopColor="#3876ba"
        skyBottomColor="#8cbfe8"
        cloudColor="#ffffff"
      >
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-white text-blue-800 text-xs font-semibold mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>TidBit {APP_CONFIG.version} · Verified Android Release</span>
          </div>

          {/* Main Punchy Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-5 font-display drop-shadow-sm">
            The <span className="text-amber-300">Antidote</span> to Brainrot.<br />
            Bite-Sized Learning That Sticks.
          </h1>

          {/* Concise, Accurate Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-blue-50/95 leading-relaxed max-w-2xl mb-8 font-medium">
            Educational video reels, context-aware AI tutoring with Bud, and a digital library with neural audiobooks — 100% distraction-free with zero ads.
          </p>

          {/* CTA Button Group with TidBit Brand Moving Border Button */}
          <div className="flex items-center justify-center gap-3.5 flex-wrap mb-9">
            <Button
              as="button"
              onClick={handleDownloadClick}
              borderRadius="9999px"
              containerClassName="h-12 w-auto shadow-xl"
              borderClassName="bg-[radial-gradient(circle_at_center,#60A5FA_20%,#2457D6_55%,transparent_75%)]"
              className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm md:text-base px-6 gap-2.5 cursor-pointer transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download APK ({APP_CONFIG.apkSize})</span>
            </Button>

            <button
              onClick={onOpenWaitlist}
              className="h-12 px-6 rounded-full bg-white/95 hover:bg-white border border-white text-neutral-900 text-sm md:text-base font-semibold transition-all shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
            >
              Play Store Waitlist
            </button>

            <button
              onClick={onOpenQr}
              className="h-12 px-5 rounded-full bg-white/90 hover:bg-white border border-white/80 text-neutral-800 text-sm md:text-base font-medium transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
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

          {/* High-Visibility, Clean Frosted Trust Pills with 100% Contrast */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs font-semibold flex-wrap">
            <div className="flex items-center gap-2 bg-white/95 text-neutral-800 px-4 py-2 rounded-full border border-white shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Zero Ad Trackers</span>
            </div>
            <div className="flex items-center gap-2 bg-white/95 text-neutral-800 px-4 py-2 rounded-full border border-white shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Encrypted Local Storage</span>
            </div>
            <div className="flex items-center gap-2 bg-white/95 text-neutral-800 px-4 py-2 rounded-full border border-white shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Zero-Lag Video Playback</span>
            </div>
          </div>
        </div>
      </CloudShader>

      {/* Seamless transition merging Cloud Shader bottom into Integrated Learning Ecosystem section */}
      <div className="absolute inset-x-0 bottom-0 h-28 md:h-36 bg-gradient-to-b from-transparent via-[var(--color-canvas)]/50 to-[var(--color-canvas)] pointer-events-none z-10" />
    </section>
  );
}
