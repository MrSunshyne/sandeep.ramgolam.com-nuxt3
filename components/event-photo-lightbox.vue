<template>
  <dialog
    ref="dialogRef"
    class="photo-dialog"
    closedby="any"
    :aria-label="title"
    @close="index = null"
    @keydown.left.prevent="step(-1)"
    @keydown.right.prevent="step(1)"
  >
    <figure
      v-if="photo"
      class="relative flex flex-col items-center gap-3 px-4 sm:px-16 py-4 h-full w-full"
      @click.self="dialogRef?.close()"
    >
      <div
        class="flex flex-1 min-h-0 w-full items-center justify-center"
        @click.self="dialogRef?.close()"
      >
        <img
          :src="largePhoto(photo.src)"
          :alt="photo.alt"
          class="photo-dialog-img max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
      </div>

      <figcaption class="max-w-2xl text-center text-sm text-white/85">
        {{ photo.alt }}
        <span class="block mt-1 text-xs text-white/60">
          <span v-if="photos.length > 1">{{ index! + 1 }} / {{ photos.length }}</span>
          <span v-if="photos.length > 1 && photo.credit"> · </span>
          <template v-if="photo.credit">
            Photo:
            <a
              v-if="photo.source"
              :href="photo.source"
              target="_blank"
              rel="noopener"
              class="underline decoration-dotted underline-offset-2 hover:text-white"
            >{{ photo.credit }}</a>
            <span v-else>{{ photo.credit }}</span>
          </template>
        </span>
      </figcaption>

      <!-- Close Button -->
      <button
        aria-label="Close"
        class="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
        @click="dialogRef?.close()"
      >
        <Icon name="solar:close-circle-bold" class="w-8 h-8" />
      </button>

      <!-- Navigation Buttons -->
      <template v-if="photos.length > 1">
        <button
          aria-label="Previous photo"
          class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
          @click="step(-1)"
        >
          <Icon name="solar:alt-arrow-left-linear" class="w-8 h-8" />
        </button>
        <button
          aria-label="Next photo"
          class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
          @click="step(1)"
        >
          <Icon name="solar:alt-arrow-right-linear" class="w-8 h-8" />
        </button>
      </template>
    </figure>
  </dialog>
</template>

<script setup lang="ts">
interface EventPhoto {
  src: string;
  alt: string;
  credit?: string;
  source?: string;
}

const props = defineProps<{
  photos: EventPhoto[];
  title?: string;
}>();

const index = ref<number | null>(null);
const dialogRef = ref<HTMLDialogElement | null>(null);
const photo = computed(() => (index.value === null ? null : props.photos[index.value]));

// some originals are multi-MB PNGs from blog posts, so the large copy goes through the image provider too
const img = useImage();
const largePhoto = (src: string) => img(src, { width: 1600, format: "webp" });

function open(i: number) {
  index.value = i;
  // native <dialog>: top layer, focus trap, Esc, ::backdrop — all built in
  dialogRef.value?.showModal();
}

// Swap the displayed photo, cross-fading via the View Transitions API
// where available.
function step(delta: number) {
  if (index.value === null || props.photos.length < 2) return;
  const next = (index.value + delta + props.photos.length) % props.photos.length;
  if (document.startViewTransition) {
    document.startViewTransition(async () => {
      index.value = next;
      await nextTick();
    });
  } else {
    index.value = next;
  }
}

defineExpose({ open });
</script>

<style scoped>
.photo-dialog {
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

.photo-dialog::backdrop {
    background: rgb(0 0 0 / 0.85);
    backdrop-filter: blur(6px);
}

/* Same open/close transitions as wallpaper-lightbox.vue */
.photo-dialog,
.photo-dialog::backdrop {
    opacity: 0;
    transition:
        opacity 0.25s ease,
        scale 0.25s ease,
        display 0.25s ease allow-discrete,
        overlay 0.25s ease allow-discrete;
}

.photo-dialog {
    scale: 0.94;
}

.photo-dialog[open],
.photo-dialog[open]::backdrop {
    opacity: 1;
}

.photo-dialog[open] {
    scale: 1;
}

@starting-style {
    .photo-dialog[open],
    .photo-dialog[open]::backdrop {
        opacity: 0;
    }
    .photo-dialog[open] {
        scale: 0.94;
    }
}

/* Prev/next swaps cross-fade through the View Transitions API */
.photo-dialog-img {
    view-transition-name: event-photo-lightbox-image;
}

@media (prefers-reduced-motion: reduce) {
    .photo-dialog,
    .photo-dialog::backdrop {
        transition: none;
    }
}
</style>
