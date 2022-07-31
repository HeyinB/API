//mysqlConfig.js
var mysql = require('mysql');
var config = require('../config/config');

const Sequelize = require('sequelize');
const pool = new Sequelize(config.db.DATABASE, config.db.USERNAME, config.db.PASSWORD, {
    host: config.db.HOST,
    port: config.db.dbPort,
    dialect: config.db.dbDialect,
    pool: config.db.dbPool,
    logging: true,
    timezone: '+08:00'
})

pool.authenticate().then(function() {
    console.log("数据库连接成功");
}).catch(function(err) {
    //数据库连接失败时打印输出
    console.log("数据库连接失败");
    console.error(err);
    throw err;
});


module.exports.pool = pool