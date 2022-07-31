
import * as sequelize from 'sequelize'
import db from '../../db/db'

export async function find_user_count(str,model){
    let sql = `SELECT count(*) As count from users where `
    let where = ''
    switch(str) {
        case 'username':
            where = `username = :username`
            break;
        case 'usercode':
            where = `usercode = :usercode`
    }
    
    let data = await db.pool.query(sql + where, {
        replacements: {
            username:model.username || '',
            usercode:model.usercode || ''
        }, type: sequelize.QueryTypes.SELECT
    })
    return data
}



