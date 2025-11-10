const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'hwnode',
    password: 'nodepass',
    database: 'hw'
});

module.exports = pool;
