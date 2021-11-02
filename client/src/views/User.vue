<template>
  <div class="user-page">
    <div class="user-from-wrap radius-hide">
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
      <el-button type="primary">新增</el-button>
      <el-button type="danger" @click="onDeleteUserSelects">批量删除</el-button>
      <el-table
        @selection-change="onChangeUserSelects"
        class="base-table"
        :data="userList"
        size="medium"
        stripe
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="column in userColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :formatter="column.formatter"
        />
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button
              size="mini"
              type="text"
              @click="onEditUserList(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="onAddDeleteList(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="text-right"
        background
        layout="prev, pager, next"
        :current-page="pager.pageNum"
        :page-size="pager.pageSize"
        :total="pager.total"
        @current-change="onChangeCurrentPage"
      />
    </div>
    <!-- 删除弹窗 -->
    <el-dialog v-model="deleteDialog" title="操作" width="30%">
      <span>确定删除?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialog = false">取消</el-button>
          <el-button type="primary" @click="onDeleteUserSelects"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
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
import { userListApi, deleteUserApi } from "../api";

export default defineComponent({
  name: "User",
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();

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
      {
        prop: "role",
        label: "角色",
        formatter(row, column, cellValue) {
          return { 0: "系统管理员", 1: "普通用户" }[cellValue];
        },
      },
      {
        prop: "state",
        label: "状态",
        formatter(row, column, cellValue) {
          return { 0: "所有", 1: "在职", 2: "离职", 3: "试用" }[cellValue];
        },
      },
      { prop: "createTime", label: "注册时间" },
      { prop: "lastLoginTime", label: "最后登录" },
    ];
    const userList = ref([]);
    const userSelects = ref([]);
    // 多选时存入选中列表中
    const onChangeUserSelects = (list) => {
      userSelects.value = list.map((user) => user.userId);
    };
    const deleteDialog = ref(false);
    //
    const getUserList = async () => {
      const params = { ...userFrom, ...pager };
      const { list, page } = await userListApi(params);
      pager.pageNum = page.pageNum;
      pager.total = page.total;
      userList.value = list;
    };
    const deleteUser = async () => {
      if (userSelects.value.length > 0) {
        return deleteUserApi({ nModified: userSelects.value });
      } else {
        proxy.$message.error("请选择删除项");
      }
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
    const onEditUserList = (...arg) => {
      console.log(arg);
    };
    const onAddDeleteList = (user) => {
      userSelects.value = [user.userId];
      deleteDialog.value = true;
    };
    const onDeleteUserSelects = async () => {
      try {
        const { nModified } = await deleteUser();
        if (nModified > 0) {
          userSelects.value = [];
          proxy.$message.success("删除成功");
          getUserList();
        } else {
          proxy.$message.error("删除失败");
        }
      } catch (error) {}
      deleteDialog.value = false;
    };
    onMounted(() => {
      getUserList();
    });
    return {
      userFrom,
      userColumns,
      userList,
      onChangeUserSelects,
      pager,
      deleteDialog,
      onChangeCurrentPage,
      onSearchUserFrom,
      onResetUserFrom,
      onEditUserList,
      onAddDeleteList,
      onDeleteUserSelects,
    };
  },
});
</script>
<style lang="scss" scoped>
.user-page {
  padding: 30px;
  box-sizing: border-box;
  .user-from-wrap {
    background: white;
    margin-bottom: 18px;
    .el-form {
      padding: 18px;
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>

