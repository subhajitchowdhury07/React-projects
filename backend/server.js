const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'signup'
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM login WHERE email = ?"; // Select user by email
    
    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
        if (data.length === 0) {
            return res.status(400).json({ message: "Email not found" });
        }

        // Email found, check if password matches
        const user = data[0];
        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Email and password match
        return res.status(200).json({ message: "Success" });
    });
});
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)"; // Corrected typo in SQL query
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("error");
        }
        return res.json(data);
    });
});

app.listen(8087, () => {
    console.log("Listening");
});
