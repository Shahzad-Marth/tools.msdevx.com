"use client";
import { useState, useEffect } from "react";

export function InstallFooterLink() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsInstalled(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !window.MSStream);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowInstructions(true);
    }
  };

  if (isInstalled) return null;

  return (
    <>
      <button
        onClick={handleInstall}
        className="hover:text-brand transition-colors bg-none border-none p-0 cursor-pointer text-inherit text-sm"
      >
        📲 Install App
      </button>

      {showInstructions && (
        <div className="fixed bottom-20 left-4 right-4 z-50 max-w-sm mx-auto p-4 rounded-xl bg-card border border-border shadow-card-hover text-center">
          {isIOS ? (
            <>
              <p className="text-sm text-text mb-2">
                Install this app on your iPhone:
              </p>
              <p className="text-xs text-text-muted">
                Tap the share button <span className="text-brand">↑</span> then &quot;Add to Home Screen&quot;
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-text mb-2">
                Install this app on your device:
              </p>
              <p className="text-xs text-text-muted">
                Open your browser menu and select &quot;Add to Home Screen&quot; or &quot;Install App&quot;
              </p>
            </>
          )}
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-3 text-xs text-text-muted hover:text-brand"
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
}
