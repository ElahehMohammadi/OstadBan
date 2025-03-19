<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "nuxt/app";
import { useModal } from "bootstrap-vue-next";
import { useUserAuth } from "~/composables/auth/useUserAuth";
import type { CollapsableListItem } from "~/types/baseComponentTypes";
import type { AuthorDataType } from "~/types/commonTypes";

// State
const route = useRoute();
const visible = ref(false);

// composables
const { isLoggedIn, loggedInUserData } = useUserAuth();
const { show: showLogoutModal } = useModal("logout-confirmation-modal");

// Computed
const routeName = computed(() => (route.name as string) || "");
const userData = computed(() => {
  if (isLoggedIn.value) return loggedInUserData;
  else
    return {
      username: "",
      full_name: "کاربر مهمان",
      avatar: "",
      specialty: "",
      role: "",
    };
});

const topicGeneralItems = computed(() => {
  return undefined;
});

const sidebarUserItems = computed(() => {
  return [{} as CollapsableListItem];
});

// TODO: add logic
// const notificationsCount = computed(() => 34);

// Methods
const show = () => {
  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

const handleItemsClick = (item: CollapsableListItem) => {
  if (item.title === "خروج از حساب") showLogoutModal();
};

defineExpose({
  show,
  hide,
});

// Watch
watch(
  () => route.query,
  () => {
    visible.value = false;
  },
);
</script>

<template>
  <BOffcanvas v-model="visible" placement="end" no-header>
    <div class="layout-sidebar">
      <!-- Header -->
      <div class="sidebar-header">
        <AvatarWithName
          :user="userData as AuthorDataType"
          avatar-size="30"
          avatar-radius="8"
        />

        <!-- TODO: replace with iconToggleButton -->
        <button class="sidebar-close-btn" @click="hide">
          <NuxtIcon name="outline/x" class="font-22" />
        </button>
      </div>

      <div class="h-100 d-flex flex-column justify-content-between">
        <!-- Body -->
        <div class="sidebar-body">
          <CollapsableList :items="topicGeneralItems" />

          <template v-if="isLoggedIn">
            <span class="items-separator-line"></span>
            <CollapsableItem
              v-for="(item, index) in sidebarUserItems"
              :key="index"
              :item="item"
              @click="handleItemsClick(item)"
            />
          </template>
        </div>

        <!-- Footer -->
        <div class="sidebar-footer">
          <template v-if="!isLoggedIn">
            <BaseButton variant="secondary" size="md">
              <NuxtIcon name="outline/sign-in" class="font-18 fw-bold" />
              <span class="font-14 text-bold me-2">ورود | ثبت‌نام</span>
            </BaseButton>
          </template>
        </div>
      </div>
    </div>
  </BOffcanvas>
</template>

<style scoped lang="scss">
.layout-sidebar {
  width: 312px;
  height: 100%;
  background-color: $white;
  display: flex;
  flex-direction: column;
  overflow: auto;

  @include small-scrollbar;

  .sidebar-header {
    width: 100%;
    background-color: $white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 16px;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;

    .sidebar-close-btn {
      background-color: transparent;
      border: none;
      padding: 8px;
    }
  }

  .sidebar-body {
    padding: 0 16px;

    .items-separator-line {
      display: block;
      width: 100%;
      height: 2px;
      background-color: $gray-2;
      margin: 12px 0;
    }
  }

  .sidebar-footer {
    width: 100%;
    background-color: $white;
    display: flex;
    flex-direction: column;
    padding: 20px 16px;
    position: sticky;
    bottom: 0;
    left: 0;
    z-index: 2;
  }
}
</style>

<style lang="scss">
.offcanvas.offcanvas-end {
  width: fit-content;
  border-left: 2px solid $gray-2;

  .offcanvas-body {
    padding: 0;
    position: relative;
  }
}
</style>
