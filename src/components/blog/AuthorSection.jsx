export function AuthorSection({
  author = "MS DevX Tools",
  description = "MS DevX Tools provides fast, free online tools for everyday calculations, planning, and problem-solving.",
  avatar = "M",
  className = "",
}) {
  return (
    <section className={`mt-12 pt-8 border-t border-border ${className}`}>
      <div className="flex items-center gap-4 p-5 rounded-xl bg-soft border border-border">
        <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold text-lg shrink-0">
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-text text-sm">Written by {author}</p>
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        </div>
      </div>
    </section>
  );
}
