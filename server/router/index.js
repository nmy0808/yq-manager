const Router = require("@koa/router");
const userRouter = require("./users");
const leaveRouter = require("./leave");
const menuRouter = require("./menu");
const roleRouter = require("./role");
const deptRouter = require("./depts");
const jwt = require("koa-jwt");
const { jwtSecret } = require("../config/index");
const router = new Router({
  prefix: "/api",
});
// router list
router.use(userRouter.routes());
router.use(leaveRouter.routes());
router.use(menuRouter.routes());
router.use(roleRouter.routes());
router.use(deptRouter.routes());

//
module.exports = (app) => {
  // jwt拦截及过滤
// app.use(jwt({ secret: jwtSecret }).unless({ path: [/.*/] }));;
  app.use(jwt({ secret: jwtSecret }).unless({ path: [/^\/api\/users\/login/] }));
  // 注册路由
  app.use(router.routes());
  app.use(router.allowedMethods());
};
