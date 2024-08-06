// lib/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sample',
  password: 'password',
  port: 5433,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
