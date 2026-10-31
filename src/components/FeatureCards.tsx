import React, { useState, useRef, useEffect } from "react";

interface FeatureCard {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const cards: FeatureCard[] = [
  {
    title: "Distraction-Free Reels",
    description:
      "Bite-sized educational video reels vetted for high cognitive yield. Zero sensationalist clickbait, zero infinite dopamine loops.",
    image: "/images/reels.jpg",
    alt: "Distraction-Free Educational Reels",
  },
  {
    title: "Contextual AI Tutor",
    description:
      "Bud analyzes the current lesson in real time to generate interactive concept checks, flashcards, and step-by-step breakdowns on demand.",
    image: "/images/bud-ai.jpg",
    alt: "Bud AI Study Tutor Mascot",
  },
  {
    title: "BookNest & Audiobooks",
    description:
      "A full digital library with customizable reader typography, offline highlights, and lifelike neural voice narration for every book.",
    image: "/images/booknest.jpg",
    alt: "BookNest Digital Reader and Neural Audiobooks",
  },
  {
    title: "Daily Cognitive Workouts",
    description:
      "Build daily mental agility with micro-games including Spelling Bee, Mental Math sprints, and spatial memory challenges.",
    image: "/images/games.jpg",
    alt: "Daily Cognitive Training Micro-Games",
  },
  {
    title: "Yaad Sticky Canvas",
    description:
      "Capture thoughts, voice memos, and highlights instantly while watching reels or reading, organized on a clean visual board.",
    image: "/images/notes.jpg",
    alt: "Yaad Digital Sticky Notes",
  },
  {
    title: "Home Screen Widgets",
    description:
      "Keep your streak alive and absorb daily educational nuggets right from your Android home screen without even opening the app.",
    image: "/images/widgets.jpg",
    alt: "Android Daily Lesson Widgets",
  },
];

export function FeatureCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, offsetWidth } = carouselRef.current;
      const index = Math.round(scrollLeft / (offsetWidth * 0.8));
      setActiveIndex(Math.min(Math.max(index, 0), cards.length - 1));
    }
  };

  const scrollToIndex = (idx: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth * 0.82;
      carouselRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: "smooth",
      });
      setActiveIndex(idx);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* DESKTOP VIEW: High-Craft 3-Column Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="rounded-3xl p-5 sm:p-6 bg-white border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-black/[0.14] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] flex flex-col justify-between transition-all duration-200"
          >
            {/* 16:10 Image Container */}
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 border border-black/[0.06] mb-5">
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div>
              <h4 className="text-xl font-bold tracking-tight text-neutral-900 font-display">
                {card.title}
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed mt-2">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE VIEW: Smooth Swipeable Horizontal Carousel with Pagination Indicator */}
      <div className="md:hidden flex flex-col items-center">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="w-full flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 no-scrollbar scroll-smooth"
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="shrink-0 w-[84vw] max-w-[320px] snap-center rounded-3xl p-5 bg-white border border-black/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col justify-between"
            >
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 border border-black/[0.06] mb-4">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              <div>
                <h4 className="text-lg font-bold tracking-tight text-neutral-900 font-display">
                  {card.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-1.5">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-1.5 mt-4">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "w-6 bg-blue-600"
                  : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
