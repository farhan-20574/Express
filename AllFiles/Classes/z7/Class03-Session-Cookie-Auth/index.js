const express = require('express');
const server = express();

const { courseRouter } = require('./courses.js')
const { attendanceRouter } = require('./attandance.js')

server.use('/courses', courseRouter);
server.use('/att-rec', attendanceRouter);
server.listen(3000, () => {
    console.log('Server started on port 3000')
});