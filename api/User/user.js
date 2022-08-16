
import * as sequelize from 'sequelize'
import db from '../../db/db'

export async function findUserInfo(model) {
    let sql = `select * from users where id =:id`

    let data = await db.pool.query(sql + where, {
        replacements: {
            id: model.id || ''
        }, type: sequelize.QueryTypes.SELECT
    })
    return data
}
