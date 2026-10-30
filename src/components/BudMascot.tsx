import React, { useEffect, useRef, useState } from "react";

export type BudMood = "Classic" | "Happy" | "Curious" | "Wink" | "Surprised";

export function BudMascot({
  size = 56,
  mood = "Classic",
  animated = true,
  className = "",
}: {
  size?: number;
  mood?: BudMood;
  animated?: boolean;
  className?: string;
}) {
  const [currentMood, setCurrentMood] = useState<BudMood>(mood);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<SVGEllipseElement>(null);
  const rightPupilRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  // High-performance DOM-based eye tracking: ZERO React re-renders on mousemove!
  useEffect(() => {
    if (!animated) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      targetX = Math.max(-5, Math.min(5, deltaX * 5));
      targetY = Math.max(-5, Math.min(5, deltaY * 5));
    };

    const updateLoop = () => {
      // Lerp for butter-smooth 120fps motion
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (leftPupilRef.current) {
        leftPupilRef.current.setAttribute("cx", currentX.toFixed(2));
        leftPupilRef.current.setAttribute("cy", currentY.toFixed(2));
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.setAttribute("cx", currentX.toFixed(2));
        rightPupilRef.current.setAttribute("cy", currentY.toFixed(2));
      }

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [animated]);

  // Dynamic eye parameters based on mood
  const isHappy = currentMood === "Happy";
  const isWink = currentMood === "Wink";
  const isSurprised = currentMood === "Surprised";
  const isCurious = currentMood === "Curious";

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id={`budShadow-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2457D6" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#15171B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`budBackCover-${size}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E2880" />
            <stop offset="50%" stopColor="#4E42D4" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>

          <linearGradient id={`budPageStack-${size}`} x1="10%" y1="100%" x2="90%" y2="0%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="70%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          <linearGradient id={`budRibbon-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="40%" stopColor="#C084FC" />
            <stop offset="80%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          <linearGradient id={`budClayBody-${size}`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#4E42D4" />
            <stop offset="45%" stopColor="#3B32A8" />
            <stop offset="85%" stopColor="#221C6E" />
            <stop offset="100%" stopColor="#18134F" />
          </linearGradient>

          <linearGradient id={`budSpecular-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Contact Shadow */}
        <ellipse cx="260" cy="405" rx="90" ry="20" fill={`url(#budShadow-${size})`} />

        <g className="bud-floater">
          {/* Back Cover */}
          <path
            d="M152 190 C152 155 170 141 201 131 L276 109 C295 103 307 112 309 132 L297 150 L179 188 Z"
            fill={`url(#budBackCover-${size})`}
          />

          {/* Page Stack */}
          <path
            d="M185 172 C181 162 192 151 210 145 L289 121 C308 115 329 125 333 144 L322 159 L211 188 Z"
            fill={`url(#budPageStack-${size})`}
          />

          {/* Ribbon */}
          <path
            d="M243 352 L246 399 C246.5 407 250.5 408 255 402 L262.5 392.5 L266.8 392.5 L274 399 C278.5 403 281.5 400 281 392 L276 348 Z"
            fill={`url(#budRibbon-${size})`}
          />

          {/* Main Clay Body */}
          <path
            d="M152 188 C152 156 172 148 195 158 C204 162 211 172 220 174 C231 176 300 151 322 145 C342 139 355 154 356 181 C358 221 356 272 349 312 C345 337 330 347 306 354 C279 362 248 369 226 371 C210 373 201 367 195 358 C185 359 171 354 162 340 C153 327 150 299 150 258 Z"
            fill={`url(#budClayBody-${size})`}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
          />

          {/* Specular Highlight */}
          <path
            d="M165 175 C185 152 230 156 315 146 C335 143 346 150 350 168"
            fill="none"
            stroke={`url(#budSpecular-${size})`}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Eyes Group */}
          <g transform={`translate(${isCurious ? "0, 5" : "0, 0"})`}>
            {/* Left Eye */}
            <g transform="translate(208, 240)">
              <ellipse
                cx="0"
                cy="0"
                rx={isSurprised ? 17 : 14}
                ry={isHappy ? 9 : isSurprised ? 24 : 20}
                fill="#FFFFFF"
              />
              <ellipse
                ref={leftPupilRef}
                cx="0"
                cy="0"
                rx={isHappy ? 7 : 7.5}
                ry={isHappy ? 4 : 11}
                fill="#111827"
              />
              <circle cx="-3" cy="-4" r="3" fill="#FFFFFF" />
            </g>

            {/* Right Eye */}
            <g transform="translate(282, 226)">
              <ellipse
                cx="0"
                cy="0"
                rx={isSurprised ? 17 : 14}
                ry={isWink ? 2.5 : isHappy ? 9 : isSurprised ? 24 : 20}
                fill="#FFFFFF"
              />
              <ellipse
                ref={rightPupilRef}
                cx="0"
                cy="0"
                rx={isWink ? 0 : isHappy ? 7 : 7.5}
                ry={isWink ? 0 : isHappy ? 4 : 11}
                fill="#111827"
              />
              {!isWink && <circle cx="-3" cy="-4" r="3" fill="#FFFFFF" />}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
