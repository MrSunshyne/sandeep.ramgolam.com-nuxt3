<template>
  <div class="h-full w-full ">
    <div class="w-full h-[100vh] fixed inset-0 bg-gradient-to-b from-transparent from-10% via-black
   to-transparent">
      <ClientOnly>
        <QuoteParticleText />
      </ClientOnly>
    </div>
  </div>
</template>


<script setup lang="ts">
definePageMeta({
  layout: 'quote',
})

defineOgImageComponent("GenericTemplate");

useHead({
  title: 'Quotes that inspire me',
  meta: [
    {
      name: 'description',
      content: 'Quotes that inspire me to keep going.'
    }
  ]
})
</script>