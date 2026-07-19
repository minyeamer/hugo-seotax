---
title: "Write Multilingual Content"
date: 2026-01-25
summary: "Structure translated content for a Hugo site with multiple languages."
categories: ["Guide"]
tags: ["multilingual", "contentDir", "translation"]
---

## Separate Content by Language

```text
content.en/
  posts/
  search/

content.ko/
  posts/
  search/
```

Use the same relative path and filename for translations when possible.

## Language Switching

The sidebar language menu opens a translated page when one exists.
On localized taxonomy, search, and list pages without a translation,
it keeps the current path and carries query parameters and hashes across.

Search data is scoped by content language,
so posts from one language do not appear in another language's result set.
