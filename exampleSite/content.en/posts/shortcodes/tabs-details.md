---
title: "Tabs and Details"
date: 2026-02-01
summary: "Use tabs for alternatives and details blocks for supplementary content."
categories: ["Shortcodes"]
tags: ["tabs", "details"]
---

## Tabs

Use tabs for platform, language, or package-manager alternatives.

````go-html
{{</* tabs "package-manager" */>}}
{{%/* tab "npm" */%}}
```bash
npm install
```
{{%/* /tab */%}}
{{</* /tabs */>}}
````

{{< tabs "package-manager" >}}
{{% tab "npm" %}}
```bash
npm install
```
{{% /tab %}}

{{% tab "pnpm" %}}
```bash
pnpm install
```
{{% /tab %}}
{{< /tabs >}}

The first argument identifies the tab group on the page.

## Details

```go-html
{{%/* details "Show more" */%}}
Additional explanation goes here.
{{%/* /details */%}}
```

{{% details "Show more" %}}
Additional explanation goes here.
{{% /details %}}

Use Details for supporting material,
not information readers need to understand the main flow.
