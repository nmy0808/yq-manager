import request from "@/util/request";

export const loginApi = (data) => {
  return request.post("/users/login", data);
};
