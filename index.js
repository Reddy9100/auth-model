require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const port = 3000;

const mysql = require("mysql2/promise"); // Importing the promise-based version
const routesOfUser = require("./routes/crudRotes");

// Create MySQL connection
const connection = mysql.createConnection({
    host: "65.2.146.84",
    user: "root",
    password: "Admin@123456789!",
    database: "dockerdatabase"
});

// Function to start the server
function startServer(connection) {
    console.log("DATABASE_CONNECTION_ESTABLISHED");

    // Start the server once the database connection is established
    app.listen(port, function() {
        console.log(`SERVER CONNECTION IS ESTABLISHED WITH PORT ${port}`);
    });
}

// Start the server
startServer(connection);

// Define a basic route
app.get("/", (req, res) => {
    res.send("Hello world");
});

// Mount the CRUD routes
app.use("/api", routesOfUser);

module.exports = connection;
