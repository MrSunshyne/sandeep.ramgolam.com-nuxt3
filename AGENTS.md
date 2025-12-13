# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Sandeep Ramgolam, built with Nuxt 3 and Nuxt Content v2. Features a hand-drawn design style maintained since 2018.

## Commands

```bash
# Development
pnpm dev              # Start dev server on port 4242

# Build
pnpm build            # Build for production
pnpm generate         # Generate static site

# Linting
pnpm lint             # Run ESLint with auto-fix

# Testing
pnpm test:e2e         # Run Playwright tests
pnpm test:e2e:headed  # Run Playwright tests in headed mode
```

## Architecture

### Tech Stack

- **Framework**: Nuxt 3 with compatibility version 5
- **UI**: @nuxt/ui, Tailwind CSS with custom neumorphism shadows
- **Content**: @nuxt/content for markdown blog posts
- **Styling**: Tailwind CSS with tailwindcss-animate and @inspira-ui/plugins
- **OG Images**: nuxt-og-image for dynamic social images

### Key Directories

- `content/blog/` - Blog posts as numbered markdown files (e.g., `1.google-devfest-2019-mauritius.md`)
- `components/global/` - Auto-imported global components for use in markdown
- `components/OgImage/` - Templates for dynamic OG image generation
- `layouts/` - Three layouts: default, blog, quote
- `public/content/images/` - Blog images organized by date

### Nuxt Modules

- @nuxt/ui and @nuxt/ui
- @nuxt/content for markdown processing
- @nuxthq/studio for visual editing
- @nuxt/image for image optimization
- nuxt-og-image for social images
- nuxt-mcp for MCP integration

### Configuration Notes

- Dev server runs on port 4242
- Dark mode uses class-based switching
- View transitions enabled experimentally
- Components in `components/global/` are registered globally (for markdown MDC usage)
- Image presets: `avatar` (150x150) and `cover` (800w)

### Tailwind Customization

- Custom neumorphism shadows: `neumorphismdark` and `neumorphismlight`
- HSL-based color system with CSS custom properties
- Typography plugin enabled for prose styling

## Package Manager

This project uses **pnpm** exclusively. Never use npm or yarn commands.

### Tests

- **Playwright**: End-to-end tests for the website
- **E2E Tests**: Run with `pnpm test:e2e` or `pnpm test:e2e:headed`
- Prefer running tests in headedless mode
- Only run tests when significantly changed the website
- When analysing build logs and looking for errors, use smart grep techniques to only filter problematic errors to avoid consuming too much tokens.

### Tasks Todos and Issues

- All todos, issues, and tasks are kept in a TODO.md file in the root directory
- Done tasks are marked with a `done` label
- You can read and edit this list by reading the TODO.md file and editing it
- When you are done with a task, mark it as done by adding the `done` label to it
- When i request you to do a task, first check if it is already in the TODO.md file
- If it is not in the TODO.md file, add it to the TODO.md file
