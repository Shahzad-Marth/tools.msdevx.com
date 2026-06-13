import dynamic from "next/dynamic";
import Link from "next/link";
import { ToolCard } from "@/components/ui/ToolCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { toolsData, getToolsByCategory } from "@/data/tools";
import { getPopularTools, getFeaturedTools, blogs, categoryList } from "@/data/registry";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import AdSlot from "@/components/ads/AdSlot";

const SearchTrigger = dynamic(
  () => import("@/components/search/SearchTrigger").then((m) => ({ default: m.SearchTrigger }))
);

const popularTools = getPopularTools();
const featuredTools = getFeaturedTools();
const recentTools = toolsData.slice(-6).reverse();
const recentBlogs = blogs
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 4);

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MS DevX Tools",
    url: siteConfig.baseUrl,
    description: "Use free browser-based calculators, converters, generators, text tools, finance tools, health tools, and productivity utilities from MS DevX Tools.",
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* 2. Hero */}
      <section className="text-center py-20 md:py-28 px-6 bg-gradient-to-b from-[var(--color-primary-soft)] to-[var(--color-bg)] dark:from-[var(--color-primary-soft)] dark:to-[var(--color-bg)] relative overflow-hidden">
        <div className="absolute top-[-40%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-b from-brand/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-brand text-white text-xs font-semibold px-4 py-1.5 rounded-md mb-5 tracking-wide">100% Free Tools</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mx-auto mb-4 max-w-3xl leading-[1.1] tracking-tight text-text">
            Free Online Tools for <span className="text-brand">Everyday Work</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Fast, accurate, browser-based calculators, converters, generators, and productivity tools from MS DevX.
          </p>
          <div className="mb-10">
            <SearchTrigger variant="hero" />
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-brand text-white shadow-card hover:bg-brand-dark hover:shadow-card-hover transition-all duration-200">
              Browse All Tools
            </a>
            <ButtonLink to="/about" variant="secondary">Learn More</ButtonLink>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="text-center py-3.5 px-6 text-sm text-text-muted bg-bg-soft flex justify-center gap-6 flex-wrap border-b border-border">
        <span className="inline-flex items-center gap-1.5">✔ Free Forever</span>
        <span className="inline-flex items-center gap-1.5">✔ No Signup</span>
        <span className="inline-flex items-center gap-1.5">✔ Works on Mobile & Desktop</span>
        <span className="inline-flex items-center gap-1.5">✔ Privacy First</span>
      </div>

      <AdSlot />

      {/* 3. Popular Tools */}
      {popularTools.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16 overflow-hidden">
          <SectionHeader eyebrow="Popular" title="Popular Tools" description="A curated selection of essential tools to get you started." />
          <div className="relative mt-8">
            <div className="absolute inset-y-0 left-0 w-16 md:w-24 z-10 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-24 z-10 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none" />
            <div className="flex gap-3 md:gap-4 tools-marquee-track" style={{ width: "max-content", willChange: "transform" }}>
              {[...popularTools, ...popularTools].map((tool, idx) => (
                <div key={`${tool.slug}-${idx}`} className="flex-shrink-0 w-[200px] md:w-[240px]">
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <AdSlot />

      {/* 4. Category Grid */}
      <section id="tools" className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader eyebrow="Categories" title="Browse by Category" description="Find the right tool for any task — explore by category." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {categoryList.map((cat) => {
            const catTools = cat.toolSlugs || getToolsByCategory(cat.id);
            return (
              <Link
                key={cat.id}
                href={`/${cat.altSlug}`}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-brand-light transition-all duration-200"
              >
                <span className="text-3xl mb-3">{cat.icon}</span>
                <h3 className="font-semibold text-text text-sm mb-1">{cat.title}</h3>
                <span className="text-xs text-text-muted">{catTools.length} tools</span>
              </Link>
            );
          })}
        </div>
      </section>

      <AdSlot />

      {/* 5. Featured Tools */}
      {featuredTools.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <SectionHeader eyebrow="Featured" title="Featured Tools" description="Hand-picked tools to get you started." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {featuredTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      <AdSlot />

      {/* 6. Recently Added */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader eyebrow="New" title="Recently Added" description="The latest tools added to our collection." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {recentTools.slice(0, 6).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <AdSlot />

      {/* 7-8. Why Use + Privacy */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <SectionHeader title="Why MS DevX Tools?" description="Built for speed, privacy, and simplicity." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="font-semibold text-text mb-1">Fast & Accurate</h3>
            <p className="text-sm text-text-muted leading-relaxed">All calculations run instantly in your browser. No waiting, no page reloads.</p>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="font-semibold text-text mb-1">100% Privacy</h3>
            <p className="text-sm text-text-muted leading-relaxed">All processing happens on your device. We never see, store, or share your data.</p>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="text-2xl mb-3">📱</div>
            <h3 className="font-semibold text-text mb-1">Works Everywhere</h3>
            <p className="text-sm text-text-muted leading-relaxed">Responsive design works on desktop, tablet, and mobile. No app download needed.</p>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="text-2xl mb-3">💰</div>
            <h3 className="font-semibold text-text mb-1">Completely Free</h3>
            <p className="text-sm text-text-muted leading-relaxed">No hidden charges, no premium tiers, no credit card required. Free forever.</p>
          </div>
        </div>
        <div className="mt-6 p-5 rounded-xl bg-bg-soft border border-border text-center">
          <p className="text-sm text-text-muted leading-relaxed">
            <strong className="text-text">Client-side processing:</strong> Every tool runs entirely in your browser. Your data never leaves your device. No uploads, no servers, no tracking.
          </p>
        </div>
      </section>

      <AdSlot />

      {/* 9. Guides / Blog */}
      {recentBlogs.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <SectionHeader eyebrow="Guides" title="Articles & Guides" description="Learn how to get the most out of our tools." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {recentBlogs.map((post) => (
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
                <span className="inline-flex items-center gap-1 text-xs font-medium text-brand mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Read article
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <ButtonLink to="/blog" variant="secondary">View All Articles</ButtonLink>
          </div>
        </section>
      )}
    </>
  );
}
