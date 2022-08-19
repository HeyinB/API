
import * as sequelize from 'sequelize'
import db from '../../db/db'

//查找iconclass是否为模板 model { istemplate = 1?2  }
export async function findUserInfo(model) {
  let classSql = 'select * from iconfont where istemplate = :istemplate'
  return await db.pool.query(classSql, {
    replacements: {
      istemplate: model.istemplate
    },
    type: sequelize.QueryTypes.Select
  });
}

