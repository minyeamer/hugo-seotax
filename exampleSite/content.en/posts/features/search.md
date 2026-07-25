---
title: "Search"
date: 2026-01-10
summary: "Use one dynamic search page for keywords, categories, and tags."
categories: ["Features"]
tags: ["search", "Fuse.js", "taxonomies", "categories", "tags"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/search-demo.gif?raw=true"
---

## Search Modes

SeoTax supports keyword search, parent and child category filters,
single tags, and multiple tags with AND or OR behavior.

## Default Sort

```yaml
params:
  search:
    enabled: true
    sort: "newest"
```

Supported values are `relevance`, `newest`, `oldest`, and `disabled`.
Set `disabled` to hide the sort control while keeping newest-first search results
and `sort` URL parameters working. A user-selected alternative is stored in the
search URL as `sort`.
