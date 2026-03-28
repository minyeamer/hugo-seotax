---
title: "반응형 레이아웃 & SEO"
date: 2026-01-06
summary: "데스크톱과 모바일 반응형 디자인, 접을 수 있는 사이드바, 오버레이 ToC, Core Web Vitals 최적화."
categories: ["가이드", "기능"]
tags: ["반응형", "모바일", "SEO", "성능", "CLS"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/fix-cls-00-score.webp?raw=true"
---

## 반응형 디자인

SeoTax는 CSS 미디어 쿼리와 JavaScript 인터랙션으로 모든 화면 크기에 대응합니다.

### 데스크톱 레이아웃

큰 화면에서는 3단 구조를 사용합니다:

| 왼쪽 | 가운데 | 오른쪽 |
|------|--------|--------|
| 사이드바 (메뉴, 카테고리, 최신글) | 메인 콘텐츠 | 목차 (ToC) |

사이드바와 목차는 sticky 포지션으로 메인 콘텐츠와 독립적으로 스크롤됩니다.

### 모바일 레이아웃

| 화면 | 설명 |
|------|------|
| ![모바일 메인](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-16-layout-mobile-main.webp?raw=true) | 포스트 목록이 가로 커버 이미지와 함께 단일 컬럼으로 표시 |
| ![모바일 메뉴](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-18-layout-mobile-menu.webp?raw=true) | 사이드바가 햄버거 토글로 전체 오버레이로 열림 |
| ![모바일 목차](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-19-layout-mobile-toc.webp?raw=true) | 목차가 헤더에서 오버레이로 열림 |

### 접을 수 있는 사이드바

- **데스크톱:** 햄버거 아이콘으로 사이드바 너비 토글; 상태는 `localStorage`에 저장
- **모바일:** 사이드바가 배경막과 함께 고정 오버레이로 슬라이드

### 툴바

우측 하단의 플로팅 툴바로 빠른 접근:

- 언어 선택기 (i18n)
- 상단 / 하단 스크롤
- 뒤로 가기

모바일에서 툴바는 기본적으로 접혀 있으며 `+` 버튼으로 펼칩니다.

---

## SEO 최적화

### Core Web Vitals

SeoTax는 탁월한 성능 점수를 달성합니다:

| 메트릭 | 점수 | 방법 |
|--------|------|------|
| **CLS** | 0.002 | 빌드 타임 이미지 크기 추출; 하이브리드 읽기 시간 |
| **TBT** | 0 ms | 경량 IcoMoon 서브셋 폰트 (~40 KB); `font-display: swap` |
| **LCP** | 4.2s | 최소 크리티컬 CSS; 비필수 JS 지연 로딩 |

### CLS 방지

Hugo 블로그에서 가장 큰 CLS 원인은 명시적 `width`/`height`가 없는 이미지입니다. SeoTax는 하이브리드 방식으로 해결합니다:

1. 원격 이미지의 복사본을 `assets/_images/`에 로컬 저장
2. Hugo가 빌드 타임에 크기 정보를 읽음
3. 명시적 `width`와 `height`가 `<img>` 태그에 삽입됨

```yaml
params:
  imageDir: "_images"         # 크기 추출용 로컬 이미지 디렉토리
  maxImageSize: 1920          # 비례 축소 최대 크기
```

### IcoMoon 서브셋 폰트

Font Awesome 전체 라이브러리(800+ KB) 대신, SeoTax는 26개 아이콘만 포함한 IcoMoon 서브셋(~40 KB)을 사용합니다. FOIT/FOUT를 제거하고 TBT를 크게 줄입니다.

### Schema.org 구조화 데이터

```yaml
params:
  schema:
    publisherType: "Person"
    sameAs:
      - "https://github.com/username"
```

### 사이트맵 & robots.txt

Hugo에 의해 자동 생성됩니다:

```yaml
enableRobotsTXT: true
```

### 검색 엔진 인증

```yaml
params:
  searchEngine:
    google:
      siteVerificationTag: "인증 코드"
    naver:
      siteVerificationTag: "인증 코드"
```

### PWA 서비스 워커

한 줄 설정으로 오프라인 캐싱을 활성화합니다:

```yaml
params:
  serviceWorker: "precache"
```
