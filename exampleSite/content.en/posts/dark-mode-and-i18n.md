---
title: "Dark Mode & Internationalization"
date: 2026-01-03
summary: "Dark mode with system detection and localStorage persistence, plus client-side i18n supporting 27 languages without page reload."
categories: ["Guide", "Features"]
tags: ["Dark Mode", "i18n", "Multilingual", "Accessibility"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-31-light-dark-cover.webp?raw=true"
---

## Dark Mode

![Dark Mode Demo](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-32-light-dark-demo.gif?raw=true)

### How It Works

SeoTax implements dark mode using CSS variables on a single `data-theme` attribute on the `<html>` element. Changing this one attribute triggers all color changes across the site.

**Priority order:**
1. `localStorage` (user's explicit choice)
2. System preference (`prefers-color-scheme`)
3. Light theme (default)

### Toggle Methods

- **Sidebar button** — Moon icon in the sidebar links area
- **Keyboard shortcut** — `Cmd/Ctrl + Shift + S`

### Color Design Principles

- Background uses `#181a1b` (not pure black) to reduce eye fatigue
- Text uses `#f5f6fa` (not pure white) for softened contrast
- Link colors shift from `#0055bb` (light) to `#8ecfff` (dark)
- Code block themes switch between **Xcode** (light) and **VS2015** (dark)

### Disqus Integration

Since Disqus runs in an iframe, it cannot detect CSS variable changes. SeoTax forces a Disqus reload (`DISQUS.reset()`) on theme toggle to synchronize colors.

---

## Client-side i18n

![i18n Demo](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-02-i18n-demo.gif?raw=true)

### The Problem with Hugo's Built-in i18n

Hugo's multilingual system is **author-centric** — it duplicates pages per language and changes URLs (e.g., `/en/` → `/ko/`). This multiplies build output and can break reading flow.

### SeoTax's Approach

SeoTax uses **reader-centric client-side i18n**:

- A single HTML page supports all 27 languages
- No page reload or URL change when switching languages
- Auto-detects browser language via `navigator.language`
- Persists user choice in `localStorage`

### How Translation Works

1. **Build time:** Hugo reads all `i18n/*.yaml` files and merges them into a single JSON
2. **HTML:** Elements get `data-i18n-*` attributes (e.g., `data-i18n-id`, `data-i18n-text`)
3. **Runtime:** JavaScript translates text, attributes (`aria-label`, `title`), and dates

### Adding a New Language

Simply create a YAML file in the `i18n/` directory:

```yaml
# i18n/fr.yaml
- id: "menu.aside.tooltip"
  translation: "Menu"

- id: "search.action.label"
  translation: "Rechercher"
```

The new language automatically appears in the toolbar language selector.

### Supported Languages

English, Korean, Japanese, Chinese (Simplified/Traditional), Spanish, French, German, Italian, Portuguese (PT/BR), Russian, Arabic, Bulgarian, Bengali, Czech, Persian, Hebrew, Norwegian, Dutch, Occitan, Polish, Swedish, Swahili, Turkish, Ukrainian, and Amharic.

### Configuration

No special configuration needed. The i18n system works out of the box:

```yaml
params:
  i18nDir: "themes/seotax/i18n"
```

### Multi-Language Content

SeoTax also supports Hugo's [multilingual content mode](https://gohugo.io/content-management/multilingual/). When multiple languages are configured, a language selector appears in the sidebar:

```yaml
languages:
  en:
    languageName: "English"
    contentDir: "content.en"
    weight: 1
  ko:
    languageName: "한국어"
    contentDir: "content.ko"
    weight: 2
```
