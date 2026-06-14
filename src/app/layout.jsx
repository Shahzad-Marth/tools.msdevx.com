import { Inter } from "next/font/google";
import Script from "next/script";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SearchProvider } from "@/components/search/SearchProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Analytics } from "@/components/seo/Analytics";
import { PWAProvider } from "@/components/pwa/PWAProvider";
import { InstallButton } from "@/components/pwa/InstallButton";
import { siteConfig } from "@/data/site";
import "./globals.css";

const SearchModal = dynamic(
  () => import("@/components/search/SearchModal").then((m) => ({ default: m.SearchModal }))
);

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "Free Online Tools for Everyday Work | MS DevX Tools",
    template: "%s | MS DevX Tools",
  },
  description:
    "Use free browser-based calculators, converters, generators, text tools, finance tools, health tools, and productivity utilities from MS DevX Tools.",
  keywords: [
    "free online tools",
    "calculators",
    "age calculator",
    "date calculator",
    "online tools",
    "ms devx tools",
  ],
  authors: [{ name: "MS DevX Tools" }],
  creator: "MS DevX Tools",
  publisher: "MS DevX Tools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MS DevX Tools",
    title: "Free Online Tools for Everyday Work | MS DevX Tools",
    description:
      "Use free browser-based calculators, converters, generators, text tools, finance tools, health tools, and productivity utilities from MS DevX Tools.",
    url: siteConfig.baseUrl,
    images: [
      {
        url: siteConfig.ogImage,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: "MS DevX Tools — Professional Web Tools for Everyday Work. Calculators, converters, generators and utilities for focused work.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools for Everyday Work | MS DevX Tools",
    description:
      "Use free browser-based calculators, converters, generators, text tools, finance tools, health tools, and productivity utilities from MS DevX Tools.",
    images: [siteConfig.ogImage],
  },
  verification: {
    google: "tjh5k_hvx4gT0WTLaV3btfgvgZ_P-2EU3CKU8iKlUh4",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "MS DevX Tools",
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/web-app-manifest-512x512.png",
        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "google-adsense-account": "ca-pub-8684958562988579",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#60a5fa" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme_msdevx');
                  if (!theme || theme === 'system') {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8684958562988579"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to content
        </a>
        <PWAProvider>
          <ThemeProvider>
            <SearchProvider>
              <div className="min-h-screen flex flex-col bg-bg text-text transition-colors duration-200">
                <Navbar />
                <main id="main-content" className="flex-1">{children}</main>
                <Footer />
                <CookieBanner />
                <Analytics />
              </div>
              <InstallButton />
              <SearchModal />
            </SearchProvider>
          </ThemeProvider>
        </PWAProvider>
      </body>
    </html>
  );
}
