
<template>
  <div class="login-page">
    <el-form
      class="login-form"
      ref="userFormRef"
      :model="userForm"
      :rules="userRules"
      status-icon
    >
      <div class="login-title">后台系统</div>
      <el-form-item prop="userName">
        <el-input
          v-model="userForm.userName"
          type="text"
          placeholder="请输入账号"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          v-model="userForm.userPwd"
          type="text"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="userFromCommit" type="primary" class="login-submit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import useVuexWithRouter from "@/hooks/useVuexWithRouter";
import { loginApi, menuPermissionApi } from "@/api";
export default defineComponent({
  name: "Login",
  components: {},
  setup() {
    const { router, store } = useVuexWithRouter();
    const toPageHome = () => {
      router.push("/");
    };
    const userFormRef = ref(null);
    const userForm = reactive({
      userName: "",
      userPwd: "",
    });
    const userRules = {
      userName: [
        {
          required: true,
          message: "必须填写用户名",
          trigger: "blur",
        },
      ],
      userPwd: [
        {
          required: true,
          message: "必须填写密码",
          trigger: "blur",
        },
      ],
    };
    const userFromCommit = () => {
      userFormRef.value.validate(async (valid) => {
        if (valid) {
          const loginInfo = await loginApi(userForm);
          store.commit("setUserInfo", loginInfo);
          await getMenuPermission();
          toPageHome();
        } else {
          return false;
        }
      });
    };
    const getMenuPermission = async () => {
      const { menuList, actionList } = await menuPermissionApi();
      store.commit("setActionList", actionList);
      store.commit("setMenuList", menuList);
    };
    return {
      toPageHome,
      userFormRef,
      userForm,
      userRules,
      userFromCommit,
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
    .login-submit {
      width: 100%;
    }
  }
}
</style>