// This code implements a simple Express.js application with session management for user authentication. It includes routes for login, profile display, and logout functionality.
// The application uses express-session to manage user sessions and EJS as the templating engine for

const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your_secret_key', // Use a strong secret in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const users = [
  { id: 1, username: 'user123', password: 'mypassword', first_Name: 'farhan', last_Name: 'khan', email: 'abc@yahoo.com' }
];

// Middleware to protect routes
function requireLogin(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

// Login page
app.get('/login', (req, res) => {
  res.render('login', { error: false });
});

// Handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.render('login', { error: true });
  req.session.userId = user.id;
  res.redirect('/profile');
});

// Profile page (protected)
app.get('/profile', requireLogin, (req, res) => {
  const user = users.find(u => u.id === req.session.userId);
  if (!user) return res.status(404).send('User not found');
  res.render('profile', { user });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

app.listen(3000, () => console.log('Server running on port 3000'));
