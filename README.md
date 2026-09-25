# Kelly Belem — online review

Review site for Kelly at https://setupkelly.vercel.app. Open this link in Safari, Chrome or another browser; no installation is needed.

This repository contains the current Next.js institutional site, including Coral Rock, the editorial pages, approved logos and portraits, and the official Matrix property-search iframe. It replaces the previous Vite app in this preview repository. The previous app remains in Git history at `baf7ad72a9bfa60997016fecfa350338b19ddf7e`.

## Scope of this review

- All pages send `noindex, nofollow, noarchive`; robots.txt disallows crawling.
- Contact, newsletter and QR forms are simulations. No submissions are persisted or sent to Kelly.
- The Matrix MLS iframe is live, external and operated by Matrix. Its own forms follow Matrix's rules.
- CMS, analytics, newsletter delivery and CRM integrations are not enabled.
- Legal pages are drafts for review. This is not the production kellybelem.com website.

## Development and Vercel

Use Node 24 and pnpm 10.32.1. Run `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm build`; `pnpm dev` starts local development.

The existing Vercel project is `setupkelly`, linked to this repository's `main` branch. Root Directory must be empty (repository root). `vercel.json` sets Next.js, the install/build commands and `.next` output, overriding the old Vite preset. No new secrets or services are required. Enable Vercel's system environment variables.

`SITE_URL` optionally overrides the metadata origin. Without it, local development uses localhost, Vercel preview builds use `VERCEL_URL`, and the production alias of this review project uses https://setupkelly.vercel.app. All environments remain noindex and mock-only. Form requests accept only the configured origin, exact review aliases and exact Vercel deployment/branch domains; cross-origin requests are rejected.

The Mac ZIP package and original local project are maintained separately; they are not deployment inputs.
