<script setup lang="ts">
import type { PropType } from "vue";
import type { AuthorDataType } from "~/types/commonTypes";

defineProps({
  user: {
    type: Object as PropType<AuthorDataType>,
    required: true,
    default: () => ({
      username: "",
      full_name: "",
      avatar: "",
      specialty: "",
      role: "",
    }),
  },

  to: {
    type: String as PropType<string | null | undefined>,
    default: undefined,
  },

  avatarSize: {
    type: [String, Number] as PropType<string | number>,
    default: 45,
  },

  avatarRadius: {
    type: [String, Number] as PropType<string | number | null>,
    default: 10,
  },

  showSpecialty: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  nameSize: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },
});
</script>

<template>
  <div class="avatar-with-name">
    <BaseAvatar
      :src="user?.avatar"
      :size="avatarSize"
      :alt="user?.username"
      :radius="avatarRadius"
      :to="to"
      link-target="_blank"
    />
    <NameWithRole
      class="name-container"
      :user="user"
      :to="to"
      :show-specialty="showSpecialty"
      :size="nameSize"
      link-target="_blank"
    />
  </div>
</template>

<style scoped lang="scss">
.avatar-with-name {
  width: fit-content;
  display: flex;
  align-items: center;

  .name-container {
    margin-right: 6px;
  }
}
</style>
