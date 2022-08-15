
import * as sequelize from 'sequelize'
import db from '../../db/db'
import tools from '../../util/tools'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ScretKeys } from '../../config/config'

import { getUserInfo } from '../User/userPublic'
import { getToken } from "../../util/token"

//登录
export async function LoginOrRegister(model) {

  let userInfo = await getUserInfo(model)
  if (userInfo.length <= 0) {
    let insertUserSql = `insert into user(user_openid) values(:user_openid)`;

    await db.pool.query(insertUserSql, {
      replacements: {
        user_openid: model.openid,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    userInfo = await getUserInfo(model);
  }
  console.log('------userInfo----------', userInfo);

  const payLoad = {
    id: userInfo[0].id,
    openid: model.openid,
  };

  const token = getToken(payLoad)
  return {
    code: 200,
    msg: "登陆成功",
    token: "Bearer " + token,
  };
}



//刷新token
export async function refreshToken(model) {
  let sql = `select * from user`
  return await db.pool.query(sql, {
    replacements: {
      ...model
    }, type: sequelize.QueryTypes.SELECT
  })
}
