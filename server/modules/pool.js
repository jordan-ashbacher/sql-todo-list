const pg = require('pg')
const Pool = pg.Pool

const pool = new Pool ({
    database: 'weekend_to_do_app',
    host: 'localhost',
    port: 5432
})

pool.on('connect', () => {
    console.log('pg connected')
})

pool.on('error', (err) => {
    console.log(err)
})

module.exports = pool