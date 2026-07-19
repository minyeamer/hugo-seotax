---
title: "Book 계열 Shortcodes"
date: 2026-01-18
summary: "Hugo Book에서 이어받은 Columns, Hints, Tabs, Details, Mermaid, KaTeX를 소개합니다."
categories: ["Shortcodes"]
tags: ["columns", "hint", "tabs", "mermaid", "katex"]
---

## Columns

짧은 내용을 여러 열로 나눌 때 사용합니다.

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

## Hints

정보, 경고, 성공 메시지를 강조할 때 사용합니다.

```go-html
{{%/* hint warning */%}}
주의할 내용을 작성합니다.
{{%/* /hint */%}}
```

{{% hint warning %}}
주의할 내용을 작성합니다.
{{% /hint %}}

지원 스타일은 `info`, `success`, `warning`, `danger`입니다.

## Tabs

같은 주제의 코드를 언어별로 나눌 때 좋습니다.

```go-html
{{</* tabs "install" */>}}
{{%/* tab "npm" */%}} npm install {{%/* /tab */%}}
{{%/* tab "pnpm" */%}} pnpm install {{%/* /tab */%}}
{{</* /tabs */>}}
```

{{< tabs "install" >}}
{{% tab "npm" %}} npm install {{% /tab %}}
{{% tab "pnpm" %}} pnpm install {{% /tab %}}
{{< /tabs >}}

## Details

길거나 보조적인 내용을 접어둘 수 있습니다.

```go-html
{{%/* details "더 보기" */%}}
숨겨둘 설명
{{%/* /details */%}}
```

{{% details "더 보기" %}}
숨겨둘 설명
{{% /details %}}

## Mermaid와 KaTeX

다이어그램은 Mermaid, 수식은 KaTeX를 사용합니다.

````markdown
```mermaid
graph LR
  A --> B
```
````

```mermaid
graph LR
  A --> B
```
