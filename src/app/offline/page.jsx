import Link from "next/link";
import { siteConfig } from "@/data/site";

export function generateMetadata() {
  return {
    title: "You're Offline",
    description: "Please check your internet connection and try again.",
    openGraph: {
      title: "You're Offline | MS DevX Tools",
      description: "Please check your internet connection and try again. Previously visited pages may still be available.",
      url: `${siteConfig.baseUrl}/offline`,
      type: "website",
      images: [{ url: "/assets/OG/OG.webp", width: 1664, height: 928, alt: "MS DevX Tools - Free Online Tools" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "You're Offline | MS DevX Tools",
      description: "Please check your internet connection and try again.",
      images: ["/assets/OG/OG.webp"],
    },
    alternates: { canonical: `${siteConfig.baseUrl}/offline` },
  };
}

export default function Offline() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6" aria-hidden="true">📡</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text mb-4">
          You&apos;re Offline
        </h1>
        <p className="text-lg text-text-muted mb-8 leading-relaxed">
          Please check your internet connection and try again. Previously visited
          pages may still be available.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-brand text-white hover:bg-brand-dark transition-all duration-200"
          >
            Try Again
          </Link>
          <Link
            href="/#tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-soft text-text border border-border hover:bg-card transition-all duration-200"
          >
            Browse Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
