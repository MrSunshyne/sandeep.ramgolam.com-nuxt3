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
    <a
      target="_blank"
      rel="noopener"
      href="https://github.com/MrSunshyne"
    >
      <span class="sr-only">GitHub Profile</span>
      <IconsGithub
        class="svgicon text-black hover:text-blue-500 w-10 h-10 md:w-16 md:h-16 dark:text-white"
      />
    </a>
  </div>
</template> 

<style scoped>
@reference "tailwindcss";

@keyframes float-bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.08);
  }
}

@keyframes glow {
  0%, 100% {
    filter: drop-shadow(0 0 0px currentColor);
  }
  50% {
    filter: drop-shadow(0 0 8px currentColor);
  }
}

.svgicon {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.svgicon:hover {
  cursor: pointer;
  animation: float-bounce 0.6s ease-in-out, glow 0.6s ease-in-out;
}
</style>
