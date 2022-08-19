
import * as sequelize from 'sequelize'
import db from '../../db/db'


export async function setLedgeLinkr(model, t) {
  let sql = `insert into ledger_link(ledgerid,create_userid,create_time,update_time,ledger_name,isreomve)
    values(:openid,:userid,now(),now(),:name,1)`

  await db.pool.query(sql, {
    replacements: {
      openid: model.openid,
      userid: model.userid,
      name: name || '默认账本'
    }, type: sequelize.QueryTypes.INSERT, transaction: t
  })
}
