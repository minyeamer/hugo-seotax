---
title: "Categories and Tags"
date: 2026-01-07
summary: "Use SeoTax's two-level categories and tag filters."
categories: ["Guide"]
tags: ["categories", "tags", "taxonomies"]
---

## Two-Level Categories

```yaml
categories: ["Frontend", "Blog"]
```

The first value is the parent category and the second is the child category.

## Sidebar Order

Set `params.menu.categoryOrder` to order parent and child categories.
Lower weights appear first; unlisted categories follow alphabetically.

```yaml
params:
  menu:
    categoryOrder:
      - name: "Guide"
        weight: 10
      - name: "Features"
        weight: 20
```

## Tags

Tag chips open the search page, where readers can combine multiple tags with AND or OR filters.
