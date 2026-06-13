"use client";
import { useMemo } from "react";

function extractHeadingsFromString(content) {
  if (!content) return [];
  const regex = /<h2[^>]*>(.*?)<\/h2>/g;
  const headings = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    headings.push(match[1].replace(/<[^>]*>/g, ""));
  }
  return headings;
}

export function TableOfContents({ headings, content, title = "In This Article" }) {
  const items = useMemo(() => {
    if (headings) return headings;
    if (typeof content === "string") return extractHeadingsFromString(content);
    return [];
  }, [headings, content]);

  if (!items.length) return null;

  return (
    <nav className="mb-10 p-5 rounded-xl bg-soft border border-border" aria-label="Table of Contents">
      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{title}</span>
      <ul className="mt-3 space-y-1.5">
        {items.map((h, i) => (
          <li key={i}>
            <a href={`#section-${i}`} className="text-sm text-text-muted hover:text-brand transition-colors">
              {h}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
