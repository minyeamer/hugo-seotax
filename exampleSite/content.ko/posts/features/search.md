---
title: "검색과 택소노미"
date: 2026-01-10
summary: "SeoTax의 핵심인 동적 검색과 카테고리/태그 필터 동작을 설명합니다."
categories: ["기능"]
tags: ["검색", "Fuse.js", "Taxonomies", "카테고리", "태그"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/search-demo.gif?raw=true"
---

## 왜 동적 검색인가?

Hugo는 태그와 카테고리마다 정적 term 페이지를 만들 수 있습니다.
글과 태그가 적을 때는 괜찮지만, 태그가 많아지면 빌드 결과물이 빠르게 늘어납니다.

SeoTax는 개별 term 페이지 대신 `/search/` 한 곳에서 검색과 필터를 처리합니다.

## 검색 진입 방법

- 사이드바 검색창 클릭
- 모바일 헤더 검색창 클릭
- `/` 또는 `s` 단축키
- 글 목록의 카테고리/태그 칩 클릭
- 사이드바의 카테고리 클릭

## 지원하는 검색 유형

| 유형 | 예시 |
|---|---|
| 키워드 | `/search/?query=hugo` |
| 부모 카테고리 | `/search/?category1=Frontend` |
| 자식 카테고리 | `/search/?category1=Frontend&category2=Blog` |
| 단일 태그 | `/search/?tags=Hugo` |
| 다중 태그 | `/search/?tags=Hugo,검색&tagsOp=and` |

## 동작 흐름

Hugo 빌드 시점에 검색용 JSON 파일이 생성됩니다.

- `content.json`: 제목과 본문 검색
- `categories.json`: 2단계 카테고리 매핑
- `tags.json`: 태그별 글 ID 매핑

브라우저에서는 Fuse.js가 키워드 검색을 처리하고, 카테고리와 태그는 JSON 매핑으로 빠르게 필터링합니다.
