<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import avatarFallback from "assets/imgs/avatar-fallback.svg";

// Props
const props = defineProps({
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 30,
  },

  radius: {
    type: [String, Number] as PropType<string | number | null>,
    default: 10,
  },

  src: {
    type: String as PropType<string | null>,
    default: undefined,
  },

  alt: {
    type: String as PropType<string>,
    default: null,
  },

  to: {
    type: String as PropType<string | null | undefined>,
    default: undefined,
  },

  linkTarget: {
    type: String as PropType<"_self" | "_blank">,
    default: "_self",
  },
});

// State
const avatarNotLoaded = ref(false);

// Computed
const hasAvatar = computed(() => (avatarNotLoaded.value ? false : !!props.src));

const borderRadius = computed(() => `${props.radius}px`);

// Methods
const onLoadError = () => (avatarNotLoaded.value = true);
</script>

<template>
  <div class="base-avatar">
    <nuxt-link v-if="to" class="stretched-link" :to="to" :target="linkTarget" />

    <BImg
      v-if="hasAvatar"
      class="base-avatar-image"
      :alt="alt"
      src="assets/imgs/avatar-fallback.svg"
      :width="size"
      :height="size"
      :lazy="false"
      @error="onLoadError"
    ></BImg>

    <BImg
      v-else
      :alt="alt"
      :src="avatarFallback"
      :width="size"
      :height="size"
      :lazy="false"
    ></BImg>
  </div>
</template>

<style
  scoped
  lang="scss"
  src="assets/styles/components/Base/BaseAvatar.scss"
></style>

<style lang="scss" scoped>
.base-avatar {
  border-radius: v-bind("borderRadius");
}
</style>
