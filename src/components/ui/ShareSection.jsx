"use client";

import { useShare } from "@/hooks/useShare";

export function ShareSection({
  title,
  description,
  url,
  resultLabel,
  resultValue,
}) {
  const {
    copied,
    shared,
    error,
    share,
    copyLink,
    shareWhatsApp,
    shareTelegram,
    buildToolMessage,
    buildToolResultMessage,
  } = useShare();

  const targetUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  const message =
    resultLabel && resultValue != null
      ? buildToolResultMessage(title, resultLabel, resultValue, targetUrl)
      : buildToolMessage(title, targetUrl);

  const handleShare = () => share(message, "");
  const handleCopy = () => copyLink(targetUrl);
  const handleWhatsApp = () => shareWhatsApp(message);
  const handleTelegram = () => shareTelegram(message);

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <h3 className="font-semibold text-text mb-4">
        {resultLabel ? "✨ Share Your Result" : "📤 Share This Tool"}
      </h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleShare}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-[0_4px_14px_rgba(30,64,175,0.25)]"
        >
          {shared ? "✓ Shared!" : "📤 Share"}
        </button>

        <button
          onClick={handleCopy}
          className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
            copied
              ? "bg-green-50 text-green-700 border-2 border-green-200"
              : "bg-white text-text border-2 border-border hover:border-brand hover:text-brand"
          }`}
        >
          {copied ? "✓ Copied!" : "🔗 Copy Link"}
        </button>

        <button
          onClick={handleWhatsApp}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-all"
          style={{ backgroundColor: "#25D366" }}
        >
          💬 WhatsApp
        </button>

        <button
          onClick={handleTelegram}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-all"
          style={{ backgroundColor: "#0088cc" }}
        >
          ✈️ Telegram
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-3 font-semibold">{error}</p>
      )}
    </div>
  );
}
