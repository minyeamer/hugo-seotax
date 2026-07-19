---
title: "Troubleshooting"
date: 2026-01-23
summary: "Common setup and build issues when working with SeoTax."
categories: ["Reference"]
tags: ["FAQ", "troubleshooting", "configuration"]
---

## The Theme Does Not Load

Confirm that `theme: "seotax"` is set and that the theme directory exists.

## No Search Results

Check that `params.search.enabled` is true and that posts are not marked `hidden: true`.

## Images Have No Dimensions

Verify `params.images.rootPath` and the local image path.
SeoTax can read matching asset files and supported static paths.

## Styles Look Stale

Restart with `hugo server --disableFastRender` after changing templates or assets.
