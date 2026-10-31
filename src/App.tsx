import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TabsShowcase } from "./components/TabsShowcase";
import { LearnCarousel } from "./components/LearnCarousel";
import { FAQ } from "./components/FAQ";
import { DownloadCTA } from "./components/DownloadCTA";
import { Footer } from "./components/Footer";
import { Modals } from "./components/Modals";
import { PrivacyPolicy } from "./components/legal/PrivacyPolicy";
import { TermsOfService } from "./components/legal/TermsOfService";
import { Changelog } from "./components/legal/Changelog";
import CloudShaderDemo from "./components/cloud-shader-demo";
import MovingBorderDemo from "./components/moving-border-demo";

function getInitialRoute(): "home" | "privacy" | "terms" | "changelog" | "cloud-demo" | "border-demo" {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  if (path.includes("privacy") || hash.includes("privacy")) return "privacy";
  if (path.includes("terms") || hash.includes("terms")) return "terms";
  if (path.includes("changelog") || hash.includes("changelog")) return "changelog";
  if (path.includes("cloud") || hash.includes("cloud")) return "cloud-demo";
  if (path.includes("border") || hash.includes("border")) return "border-demo";
  return "home";
}

export default function App() {
  const [route, setRoute] = useState<"home" | "privacy" | "terms" | "changelog" | "cloud-demo" | "border-demo">(getInitialRoute);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);

  useEffect(() => {
    // Pure Light Mode Enforced
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes("privacy") || hash.includes("privacy")) {
        setRoute("privacy");
        window.scrollTo(0, 0);
      } else if (path.includes("terms") || hash.includes("terms")) {
        setRoute("terms");
        window.scrollTo(0, 0);
      } else if (path.includes("changelog") || hash.includes("changelog")) {
        setRoute("changelog");
        window.scrollTo(0, 0);
      } else if (path.includes("cloud") || hash.includes("cloud")) {
        setRoute("cloud-demo");
        window.scrollTo(0, 0);
      } else if (path.includes("border") || hash.includes("border")) {
        setRoute("border-demo");
        window.scrollTo(0, 0);
      } else {
        setRoute("home");
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    if (path === "/" || path === "") {
      const cleanPath = window.location.pathname.replace(/\/privacy\/?|\/terms\/?|\/changelog\/?|\/cloud.*|\/border.*/i, "");
      window.history.pushState(null, "", cleanPath || window.location.pathname);
      if (window.location.hash) {
        window.history.replaceState(null, "", cleanPath || window.location.pathname);
      }
      setRoute("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = path.startsWith("#") ? path : path;
    window.history.pushState(null, "", target);
    if (target.includes("privacy")) {
      setRoute("privacy");
      window.scrollTo(0, 0);
    } else if (target.includes("terms")) {
      setRoute("terms");
      window.scrollTo(0, 0);
    } else if (target.includes("changelog")) {
      setRoute("changelog");
      window.scrollTo(0, 0);
    } else if (target.includes("cloud")) {
      setRoute("cloud-demo");
      window.scrollTo(0, 0);
    } else if (target.includes("border")) {
      setRoute("border-demo");
      window.scrollTo(0, 0);
    } else {
      setRoute("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Dedicated Clean Legal Views (Clean URLs: /privacy, /terms, /changelog)
  if (route === "privacy") {
    return <PrivacyPolicy onBackToHome={() => navigateTo("/")} />;
  }

  if (route === "terms") {
    return <TermsOfService onBackToHome={() => navigateTo("/")} />;
  }

  if (route === "changelog") {
    return <Changelog onBackToHome={() => navigateTo("/")} />;
  }

  // Standalone Aceternity UI Cloud Shader Demo
  if (route === "cloud-demo") {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl mb-4 flex justify-between items-center">
          <button
            onClick={() => navigateTo("/")}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-semibold transition-colors cursor-pointer"
          >
            ← Back to Landing Page
          </button>
          <span className="text-xs text-neutral-400">Aceternity UI Cloud Shader Demo</span>
        </div>
        <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <CloudShaderDemo />
        </div>
      </div>
    );
  }

  // Standalone Aceternity UI Moving Border Demo
  if (route === "border-demo") {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 gap-6">
        <div className="w-full max-w-xl flex justify-between items-center">
          <button
            onClick={() => navigateTo("/")}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-semibold transition-colors cursor-pointer"
          >
            ← Back to Landing Page
          </button>
          <span className="text-xs text-neutral-400">Aceternity UI Moving Border Demo</span>
        </div>
        <div className="p-12 border border-white/10 rounded-2xl bg-slate-900/70 flex flex-col items-center justify-center shadow-2xl">
          <MovingBorderDemo />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      <Header onOpenWaitlist={() => setIsWaitlistOpen(true)} />

      <main>
        {/* Hero Section with Cloud Shader */}
        <Hero
          onOpenWaitlist={() => setIsWaitlistOpen(true)}
          onOpenQr={() => setIsQrOpen(true)}
        />

        {/* Aceternity UI Tabs Showcase Section with Phone Mockup */}
        <section className="py-12 md:py-20 px-4" id="showcase">
          <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mt-2 font-display">
              Five Disciplines. One Connected Mind.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
              From high-yield 60-second video lessons and AI-assisted concept checks to classical literature and daily brain workouts — everything works together to make knowledge stick.
            </p>
          </div>

          <TabsShowcase />
        </section>

        {/* Feature Carousel from Learn Carousel */}
        <section className="py-12 md:py-16 px-0 sm:px-4 bg-neutral-50/50 border-y border-black/[0.04] overflow-hidden" id="features">
          <div className="text-center mb-6 md:mb-8 max-w-xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 font-display">
              Built for Real Retention
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
              Calm, deliberate tools engineered for compounding knowledge without dopamine loops.
            </p>
          </div>

          <LearnCarousel />
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Download Call to Action */}
        <DownloadCTA onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Modals */}
      <Modals
        isWaitlistOpen={isWaitlistOpen}
        onCloseWaitlist={() => setIsWaitlistOpen(false)}
        isQrOpen={isQrOpen}
        onCloseQr={() => setIsQrOpen(false)}
      />
    </div>
  );
}
