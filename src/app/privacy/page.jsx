import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import AdSlot from "@/components/ads/AdSlot";

export function generateMetadata() {
  return {
    title: "Privacy Policy",
    description:
      "Privacy Policy for tools.msdevx.com - learn how we protect your data and respect your privacy.",
    openGraph: {
      title: "Privacy Policy | MS DevX Tools",
      description:
        "Privacy Policy for tools.msdevx.com - learn how we protect your data and respect your privacy.",
      url: `${siteConfig.baseUrl}/privacy`,
      type: "website",
      images: [{ url: "/assets/OG/OG.webp", width: 1664, height: 928, alt: "MS DevX Tools - Privacy Policy" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Privacy Policy | MS DevX Tools",
      description:
        "Privacy Policy for tools.msdevx.com - learn how we protect your data and respect your privacy.",
      images: ["/assets/OG/OG.webp"],
    },
    alternates: { canonical: `${siteConfig.baseUrl}/privacy` },
  };
}

const navLinks = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information", title: "2. Information We Collect" },
  { id: "use", title: "3. How We Use Your Information" },
  { id: "cookies", title: "4. Cookies" },
  { id: "third-party", title: "5. Third-Party Services" },
  { id: "security", title: "6. Data Security" },
  { id: "rights", title: "7. Your Rights" },
  { id: "changes", title: "8. Changes to This Policy" },
  { id: "contact", title: "9. Contact" },
];

export default function Privacy() {
  const lastUpdated = "May 25, 2026";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "Privacy Policy for tools.msdevx.com - learn how we protect your data and respect your privacy.",
    url: `${siteConfig.baseUrl}/privacy`,
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
        <h1 className="sr-only">Privacy Policy</h1>
        <SectionHeader
          title="Privacy Policy"
          subtitle="Your privacy matters to us. This policy explains how we handle your information."
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
              <h2>1. Introduction</h2>
              <p>
                Welcome to tools.msdevx.com (&quot;we&quot;, &quot;us&quot;,
                or &quot;our&quot;). This Privacy Policy explains how we
                collect, use, and protect your information when you use our
                website and tools.
              </p>
              <p>
                By using tools.msdevx.com, you agree to the practices
                described in this policy. This policy was last updated on{" "}
                {lastUpdated}.
              </p>
            </section>

            <section id="information" className="mb-10">
              <h2>2. Information We Collect</h2>
              <p>
                tools.msdevx.com is designed to respect your privacy. All
                calculator tools operate entirely within your browser - no
                personal data is sent to or stored on our servers for
                calculation purposes.
              </p>

              <h3>No Direct Data Collection</h3>
              <ul>
                <li>
                  We do not collect personal information such as names, email
                  addresses, or phone numbers
                </li>
                <li>
                  We do not store any data you enter into our calculator tools
                </li>
                <li>All calculations happen locally in your browser</li>
              </ul>

              <h3>Third-Party Services</h3>
              <ul>
                <li>Google Analytics (if you consent)</li>
                <li>Google AdSense (if you consent)</li>
              </ul>
            </section>

            <section id="use" className="mb-10">
              <h2>3. How We Use Your Information</h2>
              <p>
                We do not collect, store, or process any personal information
                from our users. All tools function entirely within your browser,
                and no data entered into calculators is transmitted to our
                servers.
              </p>
              <p>
                The only data we may receive comes from third-party services
                (Google Analytics and Google AdSense) if you have consented to
                their use. This data is used solely to understand site usage
                patterns and to display relevant advertisements.
              </p>
            </section>

            <section id="cookies" className="mb-10">
              <h2>4. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your
                experience on our site. For detailed information about the types
                of cookies we use and how to manage them, please see our{" "}
                <Link href="/cookies">Cookie Policy</Link>.
              </p>
              <p>We use cookies in the following categories:</p>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> Required for the website
                  to function properly
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  visitors use our site (optional)
                </li>
                <li>
                  <strong>Advertising Cookies:</strong> Used to personalize ads
                  (optional)
                </li>
              </ul>
            </section>

            <section id="third-party" className="mb-10">
              <h2>5. Third-Party Services</h2>
              <p>
                We use third-party services that may collect information as
                described in their own privacy policies.
              </p>

              <h3>Google Analytics</h3>
              <p>
                Google Analytics is a web analytics service provided by Google.
                If you consent to Analytics cookies:
              </p>
              <ul>
                <li>
                  Google collects anonymous usage data including pages visited,
                  time spent, and approximate geographic location
                </li>
                <li>
                  This helps us understand how visitors use our site and improve
                  the user experience
                </li>
                <li>No personally identifiable information is shared with us</li>
                <li>
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google&apos;s Privacy Policy
                  </a>
                </li>
              </ul>

              <h3>Google AdSense</h3>
              <p>
                Google AdSense is an advertising service provided by Google. If
                you consent to Advertising cookies:
              </p>
              <ul>
                <li>
                  Google may use cookies to serve personalized ads based on your
                  browsing history
                </li>
                <li>
                  Ads are displayed to support the operation of this free tool
                  website
                </li>
                <li>
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google&apos;s Privacy Policy
                  </a>
                </li>
                <li>
                  You can opt out of personalized advertising at:{" "}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Ads Settings
                  </a>
                </li>
              </ul>
            </section>

            <section id="security" className="mb-10">
              <h2>6. Data Security</h2>
              <p>
                Since we do not collect or store personal data on our servers,
                there is no risk of your personal information being breached
                from our systems.
              </p>
              <p>
                All tools operate client-side in your browser. Any data you
                enter into calculators:
              </p>
              <ul>
                <li>Remains on your device</li>
                <li>Is processed locally</li>
                <li>Is never transmitted to our servers</li>
              </ul>
              <p>
                Our site uses HTTPS encryption to protect any communication
                between your browser and our servers.
              </p>
            </section>

            <section id="rights" className="mb-10">
              <h2>7. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights
                regarding your data:
              </p>

              <h3>Right to Access</h3>
              <p>
                Since we don&apos;t store your personal data, there is no data
                to access from our systems.
              </p>

              <h3>Right to Delete</h3>
              <p>
                Similarly, there is no personal data stored on our servers to
                delete.
              </p>

              <h3>Right to Opt-Out</h3>
              <ul>
                <li>
                  You can manage cookie preferences at any time (see Cookie
                  Policy)
                </li>
                <li>
                  You can opt out of Google Analytics using the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                </li>
                <li>
                  You can opt out of personalized advertising at{" "}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Ads Settings
                  </a>
                </li>
              </ul>

              <h3>Right to Information</h3>
              <p>
                If you have questions about how third-party services handle your
                data, please refer to their respective privacy policies.
              </p>
            </section>

            <section id="changes" className="mb-10">
              <h2>8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we
                make changes:
              </p>
              <ul>
                <li>
                  The &quot;Last Updated&quot; date at the top of this page will
                  be revised
                </li>
                <li>
                  We encourage you to review this policy periodically
                </li>
                <li>
                  Continued use of the site after changes constitutes acceptance
                  of the updated policy
                </li>
              </ul>
            </section>

            <section id="contact" className="mb-10">
              <h2>9. Contact</h2>
              <p>
                If you have questions about this Privacy Policy or our
                practices, please contact us through our{" "}
                <Link href="/contact">contact form</Link> on the website.
              </p>
              <p>
                We will respond to your inquiry within a reasonable timeframe.
              </p>
            </section>
          </div>

          <AdSlot />
        </div>
      </div>
    </>
  );
}
