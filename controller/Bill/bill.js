import * as api from '../../api/Bill/bill'

export async function getbill(ctx) {
    let data = await api.getbill(ctx.request.query)
    ctx.body = {
        code: 200,
        data
    }
}


export async function setbill(ctx) {
    let data = await api.setbill(ctx.request.body)
    ctx.body = {
        code: 200,
        data
    }
}
