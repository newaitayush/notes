// 1. Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');  // Import path module to handle file paths

// 2. Initialize the Express app
const app = express();

// 3. Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); // Serve files from the "public" folder

// 4. Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', // Replace with your MySQL password
    database: 'notes_app', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database!');
    }
});

// 5. Define API Endpoints

// Health Check Endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Serve your HTML file from the "public" folder
});

// Add a new note
app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    const query = "INSERT INTO notes (title, content) VALUES (?, ?)";
    db.query(query, [title, content], (err, results) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.status(201).json({ id: results.insertId, title, content });
        }
    });
});

// Retrieve all notes
app.get('/notes', (req, res) => {
    const query = "SELECT * FROM notes ORDER BY timestamp DESC";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Catch-all for serving any routes for the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Serve index.html for all other routes (single-page app)
});

// 6. Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
