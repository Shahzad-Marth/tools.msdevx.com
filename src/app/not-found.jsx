import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function generateMetadata() {
  return {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
    openGraph: {
      title: "Page Not Found | MS DevX Tools",
      description: "The page you're looking for doesn't exist or has been moved.",
      url: `${siteConfig.baseUrl}/404`,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: siteConfig.ogImageWidth, height: siteConfig.ogImageHeight, alt: "MS DevX Tools - Free Online Tools" }],
    },
    alternates: { canonical: `${siteConfig.baseUrl}/404` },
  };
}

export default function NotFound() {
  return (
    <>
      <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-lg">
          <div className="text-8xl font-extrabold text-brand opacity-20 mb-4">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-text-muted mb-8 leading-relaxed">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink to="/" variant="primary">
              Go to Home
            </ButtonLink>
            <ButtonLink to="/#tools" variant="secondary">
              Browse Tools
            </ButtonLink>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-lg font-semibold text-text mb-4">
              Popular Pages
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="px-4 py-2 bg-bg-soft rounded-lg text-text-muted hover:text-brand hover:bg-brand-light transition-colors"
              >
                Home
              </Link>
              <Link
                href="/#tools"
                className="px-4 py-2 bg-bg-soft rounded-lg text-text-muted hover:text-brand hover:bg-brand-light transition-colors"
              >
                Tools
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 bg-bg-soft rounded-lg text-text-muted hover:text-brand hover:bg-brand-light transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 bg-bg-soft rounded-lg text-text-muted hover:text-brand hover:bg-brand-light transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 bg-bg-soft rounded-lg text-text-muted hover:text-brand hover:bg-brand-light transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="mt-8">
              <p className="text-sm text-text-muted">
                Try searching for a tool or visit our{" "}
                <Link
                  href="/"
                  className="text-brand hover:underline"
                >
                  homepage
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
