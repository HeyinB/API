
import * as sequelize from 'sequelize'
import db from '../../db/db'

//查找iconclass是否为模板 model { istemplate = 1?2  }
export async function findClassTemp(model) {
  let classSql = 'select * from iconfont where istemplate = :istemplate'
  return await db.pool.query(classSql, {
    replacements: {
      istemplate: model.istemplate
    },
    type: sequelize.QueryTypes.Select
  });
}


export async function setClassIcon(model, t) {
  let sql_InsertClassOwn = `insert into own_iconfont(icon_userid,user_openid,icon_class,icon_name,is_remove,icon_sort,create_time)
      values(:icon_userid,:user_openid,:icon_class,:icon_name,1,:icon_sort,now())`

  await db.pool.query(sql_InsertClassOwn, {
    replacements: {
      userid: model.userid,
      user_openid: model.openid,
      icon_class: model.icon_class,
      icon_name: model.icon_name,
      icon_sort: model.icon_sort,
    },
    type: sequelize.QueryTypes.INSERT, transaction: t
  });
}
