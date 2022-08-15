
import * as sequelize from 'sequelize'
import db from '../../db/db'
import tools from '../../util/tools'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ScretKeys } from '../../config/config'

//登录
export async function LoginOrRegister(model) {
  // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
  console.log("--model-----", model);
  if (!model) {
    return { code: 500, msg: "登陆错误" };
  }

  let userData = await findUserById(model);

  if (userData.data.length <= 0) {
    let insertSql = `insert into user(user_openid) values(:user_openid)`;
    let data = await db.pool.query(insertSql, {
      replacements: {
        user_openid: model.openid,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    userData = await findUserById(model);
  }

  //   let result = await bcrypt.compareSync(model.openid, userData.data.user_openid)
  const payLoad = {
    id: userData.data.id,
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
  return model
}
