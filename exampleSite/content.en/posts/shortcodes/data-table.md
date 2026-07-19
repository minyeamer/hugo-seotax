---
title: "Data Table"
date: 2026-02-04
summary: "Render delimited data as a styled table with an optional download."
categories: ["Shortcodes"]
tags: ["data-table", "CSV", "tables"]
---

## Basic Use

```go-html
{{</* data-table delimiter="," headers="1" */>}}
Name,Score,Grade
Alice,95,A
Bob,82,B
{{</* /data-table */>}}
```

{{< data-table delimiter="," headers="1" >}}
Name,Score,Grade
Alice,95,A
Bob,82,B
{{< /data-table >}}

The first row receives table-header styling.

## Download the Source

Set `file-name` to offer the data as a downloadable file.

```go-html
{{</* data-table file-name="scores.csv" */>}}
Name,Score
Alice,95
Bob,82
{{</* /data-table */>}}
```

{{< data-table file-name="scores.csv" >}}
Name,Score
Alice,95
Bob,82
{{< /data-table >}}

Useful parameters include
`delimiter`, `headers`, `file-name`, `align-center`, and `class`.
