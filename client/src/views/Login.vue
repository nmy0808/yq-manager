<template>
  <div class="login-page">
    <div>login1</div>
    <el-button @click="toPageHome">回首页</el-button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Login",
  components: {},
  setup() {
    const router = useRouter();
    const toPageHome = () => {
      router.push("/");
    };
    return {
      toPageHome,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>

