import * as api from '../../api/Login/login'

export async function LoginOrRegister(ctx) {
  let data = await api.LoginOrRegister(ctx.request.body)
  ctx.body = data
}


export async function refreshToken(ctx) {
  console.log('-------ctx---------', ctx);
  let data = await api.refreshToken(ctx.request.body)
  ctx.body = data
}

