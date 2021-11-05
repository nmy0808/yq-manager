const user = require("../models/user.schema");
const counter = require("../models/counter.schema");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/index");
const { success, fail, pager, CODE } = require("../utils/util");
const md5 = require("md5");
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
router.post("/delete", async (ctx) => {
  const { userIds } = ctx.request.body;
  try {
    const result = await user.updateMany(
      { userId: { $in: userIds } },
      { state: 2 }
    );
    if (result.modifiedCount > 0) {
      ctx.body = success({nModified:result.modifiedCount}, "删除成功");
    } else {
      ctx.body = fail({}, "用户数据一致, 无需修改");
    }
  } catch (error) {
    ctx.body = fail({}, "修改失败");
  }
});
// 获取全量用户列表
router.get('/all/list', async (ctx) => {
  try {
    const list = await user.find({}, "userId userName userEmail")
    ctx.body = success(list)
  } catch (error) {
    ctx.body = fail(error.stack)
  }
})
router.get("/list", async (ctx) => {
  const { userId, userName, state } = ctx.request.query;
  const { page, skipIndex } = pager(ctx.request.query);
  const params = {};
  if (userId) params.userId = userId;
  if (userName) params.userName = userName;
  if (state && state != 0) params.state = state;
  try {
    const list = await user
      .find(params, { _id: 0, userPwd: 0 })
      .skip(skipIndex)
      .limit(page.pageSize);
    const total = await user.countDocuments(params);
    ctx.body = success({ page: { ...page, total }, list });
  } catch (error) {
    ctx.body = fail(`查询异常: ${error.stack}`);
  }
});
// 新增/修改用户 action:'add'/'edit'
router.post("/operate", async (ctx) => {
  const {
    action,
    userId,
    userName,
    userEmail,
    mobile,
    job,
    state,
    roleList,
    deptId,
  } = ctx.request.body;
  // 新增
  if (action === "add") {
    if (!userName || !userEmail || !deptId) {
      ctx.body = fail("参数错误", CODE.PARAM_ERROR);
      return;
    }
    const res = await user.findOne(
      { $or: [{ userName }, { userEmail }] },
      "_id userName userEamil"
    );
    if (res) {
      ctx.body = fail(
        `系统检测到有重复用户, 信息如下 ${userName} - ${userEmail}`
      );
      return;
    }
    try {
      const doc = await counter.findOneAndUpdate({key:'userId'},{$inc:{sequence_value:1}},{new:1})
      await user.create({
        userId:doc.sequence_value,
        userName,
        userPwd: md5("123456"),
        userEmail,
        mobile,
        job,
        state,
        role: 1, //普通用户
        roleList,
        deptId,
      });
      ctx.body = success({}, "用户创建成功");
    } catch (error) {
      ctx.body = fail("用户创建失败");
    }
    // 修改
  } else {
    try {
      await user.updateOne(
        { userId },
        { userName, mobile, job, state, roleList, deptId }
      );
      ctx.body = success({}, "用户修改成功");
    } catch (error) {
      ctx.body = fail("用户修改失败");
    }
  }
});
module.exports = router;
