const { success, fail, pager, CODE } = require("../utils/util");
const menu = require("../models/menu.schema");

const Router = require("@koa/router");
const router = new Router({
  prefix: "/menu",
});
router.get("/list", async (ctx) => {
  const { menuName, menuState } = ctx.request.query;
  const params = {}
  if (menuName) params.menuName = menuName;
  if (menuState) params.menuState = menuState;
  let rootList = await menu.find(params) || []
  const permissionList = getTreeMenu(rootList, null, [])
  ctx.body = success(permissionList);
});
router.post("/operate", async (ctx) => {
  const { action, _id, ...params } = ctx.request.body;
  let info = "";
  switch (action) {
    case "add":
      info = "添加成功";
      await menu.create(params);
      break;
    case "edit":
      info = "修改成功";
      params.updateTime= new Date()
      await menu.findByIdAndUpdate(_id, params);
      break;
    case "delete":
      info = "删除成功";
      console.log('删除', _id);
      await menu.findByIdAndDelete(_id)
      await menu.deleteMany({ parentId: { $all: _id } });
      break;
    default:
      break;
  }
  ctx.body = success(info);
});
// 递归拼接树形列表
function getTreeMenu(rootList, id, list) {
  for (let i = 0; i < rootList.length; i++) {
      let item = rootList[i]
      if (String(item.parentId.slice().pop()) == String(id)) {
          list.push(item._doc)
      }
  }
  list.map(item => {
      item.children = []
      getTreeMenu(rootList, item._id, item.children)
      if (item.children.length == 0) {
          delete item.children;
      } else if (item.children.length > 0 && item.children[0].menuType == 2) {
          // 快速区分按钮和菜单，用于后期做菜单按钮权限控制
          item.action = item.children;
      }
  })
  return list;
}
module.exports = router;
