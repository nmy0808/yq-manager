import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home";
import Welcome from "@/views/Welcome";
import User from "@/views/User";
import Menu from "@/views/Menu";
import Login from "@/views/Login";
/**
 * @type {import('vue-router').RouteRecordRaw[]}
 * */
const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
    meta: { title: "首页" },
    redirect: { name: "welcome" },
    children: [
      {
        name: "welcome",
        path: "welcome",
        meta: { title: "欢迎页" },
        component: Welcome,
      },
      {
        name: "user",
        path: "/system/user",
        meta: { title: "用户管理" },
        component: User,
      },
      {
        name: "menu",
        path: "/system/menu",
        meta: { title: "菜单管理" },
        component: Menu,
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    meta: { title: "登录页" },
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
