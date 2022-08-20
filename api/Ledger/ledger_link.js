
import * as sequelize from 'sequelize'
import db from '../../db/db'


export async function setLedgeLinkr(model, t) {

  let sql = `insert into ledger_link(ledgerid,link_openid,link_userid,createTime)
    values(:ledgerid,:link_openid,:link_userid,now())`

  return await db.pool.query(sql, {
    replacements: {
      ledgerid:model.ledgerid,
      link_openid: model.openid,
      link_userid: model.userid
    }, type: sequelize.QueryTypes.INSERT, transaction: t
  })
}
