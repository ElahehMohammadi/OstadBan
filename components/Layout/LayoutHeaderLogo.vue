<script setup lang="ts">
import type { PropType } from "vue";
import Logo from "assets/imgs/logo/logo.svg";

defineProps({
  width: {
    type: [Number, String] as PropType<number | string>,
    default: 87,
  },

  height: {
    type: [Number, String] as PropType<number | string>,
    default: 57,
  },
});
</script>

<template>
  <NuxtLink to="/">
    <BImg alt="Ostad Ban" :src="Logo" :width="width" :height="height" />
  </NuxtLink>
</template>
