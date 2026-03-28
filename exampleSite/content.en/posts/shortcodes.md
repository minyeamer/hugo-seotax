---
title: "Shortcodes"
date: 2026-01-04
summary: "An overview of all shortcodes available in SeoTax — including inherited Hugo Book shortcodes and SeoTax custom shortcodes."
categories: ["Guide", "Features"]
tags: ["Shortcodes", "Bookmark", "Data Table", "Series", "Image"]
---

## Hugo Book Shortcodes

SeoTax inherits several shortcodes from the Hugo Book theme.

### Columns

Multi-column flexbox layout. Separate columns with `<--->`. Use an optional `ratio` to control relative widths.

```markdown
{{</* columns */>}}
Left column content
<--->
Right column content
{{</* /columns */>}}
```

{{< columns >}}
**Left Column**

This is the left side of a two-column layout. You can put any markdown content here.

<--->

**Right Column**

This is the right side. The `columns` shortcode uses flexbox for responsive layout.
{{< /columns >}}

### Hints

Colored callout boxes for notes, warnings, and more.

```markdown
{{</* hint info */>}}
This is an informational hint.
{{</* /hint */>}}
```

{{< hint >}}
**Default** — A neutral hint with no color modifier.
{{< /hint >}}

{{< hint info >}}
**Info** — Use `info` for general information and tips.
{{< /hint >}}

{{< hint success >}}
**Success** — Use `success` for positive confirmations.
{{< /hint >}}

{{< hint warning >}}
**Warning** — Use `warning` for cautions.
{{< /hint >}}

{{< hint danger >}}
**Danger** — Use `danger` for critical warnings.
{{< /hint >}}

### Tabs

Tabbed content panels for organizing related content.

```markdown
{{</* tabs "example" */>}}
{{</* tab "Tab 1" */>}} Content for tab 1 {{</* /tab */>}}
{{</* tab "Tab 2" */>}} Content for tab 2 {{</* /tab */>}}
{{</* /tabs */>}}
```

{{< tabs "languages" >}}
{{< tab "JavaScript" >}}
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```
{{< /tab >}}
{{< tab "Python" >}}
```python
def greet(name):
    print(f"Hello, {name}!")
```
{{< /tab >}}
{{< tab "Go" >}}
```go
func greet(name string) {
    fmt.Printf("Hello, %s!\n", name)
}
```
{{< /tab >}}
{{< /tabs >}}

### Details

Collapsible content blocks (HTML `<details>` element).

```markdown
{{</* details "Click to expand" */>}}
Hidden content goes here.
{{</* /details */>}}
```

{{< details "Click to expand" >}}
This content is hidden by default. Click the summary line to reveal it. Useful for lengthy code samples, FAQs, or supplementary information.
{{< /details >}}

### Mermaid

Diagrams and charts using [Mermaid](https://mermaid.js.org/) syntax.

```markdown
{{</* mermaid */>}}
graph LR
  A[Hugo Build] --> B[JSON Index]
  B --> C[Fuse.js Search]
  C --> D[Dynamic Results]
{{</* /mermaid */>}}
```

{{< mermaid >}}
graph LR
  A[Hugo Build] --> B[JSON Index]
  B --> C[Fuse.js Search]
  C --> D[Dynamic Results]
{{< /mermaid >}}

### KaTeX

Math equations using [KaTeX](https://katex.org/).

```markdown
{{</* katex */>}}
E = mc^2
{{</* /katex */>}}
```

Result: $E = mc^2$

---

## SeoTax Custom Shortcodes

### Bookmark

Generates a rich link card by auto-fetching Open Graph metadata from a URL.

```markdown
{{</* bookmark url="https://gohugo.io/" */>}}
```

You can also provide manual overrides:

```markdown
{{</* bookmark url="https://gohugo.io/" title="Hugo" description="The world's fastest framework for building websites" */>}}
```

Parameters: `url`, `title`, `description`, `image`, `fetch` (default `true`).

### Data Table

Renders inline CSV text as a styled HTML table with optional download button.

```markdown
{{</* data-table delimiter="," headers="1" file-name="example.csv" */>}}
Framework,Language,Stars
Hugo,Go,80k
Next.js,JavaScript,130k
Nuxt,JavaScript,55k
Gatsby,JavaScript,55k
{{</* /data-table */>}}
```

{{< data-table delimiter="," headers="1" file-name="frameworks.csv" >}}
Framework,Language,Stars
Hugo,Go,80k
Next.js,JavaScript,130k
Nuxt,JavaScript,55k
Gatsby,JavaScript,55k
{{< /data-table >}}

Parameters: `delimiter` (default `,`), `headers` (number of header rows), `file-name` (enables download), `align-center`, `class`.

### Image

Enhanced image shortcode with click-to-zoom, CLS prevention, and full layout control.

```markdown
{{</* image src="https://example.com/photo.jpg" alt="Description" caption="Figure 1" max-width="600px" */>}}
```

Parameters: `src`, `alt`, `caption`, `class`, `title`, `loading` (default `lazy`), `align`, `href`, `target`, `width`, `min-width`, `max-width`, `height`, `min-height`, `max-height`.

On mobile, landscape images rotate 90° when tapped for full-screen viewing.

### Series

Velog-style series navigation that groups posts sharing the same `series` front matter value.

```markdown
{{</* series "My Tutorial Series" */>}}
```

Add `series: ["My Tutorial Series"]` to the front matter of related posts. The shortcode auto-collects all matching posts and renders a collapsible list with prev/next navigation.

Optional second parameter: regex pattern to strip common prefixes from titles.
