---
title: "사이트 만들기"
date: 2026-01-02
summary: "새 Hugo 사이트에 SeoTax 테마를 설치하고 로컬 서버를 실행합니다."
categories: ["시작하기"]
tags: ["Hugo", "설치", "Git Submodule", "Hugo Module"]
---

## 준비물

SeoTax는 Hugo **0.146.0 이상**을 기준으로 작성되었습니다.
로컬에서 먼저 Hugo가 설치되어 있는지 확인하세요.

```bash
hugo version
```

Mac에서는 Homebrew로 설치할 수 있습니다.

```bash
brew install hugo
```

## Git Submodule로 설치

가장 일반적인 설치 방법입니다.

```bash
hugo new site myblog
cd myblog
git init
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
```

설정 파일에 테마를 지정합니다.

```yaml
theme: "seotax"
```

로컬 서버를 실행합니다.

```bash
hugo server --minify
```

## Hugo Module로 설치

Hugo Module을 사용하는 프로젝트라면 아래처럼 가져올 수 있습니다.

```bash
hugo mod init github.com/username/myblog
```

```toml
[module]
[[module.imports]]
path = "github.com/minyeamer/hugo-seotax"
```

```bash
hugo mod get -u
hugo server --minify
```

## 예제 사이트로 시작하기

테마의 설정과 콘텐츠 구조를 그대로 보고 싶다면 `exampleSite`를 복사하는 방법이 가장 빠릅니다.

```bash
hugo new site myblog
cd myblog
git init
git submodule add https://github.com/minyeamer/hugo-seotax themes/seotax
cp -R themes/seotax/exampleSite/* .
hugo server --minify
```
