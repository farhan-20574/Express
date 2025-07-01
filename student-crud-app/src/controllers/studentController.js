class StudentController {
    constructor() {
        this.students = require('../data/students.json');
    }

    createStudent(req, res) {
        const newStudent = req.body;
        this.students.push(newStudent);
        res.status(201).json(newStudent);
    }

    getAllStudents(req, res) {
        res.status(200).json(this.students);
    }

    getStudentById(req, res) {
        const studentId = parseInt(req.params.id);
        const student = this.students.find(s => s.id === studentId);
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    }

    updateStudent(req, res) {
        const studentId = parseInt(req.params.id);
        const index = this.students.findIndex(s => s.id === studentId);
        if (index !== -1) {
            const updatedStudent = { ...this.students[index], ...req.body };
            this.students[index] = updatedStudent;
            res.status(200).json(updatedStudent);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    }

    deleteStudent(req, res) {
        const studentId = parseInt(req.params.id);
        const index = this.students.findIndex(s => s.id === studentId);
        if (index !== -1) {
            this.students.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    }
}

module.exports = new StudentController();