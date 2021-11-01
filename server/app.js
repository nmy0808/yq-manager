const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const { fail } = require("./utils/util");

const app = new Koa();
app.use(bodyparser());

// 链接mongoDb
require("./config/db");
// 处理错误
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = fail("服务器错误啦!!");
  }
});
// 注册路由
require("./router")(app);

// listen 3000
app.listen(3000, () => {
  console.log("listen 3000");
});
