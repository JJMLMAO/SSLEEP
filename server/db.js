const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'dba',
  password: 'databaseboi123',
  host: 'localhost',
  port: 5432,
  database: 'ssleep',
});

module.exports = pool;
