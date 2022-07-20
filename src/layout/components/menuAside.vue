<template>
  <div class="menu-aside" :class="{ 'min-menu': !sideBarOpen }">
    <div class="menu-wrapper">
      <!-- <div class="menu-opts" @click="handleCollapse">
        <i v-if="sideBarOpen" class="el-icon-arrow-left"></i>
        <i v-else class="el-icon-arrow-right"></i>
      </div> -->
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          class="menu-content"
          :default-active="activeMenu"
          :collapse="!sideBarOpen"
          :unique-opened="true"
          :collapse-transition="true"
          mode="vertical"
        >
          <sumMenu
            v-for="it in userMenus"
            :key="it.component"
            :item="it"
            v-show="!it.isHidden"
          ></sumMenu>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuAside",
  setup() {
    return {};
  }
});
// import variables from "@/styles/variables.scss";
// import sumMenu from "./subMenu.vue";
// import { mapGetters } from "vuex";
// import routes from "@/router/routers";
// console.log(routes, "routes");
// export default {
//   name: "Sidebar",
//   components: {
//     sumMenu
//   },
//   data() {
//     return {
//       userMenus: [
//         { name: "人员采集信息", path: "/info", compoment: "info", icon: "" }
//       ],
//       activeMenu: null
//     };
//   },
//   computed: {
//     ...mapGetters(["menus", "sideBarOpen"]),
//     showLogo() {
//       return false;
//       // return this.$store.state.settings.sidebarLogo
//     },
//     variables() {
//       return variables;
//     },
//     isCollapse() {
//       return false;
//     }
//   },
//   methods: {
//     handleCollapse() {
//       this.$store.dispatch("setSideBar", !this.sideBarOpen);
//     }
//   }
// };
</script>
