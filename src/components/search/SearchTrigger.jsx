"use client";

import { useCallback } from "react";
import { useSearch } from "./SearchProvider";

export function SearchTrigger({ variant = "navbar", className = "" }) {
  const { open } = useSearch();

  const handleClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    open();
  }, [open]);

  if (variant === "navbar") {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-soft hover:border-brand-light hover:bg-card transition-all cursor-pointer text-sm group ${className}`}
        aria-label="Search (Ctrl+K)"
        type="button"
      >
        <svg className="w-4 h-4 text-text-muted group-hover:text-brand transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-sm text-text-muted hidden sm:inline">Search</span>
        <kbd className="hidden md:inline-flex px-1.5 py-0.5 rounded text-[10px] font-mono bg-card border border-border text-text-muted">Ctrl+K</kbd>
      </button>
    );
  }

  if (variant === "hero") {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center gap-3 w-full max-w-xl mx-auto px-5 py-3.5 rounded-xl border-2 border-dashed border-border bg-card hover:border-brand hover:bg-brand-light/30 transition-all cursor-pointer group ${className}`}
        aria-label="Search tools (Ctrl+K)"
        type="button"
      >
        <svg className="w-5 h-5 text-text-muted group-hover:text-brand transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-base text-text-muted group-hover:text-text transition-colors">Find the perfect tool instantly...</span>
        <kbd className="ml-auto shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono bg-soft border border-border text-text-muted">Ctrl+K</kbd>
      </button>
    );
  }

  if (variant === "mobile") {
    return (
      <button
        onClick={handleClick}
        className="flex items-center justify-center w-9 h-9 rounded-lg text-text-muted hover:text-brand hover:bg-soft transition-all cursor-pointer"
        aria-label="Search (Ctrl+K)"
        type="button"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    );
  }

  return null;
}
