---
title: "다크모드 & 다국어 지원"
date: 2026-01-03
summary: "시스템 감지와 localStorage 영속성을 갖춘 다크모드, 그리고 페이지 새로고침 없이 27개 언어를 지원하는 클라이언트 사이드 i18n."
categories: ["가이드", "기능"]
tags: ["다크모드", "i18n", "다국어", "접근성"]
cover: "https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-31-light-dark-cover.webp?raw=true"
---

## 다크모드

![다크모드 데모](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-32-light-dark-demo.gif?raw=true)

### 동작 방식

SeoTax는 `<html>` 요소의 `data-theme` 속성에 CSS 변수를 적용해 다크모드를 구현합니다. 이 하나의 속성만 변경하면 사이트 전체의 색상이 전환됩니다.

**우선순위:**
1. `localStorage` (사용자의 명시적 선택)
2. 시스템 설정 (`prefers-color-scheme`)
3. 라이트 테마 (기본값)

### 전환 방법

- **사이드바 버튼** — 사이드바 링크 영역의 달 아이콘
- **키보드 단축키** — `Cmd/Ctrl + Shift + S`

### 색상 디자인 원칙

- 배경색은 `#181a1b` (순수 검정이 아님) — 눈의 피로 감소
- 텍스트는 `#f5f6fa` (순수 흰색이 아님) — 부드러운 대비
- 링크 색상은 `#0055bb` (라이트) → `#8ecfff` (다크)로 전환
- 코드 블럭 테마는 **Xcode** (라이트) ↔ **VS2015** (다크) 자동 전환

### Disqus 연동

Disqus는 iframe으로 실행되므로 CSS 변수 변경을 감지할 수 없습니다. SeoTax는 테마 전환 시 `DISQUS.reset()`으로 Disqus를 강제 새로고침하여 색상을 동기화합니다.

---

## 클라이언트 사이드 i18n

![i18n 데모](https://github.com/minyeamer/minyeamer/blob/main/images/frontend/blog/seotax-02-i18n-demo.gif?raw=true)

### Hugo 기본 i18n의 문제점

Hugo의 다국어 시스템은 **작성자 중심**입니다 — 언어별로 페이지를 복제하고 URL을 변경합니다 (예: `/en/` → `/ko/`). 이로 인해 빌드 결과물이 배로 늘어나고 독자의 읽기 흐름이 깨질 수 있습니다.

### SeoTax의 접근 방식

SeoTax는 **독자 중심 클라이언트 사이드 i18n**을 사용합니다:

- 단일 HTML 페이지에서 27개 언어 모두 지원
- 언어 전환 시 페이지 새로고침이나 URL 변경 없음
- `navigator.language`를 통한 브라우저 언어 자동 감지
- `localStorage`에 사용자 선택 영속 저장

### 번역 동작 방식

1. **빌드 타임:** Hugo가 `i18n/*.yaml` 파일을 읽어 단일 JSON으로 병합
2. **HTML:** 요소에 `data-i18n-*` 속성 부여 (예: `data-i18n-id`, `data-i18n-text`)
3. **런타임:** JavaScript가 텍스트, 속성(`aria-label`, `title`), 날짜를 번역

### 새 언어 추가

`i18n/` 디렉토리에 YAML 파일을 추가하기만 하면 됩니다:

```yaml
# i18n/fr.yaml
- id: "menu.aside.tooltip"
  translation: "Menu"

- id: "search.action.label"
  translation: "Rechercher"
```

새 언어는 자동으로 툴바의 언어 선택기에 나타납니다.

### 지원 언어

영어, 한국어, 일본어, 중국어(간체/번체), 스페인어, 프랑스어, 독일어, 이탈리아어, 포르투갈어(PT/BR), 러시아어, 아랍어, 불가리아어, 벵골어, 체코어, 페르시아어, 히브리어, 노르웨이어, 네덜란드어, 오크어, 폴란드어, 스웨덴어, 스와힐리어, 터키어, 우크라이나어, 암하라어.

### 설정

별도의 설정이 필요 없습니다. i18n 시스템은 즉시 사용 가능합니다:

```yaml
params:
  i18nDir: "themes/seotax/i18n"
```

### 다국어 콘텐츠

SeoTax는 Hugo의 [다국어 콘텐츠 모드](https://gohugo.io/content-management/multilingual/)도 지원합니다. 여러 언어가 설정되면 사이드바에 언어 선택기가 나타납니다:

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
