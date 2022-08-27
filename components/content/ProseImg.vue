<template>
  <figure class="align-items-center d-flex flex-column">
    <img :src="src" :alt="alt" :width="width" :height="height" />
    <figcaption v-if="title" class="mt-2 small text-black-50">{{ title }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
});
</script>
