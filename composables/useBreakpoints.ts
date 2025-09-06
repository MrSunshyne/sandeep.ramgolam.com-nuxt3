import { ref, computed, readonly, onMounted, onUnmounted } from 'vue'

export const useBreakpoints = () => {
  const windowWidth = ref(0)
  
  // Tailwind breakpoints (matching your tailwind.config.js)
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  }
  
  const updateWidth = () => {
    if (process.client) {
      windowWidth.value = window.innerWidth
    }
  }
  
  onMounted(() => {
    if (process.client) {
      updateWidth()
      window.addEventListener('resize', updateWidth)
    }
  })
  
  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('resize', updateWidth)
    }
  })
  
  // Computed properties for breakpoint checks
  const isSm = computed(() => windowWidth.value >= breakpoints.sm)
  const isMd = computed(() => windowWidth.value >= breakpoints.md)
  const isLg = computed(() => windowWidth.value >= breakpoints.lg)
  const isXl = computed(() => windowWidth.value >= breakpoints.xl)
  
  // Utility to check if screen is mobile (below md breakpoint)
  const isMobile = computed(() => windowWidth.value < breakpoints.md)
  const isDesktop = computed(() => windowWidth.value >= breakpoints.md)
  
  return {
    windowWidth: readonly(windowWidth),
    isSm,
    isMd,
    isLg,
    isXl,
    isMobile,
    isDesktop,
    breakpoints
  }
}
