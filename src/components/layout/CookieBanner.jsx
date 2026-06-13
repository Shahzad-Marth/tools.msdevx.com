"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookieConsent_mstools";
const CONSENT_VERSION = 1;

function getConsent() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      essential: parsed.essential ?? true,
      analytics: parsed.analytics ?? false,
      advertising: parsed.advertising ?? false,
      timestamp: parsed.timestamp,
      version: parsed.version,
    };
  } catch { return null; }
}

function saveConsent({ analytics, advertising }) {
  const consent = {
    essential: true,
    analytics: Boolean(analytics),
    advertising: Boolean(advertising),
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    updateGtagConsent(consent);
  } catch {}
  return consent;
}

function hasConsented() { return getConsent() !== null; }

function updateGtagConsent(consent) {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (!gtag) return;
  try {
    gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.advertising ? "granted" : "denied",
      ad_user_data: consent.advertising ? "granted" : "denied",
      ad_personalization: consent.advertising ? "granted" : "denied",
    });
  } catch {}
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!hasConsented()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowBanner(true);
    } else {
      const existing = getConsent();
      if (existing) updateGtagConsent(existing);
    }
  }, []);

  const handleAcceptAll = () => {
    setIsSaving(true);
    saveConsent({ analytics: true, advertising: true });
    setTimeout(() => { setShowBanner(false); setIsSaving(false); }, 300);
  };

  const handleEssentialOnly = () => {
    setIsSaving(true);
    saveConsent({ analytics: false, advertising: false });
    setTimeout(() => { setShowBanner(false); setIsSaving(false); }, 300);
  };

  const handleSavePreferences = () => {
    setIsSaving(true);
    saveConsent({ analytics, advertising });
    setTimeout(() => { setShowBanner(false); setIsSaving(false); }, 300);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm w-[calc(100%-2rem)] animate-fade-up">
      <div className="rounded-xl border border-border bg-card shadow-xl p-4">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-lg flex-shrink-0 mt-0.5">🍪</span>
          <div>
            <h3 className="text-sm font-bold text-text">This site uses cookies</h3>
            <p className="text-xs text-text-muted leading-relaxed mt-0.5">
              We use essential cookies for site function, and optional ones for analytics &amp; ads.
            </p>
          </div>
        </div>

        {showSettings && (
          <div className="mb-3 space-y-2 pl-9">
            <div className="flex items-center justify-between p-2.5 bg-bg-soft rounded-lg">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-text">Essential</span>
                  <span className="text-[10px] bg-brand-light text-brand px-1.5 py-0.5 rounded font-medium">Required</span>
                </div>
              </div>
              <div className="w-9 h-5 bg-brand rounded-full relative cursor-not-allowed flex-shrink-0">
                <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-bg-soft rounded-lg">
              <span className="text-xs font-semibold text-text flex-1 min-w-0">Analytics</span>
              <button
                onClick={() => setAnalytics(!analytics)}
                disabled={isSaving}
                className={`w-9 h-5 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand/30 flex-shrink-0 ${
                  analytics ? "bg-brand" : "bg-gray-300"
                }`}
                aria-label={analytics ? "Disable analytics cookies" : "Enable analytics cookies"}
                role="switch"
                aria-checked={analytics}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${
                  analytics ? "right-0.5" : "left-0.5"
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-bg-soft rounded-lg">
              <span className="text-xs font-semibold text-text flex-1 min-w-0">Advertising</span>
              <button
                onClick={() => setAdvertising(!advertising)}
                disabled={isSaving}
                className={`w-9 h-5 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand/30 flex-shrink-0 ${
                  advertising ? "bg-brand" : "bg-gray-300"
                }`}
                aria-label={advertising ? "Disable advertising cookies" : "Enable advertising cookies"}
                role="switch"
                aria-checked={advertising}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${
                  advertising ? "right-0.5" : "left-0.5"
                }`}></div>
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button onClick={handleEssentialOnly} disabled={isSaving}
              className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg border-2 border-border text-text-muted hover:border-brand hover:text-brand transition-all disabled:opacity-50">
              Essential Only
            </button>
            <button onClick={handleAcceptAll} disabled={isSaving}
              className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg bg-brand text-white hover:bg-brand-dark transition-all shadow-[0_2px_8px_rgba(30,64,175,0.25)] disabled:opacity-50">
              Accept All
            </button>
          </div>
          {showSettings && (
            <button onClick={handleSavePreferences} disabled={isSaving}
              className="w-full px-3 py-2 text-xs font-semibold rounded-lg border-2 border-border text-text-muted hover:border-brand hover:text-brand transition-all disabled:opacity-50">
              Save Preferences
            </button>
          )}
          <div className="flex items-center justify-center gap-3 text-xs text-text-muted">
            <Link href="/privacy" className="hover:text-brand transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-brand transition-colors">Cookies</Link>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="hover:text-brand transition-colors"
            >
              {showSettings ? "Hide Settings" : "Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
