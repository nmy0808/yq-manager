const { success, fail } = require("../utils/util");

const Router = require("@koa/router");
const router = new Router({
  prefix: "/leave",
});

router.get("/count", async (ctx) => {
  console.log(ctx.state.user);
  ctx.body = success(1);
});
module.exports = router;
