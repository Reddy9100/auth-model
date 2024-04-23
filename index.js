<<<<<<< HEAD
require("dotenv").config()
=======
>>>>>>> 02369c7de7626d765f083e3947ae7f477b214686
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const port = 3000;

const mysql = require("mysql2");

<<<<<<< HEAD
const host = process.env.HOST
console.log(host)

const connection = mysql.createConnection({
   host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const routesOfUser = require("./routes/crudRotes");

function startServer() {
    connection.connect(function(err) {
        if (err) {
            console.error("ERR WHILE CONNECTING TO DB", err);
            return;
        }
        console.log("DATABASE_CONNECTION_ESTABLISHED");

        const query = "SELECT * FROM users";
        connection.query(query, function(err, result) {
            if (err) {
                console.error("ERROR EXECUTING QUERY", err);
                return;
            }
            console.log(result);

=======
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "test_db2"
});

const routesOfUser = require("./routes/crudRotes");

function startServer() {
    connection.connect(function(err) {
        if (err) {
            console.error("ERR WHILE CONNECTING TO DB", err);
            return;
        }
        console.log("DATABASE_CONNECTION_ESTABLISHED");

        const query = "SELECT * FROM users";
        connection.query(query, function(err, result) {
            if (err) {
                console.error("ERROR EXECUTING QUERY", err);
                return;
            }
            console.log(result);

>>>>>>> 02369c7de7626d765f083e3947ae7f477b214686
            app.listen(port, function() {
                console.log(`SERVER CONNECTION IS ESTABLISHED WITH PORT ${port}`);
            });
        });
    });
}

startServer();

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api", routesOfUser);
