# LinkedLab — Websites & Digital Systems

Official trilingual website for LinkedLab, a digital studio for small local businesses.

## What is included

- German, English and Spanish routes with German as the default language
- Centralized content, prices, contact details and trilingual legal pages
- Static-first architecture with no runtime database or unnecessary client framework
- Local SEO metadata, canonical URLs, `hreflang`, XML sitemap and structured Data
- Responsive layouts, keyboard support, reduced-motion support and a custom 404 page
- Vercel-ready headers, redirects and static output
- Consent manager with accept, reject and granular settings
- Cookie-free Vercel Web Analytics; no advertising or marketing trackers

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

## Cloudflare Workers

The production Worker is `linkedlab-web`, serving `https://linkedlab.eu`.
Workers Builds connects the `main` branch of `hecroigg/linkedlab-web` with these settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/` (the repository root)

`wrangler.jsonc` defines the Worker entry point and the `dist/` assets directory.
Check the build logs in Cloudflare if deployment fails. A successful build followed
by a `504` from `assets-upload-session` identifies an API timeout during asset upload;
retry the failed build from its build details page.

### Deploy from GitHub Actions

`.github/workflows/deploy-cloudflare.yml` can publish the same Worker using a GitHub
runner, independently of Cloudflare's build environment. Add a repository Actions
secret named `CLOUDFLARE_API_TOKEN` with permission to edit Workers in the account
configured in `wrangler.jsonc`. Store the token in GitHub Secrets only.

The workflow builds and checks the site before deployment. It runs on production
file changes pushed to `main`, or manually through Actions > Deploy linkedlab.eu >
Run workflow. Concurrent deployments are queued so an active deployment is not
interrupted. Use one automatic deployment pipeline at a time; disable Workers
Builds in Cloudflare when GitHub Actions becomes the production pipeline.

## Vercel

Use these project settings:

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `SITE_URL` with the deployed origin, without a trailing slash
- Node.js version: `20`

The generated site is deployed from `dist` according to `vercel.json`.

## Before production launch

1. Confirm the legal owner name and business status in `src/site.config.mjs`.
2. Obtain professional legal review when the business structure or services change.
3. Set `SITE_URL` to the final custom domain and rebuild.
4. Update the consent loader and legal pages before adding analytics or marketing services.

## Privacy

The current build uses one necessary first-party cookie to remember consent for 180 days. Vercel Web Analytics may measure traffic without cookies; no optional analytics, advertising or marketing cookies are loaded. WhatsApp, Instagram and project links are external; no third-party content is embedded.
