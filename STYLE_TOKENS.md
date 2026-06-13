# MS DevX Tools Style Tokens

Use these tokens as guidance. Adapt them to the framework, CSS system, or Tailwind setup already present in the repo.

## CSS variables

```css
:root {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-elevated: #f1f5f9;
  --color-text: #0f172a;
  --color-text-muted: #475569;
  --color-text-subtle: #64748b;
  --color-border: #e2e8f0;
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-soft: #dbeafe;
  --color-accent: #14b8a6;
  --color-accent-soft: #ccfbf1;
  --color-success: #16a34a;
  --color-warning: #f59e0b;
  --color-danger: #dc2626;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --shadow-card: 0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.08);
  --shadow-card-hover: 0 8px 24px rgba(15, 23, 42, 0.10);
  --container-max: 1200px;
}

[data-theme="dark"] {
  --color-bg: #020617;
  --color-surface: #0f172a;
  --color-surface-elevated: #111827;
  --color-text: #e5e7eb;
  --color-text-muted: #94a3b8;
  --color-text-subtle: #64748b;
  --color-border: #1e293b;
  --color-primary: #60a5fa;
  --color-primary-hover: #3b82f6;
  --color-primary-soft: #172554;
  --color-accent: #2dd4bf;
  --color-accent-soft: #134e4a;
}
```

## Tailwind color mapping suggestion

```js
colors: {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  elevated: '#F1F5F9',
  text: '#0F172A',
  muted: '#475569',
  border: '#E2E8F0',
  primary: {
    DEFAULT: '#2563EB',
    hover: '#1D4ED8',
    soft: '#DBEAFE'
  },
  accent: {
    DEFAULT: '#14B8A6',
    soft: '#CCFBF1'
  }
}
```

## Component defaults

Buttons:

- Primary: blue background, white text, hover darker blue.
- Secondary: white background, slate text, border.
- Ghost: transparent background, slate text, subtle hover.

Cards:

- white surface
- 1px border
- 12px to 16px radius
- subtle shadow on hover only

Inputs:

- white background
- 1px slate border
- 10px to 12px radius
- clear focus ring using primary blue

Badges:

- soft blue for popular
- soft teal for new
- soft amber for updated

## Do not

- Use more than one primary color.
- Use bright gradients on every card.
- Use low-contrast gray text.
- Use heavy box shadows everywhere.
- Use fake trust badges.
