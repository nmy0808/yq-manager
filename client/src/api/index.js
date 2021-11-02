import request from "@/util/request";

export const loginApi = (data) => {
  return request.post("/users/login", data, {mock:false});
};

export const menuListApi = (data={}) => {
  return request.get("/menu/list", data);
};

export const leaveCountApi = (data={}) => {
  return request.get("/leave/count", data);
};

export const userListApi = (data={}) => {
  return request.get("/users/list", data);
};
// 删除单个或多个 `userIds:[userId,userId...]`
export const deleteUserApi = (data={}) => {
  return request.post("/users/delete", data);
};