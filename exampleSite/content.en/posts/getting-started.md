---
title: "Getting Started with SeoTax"
date: 2026-01-01
summary: "Learn how to install and configure the SeoTax Hugo theme for your blog."
categories: ["Guide", "Setup"]
tags: ["Hugo", "SeoTax", "Installation", "Configuration"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-00-cover.webp?raw=true"
---

## What is SeoTax?

**SeoTax** (Search + Taxonomies) is a Hugo blog theme built around the idea that readers should discover content effortlessly. It replaces hundreds of per-tag/per-category static pages with a single dynamic search page, supports 27-language client-side i18n, and offers a reader-first browsing experience.

![Main Page](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-04-layout-main.webp?raw=true)

## Installation

### As a Git Submodule

```bash
cd your-hugo-site
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
```

### As a Hugo Module

```bash
hugo mod init github.com/your/repo
```

Add to your `hugo.toml`:

```toml
[module]
[[module.imports]]
path = 'github.com/minyeamer/hugo-seotax'
```

### From Scratch

```bash
hugo new site myblog && cd myblog
git init
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
cp -R themes/seotax/exampleSite/* .
hugo server --minify
```

## Minimal Configuration

Set `theme: "seotax"` in your `config.yaml`:

```yaml
baseURL: "https://example.com/"
title: "My Blog"
theme: "seotax"
defaultContentLanguage: "en"
languageCode: "en"

enableRobotsTXT: true
enableEmoji: true

# Use dynamic search instead of per-tag static pages
disableKinds: ["term"]

params:
  author: "Your Name"
  posts:
    section: "posts"
  menu:
    categories: true
    recentPosts: true
  search:
    enabled: true
  i18nDir: "themes/seotax/i18n"
```

## Post Front Matter

Each post supports the following front matter fields:

```yaml
---
title: "My Post Title"
date: 2026-01-01
summary: "A brief description."
categories: ["Parent Category", "Child Category"]
tags: ["tag1", "tag2"]
series: ["Series Name"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/cover.jpg?raw=true"
---
```

The theme uses a **two-level category hierarchy**. The first item in `categories` is the parent; the second is the child.

## What's Next?

Explore the other example posts to learn about:

- [Dynamic Search](../search-and-taxonomy/) — Fuzzy search and taxonomy filtering
- [Dark Mode & i18n](../dark-mode-and-i18n/) — Theme switching and multilingual UI
- [Shortcodes](../shortcodes/) — Built-in and custom shortcode components
- [Code Blocks](../code-blocks/) — Syntax highlighting with Mac-style UI
