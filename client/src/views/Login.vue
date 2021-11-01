
<template>
  <div class="login-page">
    <el-form class="login-form">
      <div class="login-title">后台系统</div>
      <el-form-item>
        <el-input
          type="text"
          placeholder="请输入账号"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="text"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-submit">提交</el-button>
      </el-form-item>
    </el-form>
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

<style lang="scss"  scoped >
.login-page {
  width: 100vw;
  height: 100vh;
  .login-form {
    padding: 30px;
    width: 400px;
    height: 300px;
    box-shadow: $shadow-light;
    border-radius: 10px;
    @extend .center-all;
    text-align: center;
    .login-title {
      height: 60px;
      font-size: $font-size-large;
      text-align: center;
    }
    .login-submit{
      width: 100%;
    }
  }
}
</style>