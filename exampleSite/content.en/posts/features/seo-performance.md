---
title: "SEO and Performance"
date: 2026-01-15
summary: "Configure metadata, structured data, and image settings for a fast blog."
categories: ["Features"]
tags: ["SEO", "Core Web Vitals", "CLS", "Schema.org"]
---

## Search Engine Verification

```yaml
params:
  searchEngine:
    google:
      siteVerificationTag: "your-code"
```

SeoTax also supports Naver, Bing, and Yandex verification tags.

## Structured Data

```yaml
params:
  schema:
    publisherType: "Person"
    sameAs:
      - "https://github.com/username"
```

## Image Stability

Use `params.images` and local image dimensions to reduce cumulative layout shift.
