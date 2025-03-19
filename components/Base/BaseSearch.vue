<script setup lang="ts">
import { type PropType, ref, watch } from "vue";
import type { ColorVariant } from "bootstrap-vue-next";
import ButtonIcon from "~/components/Base/Button/ButtonIcon.vue";

// Props
const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    default: "",
  },

  placeholder: {
    type: String as PropType<string>,
    default: "",
  },

  helperText: {
    type: String as PropType<string>,
    default: "",
  },

  lazy: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  rightIcon: {
    type: String as PropType<string>,
    default: "",
  },

  buttonVariant: {
    type: String as PropType<ColorVariant>,
    default: "secondary",
    validator(value: string) {
      return ["primary", "secondary", "tertiary", "ghost"].includes(value);
    },
  },
});

const localValue = ref("");

const clearInput = () => {
  localValue.value = "";
  emit("clear");
};

// Watch
watch(
  () => props.modelValue,
  (newVal) => {
    localValue.value = newVal;
  },
  { immediate: true },
);

watch(
  () => localValue.value,
  (newVal) => {
    emit("update:modelValue", newVal);
  },
);

// Emits
const emit = defineEmits(["update:modelValue", "search", "clear"]);
</script>

<template>
  <div class="base-search-container">
    <div class="input-container">
      <!-- Remove Icon -->
      <nuxt-icon
        v-if="modelValue"
        name="outline/close-light"
        class="input-remove-icon font-14 line-height-0"
        @click="clearInput"
      />

      <BFormInput
        v-model="localValue"
        id="desktop-search-input"
        class="base-search-input"
        :class="{ clearable: modelValue }"
        :placeholder="placeholder"
        type="search"
        :lazy="lazy"
        @keyup.enter="$emit('search')"
      />

      <!-- Helper Text -->
      <span v-if="helperText" class="search-helper-text">{{ helperText }}</span>
    </div>

    <button-icon
      id="search-btn"
      :variant="buttonVariant"
      size="md"
      tooltip-title="جست‌و‌جو"
      icon="outline/search"
      @click="$emit('search')"
    />
  </div>
</template>

<style
  lang="scss"
  scoped
  src="assets/styles/components/BaseSearch.scss"
></style>
