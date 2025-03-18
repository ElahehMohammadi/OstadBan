<script setup lang="ts">
import type { PropType } from "vue";
import type { CollapsableListItem } from "~/types/baseComponentTypes";
import CollapsableItem from "~/components/Common/CollapableList/CollapsableItem.vue";

// Props
defineProps({
  items: {
    type: Array as PropType<CollapsableListItem[]>,
    default: () => [
      {
        icon: "fill/alert",
        title: "آیتم اصلی",
        to: "",
        linkTarget: "",
        active: false,
        subItems: [],
      },
    ],
    required: true,
  },
});
</script>

<template>
  <CollapsableItem v-for="(item, index) in items" :key="index" :item="item">
    <img
      v-if="item.image"
      :src="item.image"
      class="item-image"
      :alt="item.title"
    />
    <component
      v-else-if="item.icon"
      :is="item.icon"
      class="item-icon"
      weight="filled"
    />
  </CollapsableItem>
</template>
