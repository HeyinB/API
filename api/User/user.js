import * as sequelize from "sequelize";
import db from "../../db/db";
import tools from "../../util/tools";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ScretKeys } from "../../config/config";

// import {find_user_count} from './userUtils'

export async function findUserData (str, model) {
    console.log('model',model)
    return {code:200,msg:'请求成功'}
}

// export async function getUserAllList (str, model) {
//     let sql = `select * from users`

//     let data = await db.pool.query(sql, {
//         replacements: {
//         }, type: sequelize.QueryTypes.SELECT
//     })
//     return data
// }

// await db.client.transaction(async function (t) {}).catch(
//     function (err) {
//     console.log('-------err---------',err);
//   })
//注册
// export async function register (model) {

//     let data = await find_user_count('usercode', model)
//     if(data[0].count > 0) {
//         return {
//             code: 201,
//             msg:'用户已存在'
//         }
//     } else {
//         let set_user_sql = `insert into users(username, usercode, password, create_data)
//                             values(:username,:usercode,:password,now())`
//         let data = await db.pool.query(set_user_sql, {
//             replacements: {
//                 username:model.username,
//                 usercode:model.usercode,
//                 password:tools._BCRYPT_(model.password)
//             }, type: sequelize.QueryTypes.INSERT
//         })
//         return data
//     }
// }

// //登录
// export async function login (model) {
//     let UserList = await this.findUserData('usercode', model)
//     if(UserList.length === 0){
//         return {
//             code:404,
//             msg:'用户不存在'
//         }
//     }
//     let UserInfo = UserList[0]
//     console.log(UserInfo, model.password);
//     /**
//      * bcrypt.compareSync(传入密码, 数据库密码)
//      */
//     let result = await bcrypt.compareSync(model.password, UserInfo.password)
//     console.log(result);
//     //验证通过
//     if(result) {
//         //返回token
//         const payLoad = {
//             id: UserInfo.id,
//             usercode: UserInfo.usercode,
//             password: UserInfo.password
//         }
//         const token = jwt.sign(payLoad, ScretKeys, { expiresIn: '1h' });
//         return {
//             code: 200,
//             msg: '登陆成功',
//             token: 'Bearer ' + token
//         }
//     } else {
//         return {
//             code: 400,
//             msg: '密码错误'
//         }
//     }
// }

export async function findUserById(model) {
  let findUserSql = `select * from user where user_openid=:id`;
  let data = await db.pool.query(findUserSql, {
    replacements: {
      id: model.openid,
    },
    type: sequelize.QueryTypes.SELECT,
  });
  return { code: 200, data: data[0] };
}

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
  const token = jwt.sign(payLoad, ScretKeys, { expiresIn: "30000" });
  return {
    code: 200,
    msg: "登陆成功",
    token: "Bearer " + token,
  };
}
