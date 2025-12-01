require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "pg",
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: process.env.PG_PORT
    },
    migrations: {
      directory: "./src/db/migrations",
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "pg",
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: process.env.PG_PORT
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: "./src/db/migrations",
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: process.env.PG_PORT
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: "./src/db/migrations",
      tableName: "knex_migrations"
    }
  }

};
