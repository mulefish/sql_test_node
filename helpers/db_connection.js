
const info = {
    user: 'me',
    host: 'localhost',
    database: 'reports',
    password: 'password',
    port: 5432,
}

const get_connection=()=>{
    return info
}

module.exports = {
    get_connection
}