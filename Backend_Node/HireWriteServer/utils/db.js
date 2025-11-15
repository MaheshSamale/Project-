const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Rutuja0802@',
    database: 'hw'
});

module.exports = pool;
