const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(require('cors')());


// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/student-management';

// Connect to MongoDB
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully! 🎉');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });


// Models
const { Student, Course, Enrollment } = require('./schema');

// CRUD Routes for Students
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find(); // Fetch all students
        res.json(students); // Send data back to frontend
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Error fetching students' });
    }
});

app.post('/students', async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json(newStudent);
});

// Add similar CRUD operations for `Courses` and `Enrollments`

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
