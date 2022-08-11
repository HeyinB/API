import Router from 'koa-router'
import * as user from '../../controller/User/user'
import { JWT } from '../../config/config'

const User = new Router({
    prefix: '/v1/user'
})

User.get('/findUserInfo', JWT, async (ctx) => {
    await user.findUserInfo(ctx)
})


module.exports = {
    User
}
