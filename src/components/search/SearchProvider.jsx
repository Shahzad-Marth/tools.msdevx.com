"use client";

import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { toolsData, categories } from "@/data/tools";
import { blogPosts } from "@/data/blog";

const SearchContext = createContext(null);

const STORAGE_KEY = "msdevx_recent_searches";
const MAX_RECENT = 8;

function buildItems() {
  const tools = toolsData.map((t) => ({
    id: `tool-${t.slug}`,
    type: "Tool",
    icon: t.icon,
    title: t.name,
    description: t.fullDescription || t.description,
    category: t.categoryName,
    slug: t.slug,
    url: `/tools/${t.slug}`,
    keywords: t.keywords || [],
    tags: [],
  }));

  const blogs = blogPosts.map((b) => ({
    id: `blog-${b.slug}`,
    type: "Blog",
    icon: "📝",
    title: b.title,
    description: b.excerpt || b.title,
    category: b.category,
    slug: b.slug,
    url: `/blog/${b.slug}`,
    keywords: [],
    tags: b.tags || [],
  }));

  const cats = categories.map((c) => ({
    id: `category-${c.id}`,
    type: "Category",
    icon: c.icon,
    title: c.name,
    description: `Browse all ${c.name} tools`,
    category: c.name,
    slug: c.id,
    url: `/#${c.id}`,
    keywords: [c.name, ...c.name.split(" ")],
    tags: [],
  }));

  return [...tools, ...blogs, ...cats];
}

const FUSE_OPTIONS = {
  threshold: 0.4,
  distance: 100,
  minMatchCharLength: 1,
  keys: [
    { name: "title", weight: 4 },
    { name: "keywords", weight: 3 },
    { name: "tags", weight: 2 },
    { name: "description", weight: 1.5 },
    { name: "category", weight: 1 },
  ],
};

function loadRecent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveRecent(items) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_RECENT))); } catch { /* ignore */ }
}

export function SearchProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedIdx, setSelectedIdx] = useState(-1);

  const items = useMemo(() => buildItems(), []);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    import("fuse.js").then((mod) => {
      const Fuse = mod.default;
      setFuse(new Fuse(items, FUSE_OPTIONS));
    });
  }, [items]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecent(loadRecent());
  }, []);

  const results = useMemo(() => {
    let filtered;
    if (!query.trim()) {
      filtered = [...items];
    } else {
      if (!fuse) return [];
      const raw = fuse.search(query.trim());
      filtered = raw.map((r) => r.item);
    }
    if (categoryFilter !== "all") {
      filtered = filtered.filter((item) => {
        if (categoryFilter === "tools") return item.type === "Tool";
        if (categoryFilter === "blog") return item.type === "Blog";
        return item.category.toLowerCase() === categoryFilter.toLowerCase();
      });
    }
    return filtered.slice(0, query.trim() ? 20 : 50);
  }, [query, categoryFilter, items, fuse]);

  const open = useCallback(() => { setIsOpen(true); setSelectedIdx(-1); }, []);
  const close = useCallback(() => { setIsOpen(false); setQuery(""); setCategoryFilter("all"); setSelectedIdx(-1); }, []);

  const addRecent = useCallback((item) => {
    setRecent((prev) => {
      const filtered = prev.filter((r) => r.id !== item.id);
      const next = [item, ...filtered].slice(0, MAX_RECENT);
      saveRecent(next);
      return next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    saveRecent([]);
  }, []);

  const selectItem = useCallback((item) => {
    addRecent(item);
    close();
  }, [addRecent, close]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx((p) => Math.min(p + 1, (results.length || recent.length) - 1)); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIdx((p) => Math.max(p - 1, 0)); return; }
    if (e.key === "Enter" && selectedIdx >= 0) {
      e.preventDefault();
      const list = results.length > 0 ? results : recent;
      if (list[selectedIdx]) selectItem(list[selectedIdx]);
    }
  }, [close, results, recent, selectedIdx, selectItem]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((p) => !p);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const value = useMemo(() => ({
    isOpen, open, close,
    query, setQuery,
    results,
    recent, addRecent, clearRecent,
    categoryFilter, setCategoryFilter,
    selectedIdx, setSelectedIdx,
    handleKeyDown,
    selectItem,
  }), [isOpen, open, close, query, results, recent, addRecent, clearRecent, categoryFilter, selectedIdx, handleKeyDown, selectItem]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}
