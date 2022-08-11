
import * as sequelize from 'sequelize'
import db from '../../db/db'

export async function findUserInfo(str, model) {
    let sql = `select * from users where `
    let where = ''

    let data = await db.pool.query(sql + where, {
        replacements: {
            id: model.id || '',
            username: model.username || '',
            usercode: model.usercode || ''
        }, type: sequelize.QueryTypes.SELECT
    })
    return data
}
