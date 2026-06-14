import { blogPosts } from "@/data/blog";
import { getAllBlogCategorySlugs, getBlogCategoryName } from "@/data/registry";
import { toolsData } from "@/data/tools";
import { ToolCard } from "@/components/ui/ToolCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BlogLayout, BlogCategoryNav, BlogGrid } from "@/components/blog";
import { siteConfig } from "@/data/site";
import AdSlot from "@/components/ads/AdSlot";

export function generateMetadata() {
  return {
    title: "Blog",
    description: "Read our latest articles on calculators, tools, and productivity tips from MS DevX Tools.",
    openGraph: {
      title: "Blog",
      description: "Read our latest articles on calculators, tools, and productivity tips from MS DevX Tools.",
      url: `${siteConfig.baseUrl}/blog`,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: siteConfig.ogImageWidth, height: siteConfig.ogImageHeight, alt: "MS DevX Tools Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog",
      description: "Read our latest articles on calculators, tools, and productivity tips from MS DevX Tools.",
      images: [siteConfig.ogImage],
    },
    alternates: { canonical: `${siteConfig.baseUrl}/blog` },
  };
}

export default function Blog() {
  const categories = getAllBlogCategorySlugs().map((slug) => ({
    slug,
    name: getBlogCategoryName(slug),
    count: blogPosts.filter((p) => getBlogCategoryName(slug) === p.category).length,
  }));

  const topTools = toolsData.slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "MS DevX Tools Blog",
    description: "Read our latest articles on calculators, tools, and productivity tips from MS DevX Tools.",
    url: `${siteConfig.baseUrl}/blog`,
    mainEntity: {
      "@type": "Blog",
      name: "MS DevX Tools Blog",
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: `${siteConfig.baseUrl}/blog/${post.slug}`,
        datePublished: post.date,
        author: { "@type": "Organization", name: post.author },
      })),
    },
  };

  return (
    <BlogLayout jsonLd={jsonLd}>
      <h1 className="sr-only">MS DevX Tools Blog - Latest Articles</h1>
      <SectionHeader
        title="Latest Articles"
        description="Tips, guides, and insights about our free online tools and calculators."
      />
      <BlogCategoryNav categories={categories} className="mt-6 mb-10" />
      <BlogGrid posts={blogPosts} showCategoryLinks />

      <AdSlot />

      <section className="mt-20">
        <SectionHeader title="Try Our Top Tools" description="Explore our most popular free online tools." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <div className="text-center mt-8">
          <ButtonLink to="/" variant="secondary">View All Tools →</ButtonLink>
        </div>
      </section>

      <AdSlot />
    </BlogLayout>
  );
}
