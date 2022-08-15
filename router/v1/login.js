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
Login.get('/refreshToken', async (ctx) => {
  await api.refreshToken(ctx)
})


module.exports = {
  Login
}
