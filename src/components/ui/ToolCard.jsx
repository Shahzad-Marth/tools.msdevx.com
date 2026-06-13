import Link from "next/link";

export function ToolCard({ tool, delay = 0 }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col items-center text-center p-4.5 md:p-5 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-[var(--brand-light)] transition-all duration-200"
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="text-2xl md:text-3xl mb-2.5 block">{tool.icon}</span>
      <h3 className="text-sm md:text-base font-semibold mb-1.5 text-text">
        {tool.name}
      </h3>
      <p className="text-sm text-text-muted my-0 leading-relaxed line-clamp-2">
        {tool.description}
      </p>
      <span className="mt-auto pt-2 text-sm md:text-base text-brand opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        →
      </span>
    </Link>
  );
}
