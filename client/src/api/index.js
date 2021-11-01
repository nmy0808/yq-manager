import request from "@/util/request";

export const loginApi = (data) => {
  return request.post("/users/login", data);
};

export const menuListApi = (data={}) => {
  return request.get("/menu/list", data);
};