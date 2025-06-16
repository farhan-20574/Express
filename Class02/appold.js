const express = require('express');

const app = express();

const users = []


app.use((req, res, next) => {
    console.log('INSIDE MIDDLEWARE');
    next();
});

// app.get('/users', (req, res) => {
//     console.log('INSIDE ROUTE GET');
//     res.status (201).send('GET request received');
    
// });

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

// app.get('/users/{:username}', (req, res) => {
//     console.log(req.params.username);
//     res.send('GET request received');
// });

app.post('/', (req, res) => {
    console.log(req.params.username);
    res.send('POST request received');
});

function createUserID() {
    return Date.now();
}

app.post('/users', (req, res) => {
    let newUser = {
        id: createUserID(),
        username: 'farrukh',
        age: 34,
    };
    users.push(newUser);
    console.log(users);
    res.status(200).send('User created');
});

function isUserIdMatch(u, userId) {
    return u.id === userId;
}


app.get('/users/:id', (req, res) => {
    // const userId = parseInt(req.params.id);
    const user = users.find((u)=>u.id == req.params.id);
    if (user) {
        res.status(200).send(JSON.stringify(user));
    } else {
        res.status(404).send('User not found');
    }
});


app.get('/users/username/:username', (req, res) => {
    const username = req.params.username;
    const user = users.find(function(u) {
        return u.username === username;
    });
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(3000, () => {
    console.log('Server is running on Port 3000');
});