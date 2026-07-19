---
title: "Mermaid와 KaTeX"
date: 2026-02-02
summary: "문서에 다이어그램과 수식을 삽입하는 방법을 설명합니다."
categories: ["Shortcodes"]
tags: ["Mermaid", "KaTeX", "다이어그램", "수식"]
---

## Mermaid

흐름도와 구조도를 코드로 작성할 수 있습니다.

````markdown
```mermaid
graph LR
  A[Hugo 빌드] --> B[검색 JSON]
  B --> C[브라우저 검색]
```
````

```mermaid
graph LR
  A[Hugo 빌드] --> B[검색 JSON]
  B --> C[브라우저 검색]
```

복잡한 시스템을 설명할 때는 문장만 나열하는 것보다 흐름을 한눈에 보여주기 좋습니다.

## KaTeX

수식은 `katex` 코드블럭을 사용합니다.

````markdown
```katex
E = mc^2
```
````

```katex
E = mc^2
```

인라인 수식은 `$E = mc^2$`처럼 작성할 수 있습니다.

## 리소스

SeoTax는 Mermaid와 KaTeX 리소스를 테마 안에 포함합니다.
별도 CDN 설정 없이 사용할 수 있어 외부 네트워크 요청을 줄일 수 있습니다.
