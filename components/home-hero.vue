<template>
    <div
        class="container mx-auto md:min-h-[80vh] text-center sm:text-left flex flex-wrap items-center w-full"
      >
        <HomeSelfIntro />

        <div class="splash-wrapper hidden md:flex content-center md:w-1/3">
          <InspiraParticleImageBust
            v-if="isDesktop"
            image-src="/assets/sun-bust.png"
            :responsive-width="true"
            :noise="2"
            particle-size="2"
            particle-gap="1"
            :grow-duration="10"
            :initPosition="'bottom'"
            :initDirection="'bottom'"
            gravity="0.2"
          />
        </div>
      </div>
</template>

<script setup lang="ts">
import HomeSelfIntro from './home-self-intro.vue';
import InspiraParticleImageBust from './inspira/ParticleImage/Bust.vue';

const { isDesktop } = useBreakpoints();
</script>