import Router from 'koa-router'
import * as user from '../../controller/User/user'
import { JWT } from '../../config/config'

const User = new Router({
    prefix: '/v1/user'
})
// ctx.body = ctx.request.body;
User.post('/register', async (ctx) => {
    await user.register(ctx)
})

User.post('/login', async (ctx) => {
    await user.login(ctx)
})

User.get('/findUserData', async (ctx) => {
    await user.findUserData(ctx)
})

User.get('/getUserAllList', async (ctx) => {
    await user.getUserAllList(ctx)
})

User.get('/findEE', JWT, async (ctx) => {
    console.log(ctx.state.user);
    await user.findEE(ctx)
})


module.exports = {
    User
}