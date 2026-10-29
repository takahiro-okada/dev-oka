This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Dependency updates

Use the pinned pnpm version with Corepack (`corepack pnpm install --frozen-lockfile`).
Dependabot checks npm packages and GitHub Actions every Monday at 09:00
(Pacific/Auckland). Minor and patch updates are grouped; security updates have
a separate group. Major updates remain separate PRs for manual review.

Verified Dependabot npm minor/patch PRs enable auto-merge. The main branch requires
both the GitHub Actions `Verify` check and the Vercel preview to succeed, with the
branch up to date. GitHub Actions updates require manual review. The auto-merge
workflow only reads verified PR metadata and never executes PR code.

`Verify` installs with a frozen lockfile, audits dependencies (high/critical issues
fail), runs Biome, builds the application including TypeScript checks, and checks
eight production routes including note/work detail pages. CI uses explicit mock
CMS credentials and `scripts/ci-microcms.cjs` as a Node preload to serve fixture
content; production CMS credentials are not needed or exposed to Dependabot.
Vercel separately validates the build with the configured deployment environment.
The CMS fixture is only loaded by CI and requires the dedicated placeholder
credentials; normal development and deployment continue to use microCMS.

PostCSS security overrides live in `pnpm-workspace.yaml` so Dependabot preserves
them when regenerating the lockfile. They specify a patched minimum version
without pinning future patch updates.

The release-age exceptions are limited to the already audited and deployed
`postcss@8.5.32` and `baseline-browser-mapping@2.11.34`. They prevent these
existing transitive dependencies from blocking
unrelated Dependabot updates during its initial three-day release window;
other packages and future PostCSS versions retain the normal waiting period.
