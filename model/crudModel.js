
const Mysql = require("mysql2/promise")

const pool =Mysql.createPool({
    host:"localhost",
    database : "test_db2",
    user : "root",
    password : "root123"
})

module.exports = pool