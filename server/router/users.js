const user = require("../models/user.schema");
const { success, fail } = require("../utils/util");

const Router = require("@koa/router");
const router = new Router({
  prefix: "/users",
});

router.post("/login", async (ctx) => {
  const { userName, userPwd } = ctx.request.body;
  const result = await user.findOne(
    {
      userName,
      userPwd,
    },
    { userPwd: 0 }
  );
  if (result) {
    ctx.body = success(result);
  } else {
    ctx.body = fail("请检查用户名或密码");
  }
});
module.exports = router;
