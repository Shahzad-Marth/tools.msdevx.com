export function ResultBox({ children, show = true }) {
  if (!show) return null;
  return (
    <div className="bg-bg-soft rounded-xl p-6 mt-6 border border-border">
      {children}
    </div>
  );
}

export function ResultItem({ label, value, highlight = false }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-border last:border-0">
      <span className="text-text-muted text-sm md:text-base">{label}</span>
      <span className={`font-semibold ${highlight ? "text-brand text-lg" : "text-text"}`}>
        {value}
      </span>
    </div>
  );
}
