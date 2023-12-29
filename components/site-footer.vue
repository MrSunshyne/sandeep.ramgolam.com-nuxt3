
<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>

    <div
         class="contain text-sm uppercase tracking-wide py-10 flex justify-center md:justify-between">
        <ul class="hidden md:block">
            <li>&copy; {{year}} | Sandeep Ramgolam</li>
        </ul>
        <ul class="menu">
            <li>
                <a href="/about">About</a>
            </li>
            <li>
                <a href="/projects">Projects</a>
            </li>
        </ul>
    </div>
</template>

<style lang="postcss" scoped>
.menu {
    display: flex;

    a {
        @apply pl-2;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
