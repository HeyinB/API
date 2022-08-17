
import jwt from "jsonwebtoken";
import { ScretKeys } from "../config/config";



const Time = '15d'

const getToken = function (payLoad) {
  return jwt.sign(payLoad, ScretKeys, { expiresIn: Time });
}

const authToken = async function (ctx, next) {

  let pass = ['/v1/login/LoginOrRegister', '/v1/login/refreshToken']
  let url = ctx.request.url, AllToken = ctx.request.header.authorization
  if (url === '/favicon.ico') return;

  console.log('-------url---------', url);
  if (!pass.includes(url)) {

    try {
      if (!AllToken) throw new errs.AuthFailed()

      const parts = AllToken.split(' ');
      let user = jwt.verify(parts[1], ScretKeys)
      ctx.state.user = user
    } catch (err) {
      if (err) {
        switch (err.name) {
          case 'JsonWebTokenError':
            console.log('-------10102--------');
            throw new errs.AuthFailed('无效的token', 10102)
          case 'TokenExpiredError':
            console.log('-------10010--------');
            throw new errs.AuthFailed('token过期', 10010)
          default:
            console.log('-------default--------');
            throw new errs.AuthFailed()
        }
      }
    }

    await next()
  } else {
    await next()
  }
}


module.exports = {
  getToken,
  authToken
}
