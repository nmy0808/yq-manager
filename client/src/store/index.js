import { createStore } from "vuex";
import mutations from './mutations'
import storage from "@/util/storage";
const state = {
  userInfo: storage.getItem('userInfo'),
};
const getters = {};
export default createStore({
  state,
  getters,
  mutations,
});
