import React from "react";
import { TidBitLogo } from "./TidBitLogo";
import { APP_CONFIG } from "../lib/config";
import { triggerDirectDownload } from "../lib/download";

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLegalClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState(null, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    triggerDirectDownload(APP_CONFIG.apkDownloadUrl, `tidbit-${APP_CONFIG.version}.apk`);
  };

  return (
    <footer className="border-t border-black/[0.08] py-14 px-4 bg-neutral-50/70 text-neutral-600 text-xs transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
          {/* Brand info */}
          <div className="flex flex-col gap-2.5 max-w-sm">
            <TidBitLogo size="md" />
            <p className="leading-relaxed text-neutral-500 text-xs mt-1">
              The educational social and micro-learning ecosystem. Designed with quiet focus, zero advertisements, and compounding knowledge.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex gap-10 sm:gap-14 flex-wrap">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                Ecosystem
              </span>
              <a href="#showcase" className="hover:text-neutral-900 transition-colors">
                Shorts Feed
              </a>
              <a href="#showcase" className="hover:text-neutral-900 transition-colors">
                Bud AI Tutor
              </a>
              <a href="#showcase" className="hover:text-neutral-900 transition-colors">
                BookNest Library
              </a>
              <a href="#showcase" className="hover:text-neutral-900 transition-colors">
                Brain Workouts
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                Product
              </span>
              <a
                href={APP_CONFIG.apkDownloadUrl}
                onClick={handleDownloadClick}
                className="hover:text-neutral-900 transition-colors cursor-pointer"
              >
                Download APK ({APP_CONFIG.apkSize})
              </a>
              <a href="#faq" className="hover:text-neutral-900 transition-colors">
                FAQ
              </a>
              <a
                href="#download"
                className="hover:text-neutral-900 transition-colors"
              >
                Release Details
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                Legal & Trust
              </span>
              <a
                href="#privacy"
                onClick={(e) => handleLegalClick(e, "#privacy")}
                className="hover:text-neutral-900 transition-colors cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                onClick={(e) => handleLegalClick(e, "#terms")}
                className="hover:text-neutral-900 transition-colors cursor-pointer"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <div>© 2026 Tidbit. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
