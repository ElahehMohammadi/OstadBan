<script setup lang="ts">
import type {PropType} from 'vue';
import {computed, ref, watch} from 'vue';
import type {ColorVariant} from 'bootstrap-vue-next';
import type {CollapsableListItem} from '~/types/BaseComponentTypes';

// Props
const props = defineProps({
  title: {
    type: String as PropType<string>,
    default: '',
    required: true
  },

  to: {
    type: String as PropType<string>,
    default: null
  },

  active: {
    type: Boolean as PropType<boolean>,
    default: false
  }
});

// State
const visible = ref(false);

// Computed
const toggleBtnClass = computed(() => `navigation-item ${props.active ? 'active' : visible.value ? 'visible' : ''}`);

const emit = defineEmits(['opened']);
watch(
    () => visible.value,
    newVal => {
      if (newVal) emit('opened');
    }
);
</script>

<template>
  <div class="navigation-item-container">
    <ClientOnly>
      <template #fallback>
        <BButton :variant="'transparent' as ColorVariant" :class="toggleBtnClass">{{ title }}</BButton>
      </template>

      <BaseDropdown v-model="visible" :menu-width="248" :menu-offset="30" :toggle-btn-class="toggleBtnClass">
        <template #button-content>
          <NuxtLink v-if="to" :to="to" class="stretched-link"></NuxtLink>

          <span class="item-text">{{ title }}</span>
        </template>
      </BaseDropdown>
    </ClientOnly>

    <span v-if="active" class="active-status"></span>
  </div>
</template>

<style lang="scss" src="assets/styles/components/Common/NavigationItem.scss"></style>
