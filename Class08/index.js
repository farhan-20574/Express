const express = require('express');
const server = express();

const courseRouter = express.Router();

// Global middleware for all routes and methods
server.use((req, res, next) => {
    console.log('>>>>>>Middleware');
    next();
});

// CRUD routes
server.post('/user', (req, res) => {
    res.send('user created');
});
server.get('/users', (req, res) => {
    res.send('read all users');
});
server.patch('/user', (req, res) => {
    res.send('user updated');
});
server.delete('/user', (req, res) => {
    res.send('user deleted');
});

server.use('/', courseRouter);

server.listen(3000, () => {
    console.log('server started @ port 3000');
});