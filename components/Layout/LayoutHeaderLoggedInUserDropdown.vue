<script setup lang="ts">
import { ref, computed, type Ref } from "vue";
import { useModal } from "bootstrap-vue-next";
import { useUserAuth } from "~/composables/auth/useUserAuth";
import type { CollapsableListItem } from "~/types/baseComponentTypes";

// composables
const loggedInUserData = computed(() => {
  return {
    username: "john_doe",
    avatar: "https://example.com/avatars/john_doe.png",
  };
});
const { show: showLogoutModal } = useModal("logout-confirmation-modal");

// state
const visible = ref(false);

const handleItemsClick = (item: CollapsableListItem) => {
  if (item.title === "خروج از حساب") showLogoutModal();
};

const sidebarUserItems = computed(() => {
  return [
    {
      title: "Profile",
      icon: "user",
      to: "/profile",
    },
    {
      title: "Settings",
      icon: "cog",
      to: "/settings",
    },
    {
      title: "Messages",
      icon: "envelope",
      to: "/messages",
    },
    {
      title: "Notifications",
      icon: "bell",
      to: "/notifications",
    },
    {
      title: "Log Out",
      icon: "sign-out-alt",
      to: "/logout",
    },
  ];
});
</script>

<template>
  <BaseDropdown
    v-model="visible"
    :menu-width="176"
    :menu-offset="15"
    menu-position="end"
  >
    <template #button-content>
      <BaseAvatar
        :src="loggedInUserData?.avatar"
        :alt="loggedInUserData?.username"
        size="37"
        radius="8"
      />
    </template>

    <div class="list-container">
      <CommonMenuListItem
        v-for="(item, index) in sidebarUserItems"
        :key="index"
        :title="item.title"
        :icon="item.icon"
        :to="item.to"
        icon-size="18"
        link-target="_blank"
        @click="handleItemsClick(item)"
      />
    </div>
  </BaseDropdown>
</template>

<style lang="scss" scoped>
.list-container {
  padding: 8px 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 16px 0 rgba($secondary, 16%);
}
</style>
