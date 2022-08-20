import Router from "koa-router";
import * as api from "../../controller/classicon/classicon";

const classIcon = new Router({
  prefix: "/v1/classicon",
});

//找自己的icon

classIcon.get("/getOwnClassIcon", async (ctx) => {
    console.log('-----进来了------进来了');
    
  await api.getOwnClassIcon(ctx);
});

module.exports = {
  classIcon,
};
