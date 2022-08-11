
import * as sequelize from 'sequelize'
import db from '../../db/db'
import tools from '../../util/tools'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ScretKeys } from '../../config/config'

//登录
export async function LoginOrRegister(model) {
  let UserList = await this.findUserData('usercode', model)
  if (UserList.length === 0) {
    return {
      code: 404,
      msg: '用户不存在'
    }
  }
  let UserInfo = UserList[0]
  console.log(UserInfo, model.password);
  /**
   * bcrypt.compareSync(传入密码, 数据库密码)
   */
  let result = await bcrypt.compareSync(model.password, UserInfo.password)
  console.log(result);
  //验证通过
  if (result) {
    //返回token
    const payLoad = {
      id: UserInfo.id,
      usercode: UserInfo.usercode,
      password: UserInfo.password
    }
    const token = jwt.sign(payLoad, ScretKeys, { expiresIn: '1h' });
    return {
      code: 200,
      msg: '登陆成功',
      token: 'Bearer ' + token
    }
  } else {
    return {
      code: 400,
      msg: '密码错误'
    }
  }
}



//刷新token
export async function refreshToken(model) {
  return model
}
