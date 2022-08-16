
import * as sequelize from 'sequelize'
import db from '../../db/db'

const getUserInfo = async function (model) {
  let sql = `select * from user where user_openid = :openid`

  return await db.pool.query(sql, {
    replacements: {
      ...model
    }, type: sequelize.QueryTypes.SELECT
  })
}

const getUserInfoById = async function (model) {
  let sql = `select * from user where id = :id`

  return await db.pool.query(sql, {
    replacements: {
      ...model
    }, type: sequelize.QueryTypes.SELECT
  })
}


module.exports = {
  getUserInfo,
  getUserInfoById
}
