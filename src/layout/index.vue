<template>
  <sider-menu></sider-menu>
  <transition name="fade">
    <div class="wrap-container">
      <app-main />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppMain from "@/layout/components/appMain.vue";
import siderMenu from "./components/siderMenu.vue";
export default defineComponent({
  name: "Layout",
  components: {
    AppMain,
    siderMenu
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
