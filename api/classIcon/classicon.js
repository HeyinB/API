
import * as sequelize from 'sequelize'
import db from '../../db/db'

//查找iconclass是否为模板 model { istemplate = 1?2  }
export async function findClassTemp(model) {
  let classSql = 'select * from iconfont where istemplate = :istemplate'
  let data =  await db.pool.query(classSql, {
    replacements: {
      istemplate: model.istemplate
    },
    type: sequelize.QueryTypes.Select
  });

  return data[0]

}


export async function setClassIcon(model, t) {
  let sql_InsertClassOwn = `insert into own_iconfont(icon_userid,icon_openid,icon_class,icon_name,is_remove,icon_sort,create_time)
      values(:icon_userid,:icon_openid,:icon_class,:icon_name,1,:icon_sort,now())`

  await db.pool.query(sql_InsertClassOwn, {
    replacements: {
      icon_userid: model.userid,
      icon_openid: model.openid,
      icon_class: model.iconclass,
      icon_name: model.iconname,
      icon_sort: model.iconsort,
    },
    type: sequelize.QueryTypes.INSERT, transaction: t
  });
}
