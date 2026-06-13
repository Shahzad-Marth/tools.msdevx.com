import Link from "next/link";

export function BlogCategoryNav({ categories, activeSlug = null, className = "" }) {
  return (
    <nav className={`flex flex-wrap gap-2 ${className}`} aria-label="Blog categories">
      <Link
        href="/blog"
        className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
          !activeSlug
            ? "bg-brand text-white"
            : "bg-card border border-border text-text-muted hover:border-brand-light hover:text-brand"
        }`}
        aria-current={!activeSlug ? "page" : undefined}
      >
        All
      </Link>
      {categories.map((cat) => {
        const isActive = cat.slug === activeSlug;
        return (
          <Link
            key={cat.slug}
            href={`/blog/${cat.slug}`}
            className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? "bg-brand text-white"
                : "bg-card border border-border text-text-muted hover:border-brand-light hover:text-brand"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {cat.name}
            {cat.count !== undefined && (
              <span className="ml-1.5 opacity-70">({cat.count})</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
