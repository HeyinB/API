
import * as sequelize from 'sequelize'
import db from '../../db/db'

import { getUserInfo, getUserInfoById } from '../User/userPublic'
import { findUserInfo } from '../classIcon/classicon'
import { getToken } from "../../util/token"

//登录
export async function LoginOrRegister(model) {

  console.log('-------LoginOrRegister---------', model);
  let userInfo = await getUserInfo(model)
  if (userInfo.length <= 0) {
    await db.client.transaction(async function (t) {

      //查找icon的模板
      let classList = await findUserInfo({ istemplate: 1 })

      let insertUserSql = `insert into user(user_openid,name,avatar,gender) values(:user_openid,:nickName,:avatarUrl,:gender)`;
      await db.pool.query(insertUserSql, {
        replacements: {
          user_openid: model.openid,
          nickName: model.nickName,
          avatarUrl: model.avatarUrl,
          gender: model.gender,
        },
        type: sequelize.QueryTypes.INSERT, transaction: t
      });
    }).catch({


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
