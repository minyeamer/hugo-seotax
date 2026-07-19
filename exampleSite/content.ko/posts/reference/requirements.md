---
title: "요구 사항과 의존성"
date: 2026-02-08
summary: "SeoTax 실행에 필요한 Hugo 버전과 포함된 주요 라이브러리를 정리합니다."
categories: ["참고"]
tags: ["Hugo", "의존성", "라이브러리"]
---

## Hugo

SeoTax의 최소 Hugo 버전은 `theme.toml` 기준 **0.146.0**입니다.
SCSS 처리를 위해 extended 버전을 권장합니다.

```bash
hugo version
```

출력에 `extended`가 포함되어 있는지 확인하세요.

## 브라우저 JavaScript

검색, 클라이언트 i18n, 다크모드 저장, 이미지 확대 같은 기능은 JavaScript를 사용합니다.

JavaScript가 꺼져 있어도 정적 본문은 읽을 수 있지만 동적 검색과 일부 편의 기능은 제한됩니다.

## 포함 라이브러리

| 라이브러리 | 용도 |
|---|---|
| Fuse.js | 퍼지 검색 |
| highlight.js | 코드 문법 강조 |
| highlightjs-line-numbers | 코드 줄 번호 |
| Mermaid | 다이어그램 |
| KaTeX | 수식 |

주요 프런트엔드 리소스는 테마의 `static/`에 포함되어 있어 기본 기능에 별도 npm 설치가 필요하지 않습니다.
