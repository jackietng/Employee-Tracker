const { Pool } = require('pg'); 

const pool = new Pool(
    {
        user: 'postgres',
        password: 'ng6!giaTrang56',
        host: 'localhost',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
)

pool.connect();

module.exports = pool

