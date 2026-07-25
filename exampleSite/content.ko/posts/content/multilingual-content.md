---
title: "다국어 콘텐츠 작성"
date: 2026-01-25
summary: "영어와 한국어처럼 같은 글을 여러 언어로 운영하는 기본 구조를 설명합니다."
categories: ["콘텐츠 작성"]
tags: ["multilingual", "contentDir", "번역"]
---

## 콘텐츠를 언어별로 분리

SeoTax 예제 사이트는 언어마다 콘텐츠 폴더를 따로 사용합니다.

```text
content.en/
  posts/
  search/

content.ko/
  posts/
  search/
```

설정 파일에서 각 언어와 폴더를 연결합니다.

```yaml
languages:
  en:
    languageName: "English"
    contentDir: "content.en"
    weight: 1
  ko:
    languageName: "한국어"
    contentDir: "content.ko"
    weight: 2
```

## 번역 글 연결

같은 상대 경로와 파일명을 사용하면 Hugo가 서로 번역된 페이지로 연결하기 쉽습니다.

```text
content.en/posts/guide/install.md
content.ko/posts/guide/install.md
```

언어별 제목과 본문은 달라도 됩니다. 카테고리와 태그도 각 언어 독자가 이해하기 좋은 표현으로 작성하세요.

## 언어 전환과 경로

사이드바 언어 메뉴는 현재 글의 번역본이 있으면 그 번역 글로 이동합니다.
번역 글이 없더라도 카테고리, 태그, 검색, 글 목록처럼 언어별로 존재하는 경로에서는
현재 경로를 유지한 채 대상 언어로 이동합니다.
검색 필터와 정렬 같은 쿼리 문자열, 페이지 내 위치를 나타내는 해시도 함께 유지됩니다.

검색 데이터와 검색 스크립트도 콘텐츠 언어별로 생성됩니다.
따라서 영어와 한국어 글, 카테고리, 태그가 서로의 검색 결과에 섞이지 않습니다.

## UI 번역과의 차이

이 방식은 글 본문을 번역하기 위한 Hugo multilingual입니다.
메뉴, 검색 버튼, 날짜 같은 공통 UI는 SeoTax의 클라이언트 i18n이 별도로 처리합니다.
