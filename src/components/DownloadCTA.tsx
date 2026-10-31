import React from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { APP_CONFIG } from "../lib/config";
import { triggerDirectDownload } from "../lib/download";

export function DownloadCTA({
  onOpenWaitlist,
}: {
  onOpenWaitlist: () => void;
}) {
  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerDirectDownload(APP_CONFIG.apkDownloadUrl, `tidbit-${APP_CONFIG.version}.apk`);
  };

  return (
    <section className="py-16 md:py-24 px-4 max-w-4xl mx-auto" id="download">
      <div className="rounded-3xl p-6 sm:p-12 text-center bg-white border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Ready to Learn
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mt-2 mb-3 font-display">
          Start Your Distraction-Free Journey
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 max-w-lg mb-8 leading-relaxed">
          Download verified TidBit release APK directly or join our Google Play Store beta waitlist for worldwide access.
        </p>

        {/* Buttons: Automatic Direct Download without page redirection */}
        <div className="flex items-center justify-center gap-3.5 flex-wrap mb-6">
          <HoverBorderGradient
            as="button"
            onClick={handleDownloadClick}
            containerClassName="rounded-full shadow-md"
            className="text-sm md:text-base font-semibold flex items-center gap-2.5 py-3 px-6 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download TidBit APK ({APP_CONFIG.apkSize})</span>
          </HoverBorderGradient>

          <button
            onClick={onOpenWaitlist}
            className="px-6 py-3 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-sm font-semibold hover:bg-neutral-200/80 transition-colors cursor-pointer"
          >
            Play Store Beta
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-neutral-500">
          <span>{APP_CONFIG.minAndroidVersion} · {APP_CONFIG.supportedArchitectures}</span>
          <span className="hidden sm:inline">·</span>
          <span>{APP_CONFIG.sha256VerificationText}</span>
        </div>
      </div>
    </section>
  );
}
