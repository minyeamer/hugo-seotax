---
title: "다크모드"
date: 2026-01-11
summary: "SeoTax의 다크모드 우선순위와 커스터마이징 위치를 설명합니다."
categories: ["기능"]
tags: ["다크모드", "CSS Variables", "localStorage"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/light-dark-demo.gif?raw=true"
---

## 동작 방식

SeoTax는 `<html>` 요소의 `data-theme` 속성으로 라이트/다크 색상을 전환합니다.

```html
<html data-theme="dark">
```

색상은 CSS 변수로 정의되어 있어 속성 하나가 바뀌면 사이트 전체 색상이 함께 전환됩니다.

## 테마 결정 순서

1. 사용자가 직접 선택한 값
2. 브라우저 또는 OS의 `prefers-color-scheme`
3. 기본 라이트 모드

사용자가 선택한 값은 `localStorage`에 저장되어 다시 방문해도 유지됩니다.

## 전환 방법

- 사이드바의 다크모드 버튼
- `Cmd/Ctrl + Shift + S` 단축키

## 색상 수정 위치

색상은 아래 파일에서 확인할 수 있습니다.

```text
assets/css/variables/_colors.scss
assets/css/themes/_light.scss
assets/css/themes/_dark.scss
```

배경과 글자색을 바꿀 때는 순수 검정/흰색보다 약간 부드러운 색을 권장합니다.
긴 글을 읽는 블로그에서는 대비가 너무 강해도 눈이 피로할 수 있습니다.
