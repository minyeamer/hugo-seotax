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

## 테마의 Sass 변수와 함수 사용

사용자 스타일도 Sass 모듈로 불러옵니다. 기존 `assets/css/_custom.scss`에서
테마의 변수, 함수, mixin을 사용했다면 필요한 모듈을 명시적으로 추가해야 합니다.
모든 `@use` 구문은 CSS 규칙보다 먼저 작성하세요.

```scss
@use "variables/defaults";

.custom-content {
  padding: defaults.space(16);
  font-size: defaults.$font-size-base;
}
```

기존 코드의 `space(16)`, `$font-size-base` 같은 이름을 그대로 유지하려면
파일 맨 위에 `@use "variables/defaults" as *;`를 추가하세요.
`outline`, `fixed` 등의 mixin을 사용한다면 `main/utils` 모듈도 불러오세요.
일반 CSS만 사용하는 덮어쓰기에는 모듈을 추가하지 않아도 됩니다.
