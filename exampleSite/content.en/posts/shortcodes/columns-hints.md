---
title: "Columns and Hints"
date: 2026-01-31
summary: "Place related content side by side and call out important information."
categories: ["Shortcodes"]
tags: ["columns", "hint"]
---

## Columns

Separate columns with `<--->`.

```go-html
{{</* columns */>}}
Left column
<--->
Right column
{{</* /columns */>}}
```

{{< columns >}}
Left column
<--->
Right column
{{< /columns >}}

Use `ratio="1:2"` when one column should be wider.
Columns reflow on narrow screens.

```go-html
{{</* columns ratio="1:2" */>}}
Narrow column
<--->
Wide column
{{</* /columns */>}}
```

{{< columns ratio="1:2" >}}
Narrow column
<--->
Wide column
{{< /columns >}}

## Hints

```go-html
{{%/* hint warning */%}}
Read this before deploying.
{{%/* /hint */%}}
```

{{% hint warning %}}
Read this before deploying.
{{% /hint %}}

Available styles are `info`, `success`, `warning`, and `danger`.
