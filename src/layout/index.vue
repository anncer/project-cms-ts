<template>
  <menu-aside></menu-aside>
  <transition name="fade">
    <div class="wrap-container">
      <app-main />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppMain from "@/layout/components/appMain.vue";
import MenuAside from "./components/menuAside.vue";
export default defineComponent({
  name: "Layout",
  components: {
    AppMain,
    MenuAside
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
