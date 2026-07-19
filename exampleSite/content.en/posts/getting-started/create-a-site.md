---
title: "Create a Site"
date: 2026-01-02
summary: "Install SeoTax in a new Hugo site and run it locally."
categories: ["Guide"]
tags: ["Hugo", "installation", "Git Submodule", "Hugo Module"]
---

## Prerequisites

SeoTax requires Hugo **0.146.0 or later**. Check your installed version first.

```bash
hugo version
```

## Install as a Git Submodule

```bash
hugo new site myblog
cd myblog
git init
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
```

Set `theme: "seotax"`, then run `hugo server --minify`.

## Install as a Hugo Module

```toml
[module]
[[module.imports]]
path = "github.com/minyeamer/hugo-seotax"
```

Run `hugo mod get -u`, then start the local server.

## Start from the Example Site

```bash
cp -R themes/seotax/exampleSite/* .
hugo server --minify
```
