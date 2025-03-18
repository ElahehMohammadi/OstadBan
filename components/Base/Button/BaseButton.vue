<script setup lang="ts">
import type {ColorVariant, ButtonType, Size} from 'bootstrap-vue-next';
import {computed, type PropType, useSlots} from 'vue';

// Props
const props = defineProps({
  variant: {
    type: String as PropType<ColorVariant>,
    default: 'primary',
    validator(value: string) {
      return ['primary', 'secondary', 'tertiary', 'ghost', 'secondary-light', 'light'].includes(value);
    }
  },

  size: {
    type: String as PropType<Size | 'xl'>,
    default: 'lg',
    validator(value: string) {
      return ['sm', 'md', 'lg', 'xl'].includes(value);
    }
  },

  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },

  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },

  block: {
    type: Boolean as PropType<boolean>,
    default: false
  },

  to: {
    type: String as PropType<string>,
    default: null
  },

  linkTarget: {
    type: String as PropType<'_self' | '_blank'>,
    default: '_self'
  },

  buttonType: {
    type: String as PropType<ButtonType>,
    default: 'button',
    validator(value: string) {
      return ['button', 'submit', 'reset'].includes(value);
    }
  }
});

const slots = useSlots();

// Computed
const isLink = computed(() => props.to && !props.disabled);

const classGenerator = computed(() => {
  let finalClass = '';

  if (props.loading) finalClass += 'loading ';
  if (slots.leftIcon) finalClass += 'left-icon ';
  if (slots.rightIcon) finalClass += 'right-icon ';
  if (props.block) finalClass += 'w-100 ';

  return finalClass;
});

// Emits
defineEmits(['onClick']);
</script>

<template>
  <BButton
      class="base-button"
      :class="classGenerator"
      :variant="variant"
      :size="size as Size"
      :type="buttonType"
      :loading="loading"
      :disabled="disabled"
      @click="$emit('onClick', $event)"
  >
    <template #loading>
      <BSpinner small></BSpinner>
    </template>

    <template #default>
      <nuxt-link
          v-if="isLink"
          :to="to"
          class="text-decoration-none stretched-link button-link-text"
          :target="linkTarget"
      >
        <slot name="rightIcon" />
        <slot>عنوان لینک</slot>
        <slot name="leftIcon" />
      </nuxt-link>

      <template v-else>
        <slot name="rightIcon" />
        <slot>عنوان دکمه</slot>
        <slot name="leftIcon" />
      </template>
    </template>
  </BButton>
</template>

<style lang="scss" scoped src="assets/styles/components/Base/Button/BaseButton.scss"></style>
