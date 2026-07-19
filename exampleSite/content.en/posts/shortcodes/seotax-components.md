---
title: "SeoTax Shortcodes"
date: 2026-01-19
summary: "A quick introduction to SeoTax-specific components."
categories: ["Shortcodes"]
tags: ["bookmark", "data-table", "image", "series"]
series: ["Building a Hugo Theme"]
---

## Bookmark

```go-html
{{</* bookmark "https://gohugo.io/" */>}}
```

{{< bookmark "https://gohugo.io/" >}}

## Data Table

```go-html
{{</* data-table delimiter="," headers="1" file-name="data.csv" */>}}
Name,Score
Alice,90
Bob,85
{{</* /data-table */>}}
```

{{< data-table delimiter="," headers="1" file-name="data.csv" >}}
Name,Score
Alice,90
Bob,85
{{< /data-table >}}

## Image

```go-html
{{</* image
  src="/hugo-seotax/images/zion-national-park.jpg"
  alt="A canyon landscape"
  caption="Canyon landscape"
  max-width="360px"
  align="center"
*/>}}
```

{{< image
  src="/hugo-seotax/images/zion-national-park.jpg"
  alt="A canyon landscape"
  caption="Canyon landscape"
  max-width="360px"
  align="center"
>}}

## Series

```go-html
{{</* series "Building a Hugo Theme" */>}}
```

{{< series "Building a Hugo Theme" >}}

Use the same `series` value in the post front matter.
