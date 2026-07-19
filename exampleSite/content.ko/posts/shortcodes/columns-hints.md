---
title: "Columns와 Hints"
date: 2026-01-31
summary: "나란히 배치하는 Columns와 강조 상자인 Hints 사용법입니다."
categories: ["Shortcodes"]
tags: ["columns", "hint"]
---

## Columns

`<--->` 구분자를 기준으로 내용을 여러 열에 배치합니다.

```go-html
{{</* columns */>}}
왼쪽 내용
<--->
오른쪽 내용
{{</* /columns */>}}
```

{{< columns >}}
왼쪽 내용
<--->
오른쪽 내용
{{< /columns >}}

열의 비율을 바꾸고 싶다면 `ratio`를 사용합니다.

```go-html
{{</* columns ratio="1:2" */>}}
좁은 열
<--->
넓은 열
{{</* /columns */>}}
```

{{< columns ratio="1:2" >}}
좁은 열
<--->
넓은 열
{{< /columns >}}

모바일에서는 가로 공간에 맞춰 열이 자연스럽게 재배치됩니다.

## Hints

문서에서 정보나 주의사항을 강조합니다.

```go-html
{{%/* hint info */%}}
알아두면 좋은 정보입니다.
{{%/* /hint */%}}
```

{{% hint info %}}
알아두면 좋은 정보입니다.
{{% /hint %}}

지원 스타일은 다음과 같습니다.

- 기본
- `info`
- `success`
- `warning`
- `danger`
