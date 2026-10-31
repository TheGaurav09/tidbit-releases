"use client";
import React, { useState, useId } from "react";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 3.5,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const id = useId().replace(/:/g, "");

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative group inline-flex rounded-full p-[1.5px] items-center justify-center cursor-pointer select-none overflow-hidden transition-transform duration-200 active:scale-[0.98]",
        containerClassName
      )}
      {...props}
    >
      {/* SVG-based Continuous Perimeter Path:
          Traces the exact 1D pill boundary so the moving beam curves cleanly 
          around the rounded ends without ever splitting across top and bottom */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full rounded-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`beam-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2457D6" stopOpacity="0" />
            <stop offset="35%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#60A5FA" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
          <filter id={`beam-glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Subtle static background ring */}
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="9999"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
        />

        {/* Moving glowing laser beam along 1D perimeter path */}
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="9999"
          fill="none"
          stroke={`url(#beam-grad-${id})`}
          strokeWidth={hovered ? "2.5" : "2"}
          pathLength="100"
          strokeDasharray="22 78"
          strokeLinecap="round"
          filter={`url(#beam-glow-${id})`}
          className={cn(
            "transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-85",
            clockwise ? "animate-border-beam" : "animate-border-beam-reverse"
          )}
          style={{
            animationDuration: hovered ? `${Math.max(1.8, duration * 0.7)}s` : `${duration}s`,
          }}
        />
      </svg>

      {/* Button Interior */}
      <div
        className={cn(
          "relative z-10 bg-neutral-900 text-white px-5 py-2.5 rounded-full transition-colors flex items-center justify-center font-semibold text-sm",
          className
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
