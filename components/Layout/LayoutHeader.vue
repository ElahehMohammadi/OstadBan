<script setup lang="ts">
import type { ColorVariant } from "bootstrap-vue-next";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "nuxt/app";
import { useUserAuth } from "~/composables/auth/useUserAuth";
import { useDevice } from "@/.nuxt/imports";

// State
const isLoggedIn = true;
const isSearchMenuOpen = ref(false);
const sidebar = ref();
const isSticky = ref(false);
const route = useRoute();

// composables
const { isDesktop, isMobile, isTablet, isMobileOrTablet } = useDevice();

// hooks
onMounted(() => {
  checkWindowScroll();
  document.addEventListener("scroll", checkWindowScroll);
});

onBeforeUnmount(() => {
  document.removeEventListener("scroll", checkWindowScroll);
});

// Methods
const toggleSearchMenu = () => {
  isSearchMenuOpen.value = !isSearchMenuOpen.value;
};

const closeSearchMenu = () => {
  isSearchMenuOpen.value = false;
};

const openSidebar = () => {
  sidebar.value.show();
};

const checkWindowScroll = () => {
  isSticky.value = window.scrollY > 19;
};

// Watch
watch(
  () => isSearchMenuOpen.value,
  (newVal) => {
    if (newVal)
      setTimeout(() => {
        document.getElementById("desktop-search-input")?.focus();
      }, 100);
  },
);

watch(
  () => route.query,
  () => {
    isSearchMenuOpen.value = false;
  },
);
</script>

<template>
  <header :class="['header', { 'sticky-style': isSticky }]">
    <BContainer class="d-flex align-items-center justify-content-center px-0">
      <!-------- DESKTOP -------->
      <div
        v-if="isDesktop"
        class="d-none d-lg-flex align-items-center justify-content-between position-relative w-100"
      >
        <!-- Right -->
        <div class="d-flex align-items-center justify-content-center">
          <LayoutHeaderLogo />
        </div>

        <!-- Center -->
        <div class="d-flex align-items-center justify-content-center">
          <navigationItemsGroup @toggle="closeSearchMenu" />
        </div>

        <!-- Left -->
        <div class="d-flex align-items-center justify-content-center">
          <!-- Search Button -->
          <ButtonIcon
            v-b-tooltip.hover.bottom="'جستجو'"
            class="ms-3"
            id="header-search-desktop"
            variant="tertiary"
            size="md"
            icon="PhMagnifyingGlass"
            @click="toggleSearchMenu"
          />

          <ClientOnly>
            <template #fallback>
              <!-- this will be rendered on server side -->
              <CommonLoadingSkeleton height="30px" width="100px" />
            </template>

            <div class="d-flex align-items-center justify-content-center">
              <!-- After Login -->
              <LayoutHeaderLoggedInUserDropdown v-if="isLoggedIn" />

              <!-- Before Login -->
              <LayoutHeaderLogInButton v-else />
            </div>
          </ClientOnly>
        </div>
      </div>

      <!-------- TABLET -------->
      <div
        v-if="isTablet"
        class="d-none d-sm-flex d-lg-none align-items-center justify-content-between position-relative w-100"
      >
        <!-- Right -->
        <div class="d-flex align-items-center justify-content-center">
          <ClientOnly>
            <template #fallback>
              <ButtonIcon
                variant="tertiary"
                size="md"
                icon="PhList"
                disabled
                loading
              />
            </template>

            <ButtonIcon
              variant="tertiary"
              size="md"
              icon="PhList"
              @click="openSidebar"
            />
          </ClientOnly>
        </div>

        <!-- Center -->
        <LayoutHeaderLogo />

        <!-- Left -->
        <div class="d-flex align-items-center justify-content-center">
          <!-- Search Button -->
          <ButtonIcon
            v-b-tooltip.hover.bottom="'جستجو'"
            class="ms-3"
            id="header-search-tablet"
            variant="tertiary"
            size="md"
            icon="PhMagnifyingGlass"
            @click="toggleSearchMenu"
          />

          <!-- After Login -->
          <ClientOnly>
            <template #fallback>
              <!-- this will be rendered on server side -->
              <CommonLoadingSkeleton height="30px" width="100px" />
            </template>
            <LazyLayoutHeaderLoggedInUserDropdown v-if="isLoggedIn" />

            <!-- Before Login -->
            <LazyLayoutHeaderLogInButton v-else />
          </ClientOnly>
        </div>
      </div>

      <!-------- MOBILE -------->
      <div
        v-if="isMobile"
        class="d-flex d-sm-none align-items-center justify-content-between position-relative w-100"
      >
        <!-- Right -->
        <div class="d-flex align-items-center justify-content-center">
          <ClientOnly>
            <template #fallback>
              <ButtonIcon
                variant="tertiary"
                size="md"
                icon="PhList"
                disabled
                loading
              />
            </template>

            <ButtonIcon
              variant="tertiary"
              size="md"
              icon="PhList"
              @click="openSidebar"
            />
          </ClientOnly>
        </div>

        <!-- Center -->
        <LayoutHeaderLogo />

        <!-- Left -->
        <div class="d-flex align-items-center justify-content-center">
          <!-- Search Button -->
          <ButtonIcon
            v-b-tooltip.hover.bottom="'جستجو'"
            id="header-search-mobile"
            variant="tertiary"
            size="md"
            icon="PhMagnifyingGlass"
            @click="toggleSearchMenu"
          />
        </div>
      </div>
    </BContainer>
  </header>

  <BCollapse v-model="isSearchMenuOpen" class="search-menu-container">
    <LayoutHeaderSearch :visible="isSearchMenuOpen" @hide="closeSearchMenu" />
  </BCollapse>

  <ClientOnly>
    <LazyLayoutSidebar v-if="isMobileOrTablet" ref="sidebar" />
  </ClientOnly>
</template>

<style lang="scss">
.header {
  width: 100%;
  height: 77px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;

  &.sticky-style {
    // stylelint-disable-next-line
    backdrop-filter: blur(12px);
    background-color: rgba($white, 80%);
    border-bottom: 2px solid $gray-2;
  }

  @include only-desktop-rule {
    margin-top: 20px;
  }
}

.search-menu-container {
  position: fixed;
  width: 100%;
  top: 77px;
  left: 0;
  z-index: 98;

  @include only-mobile-rule {
    max-height: calc(100vh - 77px);
  }
}
</style>
