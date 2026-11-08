---
title: "Requirements and Dependencies"
date: 2026-02-08
summary: "Hugo requirements and the main libraries included with SeoTax."
categories: ["Reference"]
tags: ["Hugo", "dependencies", "libraries"]
---

## Hugo

SeoTax requires Hugo **0.159.0** or later. Use the extended edition and install
the Dart Sass CLI. Hugo does not bundle Dart Sass with its standard or extended
installation, and SeoTax requires the `sass` executable on your `PATH` to
compile its SCSS. Without it, `hugo server` and site builds fail with
`no Dart Sass binary found in $PATH`. Install Dart Sass in local development
and CI environments that build the site.

```bash
hugo version
sass --version
hugo env
```

On macOS or Linux with Homebrew, install Dart Sass with
`brew install sass/sass/sass`. On Windows, use Chocolatey (`choco install sass`)
or Scoop (`scoop install sass`). After installation, `hugo env` should list the
Dart Sass compiler and implementation.

## Browser JavaScript

Search, client-side i18n, stored color preference,
and image zoom use JavaScript. Static article content remains readable without it.

## Included Libraries

SeoTax includes focused integrations for Fuse.js search,
highlight.js code highlighting, Mermaid diagrams, KaTeX math,
and Giscus or Disqus comments.
