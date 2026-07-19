---
title: "문제 해결"
date: 2026-01-23
summary: "SeoTax를 사용할 때 자주 만나는 문제와 확인할 설정을 정리합니다."
categories: ["참고"]
tags: ["FAQ", "troubleshooting", "설정"]
---

## 검색 페이지가 비어 있습니다

`search/_index.md` 파일이 있는지 확인하세요.

```text
content/search/_index.md
```

다국어 구조라면 언어별 콘텐츠 폴더 안에 있어야 합니다.

```text
content.ko/search/_index.md
```

## 글이 홈에 보이지 않습니다

`params.posts.section`과 글 폴더 이름이 일치해야 합니다.

```yaml
params:
  posts:
    section: "posts"
```

그리고 글의 front matter에 `hidden: true`가 있는지도 확인하세요.

## 카테고리가 이상하게 보입니다

SeoTax는 카테고리를 2단계로 봅니다.

```yaml
categories: ["부모", "자식"]
```

값이 하나만 있으면 부모 카테고리만 있는 글로 처리됩니다.
값이 세 개 이상이면 의도와 다르게 보일 수 있습니다.

## 이미지 때문에 레이아웃이 움직입니다

원격 이미지는 Hugo가 크기를 알 수 없습니다.
같은 파일을 로컬 `assets/_images/` 아래에 두고 이미지 설정을 확인하세요.

```yaml
params:
  images:
    rootPath: "_images"
```

## 댓글이 보이지 않습니다

`comments.enabled`가 `true`인지, provider별 필수 값이 채워졌는지 확인하세요.

```yaml
params:
  comments:
    enabled: true
    provider: "giscus"
```
