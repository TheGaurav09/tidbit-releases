import React, { useState, useEffect } from "react";
import { TidBitLogo } from "../TidBitLogo";

interface SectionItem {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  effectiveDate: string;
  sections: SectionItem[];
  children: React.ReactNode;
  onBackToHome: () => void;
}

export function LegalLayout({
  title,
  subtitle,
  effectiveDate,
  sections,
  children,
  onBackToHome,
}: LegalLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      {/* Minimal Header — Clicking logo returns to Home */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            aria-label="TidBit Home"
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <TidBitLogo size="md" />
          </button>
        </div>
      </header>

      {/* Main Legal Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Document Header */}
        <div className="mb-8 border-b border-neutral-200/80 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-display">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
          <div className="text-xs text-neutral-400 mt-2">
            {effectiveDate}
          </div>
        </div>

        {/* 2-Column Responsive Layout: Sidebar & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Sticky Sidebar: "On this page" */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-20 self-start">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-3">
              On this page
            </h3>
            <nav className="flex flex-col border-l border-neutral-200 text-xs">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => scrollToSection(e, section.id)}
                    className={`py-1.5 pl-3 transition-colors leading-snug truncate ${
                      isActive
                        ? "text-neutral-900 font-bold border-l-2 border-neutral-900 -ml-[1px]"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                    title={section.title}
                  >
                    {section.title}
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Right Document Content: Clean, High Contrast, Compact Font Size */}
          <article className="lg:col-span-8 xl:col-span-9 max-w-2xl space-y-8">
            {children}
          </article>
        </div>
      </main>

      {/* Clean Bottom Legal Footer */}
      <footer className="border-t border-neutral-200/80 py-8 px-4 mt-16 bg-white text-xs text-neutral-500 text-center">
        <p>© 2026 TidBit Ecosystem · Zero Ad Trackers · All rights reserved.</p>
      </footer>
    </div>
  );
}
