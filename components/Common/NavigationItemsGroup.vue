<script setup lang="ts">
import {computed} from 'vue';
import {useRoute} from 'nuxt/app';
import {routeActiveItem} from '~/utils/CommonUtils';

// State
const route = useRoute();

// Computed
const routeName = computed(() => (route.name as string) || '');

const emit = defineEmits(['toggle']);
</script>

<template>
  <div class="navigation-items-container">
    <NavigationItem
        title="جستجوی استاد"
        to="/search-teacher"
        :active="routeActiveItem(routeName, 'search-teacher')"
    />
    <NavigationItem
        title="جستجوی دوره‌ها"
        to="/search-courses"
        :active="routeActiveItem(routeName, 'search-courses')"
    />
    <NavigationItem
        title="ثبت دیدگاه"
        to="/add-comment"
        :active="routeActiveItem(routeName, 'add-comment')"
    />
    <NavigationItem
        title="نحوه استفاده"
        to="/how-it-works"
        :active="routeActiveItem(routeName, 'how-it-works')"
    />
  </div>
</template>

<style scoped lang="scss">
.navigation-items-container {
  display: flex;
  align-items: center;
  justify-content: center;

  .navigation-item-container {
    &:not(:last-child) {
      margin-left: 12px;
    }
  }
}
</style>
