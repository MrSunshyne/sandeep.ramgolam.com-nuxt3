<template>
  <dialog
    ref="dialogRef"
    class="wallpaper-dialog"
    closedby="any"
    @close="selected = null"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
  >
    <div
      v-if="selected"
      class="relative flex items-center justify-center p-4 h-full w-full"
      @click.self="dialogRef?.close()"
    >
      <img
        :src="selected.path"
        :alt="selected.title"
        class="wallpaper-dialog-img max-w-full max-h-full object-contain rounded-lg shadow-2xl"
      />

      <!-- Close Button -->
      <button @click="dialogRef?.close()" class="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors">
          <Icon name="solar:close-circle-bold" class="w-8 h-8" />
      </button>

      <!-- Navigation Buttons -->
      <button @click="prev" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors">
          <Icon name="solar:alt-arrow-left-linear" class="w-8 h-8" />
      </button>
      <button @click="next" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors">
          <Icon name="solar:alt-arrow-right-linear" class="w-8 h-8" />
      </button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import type { Wallpaper } from '@/types/wallpaper';

const props = defineProps<{
  wallpapers: Wallpaper[];
}>();

const selected = ref<Wallpaper | null>(null);
const dialogRef = ref<HTMLDialogElement | null>(null);

function open(wallpaper: Wallpaper) {
  selected.value = wallpaper;
  // native <dialog>: top layer, focus trap, Esc, ::backdrop — all built in
  dialogRef.value?.showModal();
}

// Swap the displayed wallpaper, cross-fading via the View Transitions API
// where available.
function show(wallpaper: Wallpaper) {
  if (document.startViewTransition) {
    document.startViewTransition(async () => {
      selected.value = wallpaper;
      await nextTick();
    });
  } else {
    selected.value = wallpaper;
  }
}

function next() {
  if (!selected.value) return;
  const currentIndex = props.wallpapers.findIndex(w => w.path === selected.value!.path);
  show(props.wallpapers[(currentIndex + 1) % props.wallpapers.length]);
}

function prev() {
  if (!selected.value) return;
  const currentIndex = props.wallpapers.findIndex(w => w.path === selected.value!.path);
  show(props.wallpapers[(currentIndex - 1 + props.wallpapers.length) % props.wallpapers.length]);
}

defineExpose({ open });
</script>

<style scoped>
.wallpaper-dialog {
    width: 95vw;
    height: 90vh;
    max-width: 95vw;
    max-height: 90vh;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    overscroll-behavior: contain;
}

.wallpaper-dialog::backdrop {
    background: rgb(0 0 0 / 0.85);
    backdrop-filter: blur(6px);
}

/* Open/close transitions in pure CSS: allow-discrete lets `display` and the
   top-layer `overlay` participate, @starting-style defines the entry frame. */
.wallpaper-dialog,
.wallpaper-dialog::backdrop {
    opacity: 0;
    transition:
        opacity 0.25s ease,
        scale 0.25s ease,
        display 0.25s ease allow-discrete,
        overlay 0.25s ease allow-discrete;
}

.wallpaper-dialog {
    scale: 0.94;
}

.wallpaper-dialog[open],
.wallpaper-dialog[open]::backdrop {
    opacity: 1;
}

.wallpaper-dialog[open] {
    scale: 1;
}

@starting-style {
    .wallpaper-dialog[open],
    .wallpaper-dialog[open]::backdrop {
        opacity: 0;
    }
    .wallpaper-dialog[open] {
        scale: 0.94;
    }
}

/* Prev/next swaps cross-fade through the View Transitions API */
.wallpaper-dialog-img {
    view-transition-name: wallpaper-lightbox-image;
}
</style>
