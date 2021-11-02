<template>
  <div class="user-page">
    <div>
      <el-form inline :model="userFrom" ref="formRef">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="userFrom.userId" />
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userFrom.userName" />
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select model-value="1" v-model="userFrom.state">
            <el-option label="在职" value="1" />
            <el-option label="离职" value="2" />
            <el-option label="试用期" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchUserFrom">查询</el-button>
          <el-button type="danger" @click="onResetUserFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column
          v-for="column in userColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
        />
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="pager.pageNum"
        :page-size="pager.pageSize"
        :total="pager.total"
        @current-change="onChangeCurrentPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  getCurrentInstance,
} from "vue";
import { userListApi } from "../api";

export default defineComponent({
  name: "User",
  components: {},
  setup() {
    const { ctx, proxy } = getCurrentInstance();

    const userFrom = reactive({
      userId: "",
      userName: "",
      state: "1",
    });
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0,
    });
    const userColumns = [
      { prop: "userId", label: "用户ID" },
      { prop: "userName", label: "用户名" },
      { prop: "userEmail", label: "邮箱" },
      { prop: "role", label: "角色" },
      { prop: "state", label: "状态" },
      { prop: "createTime", label: "注册时间" },
      { prop: "lastLoginTime", label: "最后登录" },
    ];
    const userList = ref([]);
    //
    const getUserList = async () => {
      const params = { ...userFrom, ...pager };
      const { list, page } = await userListApi(params);
      pager.pageNum = page.pageNum;
      pager.total = page.total;
      userList.value = list;
    };
    const onChangeCurrentPage = (currentPage) => {
      pager.pageNum = currentPage;
      getUserList();
    };
    const onSearchUserFrom = () => {
      getUserList();
    };
    const onResetUserFrom = () => {
      proxy.$refs.formRef.resetFields();
    };
    onMounted(() => {
      getUserList();
    });
    return {
      userFrom,
      userColumns,
      userList,
      pager,
      onChangeCurrentPage,
      onSearchUserFrom,
      onResetUserFrom,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>

