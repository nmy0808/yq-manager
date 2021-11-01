<template>
  <div class="Welcome-page">
    <div>欢迎页</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Welcome",
  components: {},
  setup() {
    const router = useRouter();
    const toPageLogin = () => {
      router.push({ name: "login" });
    };
    return { toPageLogin };
  },
});
</script>
<style lang="scss" scoped>
</style>

