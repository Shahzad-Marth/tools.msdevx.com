"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { siteConfig } from "@/data/site";
import { navLinks } from "@/data/site";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-card/85 dark:bg-card/90 backdrop-blur-lg border-b border-border">
      <Link href="/" className="text-xl md:text-2xl font-extrabold text-brand tracking-tight">
        {siteConfig.name}
      </Link>

      <div className="flex items-center gap-2">
        <SearchTrigger variant="mobile" />
        <ThemeToggle />

        <button
          className="hamburger text-3xl cursor-pointer text-text md:hidden z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:items-center gap-2 md:gap-0 absolute md:relative top-16 md:top-0 right-5 md:right-0 bg-card md:bg-transparent p-4 md:p-0 border border-border md:border-none rounded-lg md:rounded-none shadow-card md:shadow-none`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="px-3 py-2 text-sm md:text-base font-medium text-text-muted hover:text-brand transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
