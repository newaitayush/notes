const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        // Check if username already exists
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Hash the password before saving
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error hashing password' });
                }

                // Insert the new user into the database
                db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: 'Database error' });
                    }

                    return res.status(201).json({ message: 'Signup successful' });
                });
            });
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
