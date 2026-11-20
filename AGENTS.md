# AGENTS.md

This file provides guidance to coding agents working in this repository.

## Project Overview

Personal website for Sandeep Ramgolam, built with Nuxt 4 and Nuxt Content 3. Features a hand-drawn design style maintained since 2018 (see `docs/hand-drawn-style-guide.md`).

## Commands

```bash
# Development
pnpm dev              # Start dev server on port 4242

# Build
pnpm generate         # Production build is generated statically into .output/public

# Linting
pnpm lint             # Run ESLint with auto-fix

# Testing
pnpm test:e2e         # Run Playwright tests (starts `pnpm dev` itself)
pnpm test:e2e:headed  # Run Playwright tests in headed mode
```

We avoid running `pnpm build`: the site is statically generated and hosted from `pnpm generate` output.

## Deployment

- Cloudflare Pages git integration (project `sandeep-ramgolam-com-nuxt3`) runs `pnpm generate` on every push. There are no GitHub Actions.
- Every PR gets a "Cloudflare Pages" check and a preview deployment (`<hash>.sandeep-ramgolam-com-nuxt3.pages.dev`). That check is the real production build; wait for it before merging.
- Node version for local and Cloudflare builds is pinned in `.node-version`. Nuxt 4.6 and nuxt-og-image 7 require Node `^22.22.3 || ^24.15.0 || >=26`.
- Blog comments are served by a separate Cloudflare Worker at `comments.ramgolam.com` (D1 + Turnstile). The site only embeds it; see `runtimeConfig.public` in `nuxt.config.ts`.

## Architecture

### Tech Stack

- **Framework**: Nuxt 4 (`future.compatibilityVersion: 5`), Vite 8 / Rolldown
- **UI**: @nuxt/ui v4, Tailwind CSS v4 with CSS-based config (`assets/css/main.css` `@theme`; `tailwind.config.js` is an empty stub)
- **Content**: @nuxt/content v3 with collections defined in `content.config.ts`
- **OG Images**: nuxt-og-image v7 with Satori templates (`components/OgImage/*.satori.vue`)
- **Animation**: motion-v

### Key Directories

- `content/blog/` - Blog posts as numbered markdown files (e.g., `76.webmcp-in-the-browser.md`); `blog` collection
- `content/events/` - One JSON file per event (`YYYY-MM-DD_<type>.json`); `events` collection, schema in `content.config.ts`
- `data/` - Projects and experience data (plain JS modules)
- `components/global/` - Globally registered components for use in markdown (MDC), e.g. `BaselineCheckerWrapper`
- `components/OgImage/` - Satori templates for OG images
- `layouts/` - `default`, `home`, `blog`, `quote`
- `public/content/images/` - Blog images organized by date
- `docs/` - Notes on design and content conventions
- `internal/` - Private research notes; gitignored, never published
- `legacy/`, `processing/` - Old Ghost export and the one-off scripts that converted it

### Nuxt Modules

- @nuxt/ui
- @nuxt/content
- @nuxt/image (Cloudflare provider in production, IPX in dev)
- nuxt-og-image
- nuxt-mcp-dev (MCP server for the dev server)

### Configuration Notes

- Dev server runs on port 4242
- `site.url` is set to `https://sandeep.ramgolam.com` so og:image URLs are absolute and do not point at a pages.dev preview
- Dark mode uses class-based switching
- View transitions enabled experimentally
- Components in `components/global/` are registered globally (for markdown MDC usage)
- Image presets: `avatar` (150x150) and `cover` (800w)

### OG image templates

Satori (0.47+) applies native CSS defaults: block layout unless `display: flex` is set, browser margins on headings and paragraphs, and `left`/`top` offsets only on positioned elements. Keep layout explicit in templates. Do not put JS comments inside `:style` object bindings; the template compiler drops the styles that follow. After changing a template, compare the rendered PNGs in `.output/public/_og/` against production.

### Tailwind Customization

- Custom neumorphism shadows: `shadow-neumorphismdark` and `shadow-neumorphismlight` (`@theme` in `assets/css/main.css`)
- HSL-based color system with CSS custom properties
- Typography plugin enabled for prose styling

## Package Manager

This project uses **pnpm** exclusively. Never use npm or yarn commands.

### Tests

- **Playwright**: End-to-end tests in `tests/e2e/`
- **E2E Tests**: Run with `pnpm test:e2e` or `pnpm test:e2e:headed`
- Prefer running tests in headless mode
- Only run tests when you have significantly changed the website
- When analysing build logs and looking for errors, grep for the problem lines only to avoid consuming too many tokens.

### Tasks Todos and Issues

- All todos, issues, and tasks are kept in a TODO.md file in the root directory (gitignored, local only)
- Done tasks are marked with a `done` label
- You can read and edit this list by reading the TODO.md file and editing it
- When you are done with a task, mark it as done by adding the `done` label to it
- When I request you to do a task, first check if it is already in the TODO.md file
- If it is not in the TODO.md file, add it to the TODO.md file
