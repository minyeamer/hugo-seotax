---
title: "Series"
date: 2026-02-06
summary: "관련 글을 정해진 순서로 묶는 Series Shortcode 사용법입니다."
categories: ["Shortcodes"]
tags: ["series", "연재", "내비게이션"]
series: ["Hugo 테마 만들기"]
---

## 글에 시리즈 지정

같은 묶음에 포함할 글마다 동일한 `series` 값을 작성합니다.

```yaml
series: ["Hugo 테마 만들기"]
```

## 본문에 목록 표시

시리즈 목록을 보여줄 위치에서 Shortcode를 호출합니다.

```go-html
{{</* series "Hugo 테마 만들기" */>}}
```

{{< series "Hugo 테마 만들기" >}}

SeoTax는 같은 시리즈 값을 가진 글을 찾아 목록과 이전/다음 이동 버튼을 만듭니다.

## 제목 접두어 제거

글 제목이 아래처럼 반복되는 문구로 시작할 수 있습니다.

```text
Hugo 테마 만들기 - 설치
Hugo 테마 만들기 - 설정
```

두 번째 인자로 제거할 패턴을 전달하면 시리즈 목록을 더 짧게 표시할 수 있습니다.

```go-html
{{</* series "Hugo 테마 만들기" "^Hugo 테마 만들기 - " */>}}
```

시리즈는 작성자가 정한 학습 순서를 표현할 때 유용합니다.
