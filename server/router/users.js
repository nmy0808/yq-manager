const user = require("../models/user.schema");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/index");
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
    const doc = result._doc;
    const token = jwt.sign({ data: doc }, jwtSecret, { expiresIn: "1h" });
    ctx.body = success({ token, ...doc });
  } else {
    ctx.body = fail("请检查用户名或密码");
  }
});
module.exports = router;
