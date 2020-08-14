const { getPdoc } = require("./helpers/pdoc_factory")
const { get_connection } = require("./helpers/db_connection") 
const Pool = require('pg').Pool
const pool = new Pool(get_connection())

const insertJsonObject = (i, limit ) => {
  const pdoc = getPdoc()
  raw_sql = "INSERT INTO dummy_payments2 (pdoc) VALUES($1)"

  if ( i == 0 ) { 
      console.log( "limit: " + limit + "  : " + raw_sql )
  }
  pool.query(raw_sql, [pdoc], (error, results) => {
    if (error) {
      console.log("Error " + error )
      pool.end()
    } else {
      if ( i > 0 && i % 1000 == 0 ) {
        let t2 = new Date() 
        let elapsed = t2.getTime() - t1.getTime() 
        t1 = t2
        console.log( "Passing " + i + " of " + limit + " in (ms) " + elapsed )
      }
      if ( i >= ( limit - 1 ) ) {
        console.log("Exiting now")
        pool.end()
      }
    }
  })
}



let t1 = new Date() 
let limit = 100000
for ( let i = 0; i < limit; i++ ) {
  insertJsonObject(i, limit)
}





