import * as api from '../../api/User/user'

export async function findUserInfo(ctx) {
    let data = await api.findUserInfo(ctx.request.query)
    ctx.body = {
        code: 200,
        data
    }
}
