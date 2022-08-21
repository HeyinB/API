import Router from 'koa-router'
import * as api from '../../controller/Text/test'

const Text = new Router({
  prefix: '/v1/test'
})

Text.get('/test', async (ctx) => {
  await api.test(ctx)
})


module.exports = {
  Text
}
