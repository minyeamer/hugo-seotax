---
title: "Shortcodes"
date: 2026-01-04
summary: "SeoTax에서 사용할 수 있는 모든 Shortcode — Hugo Book 상속 Shortcode와 SeoTax 커스텀 Shortcode를 소개합니다."
categories: ["가이드", "기능"]
tags: ["Shortcodes", "북마크", "데이터 테이블", "시리즈", "이미지"]
---

## Hugo Book Shortcodes

SeoTax는 Hugo Book 테마의 여러 Shortcode를 상속합니다.

### Columns

다단 플렉스박스 레이아웃입니다. `<--->`로 컬럼을 구분하고, `ratio`로 상대 너비를 조절할 수 있습니다.

```markdown
{{</* columns */>}}
왼쪽 컬럼 내용
<--->
오른쪽 컬럼 내용
{{</* /columns */>}}
```

{{< columns >}}
**왼쪽 컬럼**

2단 레이아웃의 왼쪽입니다. 마크다운 내용을 자유롭게 넣을 수 있습니다.

<--->

**오른쪽 컬럼**

오른쪽입니다. `columns` Shortcode는 반응형 레이아웃을 위해 플렉스박스를 사용합니다.
{{< /columns >}}

### Hints

메모, 경고 등을 위한 색상 콜아웃 박스입니다.

```markdown
{{</* hint info */>}}
정보를 제공하는 힌트입니다.
{{</* /hint */>}}
```

{{< hint >}}
**기본** — 색상 수정자가 없는 기본 힌트입니다.
{{< /hint >}}

{{< hint info >}}
**정보** — 일반 정보와 팁에는 `info`를 사용합니다.
{{< /hint >}}

{{< hint success >}}
**성공** — 긍정적인 확인에는 `success`를 사용합니다.
{{< /hint >}}

{{< hint warning >}}
**주의** — 주의 사항에는 `warning`을 사용합니다.
{{< /hint >}}

{{< hint danger >}}
**위험** — 중요한 경고에는 `danger`를 사용합니다.
{{< /hint >}}

### Tabs

관련 콘텐츠를 정리하기 위한 탭 패널입니다.

```markdown
{{</* tabs "example" */>}}
{{</* tab "탭 1" */>}} 탭 1 내용 {{</* /tab */>}}
{{</* tab "탭 2" */>}} 탭 2 내용 {{</* /tab */>}}
{{</* /tabs */>}}
```

{{< tabs "languages" >}}
{{< tab "JavaScript" >}}
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```
{{< /tab >}}
{{< tab "Python" >}}
```python
def greet(name):
    print(f"Hello, {name}!")
```
{{< /tab >}}
{{< tab "Go" >}}
```go
func greet(name string) {
    fmt.Printf("Hello, %s!\n", name)
}
```
{{< /tab >}}
{{< /tabs >}}

### Details

접을 수 있는 콘텐츠 블록 (HTML `<details>` 요소)입니다.

```markdown
{{</* details "클릭해서 펼치기" */>}}
숨겨진 내용이 여기 들어갑니다.
{{</* /details */>}}
```

{{< details "클릭해서 펼치기" >}}
이 내용은 기본적으로 숨겨져 있습니다. 요약 줄을 클릭하면 펼쳐집니다. 긴 코드 샘플, FAQ, 보충 정보에 유용합니다.
{{< /details >}}

### Mermaid

[Mermaid](https://mermaid.js.org/) 문법을 사용한 다이어그램과 차트입니다.

```markdown
{{</* mermaid */>}}
graph LR
  A[Hugo 빌드] --> B[JSON 인덱스]
  B --> C[Fuse.js 검색]
  C --> D[동적 결과]
{{</* /mermaid */>}}
```

{{< mermaid >}}
graph LR
  A[Hugo 빌드] --> B[JSON 인덱스]
  B --> C[Fuse.js 검색]
  C --> D[동적 결과]
{{< /mermaid >}}

### KaTeX

[KaTeX](https://katex.org/)를 사용한 수학 공식입니다.

```markdown
{{</* katex */>}}
E = mc^2
{{</* /katex */>}}
```

결과: $E = mc^2$

---

## SeoTax 커스텀 Shortcodes

### Bookmark

URL에서 Open Graph 메타데이터를 자동 가져와 리치 링크 카드를 생성합니다.

```markdown
{{</* bookmark url="https://gohugo.io/" */>}}
```

수동 오버라이드도 가능합니다:

```markdown
{{</* bookmark url="https://gohugo.io/" title="Hugo" description="세계에서 가장 빠른 웹 사이트 빌드 프레임워크" */>}}
```

파라미터: `url`, `title`, `description`, `image`, `fetch` (기본값 `true`).

### Data Table

인라인 CSV 텍스트를 스타일이 적용된 HTML 테이블로 렌더링합니다. 다운로드 버튼도 지원합니다.

```markdown
{{</* data-table delimiter="," headers="1" file-name="example.csv" */>}}
프레임워크,언어,Stars
Hugo,Go,80k
Next.js,JavaScript,130k
Nuxt,JavaScript,55k
Gatsby,JavaScript,55k
{{</* /data-table */>}}
```

{{< data-table delimiter="," headers="1" file-name="frameworks.csv" >}}
프레임워크,언어,Stars
Hugo,Go,80k
Next.js,JavaScript,130k
Nuxt,JavaScript,55k
Gatsby,JavaScript,55k
{{< /data-table >}}

파라미터: `delimiter` (기본값 `,`), `headers` (헤더 행 수), `file-name` (다운로드 활성화), `align-center`, `class`.

### Image

클릭-줌, CLS 방지, 레이아웃 제어가 가능한 향상된 이미지 Shortcode입니다.

```markdown
{{</* image src="https://example.com/photo.jpg" alt="설명" caption="그림 1" max-width="600px" */>}}
```

파라미터: `src`, `alt`, `caption`, `class`, `title`, `loading` (기본값 `lazy`), `align`, `href`, `target`, `width`, `min-width`, `max-width`, `height`, `min-height`, `max-height`.

모바일에서 가로 이미지를 탭하면 전체 화면으로 90° 회전하여 표시됩니다.

### Series

동일한 `series` front matter 값을 공유하는 포스트를 그룹화하는 벨로그 스타일 시리즈 내비게이션입니다.

```markdown
{{</* series "나의 튜토리얼 시리즈" */>}}
```

관련 포스트의 front matter에 `series: ["나의 튜토리얼 시리즈"]`를 추가하세요. Shortcode가 매칭되는 포스트를 자동 수집하고 접을 수 있는 목록과 이전/다음 링크를 렌더링합니다.

두 번째 파라미터(선택): 제목에서 공통 접두사를 제거하는 정규식 패턴.
