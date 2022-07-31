//defaultConfig.js
import passport  from 'koa-passport'
const config = {
    // 数据库配置
    db: {
        DATABASE: 'riceaccount', //数据库名称
        USERNAME: 'root', //mysql用户名
        PASSWORD: '514544Hyb', //mysql密码
        PORT: '3306', //mysql端口号
        HOST: '47.97.214.217', //服务器ip
        dbDialect: 'mysql',
        timezone: '+8:00',
        dbPort: 3306,
        dbPool: {
          min: 0,
          max: 50,
          idle: 10000,
          acquire: 10000,
          evict: 10000,
          handleDisconnects: true
      }
    },
    ScretKeys: 'scret',
    JWT: passport.authenticate('jwt', {session: false})
}

module.exports = config