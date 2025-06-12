const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('INSIDE MIDDLEWARE');
    next();
});

app.get('/users', (req, res) => {
    console.log('INSIDE ROUTE GET');
    res.status (201).send('GET request received');
    
});

// app.post('/users', (req, res) => {
//     console.log('INSIDE ROUTE POST');
//     res.status (200).send('POST request received');
// });

app.put('/users', (req, res) => {
    console.log('INSIDE ROUTE PUT');
    res.status (200).send('PUT request received');
});

app.delete('/users', (req, res) => {
    console.log('INSIDE ROUTE DELETE');
    res.status(204).send('DELETE request received');
});

app.get('/users/{:username}', (req, res) => {
    console.log(req.params.username);
    res.send('GET request received');
});

app.post('/', (req, res) => {
    console.log(req.params.username);
    res.send('POST request received');
});
const users = []

app.post('/users', (req, res) => {
    
    
    let  newUsers = {
        id:1,
        username: 'farrukh',
        age: 34,

    }
    users.push(newUsers)
    console.log(users)
    res.status (200).send('User created');
       
    const moonLanding = Date.now();
            console.log(moonLanding);
// Expected output: 123
});




app.listen(3000, () => {
    console.log('Server is running on Port 3000');
});