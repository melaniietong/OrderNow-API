const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "4656",
    host: "localhost",
    port: 4532,
    database: "ordernow"
})

module.exports = pool;