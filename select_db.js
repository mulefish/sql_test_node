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
            results.rows.forEach((row, i)=>{
                const ary = row["info"]["systemStatus"]
                console.log( ary ) 
                console.log("\n")
            })
            pool.end()
        }
    })
}


// const tricksy_sql = "select jsonb_build_object('pdoc', t.info) from test_table_100 t limit 2 "
const tricksy_sql = `
select t.info from test_table_100 t 
CROSS JOIN LATERAL ( select elem from t.info #> '{systemStatus}' a(elem)
WHERE a.elem #>> '{timestamp}' > 0 order by a.elem #>> '{timestamp}' 
`

//get_count()
do_arbitury_sql(tricksy_sql)
