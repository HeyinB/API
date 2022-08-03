import * as api from '../../api/User/user'

export async function findUserData(ctx) {
    let data = await api.findUserData(ctx.request.query)
    ctx.body = data
}


export async function getUserAllList(ctx) {
    let data = await api.getUserAllList(ctx.request.query)
    ctx.body = data
}

export async function register(ctx) {
    let data = await api.register(ctx.request.body)
    ctx.body = data
}

export async function login(ctx) {
    let data = await api.login(ctx.request.body)
    ctx.body = data
}

export async function findEE(ctx) {
    let data = await api.findEE(ctx.request.body)
    ctx.body = data
}
