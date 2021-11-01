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
    <div class="menu-logo">
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
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      return this.isCollapse
    },
  },
});
</script>
<style lang="scss" scoped>
.menu-wrap {
  height: 100vh;
  overflow-y: auto;
  border: none;
  transition: all 200ms;
  .menu-logo{
    height: 50px;
    display: flex;
    align-items: center;
    .menu-logo-img{
      width: 50px;
      height: 50px;
      background: url('../../assets/logo.png') no-repeat center/30px;
    }
    .menu-logo-title{
      font-size: 20px;
      color: white;
    }
  }
}
</style>

