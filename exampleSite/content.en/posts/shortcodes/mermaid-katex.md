---
title: "Mermaid and KaTeX"
date: 2026-02-02
summary: "Add diagrams and mathematical notation to your articles."
categories: ["Shortcodes"]
tags: ["Mermaid", "KaTeX", "diagrams", "math"]
---

## Mermaid

````markdown
```mermaid
graph LR
  A[Hugo build] --> B[Search JSON]
  B --> C[Browser search]
```
````

```mermaid
graph LR
  A[Hugo build] --> B[Search JSON]
  B --> C[Browser search]
```

Use Mermaid when a diagram explains a flow more clearly than a long paragraph.

## KaTeX

````markdown
```katex
E = mc^2
```
````

```katex
E = mc^2
```

Inline math uses `$E = mc^2$`.

SeoTax includes Mermaid and KaTeX resources,
so these features do not require a separate CDN configuration.
