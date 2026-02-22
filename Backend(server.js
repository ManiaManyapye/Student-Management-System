const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'students_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Get all students
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Add student
app.post('/students', (req, res) => {
    const { name, course } = req.body;
    db.query('INSERT INTO students (name, course) VALUES (?, ?)',
        [name, course], (err) => {
            if (err) throw err;
            res.json({ message: 'Student added successfully' });
        });
});

// Delete student
app.delete('/students/:id', (req, res) => {
    db.query('DELETE FROM students WHERE id=?',
        [req.params.id], (err) => {
            if (err) throw err;
            res.json({ message: 'Student deleted' });
        });
});

app.listen(3000, () => console.log('Server running on port 3000'));