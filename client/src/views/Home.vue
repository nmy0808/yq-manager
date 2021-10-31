<template>
  <div class="manager-wrap">
    <div class="manager-left">123</div>
    <div class="manager-right">
      <div class="manager-top-nav">
        <div class="manager-bread">首页>登录</div>
        <div class="manager-user">user</div>
      </div>
      <div class="manager-main">
        <div class="manager-main-box">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HOME",
  components: {},
});
</script>
<style>
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/base.scss";
@import "@/assets/scss/comm.scss";
</style>
<style lang="scss" scoped>
.manager-wrap {
  width: 100vw;
  height: 100vh;
  font-size: $font-size-small;
  position: relative;
  // 导航栏收缩样式
  &.has-shrink{ 
    .manager-left{
      width: 80px;
    }
    .manager-right{
      margin-left: 80px;
    }
  }
  .manager-left {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    overflow-y: auto;
    background: $color-main;
    color: $color-light;
    transition: all 200ms;
  }
  .manager-right {
    margin-left: 200px;
    height: 100%;
    position: relative;
    color: $color-dark;
    transition: all 200ms;
    .manager-top-nav {
      height: 50px;
      background: white;
      box-shadow: $shadow-light;
      display: flex;
      padding: 0 30px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      .manager-bread {
      }
      .manager-user {
      }
    }
    .manager-main {
      position: absolute;
      top: 50px;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 30px;
      box-sizing: border-box;
      background: #e9ebf0;
      .manager-main-box {
        background: white;
        height: 100%;
        box-shadow: $shadow-light;
      }
    }
  }
}
</style>

