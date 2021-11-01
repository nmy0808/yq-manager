import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from './store'
import request from "./util/request";
import storage from "./util/storage";

const app = createApp(App);
app.config.globalProperties.$request = request;
app.config.globalProperties.$storage = storage;
app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount("#app");
