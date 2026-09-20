# LinkedLab — Websites & Digital Systems

Official trilingual website for LinkedLab, a digital studio for small local businesses.

## What is included

- German, English and Spanish routes with German as the default language
- Centralized content, prices, contact details and legal placeholders
- Static-first architecture with no runtime database or unnecessary client framework
- Local SEO metadata, canonical URLs, `hreflang`, XML sitemap and structured data
- Responsive layouts, keyboard support, reduced-motion support and a custom 404 page
- Cloudflare Pages headers and redirects
- No analytics or marketing trackers by default

## Edit content

- Commercial and editorial content: `src/content.mjs`
- Prices, social profile, service areas and legal placeholders: `src/site.config.mjs`
- Visual system: `src/styles.css`

Changing a price in `src/site.config.mjs` updates every language and page that uses it.

## Local development

Requires Node.js 20 or newer. There are no package dependencies to install.

```bash
npm run dev
```

The local preview runs at `http://localhost:4173`.

## Build and quality checks

```bash
npm run build
npm run check
```

The static output is written to `dist/`.

## Cloudflare Pages

Use these project settings:

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `SITE_URL` with the deployed origin, without a trailing slash
- Node.js version: `20`

The generated `dist/_headers` and `dist/_redirects` files are recognized by Cloudflare Pages.

## Before production launch

1. Replace every clearly marked value in `site.legal` inside `src/site.config.mjs`.
2. Confirm the actual business/legal form and obtain appropriate legal review for the legal notice and privacy policy.
3. Add a business email or other direct contact channel if desired.
4. Set `SITE_URL` to the final custom domain and rebuild.
5. Only add a consent banner if analytics or another service requiring consent is introduced.

## Privacy

The current build uses no analytics, advertising or marketing trackers and sets no non-essential cookies. It links externally to Instagram and the Lluna Blanca project; no third-party content is embedded.
