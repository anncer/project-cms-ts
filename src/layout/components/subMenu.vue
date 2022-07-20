<template>
  <div class="menu-box">
    <el-submenu
      v-if="checkChildren(item) && checkPromise(item)"
      ref="subMenu"
      :index="item.component"
      popper-append-to-body
    >
      <template v-slot:title>
        <menuItem :icon="item.icon" :title="item.name" />
      </template>
      <subMenu
        v-for="child in item.children"
        :key="child.component"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
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

<script>
import menuItem from "./menuItem";
import { isRealArray, isProperty } from "@/utils/comment";
// import { getAccessMenu } from '@/api/table'
export default {
  name: "subMenu",
  components: {
    menuItem
  },
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
  data() {
    return {};
  },
  methods: {
    checkPromise(item) {
      return isProperty(item, "ishidden") && !item.ishidden;
    },
    checkChildren(item) {
      return isProperty(item, "children") && isRealArray(item.children);
    },
    goToPage(it) {
      if (it.component !== this.activeMenu) {
        this.$router.push({ name: it.component });
      }
    }
  }
};
</script>
