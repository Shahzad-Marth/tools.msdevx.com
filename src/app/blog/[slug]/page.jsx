import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { blogs, getBlogsForCategoryPage, getAllBlogCategorySlugs, getBlogCategoryName, getBlogCategorySlug, getClusterPosts, generateBlogMetadata, getToolBySlug, getBlogsByCategory } from "@/data/registry";
import { toolsData } from "@/data/tools";
import { siteConfig } from "@/data/site";
import Link from "next/link";
import { ToolCard } from "@/components/ui/ToolCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Breadcrumbs, TableOfContents, AuthorSection, BlogLayout, BlogCategoryNav, BlogGrid } from "@/components/blog";
import { HeadingLinker } from "@/components/blog/HeadingLinker";
import { ShareSection } from "@/components/ui/ShareSection";
import AdSlot from "@/components/ads/AdSlot";

function extractHeadings(content) {
  if (!content) return [];
  const text = typeof content === "string" ? content : "";
  const regex = /<h2[^>]*>(.*?)<\/h2>/g;
  const headings = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    headings.push(match[1].replace(/<[^>]*>/g, ""));
  }
  return headings;
}

export function generateStaticParams() {
  return [
    ...blogPosts.map((post) => ({ slug: post.slug })),
    ...getAllBlogCategorySlugs().map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const catName = getBlogCategoryName(slug);
  if (catName) {
    const posts = getBlogsForCategoryPage(slug);
    return {
      title: `${catName} Articles & Guides`,
      description: `Browse our ${catName.toLowerCase()} articles, guides, and tutorials. Learn tips, formulas, and best practices.`,
      openGraph: {
        title: `${catName} Articles & Guides | MS DevX Tools`,
        description: `Browse our ${catName.toLowerCase()} articles, guides, and tutorials.`,
        url: `${siteConfig.baseUrl}/blog/${slug}`,
        type: "website",
        images: [{ url: siteConfig.ogImage, width: siteConfig.ogImageWidth, height: siteConfig.ogImageHeight, alt: `${catName} Articles & Guides | MS DevX Tools` }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${catName} Articles & Guides | MS DevX Tools`,
        description: `Browse our ${catName.toLowerCase()} articles, guides, and tutorials.`,
        images: [siteConfig.ogImage],
      },
      alternates: { canonical: `${siteConfig.baseUrl}/blog/${slug}` },
    };
  }
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return generateBlogMetadata(post);
}

function BlogCategoryPage({ slug, catName }) {
  const posts = getBlogsForCategoryPage(slug);
  const categories = getAllBlogCategorySlugs().map((s) => ({
    slug: s,
    name: getBlogCategoryName(s),
    count: blogs.filter((p) => getBlogCategoryName(s) === p.category).length,
  }));

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${catName} Articles | MS DevX Tools`,
    description: `Browse our ${catName.toLowerCase()} articles and guides.`,
    url: `${siteConfig.baseUrl}/blog/${slug}`,
  };

  return (
    <BlogLayout
      jsonLd={blogJsonLd}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: catName },
      ]}
    >
      <h1 className="sr-only">{catName} Articles & Guides</h1>
      <SectionHeader
        title={`${catName} Articles & Guides`}
        description={`${posts.length} article${posts.length !== 1 ? "s" : ""} about ${catName.toLowerCase()} topics.`}
      />
      <BlogCategoryNav categories={categories} activeSlug={slug} className="mb-10" />
      <BlogGrid posts={posts} showCategoryLinks={false} />

      <AdSlot />
    </BlogLayout>
  );
}

function BlogPostPage({ post }) {
  const headings = extractHeadings(post.contentComponent?.content);
  const relatedBlogSlugs = post.relatedTools || [];
  const relatedPosts = relatedBlogSlugs.map((s) => getBlogPostBySlug(s)).filter(Boolean);
  const categoryPosts = post.category ? getBlogsByCategory(post.category).filter((p) => p.slug !== post.slug && !relatedBlogSlugs.includes(p.slug)).slice(0, 3) : [];
  const relatedToolSlugs = post.toolSlugs || [];
  const relatedTools = relatedToolSlugs.map((s) => getToolBySlug(s)).filter(Boolean);
  const matchingTool = getToolBySlug(post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.baseUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.baseUrl}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.baseUrl}/blog/${post.slug}` },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: `${siteConfig.baseUrl}/blog/${post.slug}`,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@type": "Organization",
          name: "MS DevX Tools",
          url: siteConfig.baseUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "MS DevX Tools",
          url: siteConfig.baseUrl,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteConfig.baseUrl}${siteConfig.ogImage}`,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteConfig.baseUrl}/blog/${post.slug}`,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            ...(post.category ? [{ label: post.category, href: `/blog/${getBlogCategorySlug(post.category)}` }] : []),
            { label: post.title },
          ]}
          className="mb-8"
        />

        <TableOfContents headings={headings} />

        <header className="mb-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-brand-light text-brand mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
            <span>By {post.author}</span>
          </div>
        </header>

        <HeadingLinker>
          <div className="prose prose-lg max-w-none text-text leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-text-muted [&_p]:mb-5 [&_ul]:text-text-muted [&_ul]:mb-5 [&_li]:mb-2 [&_p_a]:text-brand [&_p_a]:font-medium [&_p_a:hover]:underline [&_li_a]:text-brand [&_li_a]:font-medium [&_li_a:hover]:underline [&_.highlight-box]:bg-brand-light [&_.highlight-box]:p-4 [&_.highlight-box]:rounded-xl [&_.highlight-box]:my-6 [&_.highlight-box]:text-text [&_.highlight-box]:font-medium [&_.highlight-box]:border [&_.highlight-box]:border-brand/20">
            {post.contentComponent.content}
          </div>
        </HeadingLinker>

        <AdSlot />

        <ShareSection
          title={post.title}
          description={post.excerpt}
          url={`${siteConfig.baseUrl}/blog/${post.slug}`}
        />

        <AuthorSection author={post.author} />

        <AdSlot />

        <RelatedTools items={relatedPosts} type="blog" title="Related Articles" variant="list" />

        {categoryPosts.length > 0 && (
          <RelatedTools items={categoryPosts} type="blog" title={`More ${post.category} Guides`} variant="list" />
        )}

        {relatedTools.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-text mb-6">Try These Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedTools.slice(0, 4).map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {post.pillarSlug && (() => {
          const clusterPosts = getClusterPosts(post.pillarSlug, blogs);
          const currentIndex = clusterPosts.findIndex((p) => p.slug === post.slug);
          const pillarPost = blogs.find((p) => p.slug === post.pillarSlug);
          if (clusterPosts.length < 1) return null;
          return (
            <section className="mt-12 pt-8 border-t border-border">
              <div className="p-6 rounded-xl bg-soft border border-border">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                  Part of the Guide
                </p>
                {pillarPost && (
                  <Link
                    href={`/blog/${post.pillarSlug}`}
                    className="block text-sm text-brand font-medium hover:underline mb-3"
                  >
                    ← {pillarPost.title}
                  </Link>
                )}
                <ul className="space-y-1.5">
                  {clusterPosts.map((cp, i) => (
                    <li key={cp.slug}>
                      {cp.slug === post.slug ? (
                        <span className="text-sm text-text font-medium pl-3 border-l-2 border-brand">
                          {i + 1}. {cp.title}
                        </span>
                      ) : (
                        <Link
                          href={`/blog/${cp.slug}`}
                          className="text-sm text-text-muted hover:text-brand pl-3 border-l-2 border-transparent hover:border-brand/50 transition-all block"
                        >
                          {i + 1}. {cp.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })()}

        {matchingTool && (
          <section className="mt-12 text-center p-10 bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4e] rounded-3xl text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2.5">
              Ready to try the tool?
            </h2>
            <p className="text-base opacity-70 mb-7">
              Put what you learned into practice with our free online tool.
            </p>
            <ButtonLink to={`/tools/${post.slug}`} variant="primary">
              Try It Now →
            </ButtonLink>
          </section>
        )}
      </div>
    </>
  );
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const catName = getBlogCategoryName(slug);
  if (catName) {
    return <BlogCategoryPage slug={slug} catName={catName} />;
  }
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
