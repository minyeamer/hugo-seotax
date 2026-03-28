---
title: "코드 블럭 & 문법 하이라이팅"
date: 2026-01-05
summary: "라인 넘버, 복사 버튼, 언어 라벨, 테마 인식 문법 하이라이팅을 갖춘 Mac 스타일 코드 블럭."
categories: ["가이드", "기능"]
tags: ["코드", "문법 하이라이팅", "highlight.js"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-40-codeblock-wide.webp?raw=true"
thumbnail: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-41-codeblock-mobile.webp?raw=true"
---

## 개요

SeoTax는 Hugo의 기본 코드 블럭을 개발자 친화적인 UI로 개선합니다.

![코드 블럭](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-40-codeblock-wide.webp?raw=true)

## 기능

### Mac 스타일 윈도우 컨트롤

모든 코드 블럭 상단에 빨강, 노랑, 초록 세 개의 원이 표시됩니다. CSS `::before` 의사 요소와 `box-shadow`로 스타일링되어 추가 HTML이 필요 없습니다.

### 라인 넘버

`highlightjs-line-numbers.js`으로 구현합니다 (CDN 없이 로컬 번들). 라인 넘버는 `user-select: none`으로 복사 시 제외됩니다.

### 복사 버튼

시각적 피드백이 있는 원클릭 복사:
1. **Copy** 버튼 클릭
2. 아이콘이 체크마크로 변경, 텍스트에 "COPIED" 표시
3. 배경이 2초간 녹색으로 깜빡임
4. Clipboard API를 사용할 수 없으면 `textarea` 기반 복사로 대체

### 언어 라벨

우측 상단 모서리에 코드 언어를 표시하는 칩 (예: `python`, `yaml`, `bash`).

### 테마 인식 색상

| 테마 | 문법 스타일 | 미리보기 |
|------|-----------|---------|
| 라이트 | **Xcode** | 키워드: 보라, 문자열: 빨강, 주석: 초록 |
| 다크 | **VS2015** | 키워드: 파랑, 문자열: 주황, 주석: 초록 |

색상은 CSS 변수에 매핑되어 다크모드와 함께 자동 전환됩니다 — 추가 설정 불필요.

## 예시

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
    Post("시작하기", "2026-01-01", ["Hugo", "SeoTax"]),
    Post("검색 가이드", "2026-01-02", ["검색", "Fuse.js"]),
]

for post in posts:
    print(post.summary())
```

### JavaScript

```javascript
// Fuse.js 검색 초기화
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
# Hugo 사이트 설정
baseURL: "https://example.com/"
title: "내 블로그"
theme: "seotax"

params:
  author: "개발자"
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
		{"시작하기", []string{"Hugo", "SeoTax"}, "2026-01-01"},
		{"검색 가이드", []string{"검색", "Fuse.js"}, "2026-01-02"},
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

# SeoTax 테마로 새 Hugo 사이트 생성
hugo new site myblog && cd myblog

git init
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
cp -R themes/seotax/exampleSite/* .

echo "개발 서버 시작..."
hugo server --minify --buildDrafts
```
