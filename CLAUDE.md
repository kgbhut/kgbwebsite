# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing site for **K G Bhut & Associates** (Chartered Accountants, Baner, Pune), served at `https://www.kgbhut.com` (see `CNAME`). Plain HTML + Tailwind CSS + vanilla JS — no framework, no bundler, no templating, no tests. Firm name is written "K G Bhut & Associates" everywhere (not "K.G.").

## Commands

```bash
npm install
npm run build   # css/input.css -> css/output.css (minified)
npm run watch   # rebuild output.css on change during development
```

There is no dev server; use any static server (e.g. `python -m http.server`). `npm test` is a placeholder and fails by design.

**Always run `npm run build` after adding or changing Tailwind classes** and commit `css/output.css` — it is the generated file the pages load. Tailwind scans `./*.html`, `./pages/*.html`, `./js/*.js`.

CSS/JS links carry a cache-busting query (`output.css?v=2`, `style.css?v=2`, `index.js?v=2`). Bump the version in **every** page when shipping CSS/JS changes, or returning visitors keep the old files.

## Architecture

- **Pages**: `index.html` at the root; everything else in `pages/` — `about`, `services`, `contact`, plus SEO landing pages per service (`gst-registration-pune`, `income-tax-filing-pune`, `tds-filing-pune`, `company-registration-pune`, `audit-services-pune`). Root pages use `css/...`/`images/...`; `pages/*` use `../`.
- **Shared chrome is duplicated in every HTML file** (no includes): top bar, sticky header with Services dropdown + mobile menu, CTA band, footer (with the ICAI disclaimer), floating WhatsApp button and mobile Call/WhatsApp bar. Changes to nav, contact details or footer must be applied to all 9 pages. The 5 service pages share an identical section layout (hero → overview + sticky "Speak to a CA" aside → who needs it → documents → process → why us → FAQ → CTA).
- **Design system**: navy + gold. Tailwind theme (`tailwind.config.js`) adds `navy-*`, `gold-*`, `ink` colours and `max-w-site`. Reusable components are plain CSS classes in `css/style.css` (`.btn`/`.btn-gold`/`.btn-navy`/`.btn-outline`/`.btn-ghost-light`, `.eyebrow`, `.section-title`, `.section-lead`, `.card`/`.card-hover`, `.icon-badge`, `.check-list`, `.hero`/`.hero-bg`/`.page-hero`, `.industry-tile`, `.step-num`/`.steps-line`, `.faq-item`, `.cta-band`, `.field`, `.on-dark` modifier for dark sections). Headings use Playfair Display, body Inter.
- **Images**: pages use optimised WebP copies in `images/web/` (≤160 KB each). The original multi-MB JPGs/MP4s in `images/` are no longer referenced by pages; add new images as resized WebP in `images/web/`.
- **`js/index.js`** is shared by all pages: mobile menu toggle, header shadow on scroll, `.reveal` scroll-in animation (adds `.is-visible`; elements are hidden until then when JS runs), single-open FAQ groups (`[data-faq-group]` of native `<details class="faq-item">`), and footer year (`[data-year]`).
- **Contact form** (`pages/contact.html`) uses an inline script: client-side validation, hidden `honeypot` field, localStorage 10-minute throttle, and a `no-cors` JSON POST (with `token`) to `https://kgbhut.com/api/contact/data`. The payload keys (`token, honeypot, firstName, lastName, phone, email, service, message`; `service` is the selected option's text) must stay in sync with the gitignored Cloudflare Worker (`contact-data-proxy.js`) → Google Apps Script (`google-apps-script.js`) that writes to a Sheet and emails the owner.

## SEO conventions

Each page has its own title, description, keywords, canonical (`https://www.kgbhut.com/pages/<file>.html`), Open Graph/Twitter tags and JSON-LD: `AccountingService` (`@id: https://www.kgbhut.com/#firm`) on home/about/services/contact, `Service` + `BreadcrumbList` on service pages, and `FAQPage` wherever a FAQ is shown. **FAQ text must match its `FAQPage` JSON-LD** — edit both together. `sitemap.xml` and `robots.txt` are maintained by hand; add new pages to the sitemap.

## Content rules (ICAI)

CA firms are restricted by ICAI guidelines on solicitation/advertising. Keep content factual: no client testimonials or client names, no claims of superiority ("best", "leading", "No. 1"), no guaranteed outcomes or percentages, and no published fee figures. Keep the footer disclaimer on every page.
