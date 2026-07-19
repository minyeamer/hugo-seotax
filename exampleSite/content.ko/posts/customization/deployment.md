---
title: "GitHub Pages 배포"
date: 2026-01-22
summary: "SeoTax 사이트를 GitHub Pages에 배포할 때 확인할 기본 항목을 정리합니다."
categories: ["커스터마이징"]
tags: ["GitHub Pages", "배포", "baseURL"]
---

## baseURL 확인

GitHub Pages에 배포할 때 가장 먼저 확인할 값은 `baseURL`입니다.

```yaml
baseURL: "https://username.github.io/repository/"
```

사용자 페이지 저장소라면 보통 아래 형식입니다.

```yaml
baseURL: "https://username.github.io/"
```

## Pages 설정

GitHub 저장소의 **Settings > Pages**에서 배포 방식을 선택합니다.

GitHub Actions를 쓰면 Hugo 버전과 빌드 옵션을 직접 관리할 수 있어 편합니다.

## 빌드 명령

로컬에서 배포 전 확인할 때는 아래 명령을 실행해봅니다.

```bash
hugo --minify
```

오류 없이 `public/`이 생성되면 기본 빌드는 성공한 것입니다.

## 배포 전 점검

- `baseURL`이 실제 주소와 일치하는가?
- `theme: "seotax"`가 설정되어 있는가?
- `content` 또는 `content.ko`에 `search/_index.md`가 있는가?
- 댓글을 켰다면 giscus 또는 Disqus 값이 채워져 있는가?
- 서비스 워커를 켰다면 캐시 영향까지 확인했는가?
