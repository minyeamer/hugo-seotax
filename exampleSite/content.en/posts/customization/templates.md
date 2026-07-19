---
title: "Template Structure"
date: 2026-01-21
summary: "Find the SeoTax layouts, partials, shortcodes, and Markdown render hooks."
categories: ["Customization"]
tags: ["layouts", "partials", "templates"]
---

## Layouts

```text
layouts/
  baseof.html
  index.html
  single.html
  search/
  categories/
  tags/
  _partials/
  _shortcodes/
  _markup/
```

## Partials

Repeated interface elements live under `_partials/`.
Start with `menu/` for the sidebar, `content/` for post metadata,
and `footer/` for comments and post navigation.

## Markdown Rendering

Use `_markup/render-image.html`, `render-link.html`,
and `render-codeblock.html` to customize rendered Markdown.
