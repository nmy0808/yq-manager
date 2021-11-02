<template>
  <el-menu
    default-active="1"
    class="menu-wrap"
    :collapse="isCollapse"
    background-color="#071321"
    text-color="#ffffff"
    active-text-color="#409eff"
    router
  >
    <div class="menu-logo" :class="[calcLogoClass ? 'fold' : '']">
      <div class="menu-logo-img"></div>
      <div class="menu-logo-title">manager</div>
    </div>
    <c-tree-menu :menus="menus"></c-tree-menu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CTreeMenu from "./c-tree-menu.vue";

export default defineComponent({
  name: "CMenu",
  props: {
    menus: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: { CTreeMenu },
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    calcLogoClass() {
      return this.isCollapse;
    },
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      return this.isCollapse;
    },
  },
});
</script>
<style lang="scss" scoped>
.menu-wrap {
  height: 100%;
  overflow-y: auto;
  border: none;
  transition: all 200ms;
  .menu-logo {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.fold {
      .menu-logo-title {
        display: none;
      }
    }
    .menu-logo-img {
      width: 40px;
      height: 40px;
      background: url("../../assets/logo.png") no-repeat center/cover;
    }
    .menu-logo-title {
      font-size: 20px;
      margin-left: 10px;
      color: white;
    }
  }
}
</style>

