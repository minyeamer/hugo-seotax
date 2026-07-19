---
title: "Dark Mode"
date: 2026-01-11
summary: "Use system-aware light and dark themes with a manual toggle."
categories: ["Features"]
tags: ["dark mode", "CSS Variables", "localStorage"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/light-dark-demo.gif?raw=true"
---

## Theme Preference

SeoTax respects the visitor's system preference on first visit
and saves a manual choice in local storage.
Use `Cmd/Ctrl + Shift + S` to toggle the theme.

## Customize Colors

Theme color variables live in:

```text
assets/css/themes/_light.scss
assets/css/themes/_dark.scss
```

Override a small set of variables before changing component styles.
