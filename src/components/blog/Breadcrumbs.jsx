import Link from "next/link";

export function Breadcrumbs({ items, className = "" }) {
  if (!items?.length) return null;

  return (
    <nav className={`flex items-center gap-2 text-sm text-text-muted flex-wrap ${className}`} aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-brand transition-colors">
                {item.label}
              </Link>
            ) : (
              <span
                className={isLast ? "text-text font-medium truncate max-w-[200px]" : "text-text font-medium"}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
