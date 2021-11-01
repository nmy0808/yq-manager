const Router = require("@koa/router");
const userRouter = require("./users");

const router = new Router({
  prefix: "/api",
});
// router list
router.use(userRouter.routes());

//
module.exports = (app) => {
  app.use(router.routes());
  app.use(router.allowedMethods());
};
