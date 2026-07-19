---
title: "스타일 수정"
date: 2026-01-20
summary: "색상, 폰트, 레이아웃 스타일을 수정할 때 참고할 파일을 안내합니다."
categories: ["커스터마이징"]
tags: ["SCSS", "CSS", "색상", "다크모드"]
---

## 주요 파일

SeoTax 스타일은 `assets/css/` 아래에 나뉘어 있습니다.

```text
assets/css/
  variables/
  themes/
  main/
  _layouts.scss
  _shortcodes.scss
  _search.scss
  _custom.scss
```

## 색상 수정

기본 색상 변수는 아래 파일에 있습니다.

```text
assets/css/variables/_colors.scss
```

라이트/다크 모드별 차이는 `themes/` 폴더에서 확인합니다.

```text
assets/css/themes/_light.scss
assets/css/themes/_dark.scss
```

## 코드블럭 색상

코드 하이라이트 색상은 별도 파일에서 관리합니다.

```text
assets/css/variables/_highlight.scss
```

라이트 모드와 다크 모드에 각각 다른 highlight.js 색상 변수를 둡니다.

## 사용자 스타일

작은 수정은 `_custom.scss`에 모으는 것을 권장합니다.
테마 파일을 크게 바꾸기 전에 이 파일에서 덮어쓸 수 있는지 먼저 확인해보세요.
