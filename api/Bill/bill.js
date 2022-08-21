import * as sequelize from "sequelize";
import db from "../../db/db";

import {getLedgetSelect} from '../Ledger/ledgerPublic'

//查找账单
export async function getbill(model) {

  //获取被选中的那个账单
  let ledgetData = await getLedgetSelect(model)

  let classSql =
    `select * from bill 
    left join ledger l on l.id = bill_ledger
    where bill_userid=:userid and bill_openid = :openid and bill_ledger=:bill_ledger`;
  let data = await db.pool.query(classSql, {
    replacements: {
      userid: model.id,
      openid: model.openid,
      bill_ledger:ledgetData[0].id
    },
    type: sequelize.QueryTypes.Select,
  });

  return {
    billInfo:data[0],
    ledgerInfo:ledgetData[0]
  };
}


//新增账单
export async function setbill(model) {
  console.log('-------model-----',model);
  
  let sql =
  `insert into bill(bill_classid,bill_price,bill_remark,bill_datetime,bill_createtime,bill_openid,bill_ledger,bill_userid,bill_iconclass)
    values(:bill_classid,:bill_price,:bill_remark,:bill_datetime,now(),:bill_openid,:bill_ledger,:bill_userid,:bill_iconclass) `;
  let data = await db.pool.query(sql, {
    replacements: {
      ...model,
      bill_openid:model.openid,
      bill_userid:model.userid
    },
    type: sequelize.QueryTypes.INSERT,
  });

  if(data.length>0) return {msg:'新增成功'}
  
}
