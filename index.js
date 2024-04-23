const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const port = 3000;

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "test_db2"
});

const routesOfUser = require("./routes/crudRoutes");

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
