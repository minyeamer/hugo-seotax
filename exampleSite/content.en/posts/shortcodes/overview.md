---
title: "Shortcode Overview"
date: 2026-01-17
summary: "Available SeoTax shortcodes and the two ways to call them."
categories: ["Shortcodes"]
tags: ["Shortcodes", "Hugo"]
---

## What Is a Shortcode?

A shortcode is Hugo's compact way to render a reusable HTML component from Markdown.

```go-html
{{</* hint info */>}}
A useful note.
{{</* /hint */>}}
```

{{% hint info %}}
A useful note.
{{% /hint %}}

## Two Forms

| Form | Behavior |
|---|---|
| `{{</* */>}}` | Passes the inner content through directly |
| `{{%/* */%}}` | Renders the inner content as Markdown |

Use the percent form when the inner content includes lists, links, or other Markdown.

## Included Shortcodes

SeoTax includes Columns, Hints, Tabs, Details,
Mermaid, KaTeX, Bookmark, Data Table, Image, and Series.
