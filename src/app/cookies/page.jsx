import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import AdSlot from "@/components/ads/AdSlot";

export function generateMetadata() {
  return {
    title: "Cookie Policy",
    description:
      "Cookie Policy for tools.msdevx.com - learn about the cookies we use and how to manage them.",
    openGraph: {
      title: "Cookie Policy | MS DevX Tools",
      description:
        "Cookie Policy for tools.msdevx.com - learn about the cookies we use and how to manage them.",
      url: `${siteConfig.baseUrl}/cookies`,
      type: "website",
      images: [{ url: "/assets/OG/OG.webp", width: 1664, height: 928, alt: "MS DevX Tools - Cookie Policy" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cookie Policy | MS DevX Tools",
      description:
        "Cookie Policy for tools.msdevx.com - learn about the cookies we use and how to manage them.",
      images: ["/assets/OG/OG.webp"],
    },
    alternates: { canonical: `${siteConfig.baseUrl}/cookies` },
  };
}

const navLinks = [
  { id: "introduction", title: "1. What Are Cookies" },
  { id: "essential", title: "2. Essential Cookies" },
  { id: "analytics", title: "3. Analytics Cookies" },
  { id: "advertising", title: "4. Advertising Cookies" },
  { id: "third-party", title: "5. Third-Party Cookies" },
  { id: "managing", title: "6. Managing Cookies" },
  { id: "contact", title: "7. Contact" },
];

export default function Cookies() {
  const lastUpdated = "May 25, 2026";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cookie Policy",
    description:
      "Cookie Policy for tools.msdevx.com - learn about the cookies we use and how to manage them.",
    url: `${siteConfig.baseUrl}/cookies`,
    isPartOf: {
      "@type": "WebSite",
      name: "MS DevX Tools",
      url: siteConfig.baseUrl,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="sr-only">Cookie Policy</h1>
        <SectionHeader
          title="Cookie Policy"
          subtitle={`Last updated: ${lastUpdated}`}
        />

        <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-card mb-8">
          <nav className="mb-8 pb-6 border-b border-border">
            <p className="text-sm font-semibold text-text mb-3">Contents</p>
            <ul className="space-y-1.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-brand hover:underline transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <AdSlot />

          <div className="blog-content">
            <section id="introduction" className="mb-10">
              <h2>1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your device
                (computer, tablet, or phone) when you visit a website. They are
                widely used to make websites work efficiently and provide
                information to the website owners.
              </p>
              <p>Cookies can be:</p>
              <ul>
                <li>
                  <strong>Session cookies:</strong> Deleted when you close your
                  browser
                </li>
                <li>
                  <strong>Persistent cookies:</strong> Remain on your device for
                  a set period
                </li>
                <li>
                  <strong>First-party cookies:</strong> Set by the website
                  you&apos;re visiting
                </li>
                <li>
                  <strong>Third-party cookies:</strong> Set by other domains
                  (like Google)
                </li>
              </ul>
            </section>

            <section id="essential" className="mb-10">
              <h2>2. Essential Cookies</h2>
              <p>
                Essential cookies are necessary for the website to function
                properly. They enable core features like:
              </p>
              <ul>
                <li>Page navigation</li>
                <li>Site functionality</li>
                <li>Remembering your cookie consent preferences</li>
              </ul>
              <p>
                These cookies do not store any personally identifiable
                information and cannot be disabled.
              </p>
            </section>

            <section id="analytics" className="mb-10">
              <h2>3. Analytics Cookies</h2>
              <p>
                Analytics cookies help us understand how visitors interact with
                our website. We use Google Analytics to collect anonymous
                information such as:
              </p>
              <ul>
                <li>Pages visited</li>
                <li>Time spent on each page</li>
                <li>How you arrived at our site</li>
                <li>
                  Approximate geographic location (city-level, not precise)
                </li>
                <li>Browser and device information</li>
              </ul>
              <p>
                This data helps us improve the website and user experience. No
                personally identifiable information is collected or shared.
              </p>
              <p>
                Analytics cookies are optional and only set if you give consent.
              </p>
            </section>

            <section id="advertising" className="mb-10">
              <h2>4. Advertising Cookies</h2>
              <p>
                Advertising cookies are used to deliver personalized
                advertisements and measure their effectiveness. We use Google
                AdSense, which may use cookies to:
              </p>
              <ul>
                <li>Show ads relevant to your interests</li>
                <li>Limit how many times you see an ad</li>
                <li>Measure the performance of advertising campaigns</li>
                <li>
                  Track visits across websites for ad targeting purposes
                </li>
              </ul>
              <p>
                Advertising cookies are optional and only set if you give
                consent.
              </p>
            </section>

            <section id="third-party" className="mb-10">
              <h2>5. Third-Party Cookies</h2>
              <p>
                Our site uses services from Google that may set their own
                cookies:
              </p>

              <h3>Google Analytics</h3>
              <ul>
                <li>
                  <strong>Provider:</strong> Google LLC
                </li>
                <li>
                  <strong>Purpose:</strong> Website analytics and usage
                  statistics
                </li>
                <li>
                  <strong>Privacy Policy:</strong>{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://policies.google.com/privacy
                  </a>
                </li>
              </ul>

              <h3>Google AdSense</h3>
              <ul>
                <li>
                  <strong>Provider:</strong> Google LLC
                </li>
                <li>
                  <strong>Purpose:</strong> Personalized advertising and
                  measurement
                </li>
                <li>
                  <strong>Privacy Policy:</strong>{" "}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://policies.google.com/technologies/partner-sites
                  </a>
                </li>
                <li>
                  <strong>How Google uses data:</strong>{" "}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://policies.google.com/technologies/ads
                  </a>
                </li>
              </ul>

              <p>
                We do not control these third-party cookies. We encourage you to
                review Google&apos;s privacy policies for more information.
              </p>
            </section>

            <section id="managing" className="mb-10">
              <h2>6. Managing Cookies</h2>
              <p>
                You can control and manage cookies in several ways:
              </p>

              <h3>Through Our Cookie Banner</h3>
              <p>
                When you first visit our site, you&apos;ll see a cookie banner
                that lets you:
              </p>
              <ul>
                <li>Accept all cookies</li>
                <li>
                  Choose which categories to allow (Analytics, Advertising)
                </li>
                <li>Save your preferences</li>
              </ul>
              <p>Your choice is stored in your browser for future visits.</p>

              <h3>Through Browser Settings</h3>
              <p>
                Most web browsers allow you to control cookies through their
                settings:
              </p>
              <ul>
                <li>
                  <strong>Chrome:</strong> Settings &rarr; Privacy and security
                  &rarr; Cookies and other site data
                </li>
                <li>
                  <strong>Firefox:</strong> Settings &rarr; Privacy & Security
                  &rarr; Cookies and Site Data
                </li>
                <li>
                  <strong>Edge:</strong> Settings &rarr; Cookies and site
                  permissions &rarr; Manage and delete cookies
                </li>
                <li>
                  <strong>Safari:</strong> Settings &rarr; Privacy &rarr;
                  Cookies and website data
                </li>
              </ul>
              <p>
                Note that blocking all cookies may affect the functionality of
                this and other websites.
              </p>

              <h3>Opt-Out Links</h3>
              <ul>
                <li>
                  <strong>Google Analytics Opt-out:</strong>{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://tools.google.com/dlpage/gaoptout
                  </a>
                </li>
                <li>
                  <strong>Google Ads Settings:</strong>{" "}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://adssettings.google.com
                  </a>
                </li>
                <li>
                  <strong>Your Online Choices (EU):</strong>{" "}
                  <a
                    href="https://www.youronlinechoices.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.youronlinechoices.com/
                  </a>
                </li>
                <li>
                  <strong>Network Advertising Initiative:</strong>{" "}
                  <a
                    href="https://optout.networkadvertising.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://optout.networkadvertising.org/
                  </a>
                </li>
              </ul>
            </section>

            <section id="contact" className="mb-10">
              <h2>7. Contact</h2>
              <p>
                If you have any questions about our use of cookies or this
                Cookie Policy, please contact us through our{" "}
                <Link href="/contact">contact form</Link> on the website.
              </p>
            </section>
          </div>

          <AdSlot />
        </div>
      </div>
    </>
  );
}
