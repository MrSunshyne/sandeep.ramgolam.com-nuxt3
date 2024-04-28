<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";

const props = withDefaults(
  defineProps<{ activeTocId: string | null; slug: string }>(),
  {},
);
const router = useRouter();

const sliderHeight = useState("sliderHeight", () => 0);
const sliderTop = useState("sliderTop", () => 0);
const tocLinksH2: Ref<Array<HTMLElement>> = ref([]);
const tocLinksH3: Ref<Array<HTMLElement>> = ref([]);

const { data: blogPost } = await useAsyncData("blogpost" + props.slug, () =>
  queryContent("blog")
    .where({ slug: { $eq: props.slug } })
    .findOne(),
);

const tocLinks = computed(() => blogPost?.value?.body?.toc?.links ?? []);

const onClick = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    router.push({ hash: `#${id}` });
    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

const tocVisibility = ref(true);

watchDebounced(
  () => props.activeTocId,

  (newActiveTocId) => {
    const h2Link = tocLinksH2.value.find(
      (el: HTMLElement) => el.id === `toc-${newActiveTocId}`,
    );

    const h3Link = tocLinksH3.value.find(
      (el: HTMLElement) => el.id === `toc-${newActiveTocId}`,
    );

    if (h2Link) {
      sliderHeight.value = h2Link.offsetHeight;

      sliderTop.value = h2Link.offsetTop - 40;
    } else if (h3Link) {
      sliderHeight.value = h3Link.offsetHeight;

      sliderTop.value = h3Link.offsetTop - 40;
    }
  },

  { debounce: 200, immediate: true },
);
</script>

<template>
  <div class="overflow-auto table-of-content">
    <button
      class="flex items-center gap-1.5 lg:cursor-text lg:select-text w-full group border-t border-t-slate-100/30 border-b border-b-slate-100/30 py-2"
      tabindex="-1"
      @click="tocVisibility = !tocVisibility"
    >
      <span class="font-semibold text-sm/6 truncate">Table of Contents</span
      ><span
        class="i-ph-caret-down lg:!hidden ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5 w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 -rotate-90"
      ></span>
    </button>

    <nav class="mt-4 flex" :class="[{ hidden: tocVisibility }]">
      <div class="relative w-2 overflow-hidden rounded bg-secondary">
        <div class="bg-slate-200 w-0.5 h-full">&nbsp;</div>
        <div
          class="absolute left-0 w-full rounded bg-green-500 transition-all duration-200"
          :style="{ height: `${sliderHeight}px`, top: `${sliderTop}px` }"
        ></div>
      </div>
      <ul class="ml-0 pl-4">
        <li
          v-for="{ id, text, children } in tocLinks"
          :id="`toc-${id}`"
          :key="id"
          ref="tocLinksH2"
          class="mb-2 ml-0 cursor-pointer list-none text-sm dark:text-white text-black last:mb-0"
          :class="{
            'text-slate-900 dark:text-white font-bold': id === activeTocId,
          }"
          @click="onClick(id)"
        >
          {{ text }}
          <ul v-if="children" class="my-2 ml-3">
            <li
              v-for="{ id: childId, text: childText } in children"
              :id="`toc-${childId}`"
              :key="childId"
              ref="tocLinksH3"
              class="mb-2 ml-0 cursor-pointer list-none text-xs last:mb-0"
              :class="{ 'font-bold dark:text-white': childId === activeTocId }"
              @click.stop="onClick(childId)"
            >
              {{ childText }}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
