---
title: "Code Blocks"
date: 2026-01-13
summary: "Use readable, copyable code blocks with language-aware highlighting."
categories: ["Features"]
tags: ["code blocks", "highlight.js", "copy button"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/codeblock.png?raw=true"
---

## What SeoTax Adds

Code blocks include window controls, line numbers, a copy button,
and a language label. Light and dark themes use separate highlight.js color sets.

## Configuration

```yaml
markup:
  highlight:
    noClasses: false
    codeFences: true
```

Use a fenced code block and declare its language when possible.

```go
fmt.Println("Hello, SeoTax")
```
