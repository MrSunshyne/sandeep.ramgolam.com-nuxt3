# Deployment Guide

This project supports deployment to three different platforms with optimized configurations for each:

## 🟢 Vercel (SSR + Native Bindings) - **Recommended**

**Build Command**: `pnpm build`
**Features**: Full server-side rendering, native bindings, OG image generation
**Best for**: Production sites requiring dynamic features

### Configuration
- Uses `node-server` preset
- SSR enabled with native `oxc-parser` bindings
- All 600+ routes prerendered
- Dynamic OG image generation

---

## 🟡 Cloudflare Pages (Static Generation)

**Build Command**: `pnpm run build:cloudflare` or `pnpm build:cloudflare`
**Build Output**: `dist`
**Features**: Static site generation, no native dependencies

### Cloudflare Pages Settings
```bash
# Build Settings
Build command: pnpm run build:cloudflare
Build output directory: dist
Node.js version: 18 or 20

# Environment Variables
CF_PAGES=1
CLOUDFLARE_BUILD=1
NODE_ENV=production
```

### Configuration
- Uses `cloudflare-pages` preset
- SSR disabled (static generation)
- No native bindings (skipped automatically)
- Optimized for edge deployment

---

## 🔵 GitHub Pages (Static Generation)

**Build Command**: `pnpm generate` (automatically configured)
**Build Output**: `dist`
**Features**: Static site generation via GitHub Actions

### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository → Settings → Pages
   - Source: "GitHub Actions"

2. **Push to main branch** - The workflow runs automatically on:
   - Push to `main` branch
   - Manual workflow dispatch

3. **Workflow Configuration**: 
   - File: `.github/workflows/deploy-github-pages.yml`
   - Node.js 20, pnpm 9
   - Automatic caching and optimization

### Configuration
- Uses `static` preset  
- SSR disabled (static generation)
- No native bindings (skipped automatically)
- GitHub Actions handles deployment

---

## 🔧 Platform Detection

The build system automatically detects the deployment platform:

```javascript
// Environment Detection
const isCloudflare = process.env.CF_PAGES === '1' || process.env.CLOUDFLARE_BUILD === '1';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// Configuration Applied
- SSR: !isCloudflare && !isGitHubPages
- Native bindings: Only installed for Vercel
- Build preset: Automatically selected
```

## 📦 Build Scripts Summary

```bash
# Vercel (SSR)
pnpm build

# Cloudflare Pages (Static)
pnpm build:cloudflare

# GitHub Pages (Static)  
pnpm build:github

# Local development
pnpm dev

# Generic static generation
pnpm generate
```

## 🚀 Deployment Status

All three platforms are fully configured and working:

- ✅ **Vercel**: Full-featured SSR deployment
- ✅ **Cloudflare**: Optimized static deployment  
- ✅ **GitHub Pages**: Automated static deployment

Choose the platform that best fits your needs!
