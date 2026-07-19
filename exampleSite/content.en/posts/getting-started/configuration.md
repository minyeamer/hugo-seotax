---
title: "Basic Configuration"
date: 2026-01-03
summary: "The minimum and recommended configuration for running SeoTax."
categories: ["Guide"]
tags: ["config", "Hugo", "configuration"]
---

## Minimum Configuration

```yaml
baseURL: "https://example.com/"
title: "My Blog"
theme: "seotax"
defaultContentLanguage: "en"

params:
  posts:
    section: "posts"
```

`params.posts.section` identifies the directory below `content/` that holds your posts.

## Search Configuration

```yaml
disableKinds: ["term"]

params:
  search:
    enabled: true
```

SeoTax uses one dynamic search page instead of a term page for every tag.

## Markdown Settings

```yaml
markup:
  goldmark:
    renderer:
      unsafe: true
  highlight:
    noClasses: false
    codeFences: true
  tableOfContents:
    startLevel: 2
    endLevel: 3
```
