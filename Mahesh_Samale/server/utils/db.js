const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Mahesh@123',
  database: 'vijay', // your DB name
});

module.exports = pool;
