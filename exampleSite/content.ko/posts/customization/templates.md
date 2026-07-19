---
title: "템플릿 구조"
date: 2026-01-21
summary: "SeoTax 레이아웃과 partial 템플릿이 어디에 있는지 간단히 안내합니다."
categories: ["커스터마이징"]
tags: ["layouts", "partials", "templates"]
---

## 기본 구조

SeoTax 템플릿은 `layouts/` 아래에 있습니다.

```text
layouts/
  baseof.html
  index.html
  single.html
  search/
  categories/
  tags/
  _partials/
  _shortcodes/
  _markup/
```

## 페이지 템플릿

| 파일 | 역할 |
|---|---|
| `baseof.html` | 전체 HTML 뼈대 |
| `index.html` | 홈 글 목록 |
| `single.html` | 글 상세 |
| `search/list.html` | 검색 페이지 |
| `categories/terms.html` | 카테고리 목록 |
| `tags/terms.html` | 태그 목록 |

## Partial

반복되는 UI는 `_partials/`에 있습니다.

```text
_partials/
  menu/
  header/
  footer/
  content/
  meta/
```

사이드바를 바꾸려면 `menu/`, 글 상단 메타데이터를 바꾸려면 `content/`,
댓글과 이전/다음 글은 `footer/`를 보면 됩니다.

## Markdown 렌더링

마크다운 이미지, 링크, 코드블럭 렌더링은 `_markup/`에서 제어합니다.

```text
_markup/render-image.html
_markup/render-link.html
_markup/render-codeblock.html
```
