<script setup lang="ts">
  import {ref, computed, type Ref} from 'vue';
  import {useModal} from 'bootstrap-vue-next';
  import {useUserAuth} from '~/composables/auth/useUserAuth';
  import {SIDEBAR_USER_ITEMS} from '~/constants/common/sidebarMenuItemsConstant';
  import type {CollapsableListItem} from '~/types/BaseComponentTypes';
  import {ENTITY_ROUTES} from '~/constants/common/entityConstants';

  // composables
  const {loggedInUserData} = useUserAuth();
  const {show: showLogoutModal} = useModal('logout-confirmation-modal');

  // state
  const visible = ref(false);

  const handleItemsClick = (item: CollapsableListItem) => {
    if (item.title === 'خروج از حساب') showLogoutModal();
  };

  const sidebarUserItems: Ref<CollapsableListItem[]> = computed(() => {
    return SIDEBAR_USER_ITEMS.map((item: CollapsableListItem) => {
      if (item.title === 'پروفایل من')
        return {
          ...item,
          to: ENTITY_ROUTES.profilePage(loggedInUserData.value?.username)
        };
      else return item;
    });
  });
</script>

<template>
  <BaseDropdown v-model="visible" :menu-width="176" :menu-offset="15" menu-position="end">
    <template #button-content>
      <BaseAvatar :src="loggedInUserData?.avatar" :alt="loggedInUserData?.username" size="37" radius="8" />
    </template>

    <div class="list-container">
      <MenuListItem
        v-for="(item, index) in sidebarUserItems"
        :key="index"
        :title="item.title"
        :icon="item.icon"
        :to="item.to"
        icon-class="font-18"
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
