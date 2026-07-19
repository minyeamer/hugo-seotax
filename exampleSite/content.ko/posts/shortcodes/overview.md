---
title: "Shortcodes 개요"
date: 2026-01-17
summary: "SeoTax에서 사용할 수 있는 Shortcode 종류와 호출 문법을 정리합니다."
categories: ["Shortcodes"]
tags: ["Shortcodes", "Hugo"]
---

## Shortcode란?

Shortcode는 마크다운에서 복잡한 HTML 컴포넌트를 짧게 호출하는 Hugo 기능입니다.

```go-html
{{</* hint info */>}}
강조하고 싶은 내용
{{</* /hint */>}}
```

글마다 HTML을 반복해서 붙여넣지 않아도 되므로 문서가 깔끔해집니다.

## 두 가지 호출 방식

| 방식 | 특징 |
|---|---|
| `{{</* */>}}` | 내부 내용을 그대로 전달 |
| `{{%/* */%}}` | 내부 내용을 마크다운으로 렌더링 |

내부에 굵은 글씨, 목록, 링크 같은 마크다운을 넣고 싶다면 `%` 방식을 사용하세요.

## 파라미터 전달

위치 기반과 이름 기반을 모두 사용할 수 있습니다.

```go-html
{{</* bookmark "https://gohugo.io" */>}}
{{</* bookmark url="https://gohugo.io" */>}}
```

## 제공 Shortcode

SeoTax는 Hugo Book에서 가져온 Shortcode와 자체 Shortcode를 함께 제공합니다.

- Columns, Hints, Tabs, Details
- Mermaid, KaTeX
- Bookmark, Data Table, Image, Series
