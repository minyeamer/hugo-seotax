---
title: "Customize Styles"
date: 2026-01-20
summary: "Override SeoTax colors and component styles without forking the theme."
categories: ["Customization"]
tags: ["SCSS", "CSS", "colors", "dark mode"]
---

## Theme Colors

Light and dark color variables are defined in:

```text
assets/css/themes/_light.scss
assets/css/themes/_dark.scss
```

## Code Colors

Syntax highlighting variables are in `assets/css/variables/_highlight.scss`.

## Custom Overrides

Put small site-specific changes in `assets/css/_custom.scss`.
Prefer overrides there before editing theme component files.

## Theme Sass Variables and Helpers

Custom styles are now loaded as a Sass module. If an existing
`assets/css/_custom.scss` uses theme variables, functions, or mixins, explicitly
load the modules it needs. Place all `@use` statements before any CSS rules:

```scss
@use "variables/defaults";

.custom-content {
  padding: defaults.space(16);
  font-size: defaults.$font-size-base;
}
```

For existing code that uses unqualified names such as `space(16)` and
`$font-size-base`, add `@use "variables/defaults" as *;` at the top of the file.
Import `main/utils` as well if you use its mixins, such as `outline` or `fixed`.
Plain CSS overrides do not require module imports.
