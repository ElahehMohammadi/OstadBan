<script setup lang="ts">
import {computed, type PropType} from 'vue';
import type {ButtonType, ColorVariant, Size} from 'bootstrap-vue-next';

// Props
const props = defineProps({
  icon: {
    type: String as PropType<string>,
    required: true
  },

  variant: {
    type: String as PropType<ColorVariant | 'tertiary'>,
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

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'font-18';

    case 'md':
      return 'font-20';

    case 'lg':
      return 'font-24';

    case 'xl':
      return 'font-32';

    default:
      return 'font-24';
  }
});

// Emits
defineEmits(['click']);
</script>

<template>
  <BaseButton
      class="button-icon"
      :variant="variant"
      :size="size as Size"
      :type="buttonType"
      :to="to"
      :loading="loading"
      :disabled="disabled"
      :link-target="linkTarget"
      @click="$emit('click')"
  >
    <nuxt-icon :name="icon" class="icon line-height-0" :class="iconSize" />
    <!--    <BaseTooltip v-if="id" :target="id" :variant="tooltipVariant" :placement="tooltipPlace">-->
    <!--      {{ tooltipTitle }}-->
    <!--    </BaseTooltip>-->
  </BaseButton>
</template>

<style lang="scss" scoped src="assets/styles/baseComponents/ButtonIcon.scss"></style>
