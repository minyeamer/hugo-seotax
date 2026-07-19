---
title: "기본 설정"
date: 2026-01-03
summary: "SeoTax를 실행하는 데 필요한 최소 설정과 권장 설정을 정리합니다."
categories: ["시작하기"]
tags: ["config", "Hugo", "설정"]
---

## 최소 설정

아래 설정만 있어도 SeoTax를 적용한 블로그를 실행할 수 있습니다.

```yaml
baseURL: "https://example.com/"
title: "My Blog"
theme: "seotax"
defaultContentLanguage: "ko"

params:
  posts:
    section: "posts"
```

`params.posts.section`은 글이 들어있는 `content/` 하위 폴더 이름입니다.
기본 구조를 따른다면 `content/posts/`를 사용하므로 `"posts"`로 둡니다.

## 검색 권장 설정

SeoTax는 태그별 정적 페이지 대신 단일 검색 페이지를 사용합니다. 그래서 아래 설정을 권장합니다.

```yaml
disableKinds: ["term"]

params:
  search:
    enabled: true
```

`disableKinds: ["term"]`은 `/tags/hugo/` 같은 개별 term 페이지 생성을 막습니다.
대신 태그와 카테고리 링크는 `/search/` 페이지로 연결됩니다.

## 마크다운 설정

Shortcode, HTML, 코드블럭, 목차를 안정적으로 사용하려면 아래 설정을 함께 둡니다.

```yaml
markup:
  goldmark:
    renderer:
      unsafe: true
  highlight:
    noClasses: false
    codeFences: true
  tableOfContents:
    startLevel: 2
    endLevel: 3
```

## 자주 쓰는 파라미터

```yaml
params:
  author: "작성자"
  keywords: ["Hugo", "Blog"]

  menu:
    profileImage: "/profile.svg"
    categories: true
    recentPosts: true

  social:
    github: "https://github.com/username"

  tableOfContents:
    startLevel: 2
    endLevel: 3
```

프로필 이미지와 파비콘처럼 `/`로 시작하는 경로는 `static/` 폴더 기준으로 생각하면 됩니다.
