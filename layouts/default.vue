<script setup>
import {useLoadingIndicator} from '@/.nuxt/imports';
// import {useUserAuth} from '~/composables/auth/useUserAuth';

const {isLoading} = useLoadingIndicator();
// const {isLoggedIn} = useUserAuth();
</script>

<template>
  <div>
    <LayoutHeader />

    <slot />

    <BaseLoading v-if="isLoading" />

    <LayoutFooter />

    <!-- Logout Confirmation Modal -->
<!--    <LazyLogoutModal v-if="true" />-->
  </div>
</template>
