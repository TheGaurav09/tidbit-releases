import React from "react";
import { LegalLayout } from "./LegalLayout";

interface PrivacyPolicyProps {
  onBackToHome: () => void;
}

const privacySections = [
  { id: "overview", title: "1. Privacy Commitment & Principles" },
  { id: "data-collection", title: "2. Information We Collect" },
  { id: "data-usage", title: "3. How We Use Information" },
  { id: "ai-privacy", title: "4. Bud AI Tutor & Data Transmission" },
  { id: "local-storage", title: "5. Local Storage & Device Encryption" },
  { id: "third-parties", title: "6. Third-Party Service Providers" },
  { id: "no-tracking", title: "7. Zero Ad Trackers & Data Brokers" },
  { id: "children", title: "8. Children's Privacy (COPPA)" },
  { id: "rights", title: "9. Your Privacy Rights (GDPR & CCPA)" },
  { id: "retention", title: "10. Data Retention & Erasure" },
  { id: "security", title: "11. Security Safeguards" },
  { id: "updates", title: "12. Policy Revisions" },
  { id: "contact", title: "13. Contact Information" },
];

export function PrivacyPolicy({ onBackToHome }: PrivacyPolicyProps) {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How TidBit collects, safeguards, and respects your data across our distraction-free educational ecosystem."
      effectiveDate="Effective Date: 29th October, 2026"
      sections={privacySections}
      onBackToHome={onBackToHome}
    >
      {/* 1. Privacy Commitment */}
      <section id="overview" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          1. Privacy Commitment & Principles
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          At TidBit, we believe education should be focused, private, and free from algorithmic exploitation or data harvesting. Our product is designed from first principles with two unwavering guarantees:
        </p>
        <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-700">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Zero Ad Monetization:</strong> We do not host third-party advertising, ad trackers, or behavioural profiling SDKs. We never sell or license personal data to brokers.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Local-First Architecture:</strong> Your study notes, voice recordings, offline books, and reading bookmarks reside encrypted directly on your local device.</span>
          </li>
        </ul>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 2. Information We Collect */}
      <section id="data-collection" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          2. Information We Collect
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          We collect and securely store data strictly necessary to authenticate your account, safeguard our infrastructure from fraud, and synchronize your educational experience:
        </p>
        <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-700">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Core Identity & Credentials:</strong> Unique randomized user UUID, email address, display name, username, profile biography, date of birth, and salted password hashes (Argon2/bcrypt) managed via Supabase Auth. Plaintext passwords are never received or stored.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Device & Technical Telemetry:</strong> Device model, hardware manufacturer, brand, Android OS version, SDK level, system language, time zone, IP address, app build version, and an anonymous device installation fingerprint. When you sign in from a new device, device specifications are preserved in a multi-device dictionary to detect unauthorized logins and account takeover attempts.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Account Change History:</strong> Historical records of all previous display names, usernames, and profile avatar image URLs associated with your account, maintained for identity verification and community safety.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Behavioral Lifetime Metrics:</strong> Internal cumulative activity tallies including total posts created, posts deleted, bookmarks added, bookmarks removed, comments posted/deleted, likes, shares, and session login counts. This data is utilized solely for internal service optimization, feed reliability, and platform analytics; it is never sold or displayed publicly.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Security Logs & Consents:</strong> Timestamped records of authentication events, IP addresses, session verifications, push notification tokens, and legal consent agreements (Terms of Service, Privacy Policy version approvals).</span>
          </li>
        </ul>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 3. How We Use Information */}
      <section id="data-usage" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          3. How We Use Information
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          All collected data is processed strictly for the following purposes:
        </p>
        <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-700">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span>Authenticating account sessions and preventing unauthorized access or credential stuffing.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span>Delivering low-latency video streaming and progressive lesson caching.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span>Synthesizing AI interactive flashcards and concept summaries in response to explicit learner requests.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span>Dispatching transactional notifications, account security alerts, or waitlist confirmations.</span>
          </li>
        </ul>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 4. Bud AI Tutor & Data Transmission */}
      <section id="ai-privacy" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          4. Bud AI Tutor & Data Transmission
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          When you submit questions or voice prompts to the Bud AI Assistant:
        </p>
        <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-700">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Encrypted In-Transit:</strong> Prompts are transmitted over TLS 1.3 to dedicated inference endpoints.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Zero Model Training:</strong> Your private questions and personal notes are never used to train public foundation models.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Ephemeral Context:</strong> Inference sessions are stateless and context tokens are purged once the response is delivered to your client.</span>
          </li>
        </ul>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 5. Local Storage & Device Encryption */}
      <section id="local-storage" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          5. Local Storage & Device Encryption
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          TidBit uses Android Keystore and EncryptedSharedPreferences for all sensitive local data. Offline books, audio files, and Yaad notes are stored exclusively in app-private sandboxed directories and cannot be accessed by other applications on your device.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 6. Third-Party Service Providers */}
      <section id="third-parties" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          6. Third-Party Service Providers
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          We engage reputable infrastructure partners strictly under binding Data Processing Agreements (DPAs):
        </p>
        <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-700">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Cloud Infrastructure:</strong> Managed serverless compute and encrypted PostgreSQL databases for core synchronization.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Transactional Communications:</strong> Brevo (Sendinblue) for sending double opt-in confirmations and security notices.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Content Delivery:</strong> Global CDN edge caches for accelerated educational video delivery.</span>
          </li>
        </ul>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 7. Zero Ad Trackers */}
      <section id="no-tracking" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          7. Zero Ad Trackers & Data Brokers
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          TidBit contains no Google Ads, Meta Pixel, tracking beacons, cross-site cookies, or monetization telemetry. We do not participate in real-time bidding (RTB) auctions or cross-device fingerprinting.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 8. Children's Privacy (COPPA) */}
      <section id="children" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          8. Children's Privacy (COPPA Compliance)
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          TidBit is an educational platform. We do not knowingly collect personal information from children under the age of 13 without verifiable parental or institutional consent. If you believe a child has provided us with personal data without proper consent, contact us immediately and we will promptly purge the data.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 9. Privacy Rights (GDPR & CCPA & India DPDP) */}
      <section id="rights" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          9. Your Privacy Rights (GDPR, CCPA & India DPDP)
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Regardless of your jurisdiction, TidBit provides complete user data sovereignty and self-service compliance tools directly within your mobile application:
        </p>
        <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-700">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Right to Access & Data Portability:</strong> You can export a comprehensive machine-readable JSON archive of your personal profile, posts, comments, bookmarks, device history, privacy preferences, and legal consents directly via Settings &rarr; Export My Data.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Right to Rectification:</strong> You can modify your display name, username, bio, avatar, and date of birth at any time in Edit Profile.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Right to Erasure ("To Be Forgotten"):</strong> You can request immediate account deletion from the app. An automated confirmation and compliance alert is dispatched, entering your account into a 30-day grace period. If not cancelled, your identity, media, and records are irrevocably purged.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Right to Restrict Processing & Consent Management:</strong> You can adjust social visibility (Public, Followers Only, Private), toggle push notifications, and withdraw optional diagnostics consent at any time.</span>
          </li>
        </ul>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 10. Data Retention & Erasure */}
      <section id="retention" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          10. Data Retention Schedules & Scheduled Cleanups
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          We adhere to strict data minimization principles and operate automated server-side cleanup routines:
        </p>
        <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-700">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Security Logs:</strong> Authentication logs, IP history, and device access telemetry are retained for <strong>90 days</strong> for fraud detection, after which they are automatically purged.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Engagement & Interaction Telemetry:</strong> Video completion telemetry and feed engagement events are retained for <strong>180 days</strong> to train recommendation algorithms and are then permanently deleted.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Account Deletion Grace Period:</strong> When you request account deletion, the account is marked pending deletion for a <strong>30-day grace period</strong>. Logging back in during this period restores the account; once 30 days lapse, all account data is permanently and irrevocably wiped.</span>
          </li>
        </ul>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 11. Security Safeguards */}
      <section id="security" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          11. Security Safeguards & Isolation Standards
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          We implement defense-in-depth security standards to protect user records:
        </p>
        <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-700">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Database Row-Level Security (RLS):</strong> Our database layer strictly enforces PostgreSQL Row Level Security. All anonymous access to user info is revoked. Authenticated users can only read or update their own personal record. Under no circumstance can another user query or access your device specifications or IP address.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Cryptographic Safeguards:</strong> High-entropy salted password hashing (Argon2/bcrypt), AES-256 disk encryption at rest, TLS 1.3 transport encryption, and Android Keystore backed storage on client devices.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Tamper-Proof Tracking:</strong> Behavioral metric counters (e.g., posts created/deleted, bookmarks added/deleted) are governed entirely by atomic server-side database triggers that cannot be forged by client code.</span>
          </li>
        </ul>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 12. Policy Revisions */}
      <section id="updates" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          12. Policy Revisions
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          We may update this Privacy Policy from time to time to reflect product enhancements or regulatory developments. When material changes are made, we will notify you through an in-app notice or via registered email prior to the effective date.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 13. Contact Information */}
      <section id="contact" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          13. Contact Information
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          For privacy inquiries, data subject access requests (DSAR), or questions regarding our information practices, contact our Data Protection Officer:
        </p>
        <p className="text-xs sm:text-[13px] text-neutral-800 font-medium pt-1">
          Email: <a href="mailto:connect.tidbit@gmail.com" className="underline hover:text-black">connect.tidbit@gmail.com</a>
        </p>
      </section>
    </LegalLayout>
  );
}
