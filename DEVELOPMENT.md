# MS Tools — Development Guide

## Table of Contents
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Architecture Decisions](#architecture-decisions)
- [Adding a New Tool](#adding-a-new-tool)
- [Adding a New Blog Post](#adding-a-new-blog-post)
- [Updating an Existing Tool](#updating-an-existing-tool)
- [Blog Components](#blog-components)
- [Theme System](#theme-system)
- [Routing](#routing)
- [Performance Optimizations](#performance-optimizations)
- [Build & Deployment](#build--deployment)
- [Key Files Reference](#key-files-reference)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

**tools.marth.systems** is a **Next.js 16 App Router** application with **65 interactive tools** and **79 blog posts**.

### Key Technologies

| Tech | Version | Purpose |
|------|---------|---------|
| Next.js | ^16.2.6 | Framework (App Router) |
| React | ^19.2.6 | UI library |
| Tailwind CSS | ^3.4.17 | Styling |
| next-themes | ^0.4.6 | Light/dark/system theme |
| lucide-react | latest | Icons |
| fuse.js | ^7.3.0 | Global search (tools + blogs) |
| qrcode | ^1.5.4 | QR code generator tool |
| Web3Forms | — | Contact form backend |
| Google Analytics | G-F6RQ7H08D6 | Analytics |
| Google AdSense | ca-pub-8684958562988579 | Advertising |
| pdf-lib | ^1.17.7 | Client-side PDF creation/modification |
| pdfjs-dist | ^5.7.284 | Client-side PDF rendering/text extraction |

### Architecture

- **App Router only** — zero Pages Router
- **Server Components by default**, Client Components (`"use client"`) only for interactive tools
- **Static Site Generation (SSG)** for all routes via `generateStaticParams`
- **176 static pages** generated at build time

---

## Project Structure

```
├── public/                          # Static assets
│   ├── assets/OG/OG.png            # Open Graph image (1.5MB → resize recommended)
│   ├── favicon.ico / .svg / -96x96.png
│   ├── apple-touch-icon.png
│   ├── pdf.worker.min.mjs          # pdfjs-dist worker (local copy, avoids CDN)
│   ├── site.webmanifest
│   └── ads.txt
│
├── src/
│   ├── app/                          # NEXT.JS APP ROUTER
│   │   ├── layout.jsx                # Root layout (anti-flicker theme script, AdSense, ThemeProvider, Navbar, Footer, Analytics, CookieBanner)
│   │   ├── page.jsx                  # Home page (hero, tools grid by category, popular tools, SEO content, testimonials, CTA)
│   │   ├── globals.css               # Tailwind + CSS variables + dark mode overrides + performance optimizations
│   │   ├── not-found.jsx             # 404 page
│   │   ├── error.jsx                 # Error boundary
│   │   ├── loading.jsx               # Global loading state
│   │   ├── sitemap.js                # Dynamic sitemap (168 URLs)
│   │   ├── robots.js                 # Dynamic robots.txt
│   │   ├── about/page.jsx
│   │   ├── contact/page.jsx
│   │   ├── privacy/page.jsx
│   │   ├── cookies/page.jsx
│   │   ├── blog/
│   │   │   ├── page.jsx              # Blog listing (Server Component, uses BlogLayout + BlogCategoryNav + BlogGrid)
│   │   │   └── [slug]/page.jsx       # Dual-purpose: blog post (SSG, 79 posts) OR category listing (SSG, 7 categories)
│   │   ├── tools/
│   │   │   └── [slug]/page.jsx       # Tool page engine (SSG, 59 tools)
│   │   └── (hubs)/
│   │       └── [slug]/page.jsx       # Category hub pages (SSG, 12 alt-slug category pages)
│   │
│   ├── components/
│   │   ├── ads/
│   │   │   └── AdSlot.jsx            # Responsive AdSense ad slot (Client Component)
│   │   │
│   │   ├── blog/                     # Reusable blog components
│   │   │   ├── BlogLayout.jsx        # Shared layout wrapper (JSON-LD + breadcrumbs + container)
│   │   │   ├── BlogCategoryNav.jsx   # Category pill navigation with active state
│   │   │   ├── BlogGrid.jsx          # Blog post card grid
│   │   │   ├── Breadcrumbs.jsx       # Reusable breadcrumb navigation
│   │   │   ├── TableOfContents.jsx   # Heading extraction + sticky nav
│   │   │   ├── AuthorSection.jsx     # Author bio card
│   │   │   ├── BlogFAQ.jsx           # FAQ accordion component
│   │   │   └── index.js              # Barrel re-exports
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx            # Sticky nav with theme toggle + search trigger (Client Component)
│   │   │   ├── Footer.jsx            # Footer with links
│   │   │   ├── ThemeToggle.jsx       # 3-state theme toggle (light/system/dark) (Client Component)
│   │   │   ├── ThemeProvider.jsx     # next-themes provider wrapper (Client Component)
│   │   │   └── CookieBanner.jsx      # Cookie consent UI with settings panel (Client Component)
│   │   │
│   │   ├── search/                   # Global search system
│   │   │   ├── SearchProvider.jsx    # Context provider with Fuse.js (Client Component)
│   │   │   ├── SearchModal.jsx       # Modal overlay with keyboard nav (Client Component)
│   │   │   └── SearchTrigger.jsx     # Button to open search (variants: navbar, hero, mobile)
│   │   │
│   │   ├── tools/                    # ALL 65 TOOL COMPONENTS (Client Components)
│   │   │   ├── AgeCalculator.jsx
│   │   │   ├── TdeeCalculator.jsx
│   │   │   ├── UnitConverter.jsx
│   │   │   ├── PasswordGenerator.jsx
│   │   │   ├── ImageToPdf.jsx        # PDF: image → PDF
│   │   │   ├── MergePdf.jsx          # PDF: merge multiple
│   │   │   ├── SplitPdf.jsx          # PDF: extract pages
│   │   │   ├── PdfToImages.jsx       # PDF: render as PNG/JPEG
│   │   │   ├── PdfToText.jsx         # PDF: extract text
│   │   │   ├── ImageCompressor.jsx   # Image: compress to 100KB/200KB/500KB
│   │   │   ├── PdfCompressor.jsx     # PDF: compress via JPEG render
│   │   │   └── ... (54 more)
│   │   │   ├── RelatedTools.jsx      # Related tools/blogs component
│   │   │   ├── RecentlyViewedTools.jsx
│   │   │   ├── TrackView.jsx
│   │   │   └── CategoryFilter.jsx    # Search/filter within a category
│   │   │
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── Button.jsx            # Button + ButtonLink (variants: primary, secondary, outline, ghost)
│   │   │   ├── ResultBox.jsx         # Result display wrapper
│   │   │   ├── ToolCard.jsx          # Tool card for grids (compact design with line-clamp-2)
│   │   │   ├── SectionHeader.jsx     # Section title/subtitle (with optional eyebrow)
│   │   │   ├── BlogCTA.jsx           # Call-to-action section for blog posts
│   │   │   └── Loader.jsx            # PageLoader + ToolLoader
│   │   │
│   │   └── seo/
│   │       ├── Analytics.jsx         # GA (next/script lazyOnload) + consent defaults
│   │       └── JsonLd.jsx            # Structured data helper (renders <script type="application/ld+json">)
│   │
│   ├── data/
│   │   ├── registry/                 # Central data registry
│   │   │   ├── tools-data.js         # 59 tool metadata entries
│   │   │   ├── blog-data.js          # 79 blog post metadata entries
│   │   │   ├── blog-components.js    # BLOG_COMPONENT_MAP (slug → content component)
│   │   │   ├── tool-components.js    # COMPONENT_MAP (slug → tool component name)
│   │   │   ├── tools.js              # Enriched tools + related tools computation
│   │   │   ├── blogs.js              # Enriched blogs + category helpers + cluster helpers
│   │   │   ├── categories.js         # Category data + virtual categories (Fitness, Productivity, Student)
│   │   │   ├── seo.js                # generateToolMetadata / generateBlogMetadata helpers
│   │   │   ├── dynamicImports.js     # Re-exports COMPONENT_MAP from tool-components
│   │   │   └── index.js              # Barrel re-exports
│   │   │
│   │   ├── blogContent/              # 79 blog post JSX content components
│   │   │   ├── TdeeCalculatorBlog.jsx
│   │   │   ├── AgeCalculatorBlog.jsx
│   │   │   └── ... (77 more)
│   │   │
│   │   ├── tools.js                  # Re-exports from registry/tools
│   │   ├── blog.js                   # Re-exports from registry/blogs
│   │   ├── site.js                   # Nav links, footer links, site config (name, domain, GA ID)
│   │   └── currencies.js             # Currency data for converters
│   │
│   ├── hooks/
│   │   └── useRecentlyViewed.js      # Custom hook for recently viewed tools (localStorage)
│   │
│   └── types/
│       └── index.js                  # JSDoc typedefs (Tool, Category, BlogPost, SiteConfig)
│
├── next.config.js                    # Next.js configuration (image formats, optimizePackageImports)
├── tailwind.config.js                # darkMode: "class", custom brand colors, box shadows
├── vercel.json                       # Vercel config (framework: nextjs, security headers)
├── jsconfig.json                     # Path alias @/ → ./src/
├── package.json
└── DEVELOPMENT.md                    # This file
```

---

## Architecture Decisions

### Server vs Client Components

| Type | When to use | Examples |
|------|-------------|---------|
| Server Component | Static content, SEO pages, data fetching | `page.jsx`, `about/page.jsx`, `blog/page.jsx`, `BlogLayout`, `BlogCategoryNav`, `BlogGrid`, `Breadcrumbs`, `TableOfContents`, `AuthorSection` |
| Client Component | Interactivity, hooks (useState, useEffect, useTheme) | All tools, Navbar, ThemeToggle, CookieBanner, SearchProvider, SearchModal |

**Rule:** Add `"use client"` only when you use hooks, browser APIs, or event handlers. Blog components like `BlogLayout`, `BlogCategoryNav`, `BlogGrid` are intentionally kept as Server Components to avoid hydration cost.

### SSG (Static Site Generation)

All dynamic routes use `generateStaticParams`:

| Route | Pages |
|-------|-------|
| `tools/[slug]/page.jsx` | 65 tool pages |
| `blog/[slug]/page.jsx` | 79 blog posts + 7 category listing pages |
| `(hubs)/[slug]/page.jsx` | 12 category hub pages |

This means:
- All pages are pre-rendered to HTML at build time
- No server-side execution at request time
- Fastest possible load on Vercel

### Data Registry Pattern

Tool and blog data is organized in `src/data/registry/` using a layered approach:

1. **Raw data** (`tools-data.js`, `blog-data.js`) — metadata only, no enrichment
2. **Enrichment** (`tools.js`, `blogs.js`) — adds computed fields (contentComponent, seo, relatedTools)
3. **Re-exports** (`tools.js`, `blog.js` at src/data/) — public API consumed by pages
4. **Component maps** (`tool-components.js`, `blog-components.js`) — slug-to-component mapping for dynamic imports

### Dynamic Imports

Tool components use `next/dynamic` for route-level code splitting via the `COMPONENT_MAP` registry:

```jsx
const toolComponents = Object.fromEntries(
  Object.entries(COMPONENT_MAP).map(([slug, component]) => [
    slug,
    dynamic(() => import(/* webpackChunkName: "tool" */ `@/components/tools/${component}`), {
      loading: () => <ToolLoader />,
    }),
  ])
);
```

This keeps the initial bundle small — tools load only when navigated to.

### Blog Component Architecture

Reusable blog components in `src/components/blog/` eliminate duplicated markup:

```jsx
<BlogLayout jsonLd={data} breadcrumbs={items}>
  <BlogCategoryNav categories={cats} activeSlug={slug} />
  <BlogGrid posts={posts} showCategoryLinks />
</BlogLayout>
```

Both `/blog` and `/blog/[category]` use the same layout, nav, and grid — the category page is just a filtered version with `activeSlug` set.

### next-themes Configuration

```jsx
<NextThemesProvider
  attribute="class"          // Adds 'dark' class to <html>
  defaultTheme="system"      // Follow OS preference by default
  enableSystem               // Enable system theme detection
  storageKey="theme_marth"   // localStorage key
  disableTransitionOnChange  // Prevent transition flicker on theme swap
>
```

- Anti-flicker script in `layout.jsx` `<head>` applies the stored theme before React hydrates
- `suppressHydrationWarning` on `<html>` prevents hydration mismatch

### Analytics & AdSense

All third-party scripts use `next/script` with appropriate loading strategies for performance:

| Script | Component | Strategy | Loading |
|--------|-----------|----------|---------|
| Google Analytics | `Analytics.jsx` | `lazyOnload` | Loads during browser idle time |
| Google AdSense | `layout.jsx` | `afterInteractive` | Loads after page is interactive |

- Consent defaults are set to `"denied"` for all storage types
- **CookieBanner** updates GA consent via `gtag("consent", "update", ...)` after user interaction
- Both scripts are required alongside DNS verification (Namecheap) for AdSense to serve ads

### AdSlot Component

- **File:** `src/components/ads/AdSlot.jsx` (Client Component)
- **Ad unit:** `3516852997` · Publisher: `ca-pub-8684958562988579`
- **Format:** `auto` with `data-full-width-responsive="true"`
- **Two ads per page** — placed before Share buttons and before Related Tools sections
- **Wrapper `min-h-[90px]`** provides visible empty space in dev; AdSense fills in production
- Single `adsbygoogle.push({})` per slot, guarded by `useRef` to prevent double-push

### Performance Optimizations

Current optimizations applied:

| Optimization | Impact |
|-------------|--------|
| **`next/script` with `afterInteractive`** for AdSense | Removes render-blocking script from critical path |
| **`next/script` with `lazyOnload`** for GA | Defers analytics to browser idle time |
| **`content-visibility: auto`** on below-fold sections | Defers paint of off-screen content (Popular Tools, SEO, Testimonials, CTA) |
| **`contain-intrinsic-size`** | Prevents CLS from content-visibility |
| **Targeted transitions** instead of universal `*` selector | Reduces style recalc on DOM mutations |
| **Reduced font weights** (Inter 400/600/700/800, dropped 500) | Smaller font download |
| **Tool code-splitting** via `next/dynamic` | Per-tool bundles, not global |
| **`optimizePackageImports`** for lucide-react + next-themes | Tree-shaken imports |
| **OG image: WebP/AVIF** configured in next.config.js | Automatic image optimization |

---

## Adding a New Tool

### Step 1: Create the Tool Component

Create a new file in `src/components/tools/YourNewTool.jsx`:

```jsx
"use client";

import { useState, useEffect } from "react";
import { ResultBox } from "@/components/ui/ResultBox";

export default function YourNewTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!input) { setResult(null); return; }
    const value = parseFloat(input) * 2;
    setResult({
      value,
      formatted: value.toLocaleString(),
    });
  }, [input]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-2">
            Input
          </label>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-[var(--text)] bg-[var(--bg-card)]"
          />
        </div>
      </div>

      {result && (
        <ResultBox show={true}>
          <div className="text-center p-4 bg-[var(--brand-light)] rounded-xl">
            <span className="text-2xl font-extrabold text-brand">
              {result.formatted}
            </span>
          </div>
        </ResultBox>
      )}
    </div>
  );
}
```

**Requirements:**
- Must have `"use client"` at the top
- Must have a **default export** (for `next/dynamic`)
- Use CSS variables for colors (see [Dark Mode Support](#dark-mode-support))
- Auto-calculate with `useEffect` (no "Calculate" buttons)

### Step 2: Add Tool Metadata

Add an entry to `src/data/registry/tools-data.js`:

```javascript
{
  slug: "your-new-tool",
  name: "Your New Tool",
  title: "Your New Tool | MS Tools",
  description: "Short description for cards and meta.",
  fullDescription: "Longer description for the tool page header.",
  category: "utilities",          // See categories below
  categoryName: "Utilities",
  icon: "🧮",
  keywords: ["keyword1", "keyword2"],
  howToUse: ["Step 1: Enter your value", "Step 2: See the result"],
},
```

**Categories:** `date-time`, `finance`, `math`, `health`, `text`, `security`, `converter`, `utilities`, `academic`

### Step 3: Register the Component Name Mapping

The tool page uses a `COMPONENT_MAP` that maps slugs to component filenames. This is handled automatically by `src/data/registry/tool-components.js` via a `pascalCase` function, but add an override if the component name doesn't match:

```javascript
// src/data/registry/tool-components.js
const OVERRIDES = {
  "how-old-am-i-in-seconds": "AgeInSeconds",
  "what-day-was-i-born": "WhatDayWasI",
  "date-difference": "DateDifferenceCalculator",
  // add your override here if needed
};
```

The default mapping converts `your-new-tool` → `YourNewTool` component name. If your component export matches, no override needed.

### Step 4: Test

```bash
npm run dev
# Visit http://localhost:3000/tools/your-new-tool
npm run build  # Verify SSG generates the page
```

---

## Adding a New Blog Post

### Step 1: Create Content

Create `src/data/blogContent/YourBlogPost.jsx`:

```jsx
import Link from "next/link";
import { BlogCTA } from "@/components/ui/BlogCTA";

export const YourBlogPost = {
  metaTitle: "Your Blog Post | MS Tools",
  metaDescription: "SEO description for this blog post.",
  content: (
    <>
      <h1>Your Blog Post Title</h1>
      <p>Content here...</p>
      <Link href="/tools/your-tool">Link to a tool</Link>
      <BlogCTA
        title="Ready to try the tool?"
        description="Put what you learned into practice."
        buttonText="Try It Now →"
        buttonHref="/tools/your-tool"
      />
    </>
  ),
};
```

**Note:** Use `import Link from "next/link"` (default import) and `href` prop (not `to`).

### Step 2: Register in Blog Data

1. Add metadata to `src/data/registry/blog-data.js`:
```javascript
{
  slug: "your-blog-post",
  title: "Your Blog Post Title",
  excerpt: "Brief description...",
  date: "2026-05-26",
  readTime: "6 min read",
  category: "Health",        // One of the existing categories
  tags: ["tag1", "tag2"],
  author: "MS Tools",
  toolSlugs: ["your-tool"],  // Links to related tools
},
```

2. Import and register the content component in `src/data/registry/blog-components.js`:
```javascript
import { YourBlogPost } from "@/data/blogContent/YourBlogPost";

export const BLOG_COMPONENT_MAP = {
  // ... existing entries
  "your-blog-post": YourBlogPost,
};
```

### Step 3: Topic Clusters (Optional)

For multi-post educational series, use the pillar/cluster system:

```javascript
// In blog-data.js:
{
  slug: "how-many-calories-should-i-eat",
  pillarSlug: "tdee-calculator",  // Parent pillar post slug
  clusterOrder: 1,                  // Display order in cluster nav
  toolSlugs: ["tdee-calculator"],
  // ...
}
```

The cluster navigation renders automatically on blog posts with matching `pillarSlug` values.

### Step 4: Verify

```bash
npm run build  # Blog post will be SSG'd
```

---

## Blog Components

All reusable blog components live in `src/components/blog/`:

| Component | Server/Client | Props | Purpose |
|-----------|--------------|-------|---------|
| `BlogLayout` | Server | `{ jsonLd, breadcrumbs, children }` | JSON-LD + breadcrumbs + container |
| `BlogCategoryNav` | Server | `{ categories, activeSlug, className }` | Category pills with active highlight |
| `BlogGrid` | Server | `{ posts, showCategoryLinks, variant }` | Post card grid with line-clamp-2 |
| `Breadcrumbs` | Server | `{ items: [{label, href?}], className }` | ARIA-compliant breadcrumb nav |
| `TableOfContents` | Server | `{ headings, content, title }` | `<h2>` extraction + sticky nav |
| `AuthorSection` | Server | `{ author, description, avatar }` | Author bio card |
| `BlogFAQ` | Server | `{ items: [{question, answer}], title }` | `<details>` accordion |

Components are imported from `@/components/blog` or re-exported via `@/components/ui`.

---

## Theme System

### How It Works

1. Anti-flicker `<script>` in `layout.jsx` reads `localStorage('theme_marth')` and sets the `dark`/`light` class before React hydrates
2. `ThemeProvider` wraps the app with `next-themes`
3. `ThemeToggle` cycles through `light` → `dark` → `system` → `light`
4. The active theme is stored in `localStorage` with key `theme_marth`

### CSS Variables

| Variable | Light | Dark | Usage |
|----------|-------|------|-------|
| `--bg` | `#ffffff` | `#0a0a0f` | Page background |
| `--bg-card` | `#ffffff` | `#14141c` | Card background |
| `--bg-soft` | `#f8f9fc` | `#111118` | Soft background |
| `--text` | `#1a1a2e` | `#f0f0f5` | Primary text |
| `--text-muted` | `#5a5a7a` | `#9a9ab0` | Secondary text |
| `--border` | `#e8e8f0` | `#2a2a35` | Borders |
| `--brand` | `#1e40af` | `#3b82f6` | Brand color |
| `--brand-light` | `#dbeafe` | `rgba(59,130,246,0.15)` | Light brand bg |

### Usage in Components

```jsx
// Always use CSS variables, never hardcoded colors
<div className="bg-[var(--bg-card)] text-[var(--text)] border border-[var(--border)]" />
<p className="text-[var(--text-muted)]">Secondary text</p>
<span className="bg-[var(--brand-light)] text-brand">Badge</span>
```

---

## Routing

### App Router Structure

| Route | Type | Pages | File |
|-------|------|-------|------|
| `/` | Static | 1 | `src/app/page.jsx` |
| `/about` | Static | 1 | `src/app/about/page.jsx` |
| `/contact` | Static | 1 | `src/app/contact/page.jsx` |
| `/privacy` | Static | 1 | `src/app/privacy/page.jsx` |
| `/cookies` | Static | 1 | `src/app/cookies/page.jsx` |
| `/blog` | Static | 1 | `src/app/blog/page.jsx` |
| `/blog/[slug]` | SSG | 79 posts + 7 categories | `src/app/blog/[slug]/page.jsx` |
| `/tools/[slug]` | SSG | 65 tools | `src/app/tools/[slug]/page.jsx` |
| `/[slug]` (hubs) | SSG | 12 category hubs | `src/app/(hubs)/[slug]/page.jsx` |
| `/categories` | Static | 1 | `src/app/categories/page.jsx` |
| `/categories/[slug]` | Redirect | N/A | `src/app/categories/[slug]/page.jsx` |
| `/sitemap.xml` | Dynamic | 1 | `src/app/sitemap.js` |
| `/robots.txt` | Dynamic | 1 | `src/app/robots.js` |

### Async params (Next.js 15+)

In Next.js 15+, `params` is a Promise in page components and `generateMetadata`. Always use `async/await`:

```jsx
export default async function Page({ params }) {
  const { slug } = await params;
  // ...
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  // ...
}
```

### Linking

```jsx
import Link from "next/link";     // Default import (NOT named import)
<Link href="/tools/age-calculator">Age Calculator</Link>  // href prop (NOT "to")
```

---

## Performance Optimizations

### Already Applied

| Optimization | Location | Impact |
|-------------|----------|--------|
| AdSense via `next/script afterInteractive` | `layout.jsx` | Removes render-blocking script |
| GA via `next/script lazyOnload` | `Analytics.jsx` | Defers analytics to idle time |
| `content-visibility: auto` on 4 below-fold sections | `page.jsx` | Defers off-screen paint |
| `contain-intrinsic-size` | `globals.css` | Prevents CLS from content-visibility |
| Targeted transitions (no universal `*` selector) | `globals.css` | Reduces style recalc cost |
| Reduced font weights (dropped Inter 500) | `layout.jsx` | Smaller font file |
| Tool code-splitting via `next/dynamic` | `tools/[slug]/page.jsx` | Per-tool JS bundles |
| `optimizePackageImports` | `next.config.js` | Tree-shaken lucide-react + next-themes |
| WebP/AVIF image optimization | `next.config.js` | Automatic format conversion |
| JSX content components | `blogContent/*.jsx` | Zero JS shipped for blog content |

### Mobile Performance Tips

- **OG image:** The OG.png is 1.5MB. Convert to WebP or compress significantly.
- **Fuse.js:** Loads on every page via SearchProvider. Consider dynamic import.
- **ToolCard transitions:** `line-clamp-2` keeps card heights consistent, reducing layout shifts.
- **Avoid `* { transition: ... }`** — always use targeted selectors.

---

## Build & Deployment

### Local Development

```bash
npm install        # First time or after dependency changes
npm run dev        # Start at http://localhost:3000
npm run build      # Production build (generates .next/)
```

### Vercel Deployment

The project auto-deploys from GitHub via Vercel integration.

**vercel.json:**
```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next"
}
```

**Deploy steps:**
1. Commit and push to `main`:
```bash
git add .
git commit -m "description of changes"
git push origin main
```
2. Vercel auto-deploys (check https://vercel.com/dashboard)

---

## Key Files Reference

### Configuration

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js options (image formats: avif/webp, optimizePackageImports) |
| `tailwind.config.js` | `darkMode: "class"`, brand colors, font family, box shadows |
| `vercel.json` | Framework config, security headers, asset caching |
| `jsconfig.json` | `@/` path alias to `./src/` |

### App Router Pages

| File | Purpose |
|------|---------|
| `src/app/layout.jsx` | Root layout — anti-flicker theme script, AdSense (next/script afterInteractive), ThemeProvider, Navbar, Footer, Analytics, CookieBanner |
| `src/app/page.jsx` | Home page with hero, tools grid by category, popular tools, SEO content, testimonials, CTA |
| `src/app/tools/[slug]/page.jsx` | Dynamic tool page engine — generateStaticParams (65 tools), generateMetadata, dynamic imports via COMPONENT_MAP, breadcrumbs, how-to-use, related tools/articles, 2 AdSense slots |
| `src/app/blog/[slug]/page.jsx` | Dual-purpose: blog post (generateMetadata, JsonLd, ToC, author, related tools, cluster nav) OR category listing (BlogLayout + BlogCategoryNav + BlogGrid) |
| `src/app/(hubs)/[slug]/page.jsx` | Category hub pages — hero, tools grid, category filter, FAQs, related categories |
| `src/app/sitemap.js` | Dynamic sitemap (176 URLs with priorities) |
| `src/app/robots.js` | Dynamic robots.txt |

### Data

| File | Purpose |
|------|---------|
| `src/data/registry/tools-data.js` | 65 tool entries with slug, name, title, description, category, icon, keywords, howToUse |
| `src/data/registry/blog-data.js` | 79 blog posts with slugs, metadata, pillarSlug, clusterOrder, toolSlugs |
| `src/data/registry/blog-components.js` | BLOG_COMPONENT_MAP — maps 79+ slugs to content components |
| `src/data/registry/tool-components.js` | COMPONENT_MAP — maps slugs to component names (pascalCase + overrides) |
| `src/data/registry/tools.js` | Enriched tools + getToolBySlug + getToolsByCategory + computeRelatedTools |
| `src/data/registry/blogs.js` | Enriched blogs + getBlogPostBySlug + getBlogsForCategoryPage + getClusterPosts |
| `src/data/registry/categories.js` | 9 base categories + 3 virtual categories (Fitness, Productivity, Student) + SEO metadata |
| `src/data/registry/seo.js` | generateToolMetadata + generateBlogMetadata (OG, Twitter, canonical) |
| `src/data/site.js` | Nav links, footer links, site config (name, domain, GA ID) |

### Blog Components

| Component | File | Purpose |
|-----------|------|---------|
| `BlogLayout` | `src/components/blog/BlogLayout.jsx` | JSON-LD + breadcrumbs + container wrapper |
| `BlogCategoryNav` | `src/components/blog/BlogCategoryNav.jsx` | Category pills with `aria-current` active state |
| `BlogGrid` | `src/components/blog/BlogGrid.jsx` | Post cards with line-clamp-2, optional category links |
| `Breadcrumbs` | `src/components/blog/Breadcrumbs.jsx` | ARIA breadcrumb nav with schema-compatible markup |
| `TableOfContents` | `src/components/blog/TableOfContents.jsx` | Extract `<h2>` headings, render sticky nav |
| `AuthorSection` | `src/components/blog/AuthorSection.jsx` | Author avatar + bio card |
| `BlogFAQ` | `src/components/blog/BlogFAQ.jsx` | `<details>` accordion with animated caret |

### Ad Component

| Component | File | Purpose |
|-----------|------|---------|
| `AdSlot` | `src/components/ads/AdSlot.jsx` | Responsive AdSense ins slot with min-h-[90px], auto-format, single push |

### Tool Components

All 65 tools in `src/components/tools/` — each is a Client Component (`"use client"`) with a default export.

---

## Troubleshooting

### Build Fails

```bash
# Check for:
# 1. Missing "use client" on interactive components
# 2. Named import { Link } instead of default import Link from "next/link"
# 3. "to" prop instead of "href" on Link components
# 4. params not awaited in page components
# 5. Missing tool component in COMPONENT_MAP or tools-data.js
npm run build
```

### 404 on Tool/Blog Routes

1. Verify the slug exists in `src/data/registry/tools-data.js` or `src/data/registry/blog-data.js`
2. For tools: verify the slug's component name matches (or has an override in `tool-components.js`)
3. For blogs: verify the slug is registered in `BLOG_COMPONENT_MAP` (`blog-components.js`)
4. Verify `generateStaticParams` returns the correct slug
5. `npm run build` to regenerate SSG pages
6. Redeploy to Vercel

### Category Page Shows No Posts

1. Check `getBlogCategoryName(slug)` returns the correct category name
2. Verify blog posts have a matching `category` field
3. Check `blog-data.js` for the allowed category names

### Theme Toggle Not Working

1. Check `next-themes` is installed
2. Verify `ThemeProvider` wraps the app in `layout.jsx`
3. Check `storageKey="theme_marth"` matches between anti-flicker script and next-themes
4. Verify `attribute="class"` matches `darkMode: "class"` in tailwind.config.js
5. Check `suppressHydrationWarning` on `<html>`

### pdfjs-dist `DOMMatrix is not defined` (SSR Crash)

pdfjs-dist tries to access browser globals at import time, causing `DOMMatrix is not defined` during SSG builds.

**Fix:** Use dynamic import inside callbacks (not at module level):

```js
// ❌ Wrong — crashes build:
import pdfjsLib from "pdfjs-dist";

// ✅ Correct — dynamic import after mount:
const pdfjsLib = await import("pdfjs-dist");
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
```

Also copy `node_modules/pdfjs-dist/build/pdf.worker.min.mjs` to `public/` to avoid CDN dependency for the worker.

### Hydration Warnings

1. Check for `suppressHydrationWarning` on the `<html>` tag
2. Ensure the anti-flicker script runs before React hydration
3. Use `useEffect` + `mounted` pattern in components that read from `localStorage` or `useTheme`
4. Render a placeholder (not null) during SSR to maintain layout stability

---

## Checklist for New Tools

- [ ] Component created in `src/components/tools/YourNewTool.jsx`
- [ ] Has `"use client"` directive
- [ ] Has a default export
- [ ] Uses CSS variables for all colors
- [ ] Auto-calculates with `useEffect` (no "Calculate" buttons, unless justified)
- [ ] Entry added to `src/data/registry/tools-data.js`
- [ ] Component name override added in `src/data/registry/tool-components.js` (if needed)
- [ ] Tested in light mode
- [ ] Tested in dark mode
- [ ] `npm run build` passes (page appears in SSG output)

## Checklist for New Blog Posts

- [ ] Content created in `src/data/blogContent/YourPost.jsx`
- [ ] Uses `import Link from "next/link"` (default import)
- [ ] Uses `href` prop (not `to`)
- [ ] Uses `<BlogCTA>` for call-to-action sections
- [ ] Metadata entry added to `src/data/registry/blog-data.js`
- [ ] Component registered in `src/data/registry/blog-components.js`
- [ ] (Optional) `pillarSlug` + `clusterOrder` set for topic clusters
- [ ] `toolSlugs` array links to related tools
- [ ] `npm run build` passes (page appears in SSG output)
