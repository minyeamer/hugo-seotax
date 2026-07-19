---
title: "Image"
date: 2026-02-05
summary: "이미지 크기, 정렬, 캡션, 링크와 확대 동작을 설정합니다."
categories: ["Shortcodes"]
tags: ["image", "zoom", "caption"]
---

## 기본 사용법

```go-html
{{</* image
  src="https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/zion-national-park.jpg?raw=true"
  alt="화면 설명"
*/>}}
```

{{< image
  src="https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/zion-national-park.jpg?raw=true"
  alt="화면 설명"
>}}

`alt`는 이미지가 보이지 않거나 화면 읽기 도구를 사용할 때 내용을 전달합니다.

## 크기와 정렬

```go-html
{{</* image
  src="https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/zion-national-park.jpg?raw=true"
  alt="작은 화면 예시"
  caption="캡션"
  max-width="360px"
  align="center"
*/>}}
```

{{< image
  src="https://github.com/minyeamer/minyeamer/blob/main/images/hugo-seotax/zion-national-park.jpg?raw=true"
  alt="작은 화면 예시"
  caption="캡션"
  max-width="360px"
  align="center"
>}}

`width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`를 사용할 수 있습니다.

## 링크와 확대

`href`가 있으면 이미지를 클릭했을 때 해당 링크로 이동합니다.
링크가 없으면 이미지를 화면에 크게 보여주는 확대 동작이 적용됩니다.

가로로 긴 이미지는 모바일 확대 시 읽기 좋도록 회전할 수 있습니다.

```yaml
params:
  images:
    rotateLandscapeImages: true
```

## 둥근 모서리

Markdown 이미지와 `image` Shortcode에 둥근 모서리를 적용하려면 `params.images.roundedCorners`를 활성화합니다.

```yaml
params:
  images:
    roundedCorners: true
```

이미지마다 따로 지정하지 않아도 사이트 전체에 일관된 모양으로 적용됩니다.
