import storage from "@/util/storage";

export default {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    storage.setItem("userInfo", userInfo);
  },
};
