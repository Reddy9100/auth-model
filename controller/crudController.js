const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../index");

// Controller function for user signup
const signUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the password is provided
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Using salt round 10

        // Check if the email already exists
        const [existingUsers] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUsers.length !== 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Insert the new user into the database
        await connection.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        // Respond with success message
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating new user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller function for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Query user from the database
        const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = rows[0];
        const hashedPassword = user.password;

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        if (isPasswordValid) {
            // Create JWT token
            const token = jwt.sign({ usermail: user.email }, "Dataevolve@112", { expiresIn: "1h" });
            return res.status(200).json({ message: "Login successful", token });
        } else {
            return res.status(401).json({ error: "Invalid email or password" });
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
