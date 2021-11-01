<template>
  <div class="bread-crumbs">
    <div class="bread-crumbs-left">
      <slot name="left"></slot>
    </div>
    <el-breadcrumb>
      <template v-for="(match, index) in matched">
        <el-breadcrumb-item v-if="index === 0" :to="{ path: '/' }">{{
          match.meta.title
        }}</el-breadcrumb-item>
        <el-breadcrumb-item v-else>{{ match.meta.title }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CBreadCrumbs",
  data() {
    return {
      matched: [],
    };
  },
  mounted() {
    this.matched = this.$route.matched;
  },
});
</script>
<style lang="scss" scoped>
.bread-crumbs {
  display: flex;
  align-items: center;
  .bread-crumbs-left {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>

