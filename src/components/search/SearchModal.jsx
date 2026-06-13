"use client";

import { useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearch } from "./SearchProvider";

const categoryOptions = [
  { value: "all", label: "All" },
  { value: "tools", label: "Tools" },
  { value: "blog", label: "Blog" },
];

export function SearchModal() {
  const {
    isOpen, close, query, setQuery,
    results, recent, clearRecent,
    categoryFilter, setCategoryFilter,
    selectedIdx, handleKeyDown, selectItem,
  } = useSearch();

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === overlayRef.current) close();
  }, [close]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (selectedIdx >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[data-search-item]");
      if (items[selectedIdx]) items[selectedIdx].scrollIntoView({ block: "nearest" });
    }
  }, [selectedIdx]);

  const showRecent = query.trim() === "" && recent.length > 0 && categoryFilter === "all";
  const displayItems = results.length > 0 ? results : showRecent ? recent : [];

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search tools, blogs, and categories"
    >
      <div className="w-full max-w-2xl mx-4 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <svg className="w-5 h-5 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, blogs, and categories..."
            className="flex-1 bg-transparent border-none outline-none text-text placeholder:text-text-muted text-base"
            aria-label="Search"
            autoComplete="off"
            spellCheck={false}
          />
          <div className="flex items-center gap-1.5 shrink-0">
            {categoryOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setCategoryFilter(opt.value)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  categoryFilter === opt.value
                    ? "bg-brand text-white"
                    : "bg-soft text-text-muted hover:text-text"
                }`}
                aria-pressed={categoryFilter === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-mono bg-soft border border-border text-text-muted">ESC</kbd>
        </div>

        <div ref={listRef} className="max-h-[60vh] overflow-y-auto">
          {displayItems.length > 0 && (
            <div className="px-3 pt-3 pb-1">
              <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold px-2">
                {query.trim() ? `Results (${results.length})` : `Browse ${categoryFilter === "all" ? "All" : categoryFilter} (${results.length})`}
              </p>
            </div>
          )}

          {displayItems.map((item, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <Link
                key={item.id}
                href={item.url}
                data-search-item
                onClick={() => selectItem(item)}
                className={`flex items-center gap-3 mx-3 px-3 py-2.5 rounded-xl transition-all ${
                  isSelected ? "bg-brand-light border border-brand/20" : "hover:bg-soft border border-transparent"
                }`}
              >
                <span className="text-xl shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold truncate ${isSelected ? "text-brand" : "text-text"}`}>
                      {item.title}
                    </span>
                    <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      item.type === "Tool" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" :
                      item.type === "Blog" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" :
                      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted truncate mt-0.5">{item.description}</p>
                </div>
                <span className="text-[10px] text-text-muted shrink-0 hidden sm:block">{item.category}</span>
              </Link>
            );
          })}

          {showRecent && (
            <>
              <div className="flex items-center justify-between px-5 pt-3 pb-1">
                <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Recent</p>
                <button onClick={clearRecent} className="text-[10px] text-text-muted hover:text-red-400 transition-colors cursor-pointer">Clear</button>
              </div>
              {recent.slice(0, 5).map((item, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    data-search-item
                    onClick={() => selectItem(item)}
                    className={`flex items-center gap-3 mx-3 px-3 py-2.5 rounded-xl transition-all ${
                      isSelected ? "bg-brand-light border border-brand/20" : "hover:bg-soft border border-transparent"
                    }`}
                    style={{ textDecoration: "none" }}
                  >
                    <span className="text-lg shrink-0 opacity-60">🕐</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold truncate ${isSelected ? "text-brand" : "text-text"}`}>
                          {item.title}
                        </span>
                        <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          item.type === "Tool" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" :
                          item.type === "Blog" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" :
                          "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                        }`}>{item.type}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </>
          )}

          {query.trim() !== "" && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <span className="text-4xl mb-3">🔍</span>
              <p className="text-text font-semibold mb-1">No results found</p>
              <p className="text-sm text-text-muted max-w-xs">
                Try a different search term or browse{" "}
                <Link href="/#tools" onClick={close} className="text-brand hover:underline">all tools</Link>
              </p>
            </div>
          )}

          {query.trim() === "" && !showRecent && displayItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <span className="text-4xl mb-3">🔎</span>
              <p className="text-text font-semibold mb-1">Search everything</p>
              <p className="text-sm text-text-muted max-w-xs">
                Type to search or click <strong>All</strong>, <strong>Tools</strong>, or <strong>Blog</strong> above to browse
              </p>
              <div className="flex gap-2 mt-4 text-xs text-text-muted">
                <kbd className="px-1.5 py-0.5 rounded bg-soft border border-border font-mono">↑↓</kbd>
                <span>navigate</span>
                <kbd className="px-1.5 py-0.5 rounded bg-soft border border-border font-mono">↵</kbd>
                <span>open</span>
                <kbd className="px-1.5 py-0.5 rounded bg-soft border border-border font-mono">ESC</kbd>
                <span>close</span>
              </div>
            </div>
          )}

          <div className="px-5 py-2 border-t border-border flex items-center justify-between text-[10px] text-text-muted">
            <span>Press Ctrl+K to open search anytime</span>
            <span>Fuse.js fuzzy search</span>
          </div>
        </div>
      </div>
    </div>
  );
}
