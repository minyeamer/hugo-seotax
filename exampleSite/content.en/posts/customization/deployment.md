---
title: "Deploy SeoTax"
date: 2026-01-22
summary: "Build and publish a SeoTax site on a static hosting provider."
categories: ["Customization"]
tags: ["GitHub Pages", "deployment", "baseURL"]
---

## Production Build

```bash
hugo --minify
```

Publish the generated `public/` directory using your hosting provider's recommended workflow.

## Subdirectory Deployments

Set `baseURL` to the complete deployed address, including any repository subdirectory.
Test links, static assets, search, and language routes before release.

## GitHub Pages

The example site includes a GitHub Actions workflow.
Adapt its repository and deployment settings for your own project.
