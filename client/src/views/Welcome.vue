<template>
  <div class="welcome-page">
    <div class="word">
      <div class="title-one">欢迎体验</div>
      <div class="title-two">通用后台管理系统</div>
      <div class="title-three">
        vue3+ElementPlus+Node+mongo打造通用后台管理系统
      </div>
    </div>
    <img class="welcome-img" :src="welcomePic" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import welcomePic from '@/assets/imgs/welcome.png'
export default defineComponent({
  name: "Welcome",
  components: {},
  setup() {
    const router = useRouter();
    const toPageLogin = () => {
      router.push({ name: "login" });
    };
    return { toPageLogin, welcomePic };
  },
});
</script>
<style lang="scss" scoped>
.welcome-page {
  position: relative;
  height: 100%;
  .welcome-img{
    @extend .center-v;
    right: 20%;
  }
  .word {
    @extend .center-v;
    left: 10%;
    transform: translateY(-120px);
    .title-one {
      font-size: 38px;
    }
    .title-two {
      font-size: 50px;
      color: $color-active;
      padding: 20px 0;
    }
    .title-three {
      font-size: 16px;
      color: $color-sub;
    }
  }
}
</style>

