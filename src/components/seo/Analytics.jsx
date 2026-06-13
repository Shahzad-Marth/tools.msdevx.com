"use client";

import { useEffect } from "react";
import Script from "next/script";
import { siteConfig } from "@/data/site";

const GA_ID = siteConfig.googleAnalyticsId;

export function Analytics() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const gtag = window.gtag;
    if (!gtag) return;
    try {
      gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        wait_for_update: 500,
      });
    } catch {}
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
