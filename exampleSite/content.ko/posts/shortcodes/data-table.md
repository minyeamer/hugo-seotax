---
title: "Data Table"
date: 2026-02-04
summary: "CSV 형태의 데이터를 스타일 테이블과 다운로드 파일로 제공하는 방법입니다."
categories: ["Shortcodes"]
tags: ["data-table", "CSV", "테이블"]
---

## 기본 사용법

Shortcode 내부에 구분자로 나눈 텍스트를 작성합니다.

```go-html
{{</* data-table delimiter="," headers="1" */>}}
이름,점수,등급
Alice,95,A
Bob,82,B
{{</* /data-table */>}}
```

{{< data-table delimiter="," headers="1" >}}
이름,점수,등급
Alice,95,A
Bob,82,B
{{< /data-table >}}

첫 번째 행에는 헤더 스타일이 적용됩니다.

## 다운로드 버튼

`file-name`을 지정하면 표의 원본 데이터를 내려받을 수 있습니다.

```go-html
{{</* data-table file-name="scores.csv" */>}}
이름,점수
Alice,95
Bob,82
{{</* /data-table */>}}
```

{{< data-table file-name="scores.csv" >}}
이름,점수
Alice,95
Bob,82
{{< /data-table >}}

## 주요 파라미터

| 파라미터 | 설명 |
|---|---|
| `delimiter` | 열 구분 문자 |
| `headers` | 헤더로 처리할 행 수 |
| `file-name` | 다운로드 파일명 |
| `align-center` | 가운데 정렬할 열 번호 |
| `class` | 추가 CSS 클래스 |

큰 데이터 전체를 넣기보다는 글에서 직접 비교할 정도의 표에 사용하는 것이 좋습니다.
