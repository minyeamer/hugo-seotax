---
title: "SEO와 성능"
date: 2026-01-15
summary: "검색 엔진 메타 태그, 구조화 데이터, CLS 방지, 아이콘 최적화 설정을 정리합니다."
categories: ["기능"]
tags: ["SEO", "Core Web Vitals", "CLS", "Schema.org"]
---

## 기본 SEO

검색 엔진과 소셜 공유를 위해 아래 값을 설정합니다.

```yaml
title: "My Blog"

params:
  author: "작성자"
  description: "블로그 설명"
  keywords: ["Hugo", "Blog"]
  assets:
    opengraph: "/images/og.jpg"
```

## 검색 엔진 인증

Google Search Console이나 네이버 서치어드바이저 인증 코드를 넣을 수 있습니다.

```yaml
params:
  searchEngine:
    google:
      siteVerificationTag: "google-code"
    naver:
      siteVerificationTag: "naver-code"
```

## 구조화 데이터

Schema.org 설정은 검색 엔진이 사이트 주체를 이해하는 데 도움을 줍니다.

```yaml
params:
  schema:
    publisherType: "Person"
    sameAs:
      - "https://github.com/username"
```

## CLS 방지

이미지에 `width`, `height`가 없으면 로딩 중 레이아웃이 밀릴 수 있습니다.
SeoTax는 로컬 이미지 복사본에서 크기를 읽어 이미지 속성을 채울 수 있습니다.

```yaml
params:
  images:
    rootPath: "_images"
    maxImageSize: 1920
```

## 아이콘 최적화

SeoTax는 전체 Font Awesome CDN 대신 IcoMoon 서브셋 폰트를 사용합니다.
실제 사용하는 아이콘만 포함해 초기 로딩 비용을 줄입니다.
