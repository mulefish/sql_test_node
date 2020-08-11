//const {Caller} = require('./caller.js');
//const caller = new Caller(); 
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'reports',
  password: 'password',
  port: 5432,
})


const get_count = () => {
    const sql = "select count(*) from test_table;"
    const begin = new Date().getTime()
    pool.query(sql, ( error, results) => {
        if ( error ) {
            console.log( error )
        } else {
            const delta = new Date().getTime() - begin
            console.log( "MS: ", delta, " RESULTS: ", JSON.stringify(results.rows[0]) ) 
            pool.end()
        }
    })
}



const do_arbitury_sql = (sql, msg) => {
    const begin = new Date().getTime()
    pool.query(sql, ( error, results) => {
        if ( error ) {
            console.log( error )
        } else {
            const delta = new Date().getTime() - begin
            console.log( "MS: ", delta, " COUNT ", results.rows.length, " ", msg )
            pool.end()
        }
    })
}

get_count()

