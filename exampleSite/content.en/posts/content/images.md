---
title: "Work with Images"
date: 2026-01-08
summary: "Use covers, thumbnails, the Image shortcode, and image sizing settings."
categories: ["Guide"]
tags: ["images", "cover", "thumbnail", "CLS"]
---

## Covers and Thumbnails

```yaml
cover: "https://example.com/cover.webp"
thumbnail: "https://example.com/thumb.webp"
```

A thumbnail takes priority in post lists; otherwise SeoTax uses the cover.

## Inline Images

Use Markdown for simple images.
Use the `image` shortcode when you need a caption, alignment, size limits, or click-to-zoom.

## Reduce Layout Shift

```yaml
params:
  images:
    rootPath: "_images"
    maxImageSize: 1920
```

Use `params.images`, not `params.image`.
`roundedCorners` affects Markdown images and the Image shortcode;
`rotateLandscapeImages` rotates wide images in the narrow-screen zoom view.
