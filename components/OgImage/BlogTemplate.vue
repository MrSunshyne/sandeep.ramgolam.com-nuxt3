<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    backgroundColor?: string;
    description?: string;
    customImage?: string;
  }>(),
  {
    title: "Blog post",
    backgroundColor: "bg-green-500",
    description: "",
    customImage: "",
  },
);

// remove " | Sandeep Ramgolam" from title
const strippedTitle =
  props.title && props.title.replace(" | Sandeep Ramgolam", "");
const hasFeaturedImage = props.customImage && props.customImage !== "";
</script>
<template>
  <div
    class="w-full h-full flex text-black items-center relative justify-center"
  >
    <img
      v-if="hasFeaturedImage"
      :style="{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'brightness(0.3) blur(2px)',
      }"
      :src="customImage"
    />

    <img
      v-if="customImage"
      :style="{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }"
      :src="'/assets/images/og-image-assets/blog-custom-image.png'"
    />

    <img
      v-else
      :style="{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }"
      :src="'/assets/images/og-image-assets/blog.png'"
    />

    <div class="w-full h-full flex items-center justify-center" :style="[]">
      <div
        :style="[
          {
            position: 'absolute',
            left: '0',
            top: '60px',
            maxWidth: '768px',
          },
          {
            color: customImage ? 'white' : 'black',
          },
        ]"
      >
        <div
          :style="{
            position: 'relative',
          }"
        >
          <h1
            :style="{
              fontSize: '64px',
              left: '110px',
              top: '90px',
              lineHeight: '1.2em',
            }"
          >
            {{ strippedTitle }}
          </h1>

          <p
            v-if="description"
            :style="{
              fontSize: '36px',
              left: '118px',
              top: '100px',
              color: 'black',
              lineHeight: '1.5em',
            }"
          >
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
/* .og-image-wrapper {
    background-color: #000;
    background-image: url('~/og-image-assets/blog.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.og-image-wrapper.custom {
    background-color: transparent;
    background-image: url('~/og-image-assets/blog-custom-image.png');
    color: white;
}

.og-text-wrapper {
    position: absolute;
    left: 118px;
    top: 140px;
    max-width: 550px;
}

.og-featured-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    filter: brightness(0.3) blur(2px);

}

.og-text-title {
    font-size: 50px;
    left: 118px;
    top: 90px;
}

.og-text-description {
    font-size: 24px;
    left: 118px;
    top: 300px;
    color: gray;
    line-height: 1.5em;
} */
</style>
