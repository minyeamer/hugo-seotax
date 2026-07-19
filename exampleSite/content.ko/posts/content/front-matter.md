---
title: "Front Matter 작성"
date: 2026-01-06
summary: "SeoTax 글에서 자주 사용하는 front matter 필드를 소개합니다."
categories: ["콘텐츠 작성"]
tags: ["front matter", "categories", "tags", "series", "cover"]
---

## 기본 예시

글 상단에는 제목, 날짜, 요약, 카테고리, 태그 같은 메타데이터를 작성합니다.

```yaml
---
title: "글 제목"
date: 2026-01-01
summary: "글 목록과 검색 결과에 표시될 짧은 설명"
categories: ["Frontend", "Hugo"]
tags: ["Hugo", "SeoTax", "검색"]
series: ["Hugo 테마 만들기"]
cover: "https://example.com/cover.webp"
thumbnail: "https://example.com/thumb.webp"
---
```

## 주요 필드

| 필드 | 용도 |
|---|---|
| `title` | 글 제목 |
| `date` | 정렬과 표시 날짜 |
| `summary` | 글 목록 요약 |
| `categories` | 2단계 카테고리 |
| `tags` | 검색 필터용 태그 |
| `series` | 시리즈 Shortcode와 연결 |
| `cover` | 상세 페이지 상단 이미지 |
| `thumbnail` | 목록에서 사용할 작은 이미지 |

## 숨김 글

홈 목록과 검색 결과에서 제외하고 싶은 글은 `hidden`을 사용합니다.

```yaml
hidden: true
```

문서 초안이나 내부 안내 페이지를 예제 사이트에 남겨둘 때 유용합니다.
