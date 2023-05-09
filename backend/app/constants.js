const constants = {
  serverPort: process.env.SERVER_PORT || 8080,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 3306,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASS,
  dbName: 'smart_light'
};

module.exports = Object.freeze(constants);