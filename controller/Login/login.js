import axios from 'axios'
import * as api from '../../api/Login/login'

export async function LoginOrRegister(ctx) {
  let model = ctx.request.body;
  let url = "https://api.weixin.qq.com/sns/jscode2session?appid=wxd26d2dcc3e0de2d7&secret=f4d56f616d9b1cf61e47e46fee5fd32b&js_code=" +
    model.code +
    "&grant_type=authorization_code "

  let res = await axios({
    method: "GET",
    url
  });
  // console.log('-------res---------', res);
  /***data: {
    session_key: '+3DmsRYGyfxLtm7Z9B9G4A==',
    openid: 'oFTLj5KsqBnFAc5zAA1Sm0aap4gM'
  }*/
  let data = await api.LoginOrRegister(res.data)
  ctx.body = {
    code: 200,
    data
  }
}


export async function refreshToken(ctx) {
  console.log('-------ctx---------', ctx.request.body);
  let data = await api.refreshToken(ctx.request.body)

  ctx.body = {
    code: 200,
    data
  }
}

