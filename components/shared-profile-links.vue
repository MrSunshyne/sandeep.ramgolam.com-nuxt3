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

.svgicon {
  transition: all 0.2s ease;
  transform-origin: center;
  transform: scale(1) rotate(0deg);
}

.svgicon:hover {
  transition: all 0.4s ease;
  transform: scale(0.8) rotate(-5deg);
  cursor: pointer;
             
}
</style>
