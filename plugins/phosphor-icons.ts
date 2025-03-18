import Vue from "vue";
import * as Phosphor from "@phosphor-icons/vue";

// Register each Phosphor icon as a global component
Object.entries(Phosphor).forEach(([key, component]) => {
  Vue.component(key, component);
});
