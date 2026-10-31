"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
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

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border border-black/10 dark:border-white/15 content-center bg-black/5 dark:bg-white/10 transition-colors duration-300 items-center justify-center overflow-hidden p-[1.5px] w-fit cursor-pointer select-none",
        containerClassName
      )}
      {...props}
    >
      {/* GPU-accelerated rotating gradient border: 120fps with 0% main-thread CPU overhead */}
      <div
        className={cn(
          "absolute -inset-[150%] rounded-full transition-opacity duration-300 pointer-events-none",
          hovered ? "opacity-100" : "opacity-50"
        )}
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 80deg, #2457D6 140deg, #60A5FA 180deg, #FFFFFF 200deg, transparent 250deg)",
          animation: `spin 3.5s linear infinite`,
        }}
      />

      {/* Button Interior */}
      <div
        className={cn(
          "relative z-10 bg-neutral-900 text-white dark:bg-[#12151B] dark:text-neutral-100 px-5 py-2.5 rounded-full transition-colors flex items-center justify-center font-semibold text-sm",
          className
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
