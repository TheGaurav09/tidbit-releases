import React, { useState } from "react";
import { joinBrevoWaitlist } from "../lib/brevo";
import { APP_CONFIG } from "../lib/config";

export function Modals({
  isWaitlistOpen,
  onCloseWaitlist,
  isQrOpen,
  onCloseQr,
}: {
  isWaitlistOpen: boolean;
  onCloseWaitlist: () => void;
  isQrOpen: boolean;
  onCloseQr: () => void;
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isQrLoaded, setIsQrLoaded] = useState(false);

  React.useEffect(() => {
    if (isQrOpen) {
      setIsQrLoaded(false);
    }
  }, [isQrOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setResultMessage(null);

    const res = await joinBrevoWaitlist(email);
    setIsLoading(false);
    setIsSuccess(res.success);
    setResultMessage(res.message);
  };

  const handleClose = () => {
    setEmail("");
    setResultMessage(null);
    setIsSuccess(false);
    onCloseWaitlist();
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    APP_CONFIG.apkDownloadUrl
  )}&margin=10`;

  return (
    <>
      {/* Waitlist Modal */}
      {isWaitlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-white border border-black/10 shadow-2xl relative">
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-neutral-900 mb-1.5 font-display">
              Join the Play Store Waitlist
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
              Be the first to access TidBit on the Google Play Store. We onboard in small cohorts to ensure server performance and quiet focus.
            </p>

            {resultMessage ? (
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm font-medium ${
                  isSuccess
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {resultMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="learner@university.edu"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm text-neutral-900 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? "Securing Your Spot..." : "Join Early Access Wave"}
                </button>
              </form>
            )}

            <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Zero Spam · Double Opt-In</span>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {isQrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl p-6 sm:p-8 bg-white border border-black/10 shadow-2xl relative flex flex-col items-center text-center">
            <button
              onClick={onCloseQr}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black cursor-pointer transition-colors"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-neutral-900 mb-1 font-display">
              Scan to Download APK
            </h3>
            <p className="text-xs text-neutral-500 mb-5">
              Point your phone camera to download the verified release directly from GitHub.
            </p>

            {/* Functional Live QR Code with smooth blur loading animation */}
            <div className="relative w-52 h-52 rounded-2xl bg-neutral-50 border border-neutral-200/80 p-2 flex items-center justify-center shadow-xs overflow-hidden">
              {/* Shimmer skeleton while loading */}
              {!isQrLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-tr from-neutral-100 via-neutral-50 to-neutral-200 animate-pulse">
                  <div className="w-10 h-10 rounded-full border-2 border-neutral-300 border-t-blue-600 animate-spin mb-2" />
                </div>
              )}
              <img
                src={qrImageUrl}
                alt="Scan to download TidBit APK"
                onLoad={() => setIsQrLoaded(true)}
                className={`w-full h-full object-contain rounded-xl transition-all duration-700 ease-out transform ${
                  isQrLoaded
                    ? "blur-0 scale-100 opacity-100"
                    : "blur-xl scale-90 opacity-20"
                }`}
                loading="eager"
              />
            </div>

            <div className="mt-4 flex flex-col items-center gap-1">
              <span className="text-[12px] font-semibold text-neutral-800">
                TidBit {APP_CONFIG.version} · {APP_CONFIG.apkSize} APK
              </span>
              <a
                href={APP_CONFIG.apkDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 underline font-medium"
              >
                Or tap here to download directly
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
