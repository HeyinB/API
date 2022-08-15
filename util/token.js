
import jwt from "jsonwebtoken";
import { ScretKeys } from "../config/config";



const Time = '30000'

const getToken = function (payLoad) {
  return jwt.sign(payLoad, ScretKeys, { expiresIn: Time });
}

const authToken = async function (ctx, next) {

  try {
    let pass = ['/v1/login/LoginOrRegister', '/v1/login/refreshToken']
    let url = ctx.request.url, AllToken = ctx.request.header.authorization
    if (url === '/favicon.ico') return;

    console.log('-------url---------', url);
    if (!pass.includes(url)) {
      if (!AllToken) throw new errs.AuthFailed()

      const parts = AllToken.split(' ');
      jwt.verify(parts[1], ScretKeys, async (err, decoded) => {
        if (err) {
          switch (err.name) {
            case 'JsonWebTokenError':
              throw new errs.AuthFailed('无效的token', 10102)
            case 'TokenExpiredError':
              throw new errs.AuthFailed('token过期', 10010)
            default:
              throw new errs.AuthFailed()
          }
        } else {
          await next()
        }
      })
    } else {
      await next()
    }
  } catch (err) {
    if (err.errorCode) {
      ctx.status = err.status || 500
      ctx.body = {
        code: err.code,
        message: err.message,
        errorCode: err.errorCode,
        request: `${ctx.method} ${ctx.path}`,
      }
    } else {
      // 触发 koa app.on('error') 错误监听事件，可以打印出详细的错误堆栈 log
      ctx.app.emit('error', err, ctx)
    }
  }
}


module.exports = {
  getToken,
  authToken
}
