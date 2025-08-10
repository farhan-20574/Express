const express = require('express');
const StudentController = require('../controllers/studentController');

const router = express.Router();
const studentController = new StudentController();

router.post('/students', studentController.createStudent.bind(studentController));
router.get('/students', studentController.getAllStudents.bind(studentController));
router.get('/students/:id', studentController.getStudentById.bind(studentController));
router.put('/students/:id', studentController.updateStudent.bind(studentController));
router.delete('/students/:id', studentController.deleteStudent.bind(studentController));

module.exports = router;