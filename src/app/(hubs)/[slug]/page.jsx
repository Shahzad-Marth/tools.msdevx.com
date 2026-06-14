import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryByAltSlug, getAllAltSlugs, getToolsByCategory, getCategoryBlogs, getRelatedCategories, getToolBySlug } from "@/data/registry";
import { siteConfig } from "@/data/site";
import { ToolCard } from "@/components/ui/ToolCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { CategoryFilter } from "@/components/tools/CategoryFilter";
import { Breadcrumbs, BlogFAQ } from "@/components/blog";
import AdSlot from "@/components/ads/AdSlot";

export function generateStaticParams() {
  return getAllAltSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = getCategoryByAltSlug(slug);
  if (!cat) return {};
  return {
    title: cat.seo.title.replace(/\s*\|.*$/, ""),
    description: cat.seo.description,
    openGraph: {
      title: cat.seo.title.replace(/\s*\|.*$/, ""),
      description: cat.seo.description,
      url: `${siteConfig.baseUrl}/${slug}`,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: siteConfig.ogImageWidth, height: siteConfig.ogImageHeight, alt: `${cat.title} Tools & Calculators | MS DevX Tools` }],
    },
    twitter: {
      card: "summary_large_image",
      title: cat.seo.title.replace(/\s*\|.*$/, ""),
      description: cat.seo.description,
      images: [siteConfig.ogImage],
    },
    alternates: { canonical: `${siteConfig.baseUrl}/${slug}` },
  };
}

export default async function CategoryHubPage({ params }) {
  const { slug } = await params;
  const cat = getCategoryByAltSlug(slug);
  if (!cat) notFound();

  const tools = cat.toolSlugs
    ? cat.toolSlugs.map((s) => getToolBySlug(s)).filter(Boolean)
    : getToolsByCategory(cat.id);
  const relatedBlogs = getCategoryBlogs(cat.id).slice(0, 4);
  const relatedCategories = getRelatedCategories(cat.id);
  const featured = tools.filter((t) => cat.featuredTools?.includes(t.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.baseUrl },
          { "@type": "ListItem", position: 2, name: `${cat.title} Tools`, item: `${siteConfig.baseUrl}/${slug}` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `${cat.title} Tools & Calculators | MS DevX Tools`,
        description: cat.seoDescription,
        url: `${siteConfig.baseUrl}/${slug}`,
        about: cat.title,
      },
      ...(cat.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: cat.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: `${cat.title} Tools` },
        ]}
        className="max-w-6xl mx-auto px-6 pt-6"
      />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-5xl mb-4 block">{cat.icon}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-text mb-3 leading-tight">
              {cat.title} Tools & Calculators
            </h1>
            <p className="text-text-muted text-base leading-relaxed mb-4">
              {cat.longDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              {featured.length > 0 && (
                <a href="#tools" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand text-white hover:bg-brand-dark transition-all">
                  Browse All {cat.title} Tools
                </a>
              )}
              {relatedBlogs.length > 0 && (
                <a href="#blogs" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold bg-card border border-border text-text hover:border-brand-light transition-all">
                  Read Guides & Articles
                </a>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 grid grid-cols-2 gap-3">
            {featured.slice(0, 4).map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:border-brand-light hover:shadow-card transition-all text-center"
              >
                <span className="text-2xl">{tool.icon}</span>
                <span className="text-xs font-medium text-text leading-tight">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdSlot />

      {/* Tools Section */}
      <section id="tools" className="max-w-6xl mx-auto px-6 pb-8">
        <SectionHeader
          title={`All ${cat.title} Tools`}
          description={`${tools.length} free ${cat.title.toLowerCase()} calculators and tools to help you get things done.`}
        />

        {tools.length > 0 ? (
          <>
            <CategoryFilter tools={tools} />
            <div id="tool-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {tools.map((tool, idx) => (
                <ToolCard key={tool.slug} tool={tool} delay={idx * 0.03} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-text-muted text-center py-12">No tools found in this category.</p>
        )}
      </section>

      <AdSlot />

      {/* Blog Section */}
      {relatedBlogs.length > 0 && (
        <section id="blogs" className="max-w-6xl mx-auto px-6 py-12 border-t border-border">
          <SectionHeader
            eyebrow="📚 Guides & Resources"
            title={`${cat.title} Articles`}
            description="Learn more with our educational guides and tutorials."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {relatedBlogs.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-5 rounded-xl bg-card border border-border hover:shadow-card-hover hover:border-brand-light transition-all duration-200"
              >
                <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                  <span className="px-2 py-0.5 rounded bg-brand-light text-brand font-semibold">{post.category}</span>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-semibold text-text group-hover:text-brand transition-colors">{post.title}</h3>
                <p className="text-sm text-text-muted mt-1.5 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-brand mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Guide Section */}
      {cat.guideContent && (
        <section className="max-w-6xl mx-auto px-6 py-12 border-t border-border">
          <SectionHeader
            eyebrow="Guide"
            title={`How to Use ${cat.title} Tools`}
            description="Practical tips to get the most out of these tools."
          />
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <p className="text-text-muted leading-relaxed">{cat.guideContent}</p>
          </div>
        </section>
      )}

      <BlogFAQ
        items={cat.faqs.map((f) => ({ question: f.q, answer: f.a }))}
        title={`${cat.title} FAQs`}
        description="Common questions about our tools and calculators."
      />

      {/* Related Categories */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-border">
        <SectionHeader
          title="Browse More Categories"
          description="Explore other tool collections."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {relatedCategories.slice(0, 8).map((rc) => {
            const rcTools = rc.toolSlugs
              ? rc.toolSlugs.map((s) => getToolBySlug(s)).filter(Boolean)
              : getToolsByCategory(rc.id);
            return (
              <Link
                key={rc.id}
                href={`/${rc.altSlug}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-brand-light hover:shadow-card transition-all"
              >
                <span className="text-2xl">{rc.icon}</span>
                <div>
                  <span className="text-sm font-semibold text-text">{rc.title}</span>
                  <span className="block text-xs text-text-muted">{rcTools.length} tools</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
