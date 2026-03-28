---
title: "SeoTax 시작하기"
date: 2026-01-01
summary: "SeoTax Hugo 테마 설치 및 설정 방법을 안내합니다."
categories: ["가이드", "설정"]
tags: ["Hugo", "SeoTax", "설치", "설정"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-00-cover.webp?raw=true"
---

## SeoTax란?

**SeoTax**(Search + Taxonomies)는 독자가 콘텐츠를 쉽게 탐색할 수 있도록 설계된 Hugo 블로그 테마입니다. 태그/카테고리별로 생성되는 수백 개의 정적 페이지를 단일 동적 검색 페이지로 대체하고, 27개 언어 클라이언트 사이드 i18n을 지원하며, 독자 중심의 탐색 경험을 제공합니다.

![메인 페이지](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-04-layout-main.webp?raw=true)

## 설치

### Git 서브모듈

```bash
cd your-hugo-site
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
```

### Hugo 모듈

```bash
hugo mod init github.com/your/repo
```

`hugo.toml`에 추가:

```toml
[module]
[[module.imports]]
path = 'github.com/minyeamer/hugo-seotax'
```

### 처음부터 시작하기

```bash
hugo new site myblog && cd myblog
git init
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
cp -R themes/seotax/exampleSite/* .
hugo server --minify
```

## 기본 설정

`config.yaml`에 `theme: "seotax"`를 설정합니다:

```yaml
baseURL: "https://example.com/"
title: "내 블로그"
theme: "seotax"
defaultContentLanguage: "ko"
languageCode: "ko-kr"

enableRobotsTXT: true
enableEmoji: true

# 태그별 정적 페이지 비활성화 (동적 검색 사용 권장)
disableKinds: ["term"]

params:
  author: "이름"
  posts:
    section: "posts"
  menu:
    categories: true
    recentPosts: true
  search:
    enabled: true
  i18nDir: "themes/seotax/i18n"
```

## 포스트 Front Matter

각 포스트는 다음 front matter 필드를 지원합니다:

```yaml
---
title: "포스트 제목"
date: 2026-01-01
summary: "포스트 요약"
categories: ["상위 카테고리", "하위 카테고리"]
tags: ["태그1", "태그2"]
series: ["시리즈 이름"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/cover.jpg?raw=true"
---
```

테마는 **2단계 카테고리 계층**을 사용합니다. `categories`의 첫 번째 항목이 상위 카테고리, 두 번째가 하위 카테고리입니다.

## 다음 단계

다른 예시 포스트에서 자세한 기능을 확인하세요:

- [동적 검색](../search-and-taxonomy/) — 퍼지 검색과 택소노미 필터링
- [다크모드 & i18n](../dark-mode-and-i18n/) — 테마 전환과 다국어 UI
- [Shortcodes](../shortcodes/) — 내장 및 커스텀 Shortcode 컴포넌트
- [코드 블럭](../code-blocks/) — Mac 스타일 문법 하이라이팅
