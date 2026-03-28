---
title: "Code Blocks & Syntax Highlighting"
date: 2026-01-05
summary: "Mac-style code blocks with line numbers, copy button, language labels, and theme-aware syntax highlighting."
categories: ["Guide", "Features"]
tags: ["Code", "Syntax Highlighting", "highlight.js"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-40-codeblock-wide.webp?raw=true"
---

## Overview

SeoTax enhances Hugo's default code blocks with a polished developer-friendly UI.

![Code Block](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-40-codeblock-wide.webp?raw=true)

## Features

### Mac-style Window Controls

Three colored dots (red, yellow, green) appear at the top of every code block, styled using CSS `::before` pseudo-elements and `box-shadow` — no extra HTML required.

### Line Numbers

Powered by `highlightjs-line-numbers.js` (bundled locally, no CDN). Line numbers are excluded from copy operations via `user-select: none`.

### Copy Button

One-click copy with visual feedback:
1. Click the **Copy** button
2. Icon changes to a checkmark, text shows "COPIED"
3. Background flashes green for 2 seconds
4. Falls back to `textarea`-based copying if Clipboard API is unavailable

### Language Label

A chip in the top-right corner displays the code language (e.g., `python`, `yaml`, `bash`).

### Theme-aware Colors

| Theme | Syntax Style | Preview |
|-------|-------------|---------|
| Light | **Xcode** | Keywords: purple, strings: red, comments: green |
| Dark | **VS2015** | Keywords: blue, strings: orange, comments: green |

Colors are mapped to CSS variables and switch automatically with dark mode — no extra configuration needed.

## Examples

### Python

```python
from dataclasses import dataclass

@dataclass
class Post:
    title: str
    date: str
    tags: list[str]

    def summary(self) -> str:
        tag_str = ", ".join(self.tags)
        return f"[{self.date}] {self.title} ({tag_str})"

posts = [
    Post("Getting Started", "2026-01-01", ["Hugo", "SeoTax"]),
    Post("Search Guide", "2026-01-02", ["Search", "Fuse.js"]),
]

for post in posts:
    print(post.summary())
```

### JavaScript

```javascript
// Fuse.js search initialization
import Fuse from "fuse.js";

const options = {
  keys: ["title", "content"],
  threshold: 0.3,
  includeScore: true,
};

async function initSearch() {
  const response = await fetch("/data/content.json");
  const posts = await response.json();
  const fuse = new Fuse(posts, options);

  return (query) => fuse.search(query).map((result) => ({
    item: result.item,
    score: result.score,
  }));
}
```

### YAML

```yaml
# Hugo site configuration
baseURL: "https://example.com/"
title: "My Blog"
theme: "seotax"

params:
  author: "Developer"
  search:
    enabled: true
  menu:
    categories: true
    recentPosts: true
```

### Go

```go
package main

import (
	"fmt"
	"sort"
)

type Post struct {
	Title string
	Tags  []string
	Date  string
}

func main() {
	posts := []Post{
		{"Getting Started", []string{"Hugo", "SeoTax"}, "2026-01-01"},
		{"Search Guide", []string{"Search", "Fuse.js"}, "2026-01-02"},
	}

	sort.Slice(posts, func(i, j int) bool {
		return posts[i].Date > posts[j].Date
	})

	for _, p := range posts {
		fmt.Printf("[%s] %s\n", p.Date, p.Title)
	}
}
```

### Bash

```bash
#!/bin/bash

# Create a new Hugo site with SeoTax theme
hugo new site myblog && cd myblog

git init
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
cp -R themes/seotax/exampleSite/* .

echo "Starting development server..."
hugo server --minify --buildDrafts
```
