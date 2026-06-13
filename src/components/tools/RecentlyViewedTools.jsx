"use client";

import { useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "msdevx_recent_tools";
const MAX_ITEMS = 6;

export function RecentlyViewedTools() {
  const [recent, setRecent] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  if (recent.length < 2) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-text mb-6">Recently Viewed</h2>
      <div className="flex flex-wrap gap-2">
        {recent.map((slug) => (
          <Link
            key={slug}
            href={`/tools/${slug}`}
            className="px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-text-muted hover:text-brand hover:border-brand-light transition-all"
          >
            {slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
          </Link>
        ))}
      </div>
    </section>
  );
}
