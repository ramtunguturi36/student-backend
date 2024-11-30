const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: Number,
    course: String
});

const courseSchema = new mongoose.Schema({
    course_name: { type: String, required: true },
    description: String
});

const enrollmentSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

module.exports = {
    Student: mongoose.model('Student', studentSchema),
    Course: mongoose.model('Course', courseSchema),
    Enrollment: mongoose.model('Enrollment', enrollmentSchema)
};
