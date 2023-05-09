const constants = require('../constants');
const knex = require('knex');

const createConnection = () => {
  return knex({
    client: 'mysql',
    connection: {
      host: constants.dbHost,
      port: constants.dbPort,
      user: constants.dbUser,
      password: constants.dbPassword,
      database: constants.dbName
    }
  });
}

module.exports = {
  createConnection
}