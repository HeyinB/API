
import * as sequelize from 'sequelize'
import db from '../../db/db'

export async function findUserInfo(model) {
    let sql = `select * from user where id =:id`

    let data = await db.pool.query(sql, {
        replacements: {
            id: model.id || ''
        }, type: sequelize.QueryTypes.SELECT
    })
    return data
}

