<script setup lang="ts">
const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog/" },
  { label: "Events", href: "/events/" },
  { label: "Projects", href: "/projects/" },
];
</script>

<template>
  <nav class="site-nav-bottom" style="view-transition-name: dock;">
    <div class="nav-dock">
      <!-- Hand-drawn border SVG with morphing paths -->
      <svg class="dock-border" viewBox="0 0 500 70" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Unstuck state: larger, more organic blob shape -->
        <path
          class="dock-path"
          d="M12 38C8 20 25 4 58 10C78 3 95 14 130 6C165 12 190 2 235 9C280 3 310 15 355 5C395 13 430 4 468 11C492 5 502 22 495 42C500 58 488 68 465 63C435 70 400 58 360 66C320 57 280 69 235 61C190 70 160 56 125 65C90 57 65 68 45 62C22 68 8 55 12 38Z"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="var(--dock-bg)"
        />
      </svg>
      <div class="nav-inner">
        <NuxtLink href="/" class="nav-logo block" title="Home">
          <SiteLogo />
          <span class="sr-only">Sandeep Ramgolam Logo</span>
        </NuxtLink>
        <ul class="nav-links">
          <li v-for="link in links" :key="link.href" :class="{ 'sm:hidden': link.label === 'Home' }">
            <NuxtLink :href="link.href" class="nav-link">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
        <div class="nav-theme hidden sm:flex">
          <ClientOnly>
            <site-color-picker />
          </ClientOnly>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
@reference "tailwindcss";

.site-nav-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  padding: 12px;
  background: transparent;

  /* Direct child styling */
  > .nav-dock {
    --dock-bg: #ffffff;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #e5e7eb;
    border-radius: 9999px;
    background: var(--dock-bg);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: calc(100vw - 24px);
  }
}

html.dark .site-nav-bottom > .nav-dock {
  --dock-bg: rgb(30 41 59);
  border-color: rgb(71 85 105);
}

.site-nav-bottom .dock-border {
  display: none;
  position: absolute;
  inset: -12px -16px;
  width: calc(100% + 32px);
  height: calc(100% + 24px);
  pointer-events: none;
  color: #374151; /* gray-700 */
}

@media (min-width: 640px) {
  .site-nav-bottom {
    position: sticky;
    top: 0;
    bottom: auto;
    padding: var(--dock-padding-top) 16px var(--dock-padding) 16px;
    container-type: scroll-state;
  }

  .site-nav-bottom > .nav-dock {
    border: none;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    transform: scale(var(--dock-scale));
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    width: auto;
    max-width: none;
  }

  .site-nav-bottom .dock-border {
    display: block;
    inset: -12px -32px;
  }

  @container scroll-state(stuck: top) {
    .site-nav-bottom > .nav-dock {
      transform: scale(1);
    }

    .site-nav-bottom .dock-path {
      d: path("M25 35C25 18 40 12 70 13C100 11 140 14 185 12C235 14 285 11 335 13C385 11 425 14 460 12C485 11 495 18 490 35C495 52 485 59 460 58C425 60 385 57 335 58C285 57 235 60 185 58C140 57 100 60 70 58C40 59 25 52 25 35Z");
    }
  }
}

.site-nav-bottom .dock-path {
  transition: d 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              stroke-width 0.3s ease-out;
}

html.dark .site-nav-bottom .dock-border {
  color: #9ca3af; /* gray-400 */
}

.site-nav-bottom .nav-inner {
  @apply px-3 py-2.5 sm:px-6 sm:py-3;
  @apply flex items-center justify-center;
  position: relative;
  z-index: 1;
  width: 100%;
}

.site-nav-bottom .nav-logo {
  @apply hidden sm:flex;
  @apply mr-1 sm:mr-2;
  @apply pr-2 sm:pr-6;
  @apply border-r border-gray-300 dark:border-slate-600;
  text-decoration: none;
  flex-shrink: 0;
}

.site-nav-bottom .nav-logo .logo {
  width: 5.5rem !important;
  padding-left: 0 !important;
}

@media (min-width: 768px) {
  .site-nav-bottom .nav-logo .logo {
    width: 6.5rem !important;
  }
}

.site-nav-bottom .nav-links {
  @apply flex items-center justify-between sm:justify-center gap-1 sm:gap-2;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.site-nav-bottom .nav-link {
  @apply px-2.5 py-2 sm:px-4;
  @apply font-bold text-sm sm:text-base;
  @apply transition-all duration-300;
  text-decoration: none;
  position: relative;
  display: block;
  color: #111827; /* gray-900 */
}

html.dark .site-nav-bottom .nav-link {
  color: #ffffff;
}

/* Hand-drawn underline on hover */
.site-nav-bottom .nav-link::after {
  content: '';
  position: absolute;
  left: 0.625rem;
  right: 0.625rem;
  bottom: 0;
  height: 10px;
  background: currentColor;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='100' height='8' viewBox='0 0 100 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 5.5C11 3.5 19 6 29 4.5C39 3 49 4 59 5C69 6 79 5.5 89 5C93 4.8 97 4.5 99 4' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg width='100' height='8' viewBox='0 0 100 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 5.5C11 3.5 19 6 29 4.5C39 3 49 4 59 5C69 6 79 5.5 89 5C93 4.8 97 4.5 99 4' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  -webkit-mask-repeat: repeat-x;
  mask-repeat: repeat-x;
  -webkit-mask-position: 0 100%;
  mask-position: 0 100%;
  -webkit-mask-size: auto 8px;
  mask-size: auto 8px;
  opacity: 0;
  transition: opacity 0.3s ease-out, -webkit-mask-size 0.3s ease-out, mask-size 0.3s ease-out;
  pointer-events: none;
}

.site-nav-bottom .nav-link:hover::after {
  opacity: 1;
  -webkit-mask-size: auto 10px;
  mask-size: auto 10px;
}

/* Active state - always show underline */
.site-nav-bottom .nav-link.router-link-exact-active::after {
  opacity: 1;
  -webkit-mask-size: auto 10px;
  mask-size: auto 10px;
}

.site-nav-bottom .nav-theme {
  @apply ml-2 sm:ml-3;
  @apply pl-4 sm:pl-5;
  @apply border-l border-gray-300 dark:border-slate-600;
}

@media (min-width: 640px) {
  .site-nav-bottom .nav-inner {
    width: auto;
  }

  .site-nav-bottom .nav-links {
    width: auto;
  }

  .site-nav-bottom .nav-link::after {
    left: 1rem;
    right: 1rem;
  }
}
</style>
