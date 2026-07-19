---
title: "Series"
date: 2026-02-06
summary: "Group related posts into an intentional reading order."
categories: ["Shortcodes"]
tags: ["series", "post series", "navigation"]
series: ["Building a Hugo Theme"]
---

## Assign a Series

Use the same series value in every related post.

```yaml
series: ["Building a Hugo Theme"]
```

## Render the List

```go-html
{{</* series "Building a Hugo Theme" */>}}
```

{{< series "Building a Hugo Theme" >}}

SeoTax finds matching posts and creates a series list plus previous and next controls.

## Shorten Repeated Titles

Pass a second argument with a regular expression to remove a shared title prefix.

```go-html
{{</* series "Building a Hugo Theme" "^Building a Hugo Theme - " */>}}
```
