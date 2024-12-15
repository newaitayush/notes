const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

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

        // Query the database for the username
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }

            if (result.length === 0 || result[0].password !== password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate a JWT token
            const token = jwt.sign({ username: result[0].username }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({ message: 'Login successful', token });
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
