import Router from "koa-router";
import * as api from "../../controller/Bill/bill";

const Bill = new Router({
  prefix: "/v1/bill",
});

//找自己的icon

Bill.get("/getbill", async (ctx) => {
  await api.getbill(ctx);
});

Bill.post("/setbill", async (ctx) => {
  await api.setbill(ctx);
});

Bill.get("/getBillById", async (ctx) => {
  await api.getBillById(ctx);
});

module.exports = {
  Bill,
};
