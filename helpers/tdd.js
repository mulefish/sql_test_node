const { getPdoc } = require("./pdoc_factory")
const { get_connection } = require("./db_connection") 

function test_pdoc() {
    let pdoc = getPdoc()
    const isOk = pdoc != undefined
    if ( isOk == true ) {
        console.log("### PASS test_pdoc")
    } else {
        console.log("### FAIL The test_pdoc found some issue with the PdocFactory!")
    }
}


function test_connection_setup(){ 
    const obj = get_connection()
    let isOk = true
    const expected = [
        'user', 'host', 'database','password','port'
    ]
    expected.forEach((key)=>{
        if ( obj.hasOwnProperty(key)) {
            if ( obj[key] != undefined ) {
                // pass
            } else {
                isOk = false
                console.log("Impossible value for " + key + " found in function test_connection_setup")
            }
        } else {
            isOk = false
            console.log("Missing key " + key + " found in function test_connection_setup")
        }
    })

    if ( isOk == true ) {
        console.log("### PASS test_connection_setup")
    } else {
        console.log("### FAIL test_connection_setup")
    }
}

function test_get_next_letter() { 
    // https://stackoverflow.com/questions/2256607/how-to-get-the-next-letter-of-the-alphabet-in-javascript
    const getNextKey = (key) => {
        if (key === 'Z' || key === 'z') {
            return String.fromCharCode(key.charCodeAt() - 25) + String.fromCharCode(key.charCodeAt() - 25); // AA or aa
        } else {
            const lastChar = key.slice(-1);
            const sub = key.slice(0, -1);
          if (lastChar === 'Z' || lastChar === 'z') {
                // If a string of length > 1 ends in Z/z,
                // increment the string (excluding the last Z/z) recursively,
                // and append A/a (depending on casing) to it
            return getNextKey(sub) + String.fromCharCode(lastChar.charCodeAt() - 25);
          } else {
                // (take till last char) append with (increment last char)
                return sub + String.fromCharCode(lastChar.charCodeAt() + 1);
          }
        }
        return key;
    } 
    let result = []
    let letter= 'x'
    for ( let i = 0 ; i < 3; i++ ) { 
        letter= getNextKey(letter)
        result.push(letter)
    }
    const expected = ['y', 'z', 'aa']
    let isOk = true
    expected.forEach((item, i)=>{
        if ( item !== result[i]) {
            isOk = false
        }
    })

    if ( isOk == true ) {
        console.log("### PASS get_next_letter ( for id? ( not in use yet, actually ) ) ")
    } else {
        console.log("### FAIL The test_get_next_letter found getNextKey!")
    }
} 




test_pdoc()
test_connection_setup()
test_get_next_letter() // Not in use

