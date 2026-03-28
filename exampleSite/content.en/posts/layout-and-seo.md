---
title: "Responsive Layout & SEO"
date: 2026-01-06
summary: "Responsive design across desktop and mobile, collapsible sidebar, overlay ToC, and Core Web Vitals optimization."
categories: ["Guide", "Features"]
tags: ["Responsive", "Mobile", "SEO", "Performance", "CLS"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/fix-cls-00-score.webp?raw=true"
---

## Responsive Design

SeoTax adapts to all screen sizes with CSS media queries and JavaScript-enhanced interactions.

### Desktop Layout

On larger screens, the layout uses a three-column structure:

| Left | Center | Right |
|------|--------|-------|
| Sidebar (menu, categories, recent posts) | Main content | Table of Contents |

The sidebar and ToC are sticky-positioned, scrolling independently of the main content.

### Mobile Layout

| Screen | Description |
|--------|-------------|
| ![Mobile Main](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-16-layout-mobile-main.webp?raw=true) | Post list adapts to a single column with landscape cover images |
| ![Mobile Menu](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-18-layout-mobile-menu.webp?raw=true) | Sidebar opens as a full overlay with hamburger toggle |
| ![Mobile ToC](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-19-layout-mobile-toc.webp?raw=true) | Table of Contents opens as an overlay from the header |

### Collapsible Sidebar

- **Desktop:** Hamburger icon toggles sidebar width; state saved in `localStorage`
- **Mobile:** Sidebar slides in as a fixed overlay with backdrop

### Toolbar

A floating toolbar in the bottom-right corner provides quick access to:

- Language selector (i18n)
- Scroll to top / bottom
- Go back

On mobile, the toolbar starts collapsed and expands with a `+` button.

---

## SEO Optimization

### Core Web Vitals

SeoTax achieves excellent performance scores:

| Metric | Score | How |
|--------|-------|-----|
| **CLS** | 0.002 | Build-time image dimension extraction; hybrid reading-time |
| **TBT** | 0 ms | Lightweight IcoMoon subset font (~40 KB); `font-display: swap` |
| **LCP** | 4.2s | Minimal critical CSS; deferred non-essential JS |

### CLS Prevention

The biggest CLS contributor in Hugo blogs is images without explicit `width`/`height`. SeoTax solves this with a hybrid approach:

1. Store copies of remote images locally in `assets/_images/`
2. Hugo reads dimensions at build time
3. Explicit `width` and `height` are injected into `<img>` tags

```yaml
params:
  imageDir: "_images"         # Local image directory for dimension extraction
  maxImageSize: 1920          # Downscale images proportionally
```

### IcoMoon Subset Font

Instead of loading the full Font Awesome library (800+ KB), SeoTax uses an IcoMoon subset with only 26 icons (~40 KB). This eliminates FOIT/FOUT and significantly reduces TBT.

### Schema.org Structured Data

```yaml
params:
  schema:
    publisherType: "Person"
    sameAs:
      - "https://github.com/username"
```

### Sitemap & robots.txt

Both are generated automatically by Hugo:

```yaml
enableRobotsTXT: true
```

### Search Engine Verification

```yaml
params:
  searchEngine:
    google:
      siteVerificationTag: "your-verification-code"
    naver:
      siteVerificationTag: "your-verification-code"
```

### PWA Service Worker

Enable offline caching with a single configuration line:

```yaml
params:
  serviceWorker: "precache"
```
