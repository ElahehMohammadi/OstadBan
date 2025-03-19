<script setup lang="ts">
import {computed, watch, type PropType, ref} from 'vue';
import type {ColorVariant} from 'bootstrap-vue-next';

// Props
const props = defineProps({
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: false
  },

  menuWidth: {
    type: Number as PropType<number>,
    default: 176
  },

  menuOffset: {
    type: Number as PropType<number>,
    default: 36
  },

  menuPosition: {
    type: String as PropType<'start' | 'center' | 'end'>,
    default: 'center'
  },

  toggleBtnClass: {
    type: String as PropType<string>,
    default: ''
  }
});

// State
const visible = ref(false);

// Computed
const dropdownMenuWidth = computed(() => `${props.menuWidth}px`);

const choosePosition = (pos: string) => pos === props.menuPosition;

// Watchers
watch(
    () => props.modelValue,
    newVal => {
      visible.value = newVal;
    },
    {immediate: true}
);

watch(
    () => visible.value,
    newVal => {
      emit('update:modelValue', newVal);
    }
);

// Emits
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <BDropdown
      v-model="visible"
      :offset="menuOffset"
      :variant="`transparent` as ColorVariant"
      :start="choosePosition('start')"
      :center="choosePosition('center')"
      :end="choosePosition('end')"
      :toggle-class="toggleBtnClass"
      no-caret
  >
    <template #button-content>
      <slot name="button-content"></slot>
    </template>

    <template #default>
      <slot />
    </template>
  </BDropdown>
</template>

<style lang="scss">
.dropdown-toggle {
  color: $secondary;
  padding: 0;
  outline: none;
  border: none;
}

.dropdown-menu {
  padding: 0;
  border: none;
  background-color: $white;
  color: $secondary;
  border-radius: 16px;
  box-shadow: 0 4px 16px 0 rgba($secondary, 16%);
  min-width: v-bind('dropdownMenuWidth');
}
</style>
