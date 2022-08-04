
import jwt from "jsonwebtoken";
import { ScretKeys } from "../config/config";



const Time = '30000'

const getToken = function (payLoad) {
  return jwt.sign(payLoad, ScretKeys, { expiresIn: Time });
}

const authToken = async function (ctx, next) {
  let pass = ['/v1/user/LoginOrRegister', '/v1/user/refreshToken']
  let url = ctx.request.url, AllToken = ctx.request.header.authorization

  console.log('----------------', url);
  if (!pass.includes(url) && AllToken) {
    console.log('-------ctx.request---------进来了');
    const parts = AllToken.split(' ');
    let statu = jwt.verify(parts[1], ScretKeys, async (err, decoded) => {
      if (err) {
        console.log(err.name)
        let res = {}
        switch (err.name) {
          case 'JsonWebTokenError':
            console.log('无效的token')
            // res.status(403).send({ code: -1, msg: '无效的token' });
            res = {
              code: 403,
              msg: '无效的token'
            }
            break;
          case 'TokenExpiredError':
            // res.status(403).send({ code: -1, msg: 'token过期' });
            res = {
              code: 403,
              msg: 'token过期'
            }
            break;
        }
        return res
      } else {
        await next()
      }
    })
    ctx.body = statu
  } else {
    ctx.body = {
      code: 404,
      msg: '未找到'
    }
  }
}


module.exports = {
  getToken,
  authToken
}
