<template>
  <div class="profile-links flex flex-wrap gap-4 py-4">
    <a rel="me" href="https://x.com/__Sun__" target="_blank">
      <span class="sr-only">X Profile</span>
      <IconsTwitter class="svgicon text-black hover:text-blue-500 w-10 h-10 md:w-16 md:h-16 dark:text-white" />
    </a>
    <a rel="noopener" target="_blank" href="http://instagram.com/mr_sunshyne/" >
      <span class="sr-only">Instagram Page</span>
      <IconsInstagram class="svgicon text-black hover:text-blue-500 w-10 h-10 md:w-16 md:h-16 dark:text-white" />
    </a>
    <a rel="noopener" target="_blank" href="mailto:sandeep@ramgolam.com">
      <span class="sr-only">Email Address</span>
      <IconsEmail
        class="svgicon text-black hover:text-blue-500 w-10 h-10 md:w-16 md:h-16 dark:text-white"
      />
    </a>
    <a
      target="_blank"
      rel="noopener"
      href="https://www.linkedin.com/in/sandeep-ramgolam-bb18b526/"
    >
      <span class="sr-only">LinkedIN Profile</span>
      <IconsLinkedin
        class="svgicon text-black hover:text-blue-500 w-10 h-10 md:w-16 md:h-16 dark:text-white"
      />
    </a>
  </div>
</template> 

<style lang="postcss" scoped>
.social-media {
  @apply pt-5 text-center flex w-full;

  a {
    @apply block underline font-bold text-sm w-1/2;

    &:hover {
      @apply text-blue-500;
    }
  }
}

@screen sm {
  .social-media {
    @apply pt-10 text-left;

    a {
      @apply font-bold no-underline tracking-widest pr-10 text-xl w-auto;

      &:hover {
        @apply underline text-blue-500;
      }
    }
  }
}

@keyframes vibrate-1 {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }

  20% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }

  40% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }

  60% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }

  80% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }

  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
}

.svgicon {
  transition: all 0.2s linear;
}

.svgicon:hover {
  cursor: pointer;
  animation: vibrate-1 0.01s ease-in infinite;
  transition: all 0.4s linear;
}
</style>
