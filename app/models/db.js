require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool();

pool.connect()
  .then(() => console.log('DB OK'))
  .catch((err) => console.error(`DB NOK : ${err.message}`));

module.exports = pool;
