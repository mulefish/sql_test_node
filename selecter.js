const { get_connection } = require("./helpers/db_connection") 
const Pool = require('pg').Pool
const pool = new Pool(get_connection())




const do_arbitury_sql = (sql, limit) => {
    const begin = new Date().getTime()
    pool.query(sql, ( error, results) => {
        if ( error ) {
            console.log( error )
        } else {
            const delta = new Date().getTime() - begin
            results.rows.forEach((row, i)=>{
                if ( i < limit ) {
                    console.log( JSON.stringify( row['pdoc'] ) )
                }    
            })
            pool.end()
        }
    })
}



// const tricksy_sql = "select jsonb_build_object('pdoc', t.info) from test_table_100 t limit 2 "
// const tricksy_sql = `
// select t.info from dummy_payments2 t 
// CROSS JOIN LATERAL ( select elem from t.info #> '{systemStatus}' a(elem)
// WHERE a.elem #>> '{timestamp}' > 0 order by a.elem #>> '{timestamp}') 
// `
//get_count()
//do_arbitury_sql(tricksy_sql)


const easy_mode_sql = "select* from dummy_payments2"
const show_limit = 1 
do_arbitury_sql(easy_mode_sql, show_limit)


