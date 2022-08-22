import * as sequelize from "sequelize";
import db from "../../db/db";

import { getLedgetSelect } from "../Ledger/ledgerPublic";

//查找账单
export async function getbill(model) {
  //获取被选中的那个账单
  let ledgetDataList = await getLedgetSelect(model);

  let selectLedget = ledgetDataList.filter((e) => {
    return (e.ledger_isSelected = 1);
  });

  let classSql = `select bi.*,l.ledger_name from bill bi
    left join ledger l on l.id = bill_ledger
    where bill_userid=:userid and bill_openid = :openid and bill_ledger=:bill_ledger`;
  let data = await db.pool.query(classSql, {
    replacements: {
      userid: model.id,
      openid: model.openid,
      bill_ledger: selectLedget[0].id,
    },
    type: sequelize.QueryTypes.Select,
  });

  return {
    billInfo: data[0],
    ledgetDataList: ledgetDataList,
  };
}

//新增账单
export async function setbill(model) {
  console.log("-------model-----", model);

  let sql = `insert into bill(bill_classid,bill_price,bill_remark,bill_datetime,bill_createtime,bill_openid,bill_ledger,bill_userid,bill_iconclass,bill_iconname)
    values(:bill_classid,:bill_price,:bill_remark,:bill_datetime,now(),:bill_openid,:bill_ledger,:bill_userid,:bill_iconclass,:bill_iconname) `;
  let data = await db.pool.query(sql, {
    replacements: {
      ...model,
      bill_openid: model.openid,
      bill_userid: model.userid,
    },
    type: sequelize.QueryTypes.INSERT,
  });

  if (data.length > 0) return { msg: "新增成功" };
}

export async function getBillById(model) {
  console.log(model);
  let sql = `select * from bill
  where id=:id`;

  return await db.pool.query(sql, {
    replacements: {
      ...model,
    },
    type: sequelize.QueryTypes.SELECT,
  });
}
