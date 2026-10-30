import React from "react";
import { Button } from "./ui/moving-border";
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

        {/* Actions - Moving Border Button with TidBit Brand UI Gradient */}
        <div className="flex items-center gap-3">
          <Button
            as="button"
            onClick={handleGetAppClick}
            borderRadius="9999px"
            containerClassName="h-9 w-auto shadow-xs"
            borderClassName="bg-[radial-gradient(circle_at_center,#60A5FA_20%,#2457D6_55%,transparent_75%)]"
            className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs md:text-sm px-4 gap-2 cursor-pointer transition-colors"
          >
            <span>Get App</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
