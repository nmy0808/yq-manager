import { createStore } from "vuex";
import mutations from "./mutations";
import storage from "@/util/storage";
const state = {
  userInfo: storage.getItem("userInfo") || {},
  menuList: storage.getItem("menuList") || [],
  actionList: storage.getItem("actionList") || [],
};
const getters = {};
export default createStore({
  state,
  getters,
  mutations,
});
