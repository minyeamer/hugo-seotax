---
title: "사이드바와 탐색"
date: 2026-01-27
summary: "프로필, 카테고리, 최신글, 툴바와 이전/다음 글 탐색을 설명합니다."
categories: ["기능"]
tags: ["사이드바", "목차", "툴바", "내비게이션"]
---

## 사이드바 설정

```yaml
params:
  menu:
    profileImage: "/profile.svg"
    categories: true
    recentPosts: true

  social:
    github: "https://github.com/username"
```

프로필 이미지를 클릭하면 홈으로 이동합니다.
카테고리와 최신글은 각각 `true`일 때 표시됩니다.

## 접기와 펼치기

데스크톱에서는 사이드바 너비를 접을 수 있고 선택 상태가 브라우저에 저장됩니다.
모바일에서는 사이드바가 화면 위에 오버레이로 열립니다.

## 목차

오른쪽 목차는 현재 읽는 heading을 강조합니다.
모바일에서는 헤더의 목차 버튼으로 열 수 있습니다.

```yaml
params:
  tableOfContents:
    startLevel: 2
    endLevel: 3
```

## 툴바

우측 하단 툴바에서는 언어 선택, 위로 이동, 아래로 이동, 뒤로 가기를 사용할 수 있습니다.
모바일에서는 공간을 줄이기 위해 기본적으로 접혀 있습니다.
