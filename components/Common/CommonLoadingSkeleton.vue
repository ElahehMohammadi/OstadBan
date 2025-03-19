<script setup lang="ts">
import type {ColorVariant} from 'bootstrap-vue-next';
import type {PropType} from 'vue';

defineProps({
  width: {
    type: String as PropType<string>,
    default: '100%'
  },

  height: {
    type: String as PropType<string>,
    default: '100%'
  }
});
</script>

<template>
  <BPlaceholder class="common-skeleton" wrapper-tag="div" :variant="'gray-4' as ColorVariant" animation="wave" />
</template>

<style lang="scss">
.common-skeleton {
  width: v-bind('width');
  height: v-bind('height');
  border-radius: 15px;
}
</style>
