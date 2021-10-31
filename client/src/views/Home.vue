<template>
  <div class="home-page">
    <div>home</div>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HOME",
  components: {},
  mounted() {
    // this.$request.get("/login").then((res) => {
    //   console.log(res);
    // });
    // this.$storage.setItem("name", "nmy");
    // this.$storage.setItem("love", ['a','b']);
  },
});
</script>
<style lang="scss" scoped>
</style>

