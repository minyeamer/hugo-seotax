---
title: "Tabs와 Details"
date: 2026-02-01
summary: "관련 내용을 탭으로 나누거나 접어서 보여주는 Shortcode 사용법입니다."
categories: ["Shortcodes"]
tags: ["tabs", "details"]
---

## Tabs

운영체제, 프로그래밍 언어, 설치 도구처럼 같은 목적의 여러 선택지를 나눌 때 사용합니다.

````go-html
{{</* tabs "package-manager" */>}}
{{%/* tab "npm" */%}}
```bash
npm install
```
{{%/* /tab */%}}

{{%/* tab "pnpm" */%}}
```bash
pnpm install
```
{{%/* /tab */%}}
{{</* /tabs */>}}
````

{{< tabs "package-manager" >}}
{{% tab "npm" %}}
```bash
npm install
```
{{% /tab %}}

{{% tab "pnpm" %}}
```bash
pnpm install
```
{{% /tab %}}
{{< /tabs >}}

첫 번째 인자는 같은 페이지 안에서 탭 그룹을 구분하는 이름입니다.

## Details

긴 로그, 보충 설명, FAQ 답변을 기본적으로 접어둘 때 사용합니다.

```go-html
{{%/* details "설명 펼치기" */%}}
이곳에 자세한 내용을 작성합니다.
{{%/* /details */%}}
```

{{% details "설명 펼치기" %}}
이곳에 자세한 내용을 작성합니다.
{{% /details %}}

핵심 내용을 숨기기보다는, 없어도 글의 흐름을 이해할 수 있는 보조 내용에 사용하는 편이 좋습니다.
