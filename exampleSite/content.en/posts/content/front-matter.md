---
title: "Write Front Matter"
date: 2026-01-06
summary: "The front matter fields used most often by SeoTax posts."
categories: ["Guide"]
tags: ["front matter", "categories", "tags", "series", "cover"]
---

## Basic Example

```yaml
---
title: "Post Title"
date: 2026-01-01
summary: "A short description for lists and search results"
categories: ["Frontend", "Hugo"]
tags: ["Hugo", "SeoTax", "search"]
series: ["Building a Hugo Theme"]
cover: "https://example.com/cover.webp"
thumbnail: "https://example.com/thumb.webp"
---
```

## Key Fields

| Field | Purpose |
|---|---|
| `title` | Post title |
| `date` | Display and sort date |
| `summary` | List summary |
| `categories` | Two-level category path |
| `tags` | Search filters |
| `series` | Series navigation |
| `cover` | Post header image |
| `thumbnail` | Preferred list image |

Set `hidden: true` to exclude a post from the home page and search results.
