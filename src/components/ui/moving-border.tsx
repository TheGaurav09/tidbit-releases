"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}

export function Button({
  borderRadius = "9999px",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 3400,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <Component
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden p-[1.5px] select-none group",
        containerClassName,
      )}
      style={{
        borderRadius,
      }}
      {...otherProps}
    >
      {/* Sleek Perimeter Border Beam - Single continuous shooting beam along the edge */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-[250%] animate-spin",
          borderClassName,
        )}
        style={{
          animationDuration: `${duration}ms`,
          animationTimingFunction: "linear",
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 250deg, #93C5FD 295deg, #3B82F6 335deg, #1D4ED8 355deg, transparent 360deg)",
        }}
      />

      {/* Subtle crisp base border ring */}
      <div
        className="pointer-events-none absolute inset-0 border border-white/[0.14]"
        style={{
          borderRadius,
        }}
      />

      {/* Inner Button Content */}
      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center bg-neutral-900 text-sm text-white antialiased transition-colors",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

// Backward compatibility helper
export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: any) => {
  return children;
};
