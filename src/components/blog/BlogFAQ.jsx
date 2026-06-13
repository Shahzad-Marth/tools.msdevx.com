export function BlogFAQ({ items, title = "Frequently Asked Questions", description = "", className = "" }) {
  if (!items?.length) return null;

  return (
    <section id="faq" className={`max-w-4xl mx-auto px-6 py-12 border-t border-border ${className}`}>
      {title && (
        <div className="mb-8">
          <span className="inline-block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
            💡 Frequently Asked Questions
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-text">{title}</h2>
          {description && (
            <p className="text-text-muted mt-2">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {items.map((faq, idx) => (
          <details key={idx} className="group rounded-xl bg-card border border-border overflow-hidden">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-text font-semibold text-sm hover:bg-soft transition-colors [&::-webkit-details-marker]:hidden">
              {faq.question || faq.q}
              <span className="text-brand text-lg transform group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-4 pb-4 text-text-muted text-sm leading-relaxed border-t border-border pt-3">
              {faq.answer || faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
