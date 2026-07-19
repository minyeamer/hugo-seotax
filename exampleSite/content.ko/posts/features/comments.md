---
title: "댓글 설정"
date: 2026-01-14
summary: "giscus와 Disqus 댓글을 설정하는 방법을 안내합니다."
categories: ["기능"]
tags: ["giscus", "Disqus", "댓글"]
---

## 댓글 활성화

SeoTax는 댓글 영역을 선택적으로 표시합니다.

```yaml
params:
  comments:
    enabled: true
    provider: "giscus"
```

`provider`는 `"giscus"` 또는 `"disqus"`를 사용할 수 있습니다.

## giscus 설정

giscus는 GitHub Discussions를 댓글 저장소로 사용합니다.

```yaml
params:
  comments:
    enabled: true
    provider: "giscus"
    giscus:
      repo: "username/comments-repo"
      repoId: "R_..."
      category: "Comments"
      categoryId: "DIC_..."
      mapping: "pathname"
      inputPosition: "bottom"
```

giscus를 쓰려면 저장소에서 Discussions를 활성화하고 giscus GitHub App을 설치해야 합니다.

## Disqus 설정

Disqus를 사용하려면 shortname을 입력합니다.

```yaml
params:
  comments:
    enabled: true
    provider: "disqus"
    disqus:
      shortname: "your-disqus-shortname"
```

## 테마와 언어 연동

SeoTax는 다크모드와 UI 언어를 전환할 때 댓글창도 함께 맞추도록 설계되어 있습니다.
특히 giscus는 iframe을 다시 로드하지 않고 설정 메시지를 보내 자연스럽게 변경합니다.
