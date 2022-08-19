
import * as sequelize from 'sequelize'
import db from '../../db/db'

import { getUserInfo, getUserInfoById } from '../User/userPublic'
import { findClassTemp, setClassIcon } from '../classIcon/classicon'
import { getToken } from "../../util/token"

//登录
export async function LoginOrRegister(model) {

  console.log('-------LoginOrRegister---------', model);
  let userInfo = await getUserInfo(model)
  if (userInfo.length <= 0) {
    await db.client.transaction(async function (t) {
      let insertUserSql = `insert into user(user_openid,name,avatar,gender) values(:user_openid,:nickName,:avatarUrl,:gender)`;
      let userid = await db.pool.query(insertUserSql, {
        replacements: {
          user_openid: model.openid,
          nickName: model.nickName,
          avatarUrl: model.avatarUrl,
          gender: model.gender,
        },
        type: sequelize.QueryTypes.INSERT, transaction: t
      });

      //查找icon的模板
      let classList = await findClassTemp({ istemplate: 1 })

      for (let i = 0; i < classList.length; i++) {

        classList[i].userid = model.userid
        classList[i].openid = model.openid
        classList[i].icon_sort = i
        await setClassIcon(classList[i], t)
      }


    }).catch((err) => {
      console.log('-------err---------', err);
    })

    userInfo = await getUserInfo(model);
  }
  const payLoad = {
    id: userInfo[0].id,
    openid: model.openid,
  };

  const token = getToken(payLoad)
  return {
    code: 200,
    msg: "登陆成功",
    token: "Bearer " + token,
    ...userInfo
  };
}



//刷新token
export async function refreshToken(model) {
  let userInfo = await getUserInfoById(model)

  const payLoad = {
    id: userInfo[0].id,
    openid: userInfo[0].openid,
  };

  const token = getToken(payLoad)
  return {
    code: 200,
    msg: "token刷新",
    token: "Bearer " + token,
    ...userInfo
  };
}
