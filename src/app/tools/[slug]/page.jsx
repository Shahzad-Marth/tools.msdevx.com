import { getToolBySlug, toolsData } from "@/data/tools";
import { COMPONENT_MAP, generateToolMetadata, blogs, getCategoryById, getPopularTools } from "@/data/registry";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackView } from "@/components/tools/TrackView";
import { RecentlyViewedTools } from "@/components/tools/RecentlyViewedTools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import AdSlot from "@/components/ads/AdSlot";
import { siteConfig } from "@/data/site";

function ToolLoader() {
  return (
    <div className="py-16 flex flex-col items-center justify-center" role="status" aria-live="polite">
      <div className="w-10 h-10 border-4 border-border rounded-full animate-spin border-t-brand"></div>
    </div>
  );
}

const toolComponents = Object.fromEntries(
  Object.entries(COMPONENT_MAP).map(([slug, component]) => [
    slug,
    dynamic(() => import(/* webpackChunkName: "tool-[request]" */ `@/components/tools/${component}`), { loading: () => <ToolLoader /> }),
  ])
);

export function generateStaticParams() {
  return toolsData.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return generateToolMetadata(tool);
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const ToolComponent = toolComponents[slug];
  if (!ToolComponent) notFound();

  const toolCategory = getCategoryById(tool.category);

  const relatedSlugs = tool.relatedTools || [];
  const related = relatedSlugs.map((s) => getToolBySlug(s)).filter(Boolean);
  const toolBlogs = blogs.filter((b) => b.toolSlugs?.includes(slug)).slice(0, 3);
  const popularTools = getPopularTools().filter((t) => t.slug !== slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.baseUrl },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${siteConfig.baseUrl}/#tools` },
          { "@type": "ListItem", position: 3, name: tool.name, item: `${siteConfig.baseUrl}/tools/${tool.slug}` },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: tool.name,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        description: tool.fullDescription,
        url: `${siteConfig.baseUrl}/tools/${tool.slug}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ToolPageLayout
        tool={tool}
        toolCategory={toolCategory}
        relatedTools={related}
        popularTools={popularTools}
        toolBlogs={toolBlogs}
      >
        <ToolComponent />
      </ToolPageLayout>
      <div className="max-w-5xl mx-auto px-4">
        <AdSlot />
      </div>
      <div className="max-w-5xl mx-auto px-4 pb-8">
        <TrackView slug={slug} />
        <RecentlyViewedTools />
      </div>
    </>
  );
}
