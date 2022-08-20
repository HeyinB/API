import * as api from '../../api/classIcon/classicon'

export async function getOwnClassIcon(ctx) {
    let data = await api.getOwnClassIcon(ctx.request.query)
    ctx.body = {
        code: 200,
        data
    }
}
