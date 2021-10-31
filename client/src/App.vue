<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "app",
  components: {},
});
</script>
<style>
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/base.scss";
@import "@/assets/scss/comm.scss";
</style>
