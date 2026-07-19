---
title: "Image"
date: 2026-02-05
summary: "Control image size, alignment, captions, links, and zoom behavior."
categories: ["Shortcodes"]
tags: ["image", "zoom", "caption"]
---

## Basic Use

```go-html
{{</* image
  src="https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/zion-national-park.jpg?raw=true"
  alt="A canyon landscape"
*/>}}
```

{{< image
  src="https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/zion-national-park.jpg?raw=true"
  alt="A canyon landscape"
>}}

Always provide meaningful `alt` text.

## Size and Alignment

```go-html
{{</* image
  src="https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/zion-national-park.jpg?raw=true"
  alt="Mobile layout"
  caption="Mobile layout"
  max-width="360px"
  align="center"
*/>}}
```

{{< image
  src="https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/zion-national-park.jpg?raw=true"
  alt="Mobile layout"
  caption="Mobile layout"
  max-width="360px"
  align="center"
>}}

Use `width`, `height`, `min-width`, `max-width`, `min-height`, and `max-height` as needed.

## Links and Zoom

An image with `href` opens that URL.
Without `href`, clicking the image opens the built-in zoom view.

## Rounded Corners

```yaml
params:
  images:
    roundedCorners: true
```

This setting applies to both Markdown images and the Image shortcode.
