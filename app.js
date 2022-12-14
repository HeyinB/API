
import { readFile } from './util'
import { authToken } from './util/token'
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'
import passport from 'koa-passport'
import cors from 'koa2-cors'
import errors from './util/http-exception'
global.errs = errors

let app = new Koa();
app.use(bodyParser());
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
require('./util/passport')(passport)

// token校验
app.use(async (ctx, next) => {
    try {
        await authToken(ctx, next)
    } catch (err) {
        if (err.errorCode) {
            ctx.status = err.status || 500
            ctx.body = {
                code: err.code,
                message: err.message,
                errorCode: err.errorCode,
                request: `${ctx.method} ${ctx.path}`,
            }
        } else {
            // 触发 koa app.on('error') 错误监听事件，可以打印出详细的错误堆栈 log
            ctx.app.emit('error', err, ctx)
        }
    }
});

const res = readFile(process.cwd() + '/router')
const mainRouter = new Router()
for (let file of res) {
    const mod = require(file)
    Object.keys(mod).forEach(key => {
        if (mod[key] instanceof Router) {
            mainRouter.use(mod[key].routes()).use(mod[key].allowedMethods())
        }
    })
}

const port = process.env.PORT || 5000

app.use(mainRouter.routes()).use(mainRouter.allowedMethods())

app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
})

