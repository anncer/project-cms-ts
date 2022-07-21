<template>
  <div class="menu-box">
    <el-sub-menu
      v-if="checkChildren(item) && checkPromise(item)"
      ref="sub-Menu"
      :index="item.component"
      popper-append-to-body
    >
      <template v-slot:title>
        <menuItem :icon="item.icon" :title="item.name" />
      </template>
      <sub-Menu
        v-for="child in item.children"
        :key="child.component"
        :item="child"
        class="nest-menu"
      />
    </el-sub-menu>
    <template v-else>
      <el-menu-item
        v-if="checkPromise(item)"
        :index="item.component"
        @click="goToPage(item)"
      >
        <menuItem :icon="item.icon" :title="item.name" />
      </el-menu-item>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { isProperty, isRealArray } from "@/utils/comment";

export default defineComponent({
  name: "subMenu",
  props: {
    item: {
      type: Object
    },
    type: {
      default: "",
      type: String
    },
    show: {
      default: false,
      type: Boolean
    }
  },
  setup() {
    const checkPromise = (item: any) => {
      return isProperty(item, "ishidden") && !item.ishidden;
    };

    const checkChildren = (item: any) => {
      return isProperty(item, "children") && isRealArray(item.children);
    };

    const goToPage = () => {
      // if (it.component !== this.activeMenu) {
      //   this.$router.push({ name: it.component });
      // }
    };
    return {
      checkPromise,
      goToPage,
      checkChildren
    };
  }
});
</script>
