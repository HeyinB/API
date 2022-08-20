import * as api from '../../api/Bill/bill'

export async function getbill(ctx) {
    let data = await api.getbill(ctx.request.query)
    ctx.body = {
        code: 200,
        data
    }
}
