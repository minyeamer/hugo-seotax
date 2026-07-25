---
title: "Content Structure"
date: 2026-01-05
summary: "Organize posts, search pages, and multilingual content in SeoTax."
categories: ["Guide"]
tags: ["content", "posts", "multilingual"]
---

## Basic Layout

SeoTax lists the regular pages in `params.posts.section`.

```text
content/
  posts/
    my-first-post.md
  search/
    _index.md
```

## Multilingual Content

```yaml
languages:
  en:
    languageName: "English"
    contentDir: "content.en"
    weight: 1
  ko:
    languageName: "Korean"
    contentDir: "content.ko"
    weight: 2
```

## Sorted Post Lists

Set the home page order with `params.posts.sort` using `newest` or `oldest`.
Set it to `disabled` to hide the sort control; the home page then uses newest-first order.
A page with `type: "post-list"` can set its own `params.sort`.
