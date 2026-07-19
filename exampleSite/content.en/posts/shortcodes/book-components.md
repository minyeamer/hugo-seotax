---
title: "Book Shortcodes"
date: 2026-01-18
summary: "Use the Columns, Hints, Tabs, Details, Mermaid, and KaTeX components inherited from Hugo Book."
categories: ["Shortcodes"]
tags: ["columns", "hint", "tabs", "mermaid", "katex"]
---

## Columns

Use Columns to place short, related content side by side.

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

## Hints

```go-html
{{%/* hint warning */%}}
Read this before deploying.
{{%/* /hint */%}}
```

{{% hint warning %}}
Read this before deploying.
{{% /hint %}}

## Tabs

```go-html
{{</* tabs "install" */>}}
{{%/* tab "npm" */%}} npm install {{%/* /tab */%}}
{{%/* tab "pnpm" */%}} pnpm install {{%/* /tab */%}}
{{</* /tabs */>}}
```

{{< tabs "install" >}}
{{% tab "npm" %}} npm install {{% /tab %}}
{{% tab "pnpm" %}} pnpm install {{% /tab %}}
{{< /tabs >}}

## Details

```go-html
{{%/* details "Show more" */%}}
Additional explanation goes here.
{{%/* /details */%}}
```

{{% details "Show more" %}}
Additional explanation goes here.
{{% /details %}}

## Mermaid

````markdown
```mermaid
graph LR
  A --> B
```
````

```mermaid
graph LR
  A --> B
```

## KaTeX

````markdown
```katex
E = mc^2
```
````

```katex
E = mc^2
```

Use `$E = mc^2$` for inline math.
