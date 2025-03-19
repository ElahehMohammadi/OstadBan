<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  title: {
    type: String as PropType<string>,
    default: "",
    required: true,
  },

  icon: {
    type: String as PropType<string>,
    default: "",
  },

  iconSize: {
    type: [Number, String] as PropType<number | string>,
    default: null,
  },

  iconColor: {
    type: String as PropType<string>,
    default: null,
  },

  to: {
    type: String as PropType<string>,
    default: undefined,
  },

  linkTarget: {
    type: String as PropType<"_self" | "_blank">,
    default: "_self",
  },

  active: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});
</script>

<template>
  <BButton class="menu-list-item" :class="{ active: active }">
    <nuxt-link
      v-if="to"
      :to="to"
      class="link-item text-decoration-none stretched-link"
      :target="linkTarget || '_self'"
    >
      <component
        v-if="icon"
        :is="icon"
        :class="Number(iconSize)"
        :color="`$${iconColor}`"
      />

      <span class="list-item-text">{{ title }}</span>
    </nuxt-link>

    <template v-else>
      <component
        v-if="icon"
        :is="icon"
        :class="iconSize"
        :color="`$${iconColor}`"
      />

      <span class="list-item-text">{{ title }}</span>
    </template>
  </BButton>
</template>

<style scoped lang="scss">
.menu-list-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 6px 16px;
  border: none;
  box-shadow: none;
  position: relative;
  background-color: $white;
  color: $secondary !important;
  border-radius: 0;

  &:hover {
    background-color: $gray-1;
  }

  &:focus,
  &:active {
    background-color: $gray-2;
  }

  &.active {
    background-color: $gray-2;
  }

  .list-item-text {
    font-size: $font-14;
    font-weight: $font-weight-medium;
    margin-right: 12px;
    line-height: 2;
    @include line-clamp(2);
  }
}

.link-item {
  display: inherit;
  color: inherit;
  align-items: inherit;
}
</style>
