---
title: "콘텐츠 구조"
date: 2026-01-05
summary: "SeoTax에서 글, 검색 페이지, 다국어 콘텐츠를 배치하는 기본 구조를 설명합니다."
categories: ["콘텐츠 작성"]
tags: ["content", "posts", "multilingual"]
---

## 기본 구조

SeoTax는 `params.posts.section`에 지정한 섹션의 글을 블로그 글 목록으로 사용합니다.

```yaml
params:
  posts:
    section: "posts"
```

위 설정이라면 글은 아래 경로에 둡니다.

```text
content/
  posts/
    my-first-post.md
  search/
    _index.md
```

## 다국어 콘텐츠 구조

예제 사이트는 영어와 한국어를 분리합니다.

```text
content.en/
  posts/
  search/

content.ko/
  posts/
  search/
```

이 구조를 쓰려면 `config.yaml`에 언어별 `contentDir`를 지정합니다.

```yaml
languages:
  en:
    languageName: "English"
    contentDir: "content.en"
    weight: 1
  ko:
    languageName: "한국어"
    contentDir: "content.ko"
    weight: 2
```

## 폴더로 묶기

글이 많아지면 `posts/getting-started/`, `posts/features/`처럼 폴더로 나눠도 됩니다.

```text
content.ko/posts/
  getting-started/
    introduction.md
    configuration.md
  features/
    search.md
    dark-mode.md
```

Hugo에서 이 파일들은 모두 `posts` 섹션에 속합니다. SeoTax의 홈 목록과 검색 인덱스에도 함께 포함됩니다.

## 정렬된 글 목록 만들기

홈 글 목록의 기본 순서는 `params.posts.sort`로 정합니다. `newest`와 `oldest`를 사용할 수 있습니다.
`disabled`를 설정하면 정렬 UI를 숨기며, 홈 목록은 최신순으로 표시됩니다.

```yaml
params:
  posts:
    sort: "newest"
```

최신순과 오래된순 목록을 각각 제공하려면 언어별 콘텐츠 폴더에 `post-list` 페이지를 만듭니다.

```yaml
# content.ko/list/oldest/_index.md
---
title: "오래된 글"
type: "post-list"
params:
  sort: "oldest"
---
```

`content.ko/list/newest/_index.md`도 같은 방식으로 만들 수 있습니다.
목록 페이지에 `params.sort`를 지정하지 않으면 `params.posts.sort`를 따릅니다.
