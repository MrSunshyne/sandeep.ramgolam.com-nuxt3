<script setup lang="ts">
// A browser window around a bare screenshot, like the ones the older project
// thumbnails have drawn into the image. Sized off its own width (container
// query units), so it reads the same on a small row thumbnail and a big one.
defineProps<{ address?: string }>();
</script>

<template>
  <div class="browser-frame">
    <div class="browser-bar" aria-hidden="true">
      <span class="browser-dots"><i /><i /><i /></span>
      <span v-if="address" class="browser-address">{{ address }}</span>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.browser-frame {
  container-type: inline-size;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
  box-shadow: 0 10px 30px -12px rgb(0 0 0 / 0.25);
}

.dark .browser-frame {
  border-color: #374151;
  background: #1f2937;
}

.browser-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6.5cqw;
  min-height: 14px;
  padding-inline: 2.5cqw;
}

.browser-dots {
  position: absolute;
  left: 2.5cqw;
  display: flex;
  gap: 1.2cqw;
}

.browser-dots i {
  width: max(1.8cqw, 5px);
  aspect-ratio: 1;
  border-radius: 9999px;
  background: #ff5f57;
}

.browser-dots i:nth-child(2) {
  background: #febc2e;
}

.browser-dots i:nth-child(3) {
  background: #28c840;
}

.browser-address {
  max-width: 62%;
  overflow: hidden;
  padding: 0.5cqw 3cqw;
  border-radius: 1cqw;
  background: #fff;
  color: #6b7280;
  font-size: max(2.4cqw, 8px);
  line-height: 1.4;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dark .browser-address {
  background: #374151;
  color: #9ca3af;
}
</style>
