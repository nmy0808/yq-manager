import request from "@/util/request";

export const loginApi = (data) => {
  return request.post("/users/login", data, { mock: false });
};

export const menuListApi = (data = {}) => {
  return request.get("/menu/list", data, { mock: false });
};

export const menuOperateApi = (data = {}) => {
  return request.post("/menu/operate", data, { mock: false });
};

export const leaveCountApi = (data = {}) => {
  return request.get("/leave/count", data);
};

export const userListApi = (data = {}) => {
  return request.get("/users/list", data, { mock: false });
};
// 删除单个或多个 `userIds:[userId,userId...]`
export const deleteUserApi = (data = {}) => {
  return request.post("/users/delete", data, { mock: false });
};

export const roleListApi = (data = {}) => {
  return request.get("/roles/allList", data);
};

export const deptListApi = (data = {}) => {
  return request.get("/dept/list", data);
};

export const addUserApi = (data = {}) => {
  data.action = "add";
  return request.post("/users/operate", data, { mock: false });
};
export const editUserApi = (data = {}) => {
  data.action = "edit";
  return request.post("/users/operate", data, { mock: false });
};
