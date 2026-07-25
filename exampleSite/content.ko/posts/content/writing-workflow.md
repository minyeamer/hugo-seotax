---
title: "새 글 작성 순서"
date: 2026-01-26
summary: "새 글 생성부터 로컬 확인까지 반복해서 사용할 수 있는 작성 흐름입니다."
categories: ["콘텐츠 작성"]
tags: ["글쓰기", "archetype", "hugo new"]
---

## 글 생성

Hugo 명령으로 새 글을 만들 수 있습니다.

```bash
hugo new posts/frontend/my-post.md
```

SeoTax의 `archetypes/posts.md`가 적용되면 기본 front matter가 함께 생성됩니다.

## 메타데이터 작성

목록과 검색 결과에 잘 나타나도록 최소한 아래 필드를 채웁니다.

```yaml
title: "새 글"
date: 2026-01-01
summary: "한두 문장으로 작성한 글 설명"
categories: ["Frontend", "Hugo"]
tags: ["Hugo", "SeoTax"]
```

## 본문 작성

긴 글은 `h2`, `h3`으로 나누면 오른쪽 목차에 표시됩니다.
이미지에는 의미 있는 `alt`를 작성하고, 반복되는 UI는 Shortcode를 사용합니다.

## 로컬 확인

초안까지 보려면 `--buildDrafts`를 사용합니다.

```bash
hugo server --buildDrafts --disableFastRender
```

확인할 항목은 제목, 요약 길이, 모바일 이미지, 목차, 코드 복사, 카테고리/태그 링크입니다.

검색 정렬 UI를 사용할 경우 기본 정렬과 최신순, 오래된순, 관련도순 전환도 확인하세요.
기본 정렬은 `params.search.sort`에서 설정하며, `disabled`를 설정하면 정렬 UI만 숨깁니다.
사용자가 다른 순서를 고르면 URL에 `sort` 값이 기록됩니다.
