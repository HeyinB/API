import Router from 'koa-router'
import * as api from '../../controller/Login/login'

const Login = new Router({
  prefix: '/v1/login'
})

// 注册或者登录
Login.post('/LoginOrRegister', async (ctx) => {
  await api.LoginOrRegister(ctx)
})

// 刷新token
Login.post('/refreshToken', async (ctx) => {
  console.log('-----88888----------88888');
  await api.refreshToken(ctx)
})


module.exports = {
  Login
}
