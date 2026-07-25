# Hugo SeoTax Theme

[![Hugo](https://img.shields.io/badge/hugo-0.146-blue.svg)](https://gohugo.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

### A Hugo blog theme with dynamic taxonomy search and reader-first experience

> **SeoTax** = **Sea**rch + **Tax**onomies — built around the idea
> that readers should discover content effortlessly.

![Screenshot](https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/main.png?raw=true)

- [Features](#features)
- [Demo](#demo)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Page Layouts](#page-layouts)
- [Shortcodes](#shortcodes)
- [Customization](#customization)
- [Contributing](#contributing)

## Features

- **Dynamic Search** — Fuse.js-powered fuzzy search with instant results; no extra static pages generated
- **Advanced Taxonomy Filters** — Filter by category, tag, or combination without a keyword
- **Configurable List Sorting** — Choose newest or oldest post lists, plus relevance sorting for search and optional sort controls
- **27-Language i18n** — Client-side translation; no page reload, no per-language page duplication
- **Dark Mode** — Auto-detects system preference; toggleable with keyboard shortcut (`Cmd/Ctrl + Shift + S`)
- **Responsive Design** — Collapsible sidebar, overlay ToC on mobile, adaptive thumbnails
- **Mac-style Code Blocks** — Syntax highlighting (highlight.js), line numbers, copy button, language label
- **Series Support** — Velog-style series navigation across related posts
- **SEO Optimized** — Schema.org structured data, CLS < 0.01, optimized Core Web Vitals
- **Lightweight Icons** — IcoMoon subset font (~40 KB vs 800+ KB Font Awesome)
- **PWA Ready** — Service Worker with precache support
- **Disqus Comments** — With dark mode synchronization
- **Reading Time** — Calculated from text, images, code blocks, and tables

### Search

![Search Demo](https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/search-demo.gif?raw=true)

A single dynamic search page replaces hundreds of per-tag/per-category static pages.
Search is triggered via the `/` or `s` hotkey, or by clicking the search bar.
Supports 5 query types: keyword search, parent category, child category,
single tag, and multi-tag with AND/OR operators.

### Internationalization

![i18n Demo](https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/i18n-demo.gif?raw=true)

All 27 languages are served from a single HTML page. The language switcher
in the toolbar translates UI text, dates, and ARIA labels instantly on
the client side — no page navigation, no URL changes.

### Dark Mode

![Dark Mode Demo](https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/light-dark-demo.gif?raw=true)

Switches between light and dark themes using CSS variables on a single
`data-theme` attribute. Persisted in `localStorage`. Disqus comments are
synchronized via iframe reload.

### Code Blocks

![Code Block](https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/codeblock.png?raw=true)

Mac-style window dots, line numbers (with copy exclusion), one-click copy
with visual feedback, and a language label chip. Light theme uses
**Xcode** colors; dark theme uses **VS2015** colors.

## Demo

| Desktop | Mobile |
|---------|--------|
| ![Main Page](https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/ss-main-desktop.png?raw=true) | ![Mobile Main](https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/ss-main-mobile.png?raw=true) |
| ![Search Page](https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/ss-search-desktop.png?raw=true) | ![Mobile Search](https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/ss-search-mobile.png?raw=true) |
| ![Content Page](https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/ss-content-desktop.png?raw=true) | ![Mobile Menu](https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/ss-content-mobile.png?raw=true) |

## Requirements

- Hugo **0.146** or higher (extended version)
- [Hugo Installation Guide](https://gohugo.io/installation/)

## Installation

### As a Git Submodule

```bash
cd your-hugo-site
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
```

Then set the theme in your configuration file:

```yaml
theme: "seotax"
```

### As a Hugo Module

Initialize Hugo modules if not already done:

```bash
hugo mod init github.com/your/repo
```

Add to your `hugo.toml`:

```toml
[module]
[[module.imports]]
path = 'github.com/minyeamer/hugo-seotax'
```

Then fetch the module and run:

```bash
hugo mod get -u
hugo server --minify
```

### From Scratch

```bash
hugo new site myblog && cd myblog
git init
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
cp -R themes/seotax/exampleSite/* .
hugo server --minify
```

## Configuration

### Site Configuration

Below is a full `config.yaml` example with all supported parameters:

```yaml
baseURL: "https://example.com/"
title: "My Blog"
theme: "seotax"
defaultContentLanguage: "en"
languageCode: "en"

enableRobotsTXT: true
buildDrafts: false
buildFuture: false
buildExpired: false
enableEmoji: true

# Recommended: use a single dynamic search page instead of per-tag static pages
disableKinds: ["term"]

minify:
  disableXML: true
  minifyOutput: true

# SEO-friendly URL structure
permalinks:
  posts: "/blog/:slugorcontentbasename/"

markup:
  goldmark:
    extensions:
      typographer:
        disable: true
    renderer:
      unsafe: true
  highlight:
    noClasses: false
    codeFences: true
  tableOfContents:
    startLevel: 2
    endLevel: 4

params:
  author: "Your Name"
  keywords: ["blog", "tech"]

  posts:
    section: "posts"             # Content section for blog posts
    sort: "newest"               # ["newest" | "oldest" | "disabled"]

  # Search
  search:
    enabled: true
    sort: "newest"               # ["relevance" | "newest" | "oldest" | "disabled"]

  assets:
    favicon: "/images/favicon.ico"
    favicon16x16: "/images/favicon-16x16.png"
    favicon32x32: "/images/favicon-32x32.png"
    apple_touch_icon: "/images/apple-touch-icon.png"
    safari_pinned_tab: "/images/safari-pinned-tab.svg"
    opengraph: "/images/og.jpg"

  # Sidebar menu
  menu:
    profileImage: "/images/profile.jpg"    # Sidebar profile image
    categories: true                       # Show category tree
    recentPosts: true                      # Show recent posts list

  social:
    github: "https://github.com/username"
    twitter: "https://x.com/username"

  # Comments
  comments:
    enabled: true
    provider: "giscus"                     # "giscus" | "disqus"
    # disqus:
    #   shortname: "your-shortname"
    # giscus:
    #   repo: "owner/repo"
    #   repoId: "R_kgDO..."
    #   category: "Comments"
    #   categoryId: "DIC_kwDO..."
    #   mapping: "pathname"
    #   inputPosition: "bottom"

  # i18n translation directory
  i18nDir: "themes/seotax/i18n"

  # Image CLS prevention (optional)
  # Store copies of remote images locally in assets/_images/ for build-time dimension extraction
  images:
    rootPath: "_images"
    maxImageSize: 1920
    roundedCorners: false
    rotateLandscapeImages: true

  # Enable Hugo portable links for relative Markdown links and images
  portableLinks: true

  # PWA Service Worker ("precache" to enable)
  serviceWorker: "precache"

  # Table of Contents
  tableOfContents:
    startLevel: 2
    endLevel: 4

  # Optional per-page ToC toggle default
  toc:
    enabled: true

  # Analytics
  GoogleAnalytics:
    tagId: "G-XXXXXXXXXX"

  # Search engine verification
  searchEngine:
    google:
      siteVerificationTag: "google-site-verification-code"
    naver:
      siteVerificationTag: "naver-site-verification-code"
    bing:
      siteVerificationTag: "bing-site-verification-code"
    yandex:
      siteVerificationTag: "yandex-site-verification-code"

  # Schema.org structured data
  schema:
    publisherType: "Person"
    sameAs:
      - "https://github.com/username"
```

### Static Post Lists

`params.posts.sort` controls the sort order of the home page.
The default sort uses `/` and `/page/2/`; the example site also provides
static archive pages at `/list/newest/` and `/list/oldest/`, with additional
pages under `/page/2/`.

Set it to `disabled` to hide the sort control; the home page then uses newest-first
order, while a `post-list` page can still set its own `params.sort`.

Create matching list index files for each content language to enable the
archive routes in your site:

```yaml
# content/en/list/oldest/_index.md
title: "Oldest posts"
type: "post-list"
params:
  sort: "oldest"
```

Create the equivalent `newest` page and translated files for each additional language.
If `params.sort` is omitted in a `post-list` page, it falls back to `params.posts.sort`.

### Search Sort

`params.search.sort` controls the default sort mode of `/search`.
Supported values are `relevance`, `newest`, `oldest`, and `disabled`.
`disabled` hides the sort control only; the search page continues to process
its default newest-first order and any `sort` query parameter.

- When the current sort matches `params.search.sort`, the search page omits
  the `sort` query parameter.
- When the user selects a different sort, SeoTax writes `?sort=...` into the
  search URL and reorders the current results on the client.

### Category Menu Order

Set `params.menu.categoryOrder` to control the sidebar category order. Lower
`weight` values are shown first; categories without a configured weight follow
in alphabetical order.

```yaml
params:
  menu:
    categoryOrder:
      - name: "Guide"
        weight: 10
      - name: "Features"
        weight: 20
```

For a multilingual site, place the same setting under each language's `params`
to define language-specific names and ordering. The order is applied to both
parent and child categories.

### Image Settings

Use `params.images`, not `params.image`.

- `rootPath` sets the asset directory used to resolve local image dimensions during the build.
- `maxImageSize` limits the resized image width used for CLS prevention.
- `roundedCorners` adds rounded styling to rendered Markdown images and the `image` shortcode.
- `rotateLandscapeImages` rotates landscape images in the image zoom viewer on narrow screens.

### Multi-Language Support

SeoTax supports Hugo's [multilingual mode](https://gohugo.io/content-management/multilingual/).
When multiple languages are configured, a language selector appears in the sidebar menu.

```yaml
languages:
  en:
    languageName: "English"
    weight: 1
  ko:
    languageName: "한국어"
    weight: 2
```

In addition, the theme includes **client-side i18n** for UI elements
(menus, labels, dates) across 27 languages. This works independently of
Hugo's multilingual content system and requires no extra configuration.

The Hugo language menu opens a translated page when one exists. On localized
taxonomy, search, and list pages without a page translation, it preserves the
current path in the selected language and carries query parameters and hashes
across. Search indexes and generated search assets are scoped per content
language, so results do not mix between languages.

### Post Front Matter

```yaml
---
title: "My Post Title"
date: 2026-01-01
summary: "A brief description of the post."
categories: ["Parent Category", "Child Category"]
tags: ["tag1", "tag2"]
series: ["Series Name"]
cover:
  image: "/images/cover.jpg"
---
```

The theme uses a **two-level category hierarchy**.
The first item in `categories` is the parent; the second is the child.
Previous/next navigation prioritizes posts within the same child category,
then parent category, then all posts.

## Page Layouts

| Page | Description |
|------|-------------|
| **Home** | Post list with title, summary, date, categories, tags, and cover thumbnail. Pagination with 10 posts per page. |
| **Single Post** | Header with category breadcrumb, title, date, reading time, cover image, content, tags, prev/next navigation, and Disqus comments. |
| **Search** | Dynamic search page with keyword, category, and tag filters. Accessed via the search modal, category/tag chips, or the sidebar. |
| **Categories** | Two-level category tree with post counts. Up to 3 posts are shown per category with a "see more" link. |
| **Tags** | All tags displayed as clickable chips. |

## Shortcodes

### Hugo Book Shortcode Components

SeoTax reuses the following shortcode components from Hugo Book.

| Shortcode | Description |
|-----------|-------------|
| `{{</* columns */>}}` | Multi-column flexbox layout with `<--->` separator and optional `ratio` parameter |
| `{{</* hint [info\|success\|warning\|danger] */>}}` | Colored callout boxes |
| `{{</* mermaid */>}}` | Mermaid diagrams |
| `{{</* katex */>}}` | KaTeX math equations |
| `{{</* tabs */>}}` | Tabbed content panels |
| `{{</* details */>}}` | Collapsible content blocks |

### SeoTax Custom

#### Bookmark

Generates a rich link card by fetching Open Graph metadata from a URL.

```markdown
{{</* bookmark url="https://example.com" */>}}
```

Optional overrides: `title`, `description`, `image`, `fetch` (default `true`).

#### Data Table

Renders CSV-formatted text as a styled HTML table.

```markdown
{{</* data-table delimiter="," headers="1" file-name="data.csv" */>}}
Name,Age,City
Alice,30,Seoul
Bob,25,Tokyo
{{</* /data-table */>}}
```

Supports `align-center`, `enable-download`, and custom `class`.

#### Image

Enhanced image shortcode with click-to-zoom, automatic CLS prevention, and full layout control.

```markdown
{{</* image src="/images/photo.jpg" alt="Description" caption="Figure 1" max-width="600px" */>}}
```

Parameters: `src`, `alt`, `caption`, `class`, `loading`, `align`, `href`,
`target`, `width`, `min-width`, `max-width`, `height`, `min-height`,
`max-height`.

On mobile, landscape images rotate 90° when tapped for full-screen viewing.

#### Series

Velog-style series navigation that groups posts sharing the same `series` front matter value.

```markdown
{{</* series "My Tutorial Series" */>}}
```

Optional second parameter: regex pattern to strip common prefixes from titles.
Includes collapsible post list and prev/next links.

## Customization

### Overriding Styles

Create `assets/css/_custom.scss` in your site root to add or override styles:

```scss
// Example: change link color
:root {
  --color-link: #0055bb;
}
```

### SCSS Variables

Key variables are defined in `assets/css/variables/`:

| File | Contents |
|------|----------|
| `_colors.scss` | Color palette and theme mixins (`theme-light`, `theme-dark`) |
| `_defaults.scss` | Spacing, font sizes, border radii, breakpoints, z-indices |
| `_fonts.scss` | Font family definitions |

### Icons

The theme uses an [IcoMoon](https://icomoon.io/) subset font with 26 icons.
Icon classes follow the pattern `icon-*`
(e.g., `icon-search`, `icon-folder`, `icon-moon`). To add more icons,
regenerate the subset font and update `assets/css/main/icon.css`.

### Directory Structure

```
seotax/
├── archetypes/           # Post templates
├── assets/
│   ├── css/              # SCSS source files
│   │   ├── main/         # Normalize, icons, utilities, print
│   │   ├── themes/       # Light/dark theme definitions
│   │   └── variables/    # Colors, defaults, fonts
│   ├── data/             # Build-time JSON (search index, categories, tags, i18n)
│   ├── js/
│   │   ├── core/         # Theme toggle, i18n, toolbar, sidebar
│   │   ├── partials/     # Reading time, ToC, image overlay, pagination
│   │   ├── search/       # Search engine, filters, rendering
│   │   └── shortcodes/   # Series, data-table, code block scripts
│   ├── main.scss         # SCSS entry point
│   └── sw.js             # Service Worker
├── i18n/                 # 27 language YAML translation files
├── layouts/
│   ├── _markup/          # Render hooks (code blocks, images, links)
│   ├── _partials/        # Template partials (menu, header, footer, content)
│   ├── _shortcodes/      # Shortcode templates
│   ├── baseof.html       # Base layout
│   ├── index.html        # Home page
│   ├── list.html         # List page
│   └── single.html       # Single post page
├── static/               # Static assets (fonts, images)
└── theme.toml
```

## Performance

The theme is optimized for Core Web Vitals:

| Metric | Score |
|--------|-------|
| CLS | 0.002 |
| TBT | 0 ms |
| Performance | 82+ |

Optimizations include: build-time image dimension extraction to prevent
layout shifts, subset icon font to minimize font loading impact, hybrid
server/client reading time calculation, and `font-display: swap` for zero FOIT.

## Contributing

Contributions are welcome. Primary goals:

- Keep it simple and focused on blog use cases
- Minimize JavaScript where CSS can solve the problem
- Maintain cross-browser compatibility
- Preserve the reader-first exploration experience

Feel free to open issues or pull requests on [GitHub](https://github.com/minyeamer/hugo-seotax).

## License

[MIT](LICENSE)
