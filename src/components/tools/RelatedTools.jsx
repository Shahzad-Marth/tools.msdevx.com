import Link from "next/link";

function ToolCard({ item }) {
  return (
    <Link
      href={`/tools/${item.slug}`}
      className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-brand-light hover:shadow-card-hover transition-all duration-300 group"
    >
      <span className="text-2xl shrink-0">{item.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-text text-sm truncate">{item.name}</h3>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--brand-light)] text-brand font-medium shrink-0">{item.categoryName}</span>
        </div>
        <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{item.shortDescription || item.description}</p>
        <span className="inline-block mt-1 text-xs font-semibold text-brand opacity-0 group-hover:opacity-100 transition-opacity">Try tool →</span>
      </div>
    </Link>
  );
}

function BlogCard({ item }) {
  return (
    <Link
      href={`/blog/${item.slug}`}
      className="block p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:shadow-card-hover transition-all duration-300 group"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted mb-2">
        <span className="px-2 py-0.5 rounded-full bg-[var(--brand-light)] text-brand font-semibold">{item.category}</span>
        <span>{item.date}</span>
      </div>
      <h3 className="font-semibold text-text group-hover:text-brand transition-colors">{item.title}</h3>
      <p className="text-sm text-text-muted mt-1 line-clamp-2">{item.excerpt}</p>
      <span className="inline-block mt-2 text-xs font-semibold text-brand opacity-0 group-hover:opacity-100 transition-opacity">Read article →</span>
    </Link>
  );
}

export function RelatedTools({ items, type = "tool", title, variant = "grid" }) {
  if (!items?.length) return null;

  return (
    <section className="mt-12">
      {title && <h2 className="text-xl font-bold text-text mb-6">{title}</h2>}
      <div className={
        variant === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
          : "space-y-4"
      }>
        {items.map((item) =>
          type === "blog" ? (
            <BlogCard key={item.slug} item={item} />
          ) : (
            <ToolCard key={item.slug} item={item} />
          )
        )}
      </div>
    </section>
  );
}
