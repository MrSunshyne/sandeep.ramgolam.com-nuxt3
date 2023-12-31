<script setup lang="ts">
const props = defineProps({
    title: String,
    description: String,
});

// remove " | Sandeep Ramgolam" from title
const strippedTitle = props.title && props.title.replace(' | Sandeep Ramgolam', '')
</script>
<template>
    <div
         class="w-full h-full flex text-black items-center relative justify-center og-image-wrapper">
        <h1 class="og-text-title">{{ strippedTitle }}</h1>
        <p class="og-text-description" v-if="description">
            {{ description }}
        </p>
</div>
</template>

<style lang="postcss" scoped>
.og-image-wrapper {
    background-color: #000;
    background-image: url('/og-image-assets/generic.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;    
}

.og-text-title {
    position: absolute;
    font-size: 70px;
    left: 118px;
    top: 90px;
}

.og-text-description {
    position: absolute;
    font-size: 24px;
    left: 118px;
    top: 300px; 
    color: gray;
    max-width: 550px;
    line-height: 1.5em;
}
</style>