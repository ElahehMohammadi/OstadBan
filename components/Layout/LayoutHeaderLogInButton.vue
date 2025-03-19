<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },

  block: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});
</script>

<template>
  show
  <BaseButton
    class="login-button"
    variant="secondary"
    :size="size"
    :block="block"
  >
    <NuxtIcon name="outline/sign-in" class="fw-bold" />
    <span>ورود | ثبت‌نام</span>
  </BaseButton>
</template>

<style scoped lang="scss">
.login-button {
  .login-icon {
    margin-left: 6px;
  }
}
</style>
