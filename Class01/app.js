const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('INSIDE MIDDLEWARE');
    next();
});

app.get('/users', (req, res) => {
    console.log('INSIDE ROUTE');
    res.send('GET request received');
});

app.get('/users/{:username}', (req, res) => {
    console.log(req.params.username);
    res.send('GET request received');
});

app.post('/', (req, res) => {
    console.log(req.params.username);
    res.send('POST request received');
});

app.listen(3000, () => {
    console.log('Server is running on Port 3000');
});