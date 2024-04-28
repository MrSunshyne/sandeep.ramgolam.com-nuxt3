<script setup lang="ts">
import SiteMenuSvgMenuBg from "./site-menu-svg-menu-bg.vue";
</script>

<template>
  <div
    class="fixed top-[64px] w-full h-[1px] justify-center items-start hidden md:flex z-10"
  >
    <svg
      width="100%"
      height="12"
      viewBox="0 0 1501 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1491.35 5.34422C1195.69 0.634599 895.038 3.23955 598.639 2.39158C402.645 1.82423 206.636 0.457678 10.7838 0.000136838C4.91182 -0.0120643 0.0825118 0.793184 0.000956842 1.80587C-0.0770522 2.81856 5.63159 1.4878 11.5 1.5C207.331 1.95754 402.312 5.48455 598.285 6.0519C894.152 6.89988 1194.24 4.28881 1489.36 8.99233C1495.21 9.08384 1500.39 8.3457 1500.96 7.33911C1501.49 6.33252 1497.16 5.44183 1491.35 5.34422Z"
        fill="black"
      />
      <path
        d="M1491.35 8.90703C1290.47 3.57399 1087.29 3.86849 884.702 4.16213C789.113 4.30067 693.658 4.43903 598.639 3.98596C506.905 3.54339 415.169 2.80902 323.446 2.07477C219.198 1.24025 114.969 0.405882 10.7838 0.000228063L10.6522 0H1501V11.6555L1500.95 11.6552C1500.46 10.2263 1496.48 9.05076 1491.35 8.90703Z"
        fill="white"
      />
    </svg>
  </div>
  <div
    class="py-3 sm:py-8 sticky md:h-[128px] lg:top-[-32px] z-10 menu-outer-wrapper dark:bg-slate-800 dark:text-white"
  >
    <div class="sticky md:h-[64px] top-0">
      <div
        class="main-menu md:container font-bold flex md:flex-row flex-col justify-center md:justify-between items-center"
      >
        <NuxtLink class="hidden text-center md:inline" title="Logo" href="/">
          <SiteLogo class="inline-block w-40 md:w-32 lg:w-48 relative pl-1" />
          <span class="sr-only">Sandeep Ramgolam Logo</span>
        </NuxtLink>

        <div
          class="flex h-full items-center justify-center content-center text-gray-900 dark:text-white text-sm md:text-md cursor-pointer pt-0"
        >
          <ul class="flex mr-3 flex-wrap">
            <li class="md:hidden">
              <NuxtLink href="/">Home</NuxtLink>
              <SiteMenuSvgMenuBg />
            </li>
            <li>
              <NuxtLink href="/about">About</NuxtLink>
              <SiteMenuSvgMenuBg />
            </li>
            <li>
              <NuxtLink href="/blog/">Blog</NuxtLink>
              <SiteMenuSvgMenuBg />
            </li>
            <li>
              <NuxtLink href="/events/">Events</NuxtLink>
              <SiteMenuSvgMenuBg />
            </li>
            <li>
              <NuxtLink href="/projects/">Projects</NuxtLink>
              <SiteMenuSvgMenuBg />
            </li>
          </ul>
        </div>
        <ClientOnly>
          <site-color-picker />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to

/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}

html.light .menu-outer-wrapper,
html.sepia .menu-outer-wrapper {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 30%,
    #ffffff 75%,
    #ffffff 76%,
    rgba(255, 255, 255, 0) 95%,
    rgba(255, 255, 255, 0) 100%
  );
}
html.dark .menu-outer-wrapper {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(30 41 59) 30%,
    rgba(30 41 59) 75%,
    rgba(30 41 59) 75%,
    rgba(255, 255, 255, 0) 90%,
    rgba(255, 255, 255, 0) 100%
  );
}

.main-menu {
  /* @apply bg-black; */

  ul {
    list-style: none;
    display: flex;
    justify-content: center;

    li {
      position: relative;

      button {
        margin: 10px;
      }

      a {
        padding: 10px;
        display: block;
        @apply border-2;
        text-decoration: none;
        border-color: transparent;
        cursor: pointer;
      }
    }
  }
}

@screen sm {
  .main-menu {
    ul {
      li {
        padding: 10px;

        button {
          margin: 10px;
        }

        a {
          padding: 10px;

          /* margin: 5px; */
          &:hover {
          }

          &.a-exact-active {
          }
        }
      }
    }
  }
}
</style>
