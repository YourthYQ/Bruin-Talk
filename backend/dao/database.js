const { Sequelize } = require('sequelize');
const { config } = require('../config');
// 创建一个新的 Sequelize 实例

const sequelize = new Sequelize(
  config.mysql.database, // 数据库名称
  config.mysql.user, // 数据库用户名
  config.mysql.password, // 数据库密码
  {
    host: config.mysql.host, // 数据库主机地址
    dialect: 'mysql', // 数据库类型为 MySQL
    pool: { // 连接池配置
      max: 5, // 最大连接数为 5
      min: 0, // 最小连接数为 0
      acquire: 30000, // 获取连接超时时间为 30000 毫秒
      idle: 10000 // 连接空闲超时时间为 10000 毫秒
    },
    timezone: '+08:00', // 设置时区为东八区
    logging: false, // 是否开启日志输出
    operatorsAliases: true, // 是否使用别名操作符
    define: { // 模型定义配置
      timestamps: true // 不使用时间戳
    }
  }
);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Sequelize Model Synchronization Succeeded');
  })
  .catch((error) => {
    console.error('Sequelize Model Synchronization Failed: ', error);
  });

module.exports = sequelize;