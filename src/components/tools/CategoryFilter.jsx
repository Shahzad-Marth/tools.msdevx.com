"use client";

import { useState, useMemo } from "react";

export function CategoryFilter({ tools }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return tools;
    const q = query.toLowerCase();
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords?.some((kw) => kw.toLowerCase().includes(q))
    );
  }, [query, tools]);

  const handleSearch = (e) => setQuery(e.target.value);
  const handleClear = () => setQuery("");

  return (
    <div className="mt-6">
      <div className="relative max-w-md">
        <label htmlFor="cat-filter" className="sr-only">Search tools in this category</label>
        <input
          id="cat-filter"
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder={`Search ${tools.length} tools...`}
          aria-describedby="filter-count"
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-text text-sm placeholder:text-text-muted focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all"
        />
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <p id="filter-count" className="text-xs text-text-muted mt-1.5" aria-live="polite">
        {filtered.length === tools.length
          ? `Showing all ${tools.length} tools`
          : `Showing ${filtered.length} of ${tools.length} tools`}
      </p>
    </div>
  );
}
