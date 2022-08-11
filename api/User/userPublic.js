
import * as sequelize from 'sequelize'
import db from '../../db/db'

export async function getUserInfo(model) {
  let sql = `select * from user where id = :id`

  return await db.pool.query(sql, {
    replacements: {
      ...model
    }, type: sequelize.QueryTypes.SELECT
  })
}
