require('dotenv').config;

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_NAME, 
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD, 
      port: process.env.DATABASE_PORT
    },
    migrations: {
      tableName: 'migrations',
      directory: `${__dirname}/src/database/migrations` //caminho do arquivo que vai ser criado
    }, 
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
