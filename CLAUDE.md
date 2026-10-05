# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing site for 742 Studios. It is built on the NextStarter template (Next.js 16 App Router, React 19, Tailwind v4, shadcn/ui "new-york", Radix, next-themes). A lot of the code and CI still has template leftovers: NextStarter env values in `playwright.yml`, upsell config in `src/lib/upsell.ts`, and the `pnpm-workspace.yaml` comments.

## Commands

```bash
pnpm dev                      # Next dev server (Turbopack) on :3000
pnpm build                    # Production build
pnpm start                    # Serve the production build
pnpm lint                     # ESLint (flat config, eslint.config.mjs)
pnpm test                     # Playwright, all browsers (chromium, firefox, webkit)
npx playwright test tests/home-page.spec.ts            # single file
npx playwright test -g "skip link" --project=chromium  # single test, one browser
pnpm lighthouse               # Lighthouse CI, mobile (lighthouse:desktop for desktop)
pnpm doctor                   # react-doctor scan (see .claude/skills/react-doctor)
```

- Playwright's `webServer` runs `npm run start`, so **run `build` before `test`**. Locally it reuses a server that's already running on :3000, including `pnpm dev`. Tests load `.env` through dotenv, and `BASE_URL` overrides the target.
- Lighthouse thresholds: accessibility, best-practices and SEO must score exactly 100; performance has a floor of 0.85. Don't add anything that loads third-party resources by default, because that would break best-practices.
- Use pnpm, pinned through `packageManager` in `package.json`. CI runs `pnpm install --frozen-lockfile`, so commit `pnpm-lock.yaml` with any dependency change. `minimumReleaseAge` in `pnpm-workspace.yaml` blocks package versions published less than 7 days ago. Node 22 (`.node-version`).

## Architecture

- **Everything is configured through env vars** (`.env.example`). `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME` and `NEXT_PUBLIC_SITE_META_DESCRIPTION` drive metadata, JSON-LD, the OG image, the sitemap and the home `<h1>`. Tests assert against them too.
- **Optional features turn on when their env var is set; nothing is on by default:**
  - Analytics: `src/instrumentation-client.ts` initializes PostHog only when `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` is set. It runs in cookieless mode with autocapture and session recording off. Each option is a deliberate privacy decision.
  - Upsell: `src/lib/upsell.ts` turns on when `NEXT_PUBLIC_PRO_URL` is set.
- **`/privacy` is generated from the live config.** `src/app/privacy/page.tsx` reads `src/lib/analytics.ts` (enabled flag, host, EU/US region) and `src/lib/privacy.ts`, so the notice always matches what the SDK actually does. If you change analytics behaviour, change it in `lib/analytics.ts` or `instrumentation-client.ts` and keep the privacy page consistent. Don't hand-write the claims.
- **JSON-LD:** always serialize with `jsonLd()` from `src/lib/schema.ts`, never `JSON.stringify`, because it HTML-escapes the payload. The schemas are injected in `src/app/layout.tsx`.
- **Site URL:** use `siteUrl` (trailing slash stripped) or `metadataBaseUrl` (falls back safely) from `src/lib/utils.ts`. Don't read `NEXT_PUBLIC_SITE_URL` directly.
- **Design system:** colour tokens live in `src/app/globals.css`. Use the semantic classes: `bg-field` and `text-on-field` for the vermilion page background, `bg-paper` for panels, plus `text-ink`, `text-muted`, `text-accent`, `border-line` and `bg-signal`. Dark mode swaps the values under `.dark`, and `.panel-inverse` flips a subtree to the dark panel by swapping the same variables, so children need no `dark:` variants.
  - **Contrast:** vermilion (`signal`) fails contrast as text on sand. For orange text, use `text-accent`.
  - **Pages:** every page's content sits in a `<Panel>` (`src/components/panel.tsx`) on the field.
  - **Fonts:** Michroma (`font-display`) is only for the wordmark and the hero h1. Everything else is Instrument Sans.
- **Landing page:** sections are in `src/components/home/`, and all copy is in `src/lib/content.ts`. Projects are real; the other sections still hold placeholder copy.
  - **Projects:** each project renders as a full-width case study, with its screenshot in `public/projects/`. To add one, append an entry to `projects` in `content.ts`.
  - **Imagery:** `src/components/stripe-art.tsx` draws the line-art shapes, used in the hero and on the 404 page.
  - **Logo:** the stripe "7" is `src/components/logo-mark.tsx`. `src/app/icon.svg`, `favicon.ico`, `apple-icon.png` and `opengraph-image.tsx` reuse those bars, so update them together.
  - **Contact form:** the site is static (GitHub Pages), so the form posts from the browser to a hosted form service set in `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` (`src/lib/contact-form.ts`). It works like the other optional features: unset means the form sends nothing and says so. `/privacy` names the provider from the endpoint's hostname. The tests intercept the endpoint, so they never send a real submission.
- **Header nav** is data-driven from `src/components/header/navigation-items.ts`. `/path` hrefs render as links. `#section` hrefs render as buttons that smooth-scroll on the home page and respect reduced motion. `headerCta` is `null` to hide the CTA button.
- Every page needs a `<main id="main">` for the skip link (`SkipNav`). Tests check for it and run Axe accessibility scans (`@axe-core/playwright`).
- `next.config.ts` sets `agentRules: false` so `next dev` doesn't regenerate AGENTS.md/CLAUDE.md.

## Conventions

- Components are arrow functions with JSDoc and an explicit `Component.displayName = "..."`. File names are kebab-case. Use `@/` path aliases.
- ESLint warns on unsorted imports (`simple-import-sort`) and **unsorted object keys** (`sort-keys-fix`, ascending, case-sensitive). Write object literals with alphabetized keys. `src/components/ui` (shadcn-generated) is excluded from these rules.
- Prettier uses `trailingComma: "es5"` plus the Tailwind class-sorting plugin.
- Add shadcn components into `src/components/ui` (see `components.json`). Use `cn()` from `@/lib/utils` to merge classes.

## CI notes

The workflows live in `.github/workflows` (ESLint SARIF, Playwright in the official Playwright container, Lighthouse, react-doctor, supply-chain signature checks, and Dependabot with a release cooldown). `code-review.yml` runs `bash .skills/review-code.sh`, which you can also run locally. It writes a gitignored `code-review-report.md`, and the job fails on any ERROR: a component without a `displayName`, a component without JSDoc, an array index used as a `key`, or any ESLint error. It only warns about ESLint warnings, file names that aren't kebab-case, and `export default function`.
