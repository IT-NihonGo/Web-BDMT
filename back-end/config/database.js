require('dotenv').config()

module.exports = {
  local: {
    host: process.env.DB_LOCAL_HOST,
    username: process.env.DB_LOCAL_USERNAME,
    password: process.env.DB_LOCAL_PASSWORD,
    port: process.env.DB_LOCAL_PORT,
    database: process.env.DB_LOCAL_DBNAME,
    dialect: 'mysql', // Dialect needs to be explicitly supplied
  },
  remote: {
    host: process.env.DB_REMOTE_HOST,
    username: process.env.DB_REMOTE_USERNAME,
    password: process.env.DB_REMOTE_PASSWORD,
    port: process.env.DB_REMOTE_PORT,
    database: process.env.DB_REMOTE_DBNAME,
    dialect: 'mysql', // Dialect needs to be explicitly supplied
  },
  vps: {
    host: process.env.DB_VPS_HOST,
    username: process.env.DB_VPS_USERNAME,
    password: process.env.DB_VPS_PASSWORD,
    port: process.env.DB_VPS_PORT,
    database: process.env.DB_VPS_DBNAME,
    dialect: 'mysql', // Dialect needs to be explicitly supplied
  },
  production: {
    host: process.env.DB_PRODUCTION_HOST,
    username: process.env.DB_PRODUCTION_USERNAME,
    password: process.env.DB_PRODUCTION_PASSWORD,
    port: process.env.DB_PRODUCTION_PORT,
    database: process.env.DB_PRODUCTION_DBNAME,
    dialect: 'mysql', // Dialect needs to be explicitly supplied
  }
};

