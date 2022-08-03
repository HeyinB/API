
import { readFile } from './util'
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'
import passport from 'koa-passport'
import cors from 'koa2-cors'
import { ScretKeys } from './config/config'
import jwt from "jsonwebtoken";


let app = new Koa();
app.use(bodyParser());
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
require('./util/passport')(passport)

app.use(function (ctx, next) {
    let pass = ['/v1/user/LoginOrRegister', '/v1/user/refreshToken']
    let url = ctx.request.url, AllToken = ctx.request.header.authorization

    console.log('----------------', url);
    // if (!pass.includes(url) && AllToken) {
    //     console.log('-------ctx.request---------进来了');
    //     const parts = AllToken.split(' ');
    //     let statu = jwt.verify(parts[1], ScretKeys, (err, decoded) => {
    //         if (err) {
    //             console.log(err.name)
    //             let res = {}
    //             switch (err.name) {
    //                 case 'JsonWebTokenError':
    //                     console.log('无效的token')
    //                     // res.status(403).send({ code: -1, msg: '无效的token' });
    //                     res = {
    //                         code: 403,
    //                         msg: '无效的token'
    //                     }
    //                     break;
    //                 case 'TokenExpiredError':
    //                     // res.status(403).send({ code: -1, msg: 'token过期' });
    //                     res = {
    //                         code: 403,
    //                         msg: 'token过期'
    //                     }
    //                     break;
    //             }
    //             return res
    //         }
    //     })
    //     ctx.body = statu
    // } else {
    //     next()
    // }


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

