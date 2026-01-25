// Load from environment variables. Copy .env.example to .env and set values.
// Never commit .env or real secrets to git.
module.exports.config = {
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'chatroom',
  },
  jwtc: {
    sessionSecret: process.env.JWT_SECRET || 'dev-secret-do-not-use-in-production',
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-do-not-use-in-production',
  },
};
