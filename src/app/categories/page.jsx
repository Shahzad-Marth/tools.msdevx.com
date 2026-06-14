import { categoryList, getToolsByCategory } from "@/data/registry";
import Link from "next/link";
import { ToolCard } from "@/components/ui/ToolCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import AdSlot from "@/components/ads/AdSlot";

export function generateMetadata() {
  return {
    title: "Categories",
    description: "Browse all categories of free online tools, calculators, converters, and productivity utilities available on MS DevX Tools.",
    openGraph: {
      title: "Categories",
      description: "Browse all tool categories — Date & Time, Finance, Health, Text, Security, Utilities, Academic, and more.",
      url: `${siteConfig.baseUrl}/categories`,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: siteConfig.ogImageWidth, height: siteConfig.ogImageHeight, alt: "MS DevX Tools - Free Online Tools" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Categories",
      description: "Browse all tool categories — Date & Time, Finance, Health, Text, Security, Utilities, Academic, and more.",
      images: [siteConfig.ogImage],
    },
    alternates: { canonical: `${siteConfig.baseUrl}/categories` },
  };
}

export default function CategoriesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "MS DevX Tools Tool Categories",
    description: "Browse all tool categories.",
    url: `${siteConfig.baseUrl}/categories`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="sr-only">Tool Categories</h1>
        <SectionHeader
          title="Tool Categories"
          description="Browse our free online tools by category."
        />

        <AdSlot />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {categoryList.map((cat) => {
            const tools = getToolsByCategory(cat.id);
            return (
              <Link
                key={cat.id}
                href={`/${cat.altSlug}`}
                className="block p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-brand-light transition-all duration-200"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h2 className="text-lg font-bold text-text mb-1">{cat.title}</h2>
                <p className="text-sm text-text-muted mb-3">{cat.seoDescription}</p>
                <span className="text-xs font-semibold text-brand">
                  {tools.length} tool{tools.length !== 1 ? "s" : ""}
                </span>
              </Link>
            );
          })}
        </div>

        <AdSlot />
      </div>
    </>
  );
}
