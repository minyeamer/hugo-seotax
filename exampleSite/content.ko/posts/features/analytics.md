---
title: "분석 도구 연결"
date: 2026-01-30
summary: "Google Analytics 4 연결과 운영 시 확인할 점을 정리합니다."
categories: ["기능"]
tags: ["GA4", "Analytics", "통계"]
---

## GA4 설정

Google Analytics 4 측정 ID를 설정 파일에 추가합니다.

```yaml
params:
  GoogleAnalytics:
    tagId: "G-XXXXXXXXXX"
```

분석 스크립트는 Hugo의 production 환경에서만 포함됩니다. 로컬 `hugo server`에서 보이지 않아도 정상일 수 있습니다.

## 확인 방법

배포 후 브라우저 개발자 도구의 Network 탭에서 `googletagmanager.com` 요청을 확인하거나,
GA4의 실시간 보고서를 사용합니다.

## 검색 통계 해석

SeoTax는 개별 태그와 카테고리 term 페이지 대신 검색 페이지를 사용합니다.
따라서 분석 데이터가 수백 개 taxonomy URL로 나뉘지 않고 `/search/` 중심으로 모입니다.

필요하다면 URL의 `query`, `category1`, `category2`, `tags` 파라미터를 기준으로
어떤 탐색이 자주 사용되는지 분석할 수 있습니다.
