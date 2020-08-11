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

/* 
CREATE TABLE test_table (
ID serial NOT NULL PRIMARY KEY,
info jsonb NOT NULL
);
*/


const makeJsonBall = () => { 
  // Make a record with 1 to 10 status and timestamps 
  const n = 1 + Math.random() * 10 
  const statuses = ["A","B", "C","D","E"];
  let array = []  

  for ( let i = 0; i < n; i++ ) {
    const status = statuses[Math.floor(Math.random()*statuses.length)];
    // 2001 to 2033 
    let unix = 1000000000 + Math.random() * 1000000000
    unix = unix.toFixed(0)
    const obj = {
      "timestamp":unix,
      "status":status
    }
    array.push(obj)
  }
  return {"systemStatus":array }
}

const insertJsonObject = (i) => {
  const obj = makeJsonBall() 
  pool.query('INSERT INTO test_table (info) VALUES($1)', [obj], (error, results) => {
    if (error) {
      console.log("Error " + error )
      pool.end()
    } else {
      if ( i > 0 && i % 1000 == 0 ) {
        let t2 = new Date() 
        let elapsed = t2.getTime() - t1.getTime() 
        t1 = t2
        console.log( " Passing " + i + " of " + limit + " in (ms) " + elapsed )
      }
      if ( i >= ( limit - 1 ) ) {
        console.log(" Exiting now")
        pool.end()
      }
    }
  })
}
let t1 = new Date() 
let limit = 100000
for ( let i = 0; i < limit; i++ ) {
  insertJsonObject(i)
}


