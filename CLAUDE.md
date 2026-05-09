# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio site for Aniruddh Gohil (SEO & eCommerce growth specialist). No build process, no package manager, no frameworks — pure vanilla HTML, CSS, and JS served directly to GitHub Pages.

## Development

Open any `.html` file directly in a browser, or serve locally with any static file server:

```powershell
# Python (no install needed)
python -m http.server 8000

# Node (if available)
npx serve .
```

No compilation, transpilation, or bundling step exists.

## Architecture

### Page structure

- `index.html` — Homepage (entry point)
- `case-study.html` — Case studies index with filter UI
- `case-study-*.html` — Individual case study pages (6 total)
- `analytics.html` — Analytics portfolio index
- `analytics-higeia.html` — Individual analytics case study

### JS / CSS pairing

Each page group has its own JS and CSS file:

| Pages | JS | CSS |
|---|---|---|
| `index.html` | `main.js` | `style.css` |
| `case-study*.html` | `case-study.js` | `case-study.css` |
| `analytics*.html` | `analytics.js` | `analytics.css` |

### CSS variables (defined in `style.css`)

All theming is done through CSS custom properties — `--ink`, `--accent`, `--cream`, `--gold`, `--section-gap`, etc. Always use these variables rather than hardcoded values.

### JavaScript patterns

- Vanilla DOM only — no jQuery, no frameworks
- Navbar scroll effect: adds `scrolled` class at 40px scroll threshold
- Scroll reveal: `IntersectionObserver` (threshold `0.05`) adds `visible` class to `.reveal` elements
- Portfolio dropdown: hover-triggered on desktop, click-triggered on mobile
- Mobile drawer: hamburger toggle with overlay; closes on any link click
- Tool switcher (homepage): click-based, updates a shared preview panel via `data-*` attributes

### Key integrations

- **Google Tag Manager** (`GTM-MQPT8MTZ`) — injected in `<head>` and `<body>` of each page
- **Schema.org JSON-LD** — structured data blocks in each page's `<head>` for SEO
- `robots.txt` and `sitemap.xml` present for search indexing
