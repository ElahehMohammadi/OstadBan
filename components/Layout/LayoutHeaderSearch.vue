<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { PropType } from "vue";
import { useRouter } from "nuxt/app";
import useDebounce from "~/composables/general/useDebounce";
import { useDevice } from "@/.nuxt/imports";

const { isDesktop } = useDevice();
const router = useRouter();

const props = defineProps({
  visible: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

// State
const searchQuery = ref("");

const loading = ref(false);

const searchResults = ref<any[]>([]);

const searchItems = [
  {
    title: "Learn Vue.js Basics",
    to: "/articles/vue-basics",
  },
  {
    title: "Understanding Vue Router",
    to: "/articles/vue-router",
  },
  {
    title: "Advanced Vue.js Techniques",
    to: "/articles/advanced-vue",
  },
  {
    title: "Building a Vue.js App",
    to: "/articles/building-vue-app",
  },
  {
    title: "Vue.js Best Practices",
    to: "/articles/vue-best-practices",
  },
];

// Computed
const hasResult = computed(() => searchResults.value.length > 0);

const visibleShowMoreBtn = computed(
  () => hasResult.value && searchResults.value?.length > 7,
);

// Methods
const searchTheQuery = async () => {
  loading.value = true;
  try {
    console.log("Search the query");
  } catch (err: unknown) {
  } finally {
    loading.value = false;
  }
};

// create debounce method
const searchWithDebounce = useDebounce(300, searchTheQuery);

const goToSearchPage = () => {
  if (!searchQuery.value) return;

  const routeData = router.resolve({
    path: "/search",
    query: { q: searchQuery.value },
  });

  // Open the new tab with the full URL
  window.open(routeData.href, "_blank");
};

watch(
  () => searchQuery.value,
  (newVal) => {
    if (newVal && newVal.length > 1) searchWithDebounce();
  },
);
const closeIconSize = computed(() => (isDesktop ? 24 : 20));
// Emits
defineEmits(["hide"]);
</script>

<template>
  <div class="search-component">
    <BContainer>
      <button class="search-component-close-btn" @click="$emit('hide')">
        <NuxtIcon name="outline/x" class="close-icon" />
      </button>

      <BRow class="justify-content-center">
        <BCol class="col-12 col-lg-10">
          <BRow class="searchbar-container">
            <BaseSearch
              v-model="searchQuery"
              placeholder="جستجو کنید ..."
              @search="goToSearchPage"
            />
          </BRow>

          <BRow v-if="!loading" class="results-container">
            <template>
              <template v-if="hasResult">
                <BCol
                  v-for="(result, index) in searchItems"
                  :key="index"
                  class="col-12 px-0"
                >
                  <CommonMenuListItem
                    :title="result.title"
                    icon="outline/line"
                    icon-size="24"
                    icon-color="primary-blue"
                    :to="result.to"
                    link-target="_blank"
                  />
                </BCol>

                <BCol
                  v-if="visibleShowMoreBtn"
                  cols="12"
                  class="d-flex justify-content-center mt-4"
                >
                  <BaseButton
                    variant="tertiary"
                    size="md"
                    @on-click="goToSearchPage"
                  >
                    <span>مشاهده نتایج بیشتر</span>
                    <template #leftIcon>
                      <NuxtIcon
                        name="outline/caret-left"
                        class="me-2 font-18"
                      />
                    </template>
                  </BaseButton>
                </BCol>
              </template>

              <BRow v-else>
                <h4 class="text-center mt-4">
                  متاسفانه نتیجه ای با مشخصات درخواستی شما پیدا نشد!
                </h4>
              </BRow>
            </template>
          </BRow>

          <BRow v-else>
            <BCol cols="12" class="d-flex justify-content-center">
              <BSpinner variant="secondary" />
            </BCol>
          </BRow>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<style scoped lang="scss">
.search-component {
  width: 100%;
  height: 580px;
  background-color: $white;
  padding: 50px 20px;
  position: relative;
  box-shadow: 0 15px 25px 0 rgba($secondary, 8%);

  @include only-tablet-rule {
    padding: 88px 20px 40px;
  }

  @include md-rule {
    padding: 80px 16px 0;
    height: calc(100vh - 77px);
    overflow: hidden;
  }

  .search-component-close-btn {
    background-color: transparent;
    border: none;
    padding: 10px;
    position: absolute;
    top: 24px;
    right: 32px;

    .close-icon {
      font-size: $font-24;
    }

    @include md-rule {
      padding: 8px;
      top: 16px;
      right: 16px;

      .close-icon {
        font-size: $font-20;
      }
    }
  }

  .searchbar-container {
    margin-top: 30px;

    @include md-rule {
      margin-top: 0;
    }
  }

  .results-container {
    @include md-rule {
      height: calc(100vh - 235px);
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .result-items-separator {
      display: block;
      width: 100%;
      height: 2px;
      background-color: $gray-2;
      margin: 20px 0;
    }
  }
}
</style>
