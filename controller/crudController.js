const connection = require("../model/crudModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
    try {
        const { name,email,password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query1 = "SELECT * FROM users WHERE email = ?";
        const [existingUsers, _] = await connection.query(query1, [email]);
        if (existingUsers.length !== 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        const query = "INSERT INTO users (name ,email,password) VALUES (?, ?, ?)";
        await connection.query(query, [name ,email ,hashedPassword]);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating new user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "mail and password are required" });
        }

        const query = "SELECT * FROM users WHERE email = ?";
        const [rows, _] = await connection.query(query, [email]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = rows[0];
        const hashedPassword = user.password;

        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        if (isPasswordValid) {
            const token = jwt.sign({ usermail: user.mail }, "Dataevolve@112", { expiresIn: "1h" });
            return res.status(200).json({ message: "Login successful", token });
        } else {
            return res.status(401).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
module.exports = {
    signUpUser,
    loginUser
};

