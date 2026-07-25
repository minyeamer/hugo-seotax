---
title: "Write a New Post"
date: 2026-01-26
summary: "A repeatable workflow from creating a post to checking it locally."
categories: ["Guide"]
tags: ["writing", "archetype", "hugo new"]
---

## Create the File

```bash
hugo new posts/frontend/my-post.md
```

## Add Metadata

At minimum, provide a title, date, summary, categories, and tags.

## Preview Locally

```bash
hugo server --buildDrafts --disableFastRender
```

Check responsive images, the table of contents, code copy controls,
and category and tag links.
When its sort control is enabled, test the search page's relevance, newest, and oldest sort modes as well.
Set `params.search.sort` to `disabled` when the control should be hidden.
