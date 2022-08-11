import * as api from '../../api/User/user'

export async function findUserInfo(ctx) {
    ctx.body = await api.findUserInfo(ctx.request.query)
}
