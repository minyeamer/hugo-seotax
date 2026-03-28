---
title: "동적 검색 & 택소노미 필터"
date: 2026-01-02
summary: "SeoTax가 Fuse.js와 바닐라 JS를 활용해 수천 개의 정적 페이지 없이 즉각적인 검색과 고급 택소노미 필터를 제공하는 방법을 설명합니다."
categories: ["가이드", "기능"]
tags: ["검색", "Fuse.js", "택소노미", "카테고리", "태그"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-01-search-demo.gif?raw=true"
---

## 정적 택소노미 페이지의 문제점

Hugo는 모든 태그와 카테고리에 대해 정적 HTML 페이지를 생성합니다. 포스트 40개에 태그 100개 이상이면 500개 이상의 추가 페이지(10MB+)가 생성됩니다. 포스트가 400개로 늘어나면 수천 페이지, 수백 MB에 달해 Git 작업이 느려지고 분석 데이터가 분산됩니다.

**SeoTax는 이 문제를 완전히 해결합니다** — JavaScript 기반 단일 동적 검색 페이지로 대체합니다.

## 동작 방식

![검색 데모](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-01-search-demo.gif?raw=true)

### 1. 빌드 타임 JSON 인덱스

Hugo 빌드 시 세 개의 JSON 파일이 생성됩니다:

- `content.json` — Fuse.js 전문 검색용 포스트 제목 및 내용
- `categories.json` — 포스트 ID 매핑이 포함된 2단계 카테고리 트리
- `tags.json` — O(1) 조회를 위한 태그-포스트 ID 매핑

### 2. Fuse.js 퍼지 검색

[Fuse.js](https://www.fusejs.io/)를 사용해 포스트 제목과 내용에 대한 퍼지 매칭을 수행합니다. 점수는 0(완벽한 매치)에서 1(매치 없음)까지로, 오타가 있어도 유연하게 검색할 수 있습니다.

### 3. 사전 렌더링된 포스트 항목

모든 포스트 항목은 숨겨진 HTML 요소로 사전 렌더링됩니다. 검색 결과는 일치하는 요소를 `DocumentFragment`에 복제하여 효율적으로 DOM을 조작합니다 — 클라이언트 사이드 템플릿이 필요 없습니다.

## 5가지 검색 유형

SeoTax는 URL 파라미터를 통한 5가지 쿼리 유형을 지원합니다:

| 유형 | 파라미터 | 예시 |
|------|---------|------|
| **키워드** | `?query=hugo` | 전문 퍼지 검색 |
| **상위 카테고리** | `?category1=가이드` | 상위 카테고리의 전체 포스트 |
| **하위 카테고리** | `?category1=가이드&category2=설정` | 특정 하위 카테고리 포스트 |
| **단일 태그** | `?tags=Hugo` | 특정 태그의 포스트 |
| **다중 태그** | `?tags=Hugo,검색&tagsOp=and` | 모든/일부 태그 매칭 |

## 검색 모달

페이지 어디서든 `/` 또는 `s` 키를 누르면 검색 모달이 열립니다. 모바일에서는 헤더에 검색 바가 추가로 제공됩니다.

![검색 모달](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-08-layout-search-modal.webp?raw=true)

## 고급 필터

검색 페이지에는 카테고리 드롭다운과 태그 선택이 포함된 접을 수 있는 고급 필터가 있어, 키워드 입력 없이도 결과를 좁힐 수 있습니다.

![검색 페이지](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-09-layout-search-page.webp?raw=true)

## 설정

`config.yaml`에서 검색을 활성화합니다:

```yaml
params:
  search:
    enabled: true

# 태그별 정적 페이지 비활성화 (권장)
disableKinds: ["term"]
```

추가 설정은 필요 없습니다 — JSON 인덱스는 자동으로 생성됩니다.
