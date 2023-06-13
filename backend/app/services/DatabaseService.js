const constants = require('../constants');
const knex = require('knex');

const createConnection = () => {
  const knexInstaince = knex({
    client: 'mysql',
    connection: {
      host: constants.dbHost,
      port: constants.dbPort,
      user: constants.dbUser,
      password: constants.dbPassword,
      database: constants.dbName
    }
  });

  knexInstaince.on('start', (builder) => {
    console.log(builder.toQuery());
  });

  return knexInstaince;
}

module.exports = {
  createConnection
}