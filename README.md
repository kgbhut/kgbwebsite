# K.G. Bhut & Associates Website

Corporate website for **K.G. Bhut & Associates** with responsive pages for Home, About, Services, and Contact, plus SEO metadata and Tailwind-based utility styling.

## Tech Stack

- HTML5
- Tailwind CSS (compiled locally)
- Custom CSS (`css/style.css`)
- Vanilla JavaScript (`js/index.js`)
- PostCSS + Autoprefixer

## Project Structure

```text
CA-Website/
├─ index.html
├─ pages/
│  ├─ about.html
│  ├─ services.html
│  └─ contact.html
├─ css/
│  ├─ input.css        # Tailwind input (@tailwind directives)
│  ├─ output.css       # Generated Tailwind CSS (used by pages)
│  ├─ style.css        # Custom site styles
│  └─ flaticon.css
├─ js/
│  └─ index.js
├─ images/             # Image and video assets used by pages
├─ robots.txt
├─ sitemap.xml
├─ tailwind.config.js
├─ postcss.config.js
├─ package.json
└─ .gitignore
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Build Tailwind CSS once:

```bash
npm run build
```

3. Run Tailwind in watch mode during development:

```bash
npm run watch
```

## NPM Scripts

- `npm run build`  
  Builds minified Tailwind output:
  `css/input.css` -> `css/output.css`

- `npm run watch`  
  Rebuilds `css/output.css` automatically on file changes.

## Styling Notes

- `css/output.css` contains generated Tailwind utility classes.
- `css/style.css` contains custom component/page styling.
- All pages load both:
  - Tailwind output (`output.css`)
  - Custom styles (`style.css`)
- Tailwind CDN has been removed for production performance.

## SEO & Deployment Notes

- Canonical and social meta URLs are normalized to `https://www.kgbhut.com`.
- `robots.txt` and `sitemap.xml` are included at project root.
- Ensure `css/output.css` is committed and deployed so pages render correctly.

## Main Features

- Fully responsive layout across pages
- Mobile navigation and hero section adjustments
- Contact form with validation and anti-spam honeypot
- Case-study anchor navigation from subpages to home section
- Accessibility improvements (focus-visible styles, icon link labels)
