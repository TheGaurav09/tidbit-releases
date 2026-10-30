import React from "react";

interface TidBitLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showBadge?: boolean;
  light?: boolean;
}

/**
 * TidBit Wordmark Logo
 * Faithfully mirrors UI_IDEAS/tid-bit-logo.html:
 * - Font: "Hanken Grotesk", weight 800 (ExtraBold), letter-spacing -0.035em
 * - Dotless stems (U+0131) with digital square bits (0.20em)
 * - T's crossbar spacing (0.06em)
 * - First square bit: Ink (#101317)
 * - Second square bit: Signature brand blue (#2457D6)
 */
export function TidBitLogo({
  className = "",
  size = "md",
  showBadge = false,
  light = false,
}: TidBitLogoProps) {
  const sizeClasses = {
    sm: "text-[18px]",
    md: "text-[22px]",
    lg: "text-[28px]",
    xl: "text-[42px]",
  };

  const inkColor = light ? "#FFFFFF" : "#101317";
  const brandColor = light ? "#6C96F5" : "#2457D6";

  return (
    <div className={`inline-flex items-center gap-2 select-none whitespace-nowrap ${className}`}>
      <span
        className={`inline-flex items-baseline leading-none ${sizeClasses[size]}`}
        style={{
          fontFamily: '"Hanken Grotesk", "Helvetica Neue", Arial, sans-serif',
          fontWeight: 800,
          letterSpacing: "-0.035em",
          color: inkColor,
        }}
      >
        {/* Letter 'T' with right clearance for the first square bit */}
        <span style={{ marginRight: "0.06em" }}>T</span>

        {/* First 'i': dotless stem + digital ink square bit */}
        <span className="relative inline-block leading-none">
          <span className="leading-none">&#305;</span>
          <span
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              width: "0.20em",
              height: "0.20em",
              backgroundColor: inkColor,
              top: "0.04em",
              left: "50%",
              transform: "translateX(calc(-50% + 0.0175em))",
            }}
          />
        </span>

        <span>d</span>
        <span>B</span>

        {/* Second 'i': dotless stem + digital signature brand blue square bit */}
        <span className="relative inline-block leading-none">
          <span className="leading-none">&#305;</span>
          <span
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              width: "0.20em",
              height: "0.20em",
              backgroundColor: brandColor,
              top: "0.04em",
              left: "50%",
              transform: "translateX(calc(-50% + 0.0175em))",
            }}
          />
        </span>

        <span>t</span>
      </span>
    </div>
  );
}
