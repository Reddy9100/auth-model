
require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const port = 3000;

const mysql = require("mysql2");

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
            console.log(result)
const connection = mysql.createConnection({
    host: "65.2.146.84",
    user: "root",
    password: "Admin@123456789!",
    database: "dockerdatabase"
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
