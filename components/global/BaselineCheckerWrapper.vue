<script setup lang="ts">
import type { WebFeatureId } from "@baseline-banner/vue";
import { BaselineBannerWebDev } from "@baseline-banner/vue";
import "@baseline-banner/vue/style.css";

interface Props {
  featureName: WebFeatureId;
}

defineProps<Props>();
</script>

<template>
  <div class="baseline-wrapper">
    <ClientOnly>
      <BaselineBannerWebDev theme="default" :feature-name="featureName" />
      <template #fallback>
        <div class="baseline-checker-loading">
          <p>Loading browser compatibility data...</p>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
/* BaselineChecker loading fallback styles */
.baseline-checker-loading {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  background: #f8fafc;
  color: #6b7280;
  font-weight: 500;
  text-align: center;
  animation: pulse 2s infinite;
}

html.dark .baseline-checker-loading {
  border-color: #334155;
  background: #0f172a;
  color: #94a3b8;
}

html.sepia .baseline-checker-loading {
  border-color: #d6c5a3;
  background: #f6eedc;
  color: #5c4932;
}

/* Theme the @baseline-banner/vue web-dev card surface and copy in dark & sepia modes */
html.dark .baseline-wrapper :deep(.baseline-checker) {
  background: #0f172a;
  border-color: #334155;
}

html.dark .baseline-wrapper :deep(.feature-name),
html.dark .baseline-wrapper :deep(.baseline-badge .year) {
  color: #f1f5f9;
}

html.dark .baseline-wrapper :deep(.feature-description) {
  color: #cbd5e1;
}

html.dark .baseline-wrapper :deep(.availability-info) {
  color: #94a3b8;
}

html.sepia .baseline-wrapper :deep(.baseline-checker) {
  background: #f6eedc;
  border-color: #d6c5a3;
}

html.sepia .baseline-wrapper :deep(.feature-name),
html.sepia .baseline-wrapper :deep(.baseline-badge .year) {
  color: #433422;
}

html.sepia .baseline-wrapper :deep(.feature-description) {
  color: #5c4932;
}

html.sepia .baseline-wrapper :deep(.availability-info) {
  color: #6e5a40;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
