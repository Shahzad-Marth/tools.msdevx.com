import { siteConfig } from "@/data/site";
import { toolsData as baseTools, categories } from "./tools-data";
import { buildComponentMap } from "./tool-components";

const COMPONENT_MAP = buildComponentMap(baseTools.map((t) => t.slug));

const FEATURED_SLUGS = [
  "age-calculator",
  "date-calculator",
  "sleep-calculator",
  "tdee-calculator",
  "bmr-calculator",
];

const POPULAR_SLUGS = [
  "age-calculator",
  "date-calculator",
  "sleep-calculator",
  "tdee-calculator",
  "bmr-calculator",
  "percentage-calculator",
  "word-counter",
  "password-generator",
  "unit-converter",
  "qr-code-generator",
];

const NEWER_TOOL_SLUGS = [
  "water-intake-calculator",
  "tdee-calculator",
  "body-fat-calculator",
  "ideal-weight-calculator",
  "protein-intake-calculator",
  "steps-to-calories-calculator",
  "calories-burned-calculator",
  "heart-rate-zone-calculator",
  "bmr-calculator",
  "macro-calculator",
  "intermittent-fasting-timer",
  "running-pace-calculator",
  "caffeine-calculator",
  "one-rep-max-calculator",
  "vo2-max-estimator",
  "push-up-calorie-calculator",
  "pregnancy-due-date-calculator",
  "sugar-intake-calculator",
  "screen-time-break-reminder",
  "breathing-exercise-tool",
  "meditation-timer",
];

const tools = baseTools.map((tool) => {
  return {
    ...tool,
    component: COMPONENT_MAP[tool.slug] || null,
    featured: FEATURED_SLUGS.includes(tool.slug),
    popular: POPULAR_SLUGS.includes(tool.slug),
    publishDate: NEWER_TOOL_SLUGS.includes(tool.slug) ? "2026-05-25" : "2026-01-15",
    lastUpdated: "2026-05-25",
    ogImage: siteConfig.ogImage,
    readingTime: "3 min read",
    tags: tool.keywords.slice(0, 5),
    shortDescription: tool.description,
    searchKeywords: [...new Set([...tool.keywords, tool.name, tool.categoryName, ...tool.description.split(" ").filter((w) => w.length > 3)])],
    seo: {
      title: tool.title,
      description: tool.fullDescription || tool.description,
      keywords: tool.keywords,
      openGraph: {
        title: tool.title,
        description: tool.fullDescription || tool.description,
        url: `${siteConfig.baseUrl}/tools/${tool.slug}`,
        type: "website",
        images: [{ url: tool.ogImage, width: 1200, height: 630, alt: tool.name }],
      },
      twitter: {
        title: tool.title,
        description: tool.fullDescription || tool.description,
        images: [tool.ogImage],
      },
      alternates: { canonical: `${siteConfig.baseUrl}/tools/${tool.slug}` },
    },
  };
});

export function computeRelatedTools(slug, allTools, count = 4) {
  const tool = allTools.find((t) => t.slug === slug);
  if (!tool) return [];
  const candidates = allTools.filter((t) => t.slug !== slug);
  const scored = candidates.map((t) => {
    let score = 0;
    if (t.category === tool.category) score += 3;
    const sharedTags = tool.tags?.filter((tag) => t.tags?.includes(tag))?.length || 0;
    score += sharedTags;
    const sharedKeywords = tool.keywords?.filter((kw) => t.keywords?.includes(kw))?.length || 0;
    score += sharedKeywords * 0.5;
    if (t.popular) score += 1;
    if (t.featured) score += 0.5;
    return { slug: t.slug, score };
  });
  scored.sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug));
  return scored.slice(0, count).map((s) => s.slug);
}

tools.forEach((tool) => {
  tool.relatedTools = computeRelatedTools(tool.slug, tools, 4);
});

export { tools, categories, COMPONENT_MAP };

export const getToolBySlug = (slug) => tools.find((t) => t.slug === slug);
export const getToolsByCategory = (category) => tools.filter((t) => t.category === category);
export const getFeaturedTools = () => tools.filter((t) => t.featured);
export const getPopularTools = () => tools.filter((t) => t.popular);
