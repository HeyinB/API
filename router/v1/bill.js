import Router from "koa-router";
import * as api from "../../controller/Bill/bill";

const Bill = new Router({
  prefix: "/v1/bill",
});

//找自己的icon

Bill.get("/getbill", async (ctx) => {
    
  await api.getbill(ctx);
});

module.exports = {
  Bill,
};
