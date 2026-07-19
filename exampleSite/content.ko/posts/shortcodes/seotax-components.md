---
title: "SeoTax Shortcodes"
date: 2026-01-19
summary: "Bookmark, Data Table, Image, Series 등 SeoTax 전용 Shortcode를 소개합니다."
categories: ["Shortcodes"]
tags: ["bookmark", "data-table", "image", "series"]
series: ["Hugo 테마 만들기"]
---

## Bookmark

링크를 카드 형태로 보여줍니다.

```go-html
{{</* bookmark "https://gohugo.io/" */>}}
```

{{< bookmark "https://gohugo.io/" >}}

메타데이터를 직접 넣고 싶다면 이름 기반 파라미터를 사용합니다.

```go-html
{{</* bookmark
  url="https://example.com"
  title="예제"
  description="직접 작성한 설명"
  fetch="false"
*/>}}
```

## Data Table

CSV 형태의 텍스트를 테이블로 렌더링합니다.

```go-html
{{</* data-table delimiter="," headers="1" file-name="data.csv" */>}}
이름,점수
Alice,90
Bob,85
{{</* /data-table */>}}
```

{{< data-table delimiter="," headers="1" file-name="data.csv" >}}
이름,점수
Alice,90
Bob,85
{{< /data-table >}}

`file-name`을 지정하면 다운로드 버튼을 표시할 수 있습니다.

## Image

이미지 크기, 정렬, 캡션, 링크, 클릭 확대를 제어합니다.

```go-html
{{</* image
  src="https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/zion-national-park.jpg?raw=true"
  alt="이미지 설명"
  caption="캡션"
  max-width="360px"
  align="center"
*/>}}
```

{{< image
  src="https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/zion-national-park.jpg?raw=true"
  alt="이미지 설명"
  caption="캡션"
  max-width="360px"
  align="center"
>}}

## Series

같은 `series` 값을 가진 글을 목록으로 보여줍니다.

```go-html
{{</* series "Hugo 테마 만들기" */>}}
```

{{< series "Hugo 테마 만들기" >}}

글의 front matter에는 같은 시리즈 이름을 넣습니다.

```yaml
series: ["Hugo 테마 만들기"]
```
