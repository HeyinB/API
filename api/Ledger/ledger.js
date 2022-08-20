import * as sequelize from "sequelize";
import db from "../../db/db";

import { setLedgeLinkr } from "./ledger_link";

export async function setLedger(model, t) {
  let sql = `insert into ledger(create_openid,create_userid,create_time,update_time,ledger_name,isreomve)
    values(:openid,:userid,now(),now(),:name,1)`;

  let data = await db.pool.query(sql, {
    replacements: {
      openid: model.openid,
      userid: model.userid,
      name: model.name || "默认账本",
    },
    type: sequelize.QueryTypes.INSERT,
    transaction: t,
  });
  model.ledgerid = data[0]

  await setLedgeLinkr(model, t);
}
