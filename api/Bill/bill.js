import * as sequelize from "sequelize";
import db from "../../db/db";

//查找iconclass是否为模板 model { istemplate = 1?2  }
export async function getbill(model) {
  let classSql =
    "select * from bill where create_userid=:userid and create_openid = :openid";
  let data = await db.pool.query(classSql, {
    replacements: {
      userid: model.id,
      openid: model.openid,
    },
    type: sequelize.QueryTypes.Select,
  });

  return data[0];
}
