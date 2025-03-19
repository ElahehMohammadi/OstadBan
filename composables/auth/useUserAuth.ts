import { computed, type ComputedRef } from "vue";
import { reloadNuxtApp, useCookie } from "nuxt/app";
// import { useAuth } from "@/.nuxt/imports";

export const useUserAuth = () => {
  const data1 = computed(() => {
    return {
      status: "authenticated",
      data: {
        username: "john_doe",
        avatar: "https://example.com/avatars/john_doe.png",
        credit_exchange_rate: 1000,
      },
    };
  });

  const isLoggedIn: ComputedRef<boolean> = computed(
    () => data1.value.status === "authenticated",
  );

  const isLoggedOut: ComputedRef<boolean> = computed(
    () => data1.value.status === "unauthenticated",
  );

  const isAuthLoading: ComputedRef<boolean> = computed(
    () => data1.value.status === "loading",
  );

  const creditExchangeRate: ComputedRef<number> = computed(
    () => data1.value?.data.credit_exchange_rate || 10000,
  );

  const logOut = () => {
    localStorage.removeItem("auth._token.phone");
    localStorage.removeItem("auth._token.email");

    const phoneStrategyToken = useCookie("auth._token.phone");
    const emailStrategyToken = useCookie("auth._token.email");

    phoneStrategyToken.value = null;
    emailStrategyToken.value = null;

    // signOut().then(() => {});

    setTimeout(() => {
      reloadNuxtApp();
    }, 100);
  };

  return {
    isLoggedIn,
    isLoggedOut,
    isAuthLoading,
    loggedInUserData: data1.value.data,
    creditExchangeRate,
    logOut,
  };
};
