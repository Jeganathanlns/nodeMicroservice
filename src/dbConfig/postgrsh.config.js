require('dotenv').config();
const pgp = require('pg-promise')();

const db = pgp({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  max: 10, // Pool size
});

module.exports = db;
