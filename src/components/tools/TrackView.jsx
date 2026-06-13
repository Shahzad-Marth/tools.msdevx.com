"use client";

import { useEffect } from "react";

export function TrackView({ slug }) {
  useEffect(() => {
    try {
      const key = "msdevx_recent_tools";
      const raw = localStorage.getItem(key);
      const recent = raw ? JSON.parse(raw) : [];
      const updated = [slug, ...recent.filter((s) => s !== slug)].slice(0, 6);
      localStorage.setItem(key, JSON.stringify(updated));
    } catch {}
  }, [slug]);

  return null;
}
