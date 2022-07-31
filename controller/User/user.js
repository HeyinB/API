import * as api from "../../api/User/user";
import axios from "axios";

export async function findUserData(ctx) {
    let data = await api.findUserData(ctx.request.query)
    ctx.body = data
}

// export async function getUserAllList(ctx) {
//     let data = await api.getUserAllList(ctx.request.query)
//     ctx.body = data
// }

// export async function register(ctx) {
//     let data = await api.register(ctx.request.body)
//     ctx.body = data
// }

// export async function login(ctx) {
//     let data = await api.login(ctx.request.body)
//     ctx.body = data
// }

// export async function loginORreg(ctx) {
//     let data = await api.loginORreg(ctx.request.body)
//     ctx.body = data
// }

export async function LoginOrRegister(ctx) {
  let model = ctx.request.body;
  let url = "https://api.weixin.qq.com/sns/jscode2session?appid=wxd26d2dcc3e0de2d7&secret=f4d56f616d9b1cf61e47e46fee5fd32b&js_code=" +
  model.code +
  "&grant_type=authorization_code "
  let res = await axios({
    method: "GET",
    url
  });
  let data = await api.LoginOrRegister(res.data);
  ctx.body = data;
}
