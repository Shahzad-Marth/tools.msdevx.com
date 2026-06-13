import Link from "next/link";
import { getBlogCategorySlug } from "@/data/registry";

export function BlogGrid({ posts, showCategoryLinks = true, variant = "list", className = "" }) {
  if (!posts?.length) {
    return (
      <div className="text-center py-16">
        <p className="text-text-muted text-lg">No articles found.</p>
        <Link href="/blog" className="text-brand font-medium text-sm hover:underline mt-2 inline-block">
          View all articles →
        </Link>
      </div>
    );
  }

  return (
    <div className={`${variant === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"} ${className}`}>
      {posts.map((post) => (
        <article
          key={post.slug}
          className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-200"
        >
          <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mb-3">
            {showCategoryLinks && post.category ? (
              <Link
                href={`/blog/${getBlogCategorySlug(post.category)}`}
                className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-brand-light text-brand hover:bg-brand hover:text-white transition-colors"
              >
                {post.category}
              </Link>
            ) : post.category ? (
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-brand-light text-brand">
                {post.category}
              </span>
            ) : null}
            {post.date && <span>{post.date}</span>}
            {post.readTime && <span>{post.readTime}</span>}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-text mb-2">
            <Link href={`/blog/${post.slug}`} className="hover:text-brand transition-colors">
              {post.title}
            </Link>
          </h2>
          <p className="text-text-muted mb-4 leading-relaxed">
            {post.excerpt}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-brand font-semibold text-sm hover:gap-2 transition-all"
          >
            Read More →
          </Link>
        </article>
      ))}
    </div>
  );
}
