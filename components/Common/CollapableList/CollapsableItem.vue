<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { PropType } from "vue";
import type { CollapsableListItem } from "~/types/baseComponentTypes";

// Props
const props = defineProps({
  item: {
    type: Object as PropType<CollapsableListItem>,
    default: () => ({
      icon: "fill/alert",
      title: "آیتم اصلی",
      to: "",
      linkTarget: "",
      active: false,
      subItems: [],
    }),
    required: true,
  },
});

// State
const visible = ref(false);
const emit = defineEmits(["click"]);

// Computed
const hasSubItems = computed(
  () => props.item?.subItems && props.item?.subItems?.length > 0,
);

const hasActiveSub = computed(
  () =>
    props.item?.subItems?.some(
      (subItem: CollapsableListItem) => subItem.active,
    ) ?? false,
);

// Methods
const toggleCollapse = () => {
  visible.value = !visible.value;
  emit("click");
};

onMounted(() => {
  // open collapse if item is active
  visible.value = hasActiveSub.value;
});
</script>

<template>
  <BButton
    class="collapsable-item"
    :class="{ active: item.active || hasActiveSub, visible }"
    @click="toggleCollapse"
  >
    <nuxt-link
      v-if="item.to"
      :to="item.to"
      class="link-item text-decoration-none stretched-link"
      :target="item.linkTarget || '_self'"
    >
      <div class="d-flex align-items-center">
        <component
          v-if="item.icon"
          :is="item.icon"
          class="item-icon"
          :size="20"
          :class="item.iconClass"
          :filled="!item.iconClass"
        />

        <span class="item-title">{{ item.title }}</span>
      </div>

      <NuxtIcon
        v-if="hasSubItems"
        class="arrow-icon"
        name="outline/caret-down"
      />
    </nuxt-link>

    <template v-else>
      <div class="d-flex align-items-center">
        <component
          v-if="item.icon"
          :is="item.icon"
          class="item-icon font-20 text-secondary"
          size="20"
          :class="item.iconClass"
          :weight="!item.iconClass ? 'fill' : ''"
        />

        <span class="item-title">{{ item.title }}</span>
      </div>

      <NuxtIcon
        v-if="hasSubItems"
        class="arrow-icon"
        name="outline/caret-down"
      />
    </template>
  </BButton>

  <BCollapse v-if="hasSubItems" v-model="visible">
    <div class="sub-items-container">
      <collapsable-item
        v-for="(subItem, subIndex) in item.subItems"
        :key="'sub-' + (subIndex + 1)"
        :item="subItem"
      />
    </div>
  </BCollapse>
</template>

<style
  lang="scss"
  scoped
  src="assets/styles/components/common/CollapsableItem.scss"
></style>
