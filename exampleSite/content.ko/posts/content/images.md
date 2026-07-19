---
title: "이미지 작성"
date: 2026-01-08
summary: "커버, 썸네일, Image Shortcode, CLS 방지용 이미지 설정을 설명합니다."
categories: ["콘텐츠 작성"]
tags: ["이미지", "cover", "thumbnail", "CLS"]
---

## 커버와 썸네일

상세 페이지 상단 이미지는 `cover`로 지정합니다.

```yaml
cover: "https://example.com/cover.webp"
thumbnail: "https://example.com/thumb.webp"
```

`thumbnail`이 있으면 글 목록에서 우선 사용하고, 없으면 `cover`를 사용합니다.

## 본문 이미지

기본 마크다운 이미지도 사용할 수 있습니다.

```markdown
![설명](https://example.com/image.webp)
```

크기, 정렬, 캡션, 클릭 확대가 필요하면 SeoTax의 `image` Shortcode를 사용합니다.

```go-html
{{</* image
  src="https://example.com/image.webp"
  alt="이미지 설명"
  caption="그림 1"
  max-width="720px"
  align="center"
*/>}}
```

## CLS 방지

브라우저는 이미지 크기를 모르면 로딩 중 레이아웃을 밀어낼 수 있습니다.
SeoTax는 로컬 이미지 복사본에서 크기를 읽어 `width`, `height`를 넣을 수 있습니다.

```yaml
params:
  images:
    rootPath: "_images"
    maxImageSize: 1920
```

원격 이미지를 쓰더라도 같은 파일을 `assets/_images/` 아래에 보관하면 빌드 시점에 크기 정보를 활용할 수 있습니다.

이미지 관련 설정은 모두 `params.images` 아래에 작성합니다. 예전의 `params.image`는 사용하지 않습니다.
`roundedCorners`는 마크다운 이미지와 `image` Shortcode에 둥근 모서리를 적용하고,
`rotateLandscapeImages`는 좁은 화면의 이미지 확대 보기에서 가로 이미지를 회전합니다.
