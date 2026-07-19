---
title: "Bookmark"
date: 2026-02-03
summary: "Render an external link as an Open Graph card."
categories: ["Shortcodes"]
tags: ["bookmark", "Open Graph", "link cards"]
---

## Basic Use

```go-html
{{</* bookmark "https://gohugo.io/" */>}}
```

{{< bookmark "https://gohugo.io/" >}}

During the build, SeoTax reads the target page's metadata
and renders its title, description, and image when available.

## Provide Values Manually

```go-html
{{</* bookmark
  url="https://example.com"
  title="Example"
  description="A hand-written link description"
  image="https://example.com/cover.png"
  fetch="false"
*/>}}
```

Set `fetch="false"` when builds cannot make network requests
or when you want predictable metadata.
