---
title: "예제 사이트 활용하기"
date: 2026-01-04
summary: "SeoTax exampleSite를 로컬에서 실행하고 내 사이트의 출발점으로 사용하는 방법입니다."
categories: ["시작하기"]
tags: ["exampleSite", "Hugo", "로컬 서버"]
---

## 테마 저장소에서 실행

테마 저장소를 직접 열어둔 상태라면 `exampleSite` 안에서 심볼릭 링크를 만들어 실행합니다.

```bash
cd exampleSite
mkdir -p themes
ln -sf ../.. themes/seotax
hugo server --minify
```

이 방식은 테마를 수정하면서 예제 사이트에 바로 반영되는지 확인할 때 편합니다.

## 새 사이트로 복사

예제 사이트를 내 블로그의 시작점으로 쓰고 싶다면 새 폴더에 복사합니다.

```bash
mkdir my-site
cp -r exampleSite/* my-site/
cd my-site
git init
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
hugo server --minify
```

## 예제 콘텐츠 구조

SeoTax 예제 사이트는 언어별 콘텐츠 폴더를 사용합니다.

```text
content.en/
  posts/
  search/

content.ko/
  posts/
  search/
```

한국어만 운영한다면 `languages` 설정을 단순화하고 `content.ko` 대신 `content`를 사용해도 됩니다.
다국어 콘텐츠를 유지하고 싶다면 지금 구조를 그대로 두는 편이 좋습니다.

## 먼저 바꿀 값

복사 후에는 아래 값부터 변경하세요.

- `baseURL`
- `title`
- `description`
- `params.author`
- `params.social.github`
- `params.schema.sameAs`
