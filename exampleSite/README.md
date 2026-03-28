# SeoTax Example Site

A bilingual (English / Korean) demo site for the [Hugo SeoTax theme](https://github.com/minyeamer/hugo-seotax).

## Local Preview (from theme repo)

```bash
cd exampleSite
mkdir -p themes && ln -sf ../.. themes/seotax
hugo server --minify
```

The symlink makes the theme available at `themes/seotax/` so Hugo resolves all paths correctly.

## Use as Standalone Site

1. Copy the `exampleSite` directory to a new folder:

```bash
mkdir my-site && cp -r exampleSite/* my-site/
cd my-site
git init
```

2. Add the SeoTax theme as a Git submodule:

```bash
git submodule add https://github.com/minyeamer/hugo-seotax.git themes/seotax
```

3. Run locally:

```bash
hugo server --minify
```

## Deploy to GitHub Pages

1. Push your site to a GitHub repository.
2. Go to **Settings → Pages → Build and deployment** and select **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` handles the rest automatically.
4. Update `baseURL` in `config.yaml` to match your GitHub Pages URL.

## Content Structure

```
content.en/          # English content
  ├── _index.md
  ├── search/_index.md
  └── posts/
      ├── getting-started.md
      ├── search-and-taxonomy.md
      ├── dark-mode-and-i18n.md
      ├── shortcodes.md
      ├── code-blocks.md
      └── layout-and-seo.md

content.ko/          # Korean content (same structure)
```
