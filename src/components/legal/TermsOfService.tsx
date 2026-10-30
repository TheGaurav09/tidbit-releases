import React from "react";
import { LegalLayout } from "./LegalLayout";

interface TermsOfServiceProps {
  onBackToHome: () => void;
}

const termsSections = [
  { id: "intro", title: "1. Introduction" },
  { id: "services", title: "2. Services Provided" },
  { id: "eligibility", title: "3. Eligibility & Account Security" },
  { id: "bud-disclaimer", title: "4. Bud AI Tutor Disclaimer" },
  { id: "ugc", title: "5. User-Generated Content & Licensing" },
  { id: "booknest-dmca", title: "6. Digital Library & DMCA Policy" },
  { id: "ip", title: "7. Intellectual Property" },
  { id: "restrictions", title: "8. Restrictions on Use" },
  { id: "aup", title: "9. Acceptable Use Policy (AUP)" },
  { id: "warranties", title: "10. Disclaimer of Warranties" },
  { id: "liability", title: "11. Limitation of Liability" },
  { id: "termination", title: "12. Termination & Account Deletion" },
  { id: "disputes", title: "13. Dispute Resolution & Governing Law" },
  { id: "contact", title: "14. Contact Information" },
];

export function TermsOfService({ onBackToHome }: TermsOfServiceProps) {
  return (
    <LegalLayout
      title="Terms & Conditions"
      subtitle="The terms governing access to and use of TidBit applications, services, and educational tools."
      effectiveDate="Effective Date: 29th October, 2026"
      sections={termsSections}
      onBackToHome={onBackToHome}
    >
      {/* 1. Introduction */}
      <section id="intro" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          1. Introduction
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Welcome to TidBit ("the Platform", "we", "our", or "us"). By downloading, installing, accessing, or using the TidBit Android application, website, API, or related services (collectively, the "Services"), you ("User", "you") agree to be bound by these Terms & Conditions ("Terms") and our Privacy Policy.
        </p>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          If you do not agree to these Terms, you must not access or use TidBit and must immediately uninstall any client software from your devices.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 2. Services Provided */}
      <section id="services" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          2. Services Provided
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          TidBit is an educational micro-learning ecosystem. The Platform provides:
        </p>
        <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-700">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Shorts Feed:</strong> High-yield short-form video lessons categorized by educational disciplines and cognitive difficulty levels.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Bud AI Study Assistant:</strong> An interactive study companion that formulates real-time concept flashcards, quizzes, and explanatory summaries.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>BookNest E-Reader:</strong> Digital library reader supporting distraction-free typography, local storage, and neural audio narration.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Brain Games Hub:</strong> Daily cognitive exercises including spelling challenges, mental arithmetic sprints, and vocabulary building.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span><strong>Yaad Notes:</strong> In-context digital notebook for handwritten doodles, voice memos, and timestamped study cards.</span>
          </li>
        </ul>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 3. Eligibility & Account Security */}
      <section id="eligibility" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          3. Eligibility & Account Security
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          You must be at least 13 years of age (or 16 years of age in the European Economic Area or UK) to use TidBit. If you are under the legal age of majority in your jurisdiction, you represent that you have reviewed these Terms with your parent or legal guardian and obtained their consent.
        </p>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          You are responsible for safeguarding your login credentials and for all activities conducted through your account. You agree to notify us promptly of any unauthorized access or security incident.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 4. Bud AI Tutor Disclaimer */}
      <section id="bud-disclaimer" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          4. Bud AI Tutor Disclaimer
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Bud AI is an automated computational study aid designed to assist conceptual understanding. While engineered for educational rigor, AI-generated explanations, quiz questions, and summaries may occasionally contain inaccuracies.
        </p>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Bud AI does not provide accredited legal, medical, financial, or certified institutional advice. You are encouraged to verify critical academic or factual assertions against authoritative textbooks and course syllabi.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 5. User-Generated Content & Licensing */}
      <section id="ugc" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          5. User-Generated Content & Licensing
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          You retain full ownership of all notes, doodles, and audio memos you create in Yaad Notes. When you submit public content (such as comments or community flashcards), you grant TidBit a non-exclusive, worldwide, royalty-free license to host, display, and distribute that specific content solely within the Services.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 6. Digital Library & DMCA Policy */}
      <section id="booknest-dmca" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          6. Digital Library & DMCA Policy
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          Titles in BookNest consist of public domain literary works, Creative Commons educational materials, and authorized publisher distributions. If you believe any material in our library infringes upon your copyright, submit a DMCA takedown notice to legal@tidbit.app with identification of the copyrighted work and proof of ownership.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 7. Intellectual Property */}
      <section id="ip" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          7. Intellectual Property
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          All materials, brand assets, TidBit logos, app software, UI designs, codebases, audio engines, and brain game formats are the proprietary intellectual property of TidBit. You may not reproduce, reverse engineer, distribute, or create derivative works without express prior written consent.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 8. Restrictions on Use */}
      <section id="restrictions" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          8. Restrictions on Use
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          You agree not to:
        </p>
        <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-700">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span>Use the Services for any illegal or unauthorized purpose in your jurisdiction.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span>Attempt to decompile, reverse-engineer, or tamper with the Android client package or backend APIs.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span>Deploy automated scrapers, crawlers, or bots to harvest content or user information.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
            <span>Interfere with or disrupt the integrity or performance of the Platform's network infrastructure.</span>
          </li>
        </ul>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 9. Acceptable Use Policy */}
      <section id="aup" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          9. Acceptable Use Policy (AUP)
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          TidBit maintains a safe, supportive learning environment. You must not upload or disseminate content that is hateful, abusive, sexually explicit, defamatory, or promotes harm or self-injury. Violations will result in immediate content removal and permanent account termination.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 10. Disclaimer of Warranties */}
      <section id="warranties" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          10. Disclaimer of Warranties
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          The Services are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express, statutory, or implied, including warranties of merchantability, fitness for a particular academic purpose, or non-infringement.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 11. Limitation of Liability */}
      <section id="liability" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          11. Limitation of Liability
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          To the maximum extent permitted by applicable law, in no event shall TidBit, its founders, directors, or partners be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Services.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 12. Termination & Account Deletion */}
      <section id="termination" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          12. Termination & Account Deletion
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          You may terminate your account at any time through the in-app profile settings. We reserve the right to suspend or terminate accounts that breach these Terms, engage in abuse, or threaten platform security.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 13. Dispute Resolution & Governing Law */}
      <section id="disputes" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          13. Dispute Resolution & Governing Law
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          These Terms shall be governed by and construed in accordance with applicable governing law without regard to conflict of law principles. Any dispute arising out of or relating to these Terms shall be resolved through good-faith direct negotiation prior to formal arbitration.
        </p>
      </section>

      <hr className="border-neutral-200/80 my-6" />

      {/* 14. Contact Information */}
      <section id="contact" className="scroll-mt-24 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          14. Contact Information
        </h2>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700">
          For legal inquiries, copyright notices, or questions regarding these Terms, contact our legal counsel:
        </p>
        <p className="text-xs sm:text-[13px] text-neutral-800 font-medium pt-1">
          Email: <span className="underline">legal@tidbit.app</span>
        </p>
      </section>
    </LegalLayout>
  );
}
