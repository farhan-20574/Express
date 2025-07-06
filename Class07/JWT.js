// JWT Authentication Example with Express.js
// This example demonstrates how to implement JWT authentication in an Express.js application.

const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');

const application_key = 'your_secret_key'; // Use a strong secret in production

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Dummy users array.
const users = [
  {
    id: 1,
    username: 'user123',
    password: 'mypassword',
    first_Name: 'farhan',
    last_Name: 'khan',
    email: 'abc@yahoo.com',
  },
  {
    id: 2,
    username: 'user456',
    password: 'mypassword2',
    first_Name: 'john',
    last_Name: 'doe',
    email: 'john.doe@example.com',
  }
];

// Middleware to protect routes (require login)
function requireLogin(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).redirect('/login');
  }
  try {
    const decoded = jwt.verify(token, application_key);
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    return res.status(401).redirect('/login');
  }
}

// Profile route (protected)
app.get('/profile', requireLogin, (req, res) => {
  const user = users.find(u => u.id === req.user.user_id);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  res.render('profile', { user });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).render('login', { error: true });
  }
  const token = jwt.sign({ user_id: user.id }, application_key, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
  res.redirect('/profile');
});

// Render login page
app.get('/login', (req, res) => {
  res.render('login', { error: false });
});

// Render profile page
app.get('/profile', (req, res) => {
  res.render('profile', { error: false })
})

// Logout route
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
