---
title: "코드블럭"
date: 2026-01-13
summary: "줄 번호, 복사 버튼, 언어 라벨을 갖춘 SeoTax 코드블럭을 소개합니다."
categories: ["기능"]
tags: ["코드블럭", "highlight.js", "복사 버튼"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/codeblock.png?raw=true"
---

## 기본 코드블럭

마크다운의 fenced code block을 그대로 사용합니다.

````markdown
```javascript
const message = "Hello SeoTax";
console.log(message);
```
````

렌더링 후에는 문법 강조, 줄 번호, 언어 라벨, 복사 버튼이 적용됩니다.

## 제공 기능

| 기능 | 설명 |
|---|---|
| 문법 강조 | highlight.js 사용 |
| 줄 번호 | 긴 코드 읽기 편의 |
| 복사 버튼 | 클릭 후 성공 피드백 표시 |
| 언어 라벨 | 코드블럭 우측 상단 표시 |
| 테마 연동 | 라이트/다크에 맞는 색상 |

## 테마 색상

SeoTax는 코드 색상을 CSS 변수로 관리합니다.

- 라이트 모드: Xcode 계열 색상
- 다크 모드: VS2015 계열 색상

색상 변수는 아래 파일에서 조정할 수 있습니다.

```text
assets/css/variables/_highlight.scss
```

## 예시

```yaml
params:
  search:
    enabled: true
  menu:
    categories: true
```
