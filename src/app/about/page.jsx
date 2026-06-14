import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { categories } from "@/data/tools";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import AdSlot from "@/components/ads/AdSlot";

export function generateMetadata() {
  return {
    title: "About Us",
    description:
      "Learn about MS DevX Tools and our mission to provide fast, free, and easy-to-use online tools for everyone.",
    openGraph: {
      title: "About Us | MS DevX Tools",
      description:
        "Learn about MS DevX Tools and our mission to provide fast, free, and easy-to-use online tools for everyone.",
      url: `${siteConfig.baseUrl}/about`,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: siteConfig.ogImageWidth, height: siteConfig.ogImageHeight, alt: "MS DevX Tools - Free Online Tools" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us | MS DevX Tools",
      description:
        "Learn about MS DevX Tools and our mission to provide fast, free, and easy-to-use online tools for everyone.",
      images: [siteConfig.ogImage],
    },
    alternates: { canonical: `${siteConfig.baseUrl}/about` },
  };
}

export default function About() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About MS DevX Tools",
    description:
      "Learn about MS DevX Tools and our mission to provide fast, free, and easy-to-use online tools for everyone.",
    url: `${siteConfig.baseUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "MS DevX Tools",
      url: siteConfig.baseUrl,
    },
  };

  const values = [
    {
      icon: "⚡",
      title: "Speed First",
      description:
        "Our tools load instantly and provide results in milliseconds. No waiting, no lag.",
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description:
        "Your data never leaves your browser. We don't track, store, or sell any information.",
    },
    {
      icon: "🎯",
      title: "Accuracy",
      description:
        "Every calculator is thoroughly tested to ensure precise and reliable results every time.",
    },
    {
      icon: "📱",
      title: "Mobile First",
      description:
        "Every tool works perfectly on mobile, tablet, and desktop. Same great experience everywhere.",
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand mb-2">
            👋 About Us
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-text">
            About <span className="text-brand">MS DevX Tools</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            We build simple, powerful tools to help you solve everyday problems
            faster.
          </p>
        </div>

        <section className="mb-16">
          <SectionHeader title="Our Mission" centered={false} />
          <div>
            <p className="text-text-muted leading-relaxed mb-4">
              At MS DevX Tools, we believe that everyone should have access to
              high-quality tools without the complexity of expensive software or
              mandatory sign-ups. Our mission is simple: build fast, accurate,
              and easy-to-use tools that anyone can use.
            </p>
            <p className="text-text-muted leading-relaxed">
              Every tool in our collection is designed with three core
              principles in mind: speed, simplicity, and privacy. We never store
              your data, never show intrusive ads, and never ask you to create
              an account.
            </p>
          </div>
        </section>

        <AdSlot />

        <section className="mb-16">
          <SectionHeader title="What We Offer" centered={false} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-200"
              >
                <span className="text-3xl mb-3 block" aria-hidden="true">{cat.icon}</span>
                <h3 className="font-semibold text-text mb-2">{cat.name}</h3>
                <p className="text-sm text-text-muted">
                  A collection of tools for {cat.name.toLowerCase()} tasks and
                  calculations.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader title="Our Values" centered={false} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 bg-soft rounded-xl"
              >
                <div className="text-2xl mb-3" aria-hidden="true">{value.icon}</div>
                <h3 className="font-semibold text-text mb-2">{value.title}</h3>
                <p className="text-sm text-text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot />

        <div className="text-center p-10 bg-gradient-to-br from-brand to-brand-dark rounded-xl text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2.5">
            Ready to get started?
          </h2>
          <p className="text-base opacity-70 mb-7">
            Explore our collection of free tools.
          </p>
          <ButtonLink to="/#tools" variant="primary">
            Browse All Tools
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
