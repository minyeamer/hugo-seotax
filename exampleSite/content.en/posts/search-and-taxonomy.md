---
title: "Dynamic Search & Taxonomy Filters"
date: 2026-01-02
summary: "How SeoTax uses Fuse.js and vanilla JS to provide instant search and advanced taxonomy filtering without generating thousands of static pages."
categories: ["Guide", "Features"]
tags: ["Search", "Fuse.js", "Taxonomy", "Categories", "Tags"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-01-search-demo.gif?raw=true"
---

## The Problem with Static Taxonomy Pages

Hugo generates a static HTML page for every tag and category. With 40 posts and 100+ tags, this can result in 500+ extra pages totaling over 10 MB of output. At scale (400+ posts), this grows to thousands of pages and hundreds of megabytes — slowing Git operations and fragmenting analytics.

**SeoTax eliminates this entirely** by using a single dynamic search page powered by JavaScript.

## How It Works

![Search Demo](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-01-search-demo.gif?raw=true)

### 1. Build-time JSON Index

At build time, Hugo generates three JSON files:

- `content.json` — Post titles and content for Fuse.js full-text search
- `categories.json` — Two-level category tree with post ID mappings
- `tags.json` — Tag-to-post-ID mappings for O(1) lookup

### 2. Fuse.js Fuzzy Search

The theme uses [Fuse.js](https://www.fusejs.io/) for fuzzy matching on post titles and content. Results are scored from 0 (perfect match) to 1 (no match), providing forgiving search even with typos.

### 3. Pre-rendered Post Items

All post items are pre-rendered as hidden HTML elements. Search results are assembled by cloning matching elements into a `DocumentFragment` for efficient DOM manipulation — no client-side templating needed.

## 5 Search Types

SeoTax supports five distinct query types via URL parameters:

| Type | Parameters | Example |
|------|-----------|---------|
| **Keyword** | `?query=hugo` | Full-text fuzzy search |
| **Parent Category** | `?category1=Guide` | All posts in parent category |
| **Child Category** | `?category1=Guide&category2=Setup` | Posts in specific subcategory |
| **Single Tag** | `?tags=Hugo` | Posts with a specific tag |
| **Multi-tag** | `?tags=Hugo,Search&tagsOp=and` | Posts matching all/any tags |

## Search Modal

Press `/` or `s` anywhere to open the search modal. On mobile, a search bar is also available in the header.

![Search Modal](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-08-layout-search-modal.webp?raw=true)

## Advanced Filters

The search page includes collapsible advanced filters with category dropdowns and tag selection, allowing readers to narrow results without typing a keyword.

![Search Page](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-09-layout-search-page.webp?raw=true)

## Configuration

Enable search in your `config.yaml`:

```yaml
params:
  search:
    enabled: true

# Disable per-tag static pages (recommended)
disableKinds: ["term"]
```

No additional configuration required — the JSON index is generated automatically.
