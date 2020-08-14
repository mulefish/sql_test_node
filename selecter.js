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
                    //console.log( row )
                    for ( let k in row['pdoc'] ) {
                        let v = row['pdoc'][k]
                        type = typeof v
                        if ( type == 'number') {
                            console.log(  k + ":" + v)
                        } else if ( type == 'string') {
                            console.log(  k + ":" + v )
                        } else if ( type == 'object') {
                            if ( v == null ) {
                                // console.log("NULL for " + k )
                            } else {
                                console.log(  "\n\n................\n" + k + ":"+ JSON.stringify( v ))
                            }
                        }
                    }
                }    
            })

            // console.log(" 55 " + JSON.stringify(results.rows[55])) 

            console.log("FOUND " + results.rows.length + " MS " + delta ) 
            pool.end()
        }
    })
}

 



//do_arbitury_sql('select * from dummy_payments2 limit1 ', 1 )



const t1 = 1000000000
const t2 = 2000000000
const t3 = 2000000000

const ugly_select = `select pdoc, x.elem from dummy_payments2 t
cross join lateral (
    select elem
    from jsonb_array_elements(t.pdoc #> '{systemStatuses}') a(elem)
        where a.elem #>> '{timeStamp}' <= '${t3}'
        and a.elem #>> '{statusCode}' IN ('C01', 'S03') order by a.elem #>> '{timeStamp}' LIMIT 1 
    )x
    where ( pdoc #>> '{insertDtTm}')::double precision BETWEEN '${t1}' and '${t2}'
        and x.elem #>> '{statusCode}' != 'never find me'
        and ( pdoc #>> '{source}' not in ('nope')
)
`
do_arbitury_sql(ugly_select, 1 )



