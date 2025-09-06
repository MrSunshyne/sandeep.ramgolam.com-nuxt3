<script setup lang="ts">
import type { WebFeatureId } from '@baseline-banner/vue'
import '@baseline-banner/vue/style.css'

interface Props {
  featureName: WebFeatureId
}

defineProps<Props>()
</script>


<template>
  <ClientOnly>
    <BaselineChecker :feature-name="featureName" />
    <template #fallback>
      <div class="baseline-checker-loading">
        <p>Loading browser compatibility data...</p>
      </div>
    </template>
  </ClientOnly>
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

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>