
import * as sequelize from 'sequelize'
import db from '../../db/db'
import { _BCRYPT_ } from '../../util/tools'

export async function findUserData(str, model) {
  let sql = `select * from users where `
  let where = ''
  switch (str) {
    case 'id':
      where += 'id = :id'
      break;
    case 'username':
      where += 'username = :username'
      break;
    case 'usercode':
      where += 'usercode = :usercode'
      break;
  }

  let data = await db.pool.query(sql + where, {
    replacements: {
      id: model.id || '',
      username: model.username || '',
      usercode: model.usercode || ''
    }, type: sequelize.QueryTypes.SELECT
  })
  return data
}

export async function getUserAllList(str, model) {
  let sql = `select * from users`

  let data = await db.pool.query(sql, {
    replacements: {
    }, type: sequelize.QueryTypes.SELECT
  })
  return data
}


// await db.client.transaction(async function (t) {}).catch(
//     function (err) {

// INSERT, transaction: t
//     console.log('-------err---------',err);
//   })
//注册
export async function register(model) {

  let data = await find_user_count('usercode', model)
  if (data[0].count > 0) {
    return {
      code: 201,
      msg: '用户已存在'
    }
  } else {
    let set_user_sql = `insert into users(username, usercode, password, create_data)
                            values(:username,:usercode,:password,now())`
    let data = await db.pool.query(set_user_sql, {
      replacements: {
        username: model.username,
        usercode: model.usercode,
        password: _BCRYPT_(model.password)
      }, type: sequelize.QueryTypes.INSERT
    })
    return data
  }
}


//登录

export async function LoginOrRegister(model) {
  // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
  console.log("--model-----", model);
  if (!model) {
    throw new errs.ParameterException()
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

export async function findEE(model) {
  return model
}
