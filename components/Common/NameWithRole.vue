<script setup lang="ts">
import type { PropType } from "vue";
import { computed } from "vue";
import type { AuthorDataType } from "~/types/commonTypes";

// Props
const props = defineProps({
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },

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

  showSpecialty: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  to: {
    type: String as PropType<string | null | undefined>,
    default: null,
  },

  linkTarget: {
    type: String as PropType<"_self" | "_blank">,
    default: "_self",
  },

  textPosition: {
    type: String as PropType<"right" | "center" | "left">,
    default: "right",
  },
});

// const textWithTooltipWidth = ref('calc(100% - 20px)');

// Computed
const userName = computed(() => props.user?.full_name || props.user?.username);

const tooltipId = computed(() => {
  // change '.' to '-' to prevent error for valid id
  if (!props.user?.username?.includes(".")) return props.user?.username;
  else return props.user?.username?.replaceAll(/\./gi, "-");
});

const hasTeacherRole = computed(() => props.user?.role === "teacher");

const canShowSpecialty = computed(
  () => props.user?.specialty && props.showSpecialty,
);

const textAlignClass = computed(() => {
  switch (props.textPosition) {
    case "right":
      return "justify-content-start";

    case "center":
      return "justify-content-center";

    case "left":
      return "justify-content-end";

    default:
      return "justify-content-start";
  }
});
</script>

<template>
  <div class="name-with-role" :class="`${size}-size`">
    <div class="d-flex align-items-center" :class="textAlignClass">
      <div class="text-with-tooltip-container">
        <!--        <TextWithTooltip :id="`user-${tooltipId}`" element-type="span">-->
        <nuxt-link
          v-if="to"
          :to="to"
          :target="linkTarget"
          class="name-with-role-link"
        >
          <span class="username">{{ userName }}</span>
        </nuxt-link>

        <span v-else class="username">{{ userName }}</span>

        <!--          <template #tooltipTitle>{{ userName }}</template>-->
        <!--        </TextWithTooltip>-->
      </div>

      <PhSealCheck
        v-if="hasTeacherRole"
        :id="`${tooltipId}-verification-icon`"
        :size="32"
        color="#4d799a"
        weight="fill"
        class="role-icon"
      />
    </div>

    <span v-if="canShowSpecialty" class="specialty">{{ user.specialty }}</span>
  </div>
</template>

<style scoped lang="scss">
.name-with-role {
  width: 100%;

  .text-with-tooltip-container {
    line-height: 1;

    // width: v-bind('textWithTooltipWidth');
  }

  .name-with-role-link {
    @include nuxt-link-style;
  }

  .username {
    color: $secondary;
    font-weight: $font-weight-bold;
    @include line-clamp(1);
  }

  .role-icon {
    color: $primary-blue;
    margin-right: 4px;
  }

  .specialty {
    font-weight: $font-weight-demibold;
    color: $gray-6;
    margin-top: 3px;
  }

  /* Sizes */
  &.sm-size {
    .username {
      font-size: $font-12;
    }

    .role-icon {
      font-size: $font-16;
    }

    .specialty {
      font-size: $font-10;
    }
  }

  &.md-size {
    .username {
      font-size: $font-14;
    }

    .role-icon {
      font-size: $font-18;
    }

    .specialty {
      font-size: $font-12;
    }
  }

  &.lg-size {
    .username {
      font-size: $font-16;
    }

    .role-icon {
      font-size: $font-20;
    }

    .specialty {
      font-size: $font-14;
    }
  }
}
</style>
