const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Validate required fields
function validateUser(req, res, next) {
    const requiredFields = ['username', 'password', 'email'];
    const errors = {};

    for (const field of requiredFields) {
        if (!req.body[field]) {
            errors[field] = `${field} is required`;
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(422).send({ error: 'Validation error', fields: errors });
    }

    next();
}

// Only write to file
app.post('/users', validateUser, (req, res) => {
    // Read existing users
    let users = [];
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        // File might not exist or be empty — treat as empty array
        users = [];
    }

    const newUser = {
        id: users.length + 1,
        ...req.body
    };

    users.push(newUser);

    // Write updated user list to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));

    res.status(201).send({
        message: 'User written to file',
        user: newUser
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
