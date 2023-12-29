<template>
  <div class="container event-page pb-10">
    <!-- <OgImageStatic component="OgImageGeneric" /> -->
    <EventsListing />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Events participation",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "A summary of all the events I participated throught recent years",
    },
    { hid: "og:type", property: "og:type", content: "page" },
    {
      hid: "og:title",
      property: "og:title",
      content: "Events | Sandeep Ramgolam",
    },
    {
      hid: "og:description",
      property: "og:description",
      content: "A summary of all the events I participated throught recent years",
    },
    {
      hid: "og:url",
      property: "og:url",
    },
  ],
});
</script>
