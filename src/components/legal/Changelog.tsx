import React from "react";
import { LegalLayout } from "./LegalLayout";

interface ChangelogProps {
  onBackToHome: () => void;
}

const changelogSections = [
  { id: "v2-1-0", title: "v2.1.0 · Dual Volume & Sharing" },
  { id: "v2-0-9", title: "v2.0.9 · Tactile FX & Haptics" },
  { id: "v2-0-8", title: "v2.0.8 · Auth Redesign" },
  { id: "v2-0-7", title: "v2.0.7 · Code Breaker Launch Hub" },
  { id: "v2-0-6", title: "v2.0.6 · Comments & Music Engine" },
  { id: "v2-0-5", title: "v2.0.5 · Showcase & Security" },
  { id: "v2-0-4", title: "v2.0.4 · Production R8 Release" },
  { id: "v1-0-0", title: "v1.0.0 · Initial Launch" },
];

export function Changelog({ onBackToHome }: ChangelogProps) {
  return (
    <LegalLayout
      title="Changelog & Release Notes"
      subtitle="Complete, transparent history of new features, performance improvements, bug fixes, and security updates across every TidBit release."
      effectiveDate="Current Version: v2.1.0 (Build 6) · Updated: 1st November, 2026"
      sections={changelogSections}
      onBackToHome={onBackToHome}
    >
      {/* ========================================================= */}
      {/* v2.1.0 */}
      {/* ========================================================= */}
      <section id="v2-1-0" className="scroll-mt-24 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
              v2.1.0
            </h2>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70">
              Latest Release
            </span>
          </div>
          <span className="text-xs text-neutral-500 font-medium">
            1st November, 2026
          </span>
        </div>

        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Dual vertical volume sliders in Create Post, direct system share sheet targets for Post &amp; AI, universal HTTPS deep link auto-routing, modernized subscription screen, and background audio suppression.
        </p>

        <div className="space-y-3 pt-1">
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Added
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Dual Vertical Volume Sliders:</strong> In Create Post, users can now adjust the video audio volume and a separate background music volume slider (displayed only when music is attached) with tap and vertical drag gestures.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Audio Strip Optimization:</strong> When the video volume slider is pulled to 0%, the audio track is completely stripped during upload/transcoding, reducing video upload size.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Direct System Share Targets:</strong> Split external app sharing into two distinct Android share sheet options: <em>TidBit Post</em> (Plus icon) and <em>TidBit AI</em> (Bud AI mascot icon), directly opening the target screen without intermediate popups.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Universal Deep Linking:</strong> Shared posts and reels now use clean HTTPS links that auto-redirect directly into the TidBit Android app via custom scheme routing, with instant APK download fallback for non-app users.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Modern Subscription Experience:</strong> Overhauled membership screen with glassmorphic cards, luminous active border gradients, "SAVE 75%" badges, and tactile 7-day free trial CTA.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Security &amp; Demographic Storage:</strong> Supabase schema additions for Date of Birth (<code className="text-xs bg-neutral-100 px-1 py-0.5 rounded">dob</code>) and gender with strict Row Level Security (RLS) policies and rate limiting.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Improved
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Tactile Ripples Everywhere:</strong> Added Material 3 tactile touch ripples across all settings buttons, subpages, top-left back buttons, top-right action controls, notification toggles, and chat action buttons.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Streak Card Cleanup:</strong> Replaced the heavy orange ripple on SubjectStreakCard with a clean, subtle neutral sheen.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Fixed
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Background Audio Bug:</strong> Fixed video and music continuing to play when switching tabs, navigating away, or minimizing the app via lifecycle observers and player pool cleanup.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Reels Scrubber Alignment:</strong> Playback slider padding strictly preserved at 8.dp above the device navigation bar so captions never clip the scrubber.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-neutral-200/80 my-8" />

      {/* ========================================================= */}
      {/* v2.0.9 */}
      {/* ========================================================= */}
      <section id="v2-0-9" className="scroll-mt-24 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
            v2.0.9
          </h2>
          <span className="text-xs text-neutral-500 font-medium">
            31st October, 2026
          </span>
        </div>

        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Enhanced authentication flow, interactive EduHaptics, living heart animations, and baseline profile optimizations.
        </p>

        <div className="space-y-3 pt-1">
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Added
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Living Heart Burst Animation:</strong> Dynamic heart animation and color reactions when liking reels and posts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Directional Transitions:</strong> Smooth left-to-right slide navigation between login, registration, and confirmation drawers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Date of Birth Selector:</strong> Visual age verification wheel picker built directly into user onboarding.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Tactile EduHaptics:</strong> Micro-haptic vibration feedback on cognitive game buttons and interactive gestures.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Improved
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Multi-Device Security:</strong> Added device fingerprinting dictionary to detect and challenge unauthorized logins.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Code Breaker Engine:</strong> Increased stability and expanded dictionary word coverage for spelling challenges.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>R8 Optimization:</strong> Compiled release with baseline profiles, lowering RAM footprint by 14%.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Fixed
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Comment Sheet Overlap:</strong> Fixed soft keyboard pushing the comment input off-screen on certain device heights.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-neutral-200/80 my-8" />

      {/* ========================================================= */}
      {/* v2.0.8 */}
      {/* ========================================================= */}
      <section id="v2-0-8" className="scroll-mt-24 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
            v2.0.8
          </h2>
          <span className="text-xs text-neutral-500 font-medium">
            30th October, 2026
          </span>
        </div>

        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Complete rebuild of the authentication and sign-up flow to match the Quiet Liquid Glass design specification.
        </p>

        <div className="space-y-3 pt-1">
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Added
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Glassmorphic Auth Screens:</strong> Clean editorial sign-in and registration layout with neutral typography and generous touch targets.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Password Strength Validator:</strong> Instant real-time entropy indicators and feedback while entering passwords.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Fixed
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Startup Icon Crash:</strong> Resolved fatal ClassCastException on Android 14+ when resolving adaptive launcher icon in AuthScreen.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Username Word Lists NullPointer:</strong> Moved randomized username generation dictionaries to a companion object to eliminate cold startup delays.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-neutral-200/80 my-8" />

      {/* ========================================================= */}
      {/* v2.0.7 */}
      {/* ========================================================= */}
      <section id="v2-0-7" className="scroll-mt-24 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
            v2.0.7
          </h2>
          <span className="text-xs text-neutral-500 font-medium">
            30th October, 2026
          </span>
        </div>

        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Cognitive training launch hub, multi-tier difficulty progression for Code Breaker, and decluttered game navigation.
        </p>

        <div className="space-y-3 pt-1">
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Added
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Code Breaker Launch Hub:</strong> Game launcher with dedicated tabs for Classic, Daily Challenge, and Timed mode.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>4 Difficulty Tiers:</strong> Added Easy (3-digit), Medium (4-digit), Hard (5-digit), and Expert (6-digit) logic modes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>In-Game Menu &amp; Hints:</strong> Added 3-dot action menu with Reveal &amp; Eliminate hint options, player stats, and "How to Play" tutorial drawer.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Pre-Verified SHA-256 Checksum:</strong> Displayed verified cryptographic checksums on the release showcase site.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Improved
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Acoustic Feedback:</strong> Subtly lowered button sound decibels for quiet reading sessions.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Removed
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Legacy CS Card:</strong> Replaced the placeholder Computer Science card with the native Code Breaker workout.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-neutral-200/80 my-8" />

      {/* ========================================================= */}
      {/* v2.0.6 */}
      {/* ========================================================= */}
      <section id="v2-0-6" className="scroll-mt-24 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
            v2.0.6
          </h2>
          <span className="text-xs text-neutral-500 font-medium">
            30th October, 2026
          </span>
        </div>

        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Cognitive workout integration, full-screen comments sheet, and video editor responsiveness updates.
        </p>

        <div className="space-y-3 pt-1">
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Added
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Code Breaker Logic Game:</strong> Built-in number deciphering logic training inside the Cognitive Hub.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Full-Screen Comment Sheet:</strong> Interactive bottom sheet for exploring comments without pausing the educational video.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Improved
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Music Discovery:</strong> Smarter genre and mood tagging for educational video audio tracks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Video Trimmer:</strong> Smoother scrubber response when adjusting start and end timestamps in Create Post.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Fixed
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Landing Page Blur:</strong> Fixed backdrop blur inconsistency in QR code preview modal on mobile browsers.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-neutral-200/80 my-8" />

      {/* ========================================================= */}
      {/* v2.0.5 */}
      {/* ========================================================= */}
      <section id="v2-0-5" className="scroll-mt-24 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
            v2.0.5
          </h2>
          <span className="text-xs text-neutral-500 font-medium">
            29th October, 2026
          </span>
        </div>

        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Showcase landing page launch, backend key embedding, and reel playback polish.
        </p>

        <div className="space-y-3 pt-1">
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Added
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Live Showcase Site:</strong> GitHub Pages deployment providing an interactive simulator of the TidBit application.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Direct APK Triggers:</strong> Added seamless download links from the official releases repository.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Fixed
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Duplicate Captions:</strong> Fixed occasional double text overlay on video reels during rapid vertical swipes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Carousel Heart Colors:</strong> Corrected living heart color state when browsing multi-image carousel posts.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-neutral-200/80 my-8" />

      {/* ========================================================= */}
      {/* v2.0.4 */}
      {/* ========================================================= */}
      <section id="v2-0-4" className="scroll-mt-24 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
            v2.0.4
          </h2>
          <span className="text-xs text-neutral-500 font-medium">
            29th October, 2026
          </span>
        </div>

        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Official production release of TidBit optimized with whole-program R8 compilation.
        </p>

        <div className="space-y-3 pt-1">
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Added
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Production Signing:</strong> Release APKs cryptographically signed with dedicated keystores.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Public Release Pipeline:</strong> GitHub Releases repository integration with automated release assets.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Improved
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>R8 Optimization:</strong> ProGuard dead-code elimination and obfuscation producing a compact ~10 MB APK.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Local Encryption:</strong> Device-local Keystore-backed encryption for user notes and reading bookmarks.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-neutral-200/80 my-8" />

      {/* ========================================================= */}
      {/* v1.0.0 */}
      {/* ========================================================= */}
      <section id="v1-0-0" className="scroll-mt-24 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
            v1.0.0
          </h2>
          <span className="text-xs text-neutral-500 font-medium">
            October 2026
          </span>
        </div>

        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Initial release and foundational launch of TidBit — the antidote to algorithmic brainrot.
        </p>

        <div className="space-y-3 pt-1">
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Added
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Distraction-Free Video Feed:</strong> Vetted 60-second micro-lessons across Science, Philosophy, Coding, Literature, and History.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Bud AI Intelligent Tutor:</strong> Context-aware active recall checks, instant concept breakdowns, and 3D flip flashcards.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>BookNest Digital Library:</strong> Classical literature e-reader with offline neural voice narration and typography controls.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Cognitive Workouts Hub:</strong> Micro-drills including Vocabulary Spelling Bee, Word Match, and Mental Math sprints.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Yaad Sticky Notes Canvas:</strong> Real-time thought capture, voice memos, and highlighted passage storage.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                <span><strong>Zero-Ad Privacy Architecture:</strong> Zero third-party ad networks, zero data brokers, and zero behavioral tracking.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </LegalLayout>
  );
}
