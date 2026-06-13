# MS DevX Tools Website Rules

These rules apply only to `tools.msdevx.com`.

## Domain role

`tools.msdevx.com` is the canonical browser-based free web tools website.

Brand name:

`MS DevX Tools`

## Allowed content

This website may include:

- calculators
- converters
- generators
- text tools
- productivity tools
- date/time tools
- health calculators
- finance calculators
- math tools
- student tools
- security/password tools
- QR/barcode tools
- PDF/document tools, if implemented safely
- image tools, if implemented safely
- tool guides
- category hubs
- related tool pages

## Disallowed content

Do not include:

- Marth Systems healthcare RCM/BPO service pages
- MS DevX Play Store/mobile app pages
- client previews
- staging apps
- private demos
- `msdevx.space` lab pages
- duplicate `msdevx.com` service pages

## Legacy migration rule

`tools.marth.systems` is legacy only.

Every old URL must permanently redirect to the same path on `tools.msdevx.com`.

Examples:

```txt
https://tools.marth.systems/
-> https://tools.msdevx.com/

https://tools.marth.systems/tools/age-calculator
-> https://tools.msdevx.com/tools/age-calculator

https://tools.marth.systems/blog/example
-> https://tools.msdevx.com/blog/example

https://tools.marth.systems/privacy
-> https://tools.msdevx.com/privacy
```

Use 301 or 308 redirects. Preserve paths and query strings. Avoid redirect chains.

## Canonical rules

All browser tools pages must canonicalize to `https://tools.msdevx.com`.

Never canonicalize browser tools to:

- `tools.marth.systems`
- `msdevx.com/tools`
- `marth.systems`
- `msdevx.space`

## `msdevx.com/tools` separation rule

Do not place browser web tools on `msdevx.com/tools`.

`msdevx.com/tools` is for Play Store/mobile apps only.

Browser-based tools belong only on `tools.msdevx.com`.

## Branding rules

Replace user-facing:

- `MS Tools` -> `MS DevX Tools`
- `Marth Systems` -> remove from tools site or replace with `MS DevX`
- `tools.marth.systems` -> `tools.msdevx.com`

Use title format:

`{Tool Name} | MS DevX Tools`

Do not duplicate suffixes, for example:

- Bad: `Age Calculator | MS Tools | MS Tools`
- Good: `Age Calculator | MS DevX Tools`

## Professional design rules

The site should look like a modern professional tools platform, not a hobby utility directory.

Visual style:

- clean
- credible
- fast
- search-led
- professional
- minimal but not empty
- productivity-suite feel

Preferred palette:

- background: `#F8FAFC`
- surface: `#FFFFFF`
- elevated surface: `#F1F5F9`
- text: `#0F172A`
- muted text: `#475569`
- border: `#E2E8F0`
- primary: `#2563EB`
- primary hover: `#1D4ED8`
- accent: `#14B8A6`
- success: `#16A34A`
- warning: `#F59E0B`
- danger: `#DC2626`

Avoid:

- neon colors
- childish gradients
- too many bright colors
- low contrast text
- cluttered card grids
- fake trust badges

## Page structure rules

Homepage should include:

1. Professional hero with strong search box.
2. Popular tools row.
3. Category grid.
4. Featured tools section.
5. Recently added or updated tools.
6. Why use MS DevX Tools section.
7. Privacy/fast/client-side processing note, only if true.
8. Tool guides/blog section.
9. Footer with clean category links.

Tool pages should include:

1. Breadcrumbs.
2. H1 and short description.
3. Tool input card.
4. Results panel.
5. Copy/share/download actions where relevant.
6. How to use section.
7. Example use cases.
8. Formula/method/source note where relevant.
9. Limitations/disclaimer.
10. Related tools.
11. FAQs only if useful.

Category pages should include:

1. H1 and intro.
2. Search/filter within category.
3. Tool card grid.
4. Short category guide.
5. Related categories.

## Content quality rules

Each tool page should include:

- unique title
- unique meta description
- crawlable intro
- practical instructions
- examples
- related tools
- limitations
- disclaimer where needed

Health tools must include:

- not medical advice
- formula/source notes
- consult a qualified healthcare professional

Finance tools must include:

- estimates only
- not financial advice
- consult a qualified financial professional

Security/password tools must only claim local/client-side processing if true.

## Technical cleanup rules

Fix:

- visible debug strings
- JSON filenames rendered in UI
- crawler-visible `Loading...` placeholders
- duplicated homepage blocks
- duplicated testimonials
- fake testimonials
- fake ratings
- duplicate title suffixes
- broken internal links
- old Marth branding
- old `MS Tools` branding
- wrong sitemap URLs
- wrong Open Graph URLs

## SEO rules

Every indexable tools page must have:

- server-rendered or statically rendered crawlable copy
- unique title
- unique meta description
- one H1
- canonical URL on `https://tools.msdevx.com`
- Open Graph URL on `https://tools.msdevx.com`
- valid structured data where appropriate
- sitemap inclusion only if canonical and indexable
- fast loading
- mobile-friendly UI
- accessible inputs/buttons

Sitemap must include browser tools and tool content only.

Sitemap must not include:

- Marth RCM/BPO pages
- MS DevX mobile app pages
- msdevx.space labs
- legacy `tools.marth.systems` URLs

## Verification rules

Before final response, run:

```bash
npm run lint
npm run build
```

Then run:

```bash
rg "tools\.marth\.systems|MS Tools|Marth Systems|msdevx\.com/tools/age|Age Calculator|QR Code|Password Generator|Unit Converter|Healthcare RCM|Healthcare BPO" .
```

Explain every remaining match.
