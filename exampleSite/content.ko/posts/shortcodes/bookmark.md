---
title: "Bookmark"
date: 2026-02-03
summary: "외부 링크를 Open Graph 카드로 표시하는 Bookmark Shortcode 사용법입니다."
categories: ["Shortcodes"]
tags: ["bookmark", "Open Graph", "링크 카드"]
---

## 기본 사용법

URL 하나를 전달하면 Hugo 빌드 시 대상 페이지의 메타데이터를 읽어 링크 카드를 만듭니다.

```go-html
{{</* bookmark "https://gohugo.io/" */>}}
```

{{< bookmark "https://gohugo.io/" >}}

제목, 설명, 대표 이미지가 있으면 카드에 함께 표시됩니다.

## 값을 직접 지정

외부 요청을 생략하거나 메타데이터가 없는 사이트를 연결할 때 직접 작성할 수 있습니다.

```go-html
{{</* bookmark
  url="https://example.com"
  title="Example"
  description="직접 작성한 링크 설명"
  image="https://example.com/cover.png"
  fetch="false"
*/>}}
```

## 언제 직접 지정할까?

- 빌드 환경에서 외부 네트워크 요청을 허용하지 않을 때
- 대상 페이지의 Open Graph 정보가 부정확할 때
- 빌드 시간을 안정적으로 유지하고 싶을 때

외부 페이지 변경에 영향받고 싶지 않다면 `fetch="false"`가 더 예측 가능합니다.
