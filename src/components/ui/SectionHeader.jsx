export function SectionHeader({ eyebrow, title, description, centered = true }) {
  return (
    <div className={`${centered ? "text-center" : ""} mb-10`}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand mb-2">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text mb-3">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-text-muted text-base max-w-xl mx-auto">{description}</p>
      )}
    </div>
  );
}
