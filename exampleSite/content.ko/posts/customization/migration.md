---
title: "기존 블로그에서 이전"
date: 2026-02-07
summary: "다른 Hugo 테마에서 SeoTax로 바꿀 때 확인할 항목을 정리합니다."
categories: ["커스터마이징"]
tags: ["마이그레이션", "Hugo Book", "테마 변경"]
---

## 테마 교체

기존 테마를 지우기 전에 SeoTax를 새 폴더로 추가합니다.

```bash
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
```

```yaml
theme: "seotax"
```

## 콘텐츠 경로

기존 글이 `content/posts/`에 있다면 아래 설정을 사용합니다.

```yaml
params:
  posts:
    section: "posts"
```

다른 폴더를 사용 중이라면 해당 이름으로 변경합니다.

## Front Matter 점검

- `description` 또는 `summary`를 목록 요약으로 정리
- 카테고리를 부모/자식 두 단계로 정리
- 커버 이미지 경로 확인
- 기존 테마 전용 front matter 제거 여부 검토

## URL 유지

기존 검색 엔진 주소를 유지하려면 `permalinks`를 기존 구조와 맞춥니다.

```yaml
permalinks:
  posts: "/blog/:slugorcontentbasename/"
```

경로를 바꿔야 한다면 글의 `aliases`를 사용해 이전 URL에서 새 URL로 연결하세요.
