import { siteConfig } from "@/data/site";

export function generateToolMetadata(tool) {
  const cleanTitle = tool.title.replace(/\s*\|.*$/, "");
  return {
    title: cleanTitle,
    description: tool.fullDescription || tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: tool.title,
      description: tool.fullDescription || tool.description,
      url: `${siteConfig.baseUrl}/tools/${tool.slug}`,
      type: "website",
      images: [{ url: tool.ogImage || siteConfig.ogImage, width: siteConfig.ogImageWidth, height: siteConfig.ogImageHeight, alt: tool.name }],
    },
    twitter: { card: "summary_large_image", title: tool.title, description: tool.fullDescription || tool.description, images: [tool.ogImage || siteConfig.ogImage] },
    alternates: { canonical: `${siteConfig.baseUrl}/tools/${tool.slug}` },
  };
}

export function generateBlogMetadata(post) {
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `${siteConfig.baseUrl}/blog/${post.slug}`,
      images: [{ url: post.ogImage || siteConfig.ogImage, width: siteConfig.ogImageWidth, height: siteConfig.ogImageHeight, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.ogImage || siteConfig.ogImage] },
    alternates: { canonical: `${siteConfig.baseUrl}/blog/${post.slug}` },
  };
}
