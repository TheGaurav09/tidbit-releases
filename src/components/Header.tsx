import React from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { TidBitLogo } from "./TidBitLogo";
import { APP_CONFIG } from "../lib/config";
import { triggerDirectDownload } from "../lib/download";

export function Header({
  onOpenWaitlist,
}: {
  onOpenWaitlist?: () => void;
}) {
  const handleGetAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerDirectDownload(APP_CONFIG.apkDownloadUrl, `tidbit-${APP_CONFIG.version}.apk`);
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-5xl h-14 px-5 rounded-full glass-surface flex items-center justify-between gap-6 transition-colors shadow-sm">
        {/* Brand Wordmark */}
        <a href="#" className="flex items-center gap-2 select-none group">
          <TidBitLogo showBadge={true} />
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          <a href="#showcase" className="hover:text-neutral-900 transition-colors">
            Showcase
          </a>
          <a href="#features" className="hover:text-neutral-900 transition-colors">
            Features
          </a>
          <a href="#faq" className="hover:text-neutral-900 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <HoverBorderGradient
            as="button"
            onClick={handleGetAppClick}
            containerClassName="rounded-full shadow-sm"
            className="text-xs md:text-sm font-semibold flex items-center gap-2 py-1.5 px-4 cursor-pointer"
          >
            <span>Get App</span>
          </HoverBorderGradient>
        </div>
      </div>
    </header>
  );
}
