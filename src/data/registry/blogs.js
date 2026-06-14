import { siteConfig } from "@/data/site";
import { blogPosts as baseBlogPosts } from "./blog-data";
import { BLOG_COMPONENT_MAP } from "./blog-components";

const BLOG_CATEGORY_SLUG_MAP = {
  "date-and-time": "Date & Time",
  "finance": "Finance",
  "text-tools": "Text Tools",
  "health": "Health",
  "math": "Math",
  "security": "Security",
  "guide": "Guide",
  "academic": "Academic",
  "converter": "Converter",
};

const CATEGORY_NAME_TO_SLUG = Object.fromEntries(
  Object.entries(BLOG_CATEGORY_SLUG_MAP).map(([slug, name]) => [name, slug])
);

export const getBlogCategorySlug = (categoryName) => CATEGORY_NAME_TO_SLUG[categoryName] || null;
export const getBlogCategoryName = (slug) => BLOG_CATEGORY_SLUG_MAP[slug] || null;
export const getAllBlogCategorySlugs = () => Object.keys(BLOG_CATEGORY_SLUG_MAP);

export function computeRelatedBlogs(slug, allBlogs, count = 3) {
  const post = allBlogs.find((p) => p.slug === slug);
  if (!post) return [];
  const candidates = allBlogs.filter((p) => p.slug !== slug);
  const scored = candidates.map((p) => {
    let score = 0;
    if (p.category === post.category) score += 3;
    const sharedTags = post.tags?.filter((tag) => p.tags?.includes(tag))?.length || 0;
    score += sharedTags;
    return { slug: p.slug, score };
  });
  scored.sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug));
  return scored.slice(0, count).map((s) => s.slug);
}

const blogs = baseBlogPosts.map((post) => {
  const ogImage = siteConfig.ogImage;
  return {
    ...post,
    toolSlugs: post.toolSlugs || [post.slug],
    contentComponent: BLOG_COMPONENT_MAP[post.slug] || null,
    ogImage,
    relatedTools: [],
    seo: {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        url: `${siteConfig.baseUrl}/blog/${post.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        title: post.title,
        description: post.excerpt,
        images: [ogImage],
      },
      alternates: { canonical: `${siteConfig.baseUrl}/blog/${post.slug}` },
    },
  };
});

blogs.forEach((post) => {
  post.relatedTools = computeRelatedBlogs(post.slug, blogs, 3);
});

export { blogs };

export const getBlogPostBySlug = (slug) => blogs.find((p) => p.slug === slug);
export const getBlogsByCategory = (category) => blogs.filter((b) => b.category === category);

export const getBlogsForCategoryPage = (categorySlug) => {
  const name = getBlogCategoryName(categorySlug);
  if (!name) return [];
  return blogs.filter((b) => b.category === name).sort((a, b) => new Date(b.date) - new Date(a.date));
};

export function getClusterPosts(pillarSlug, allBlogs) {
  return allBlogs
    .filter((b) => b.pillarSlug === pillarSlug)
    .sort((a, b) => (a.clusterOrder || 99) - (b.clusterOrder || 99));
}
