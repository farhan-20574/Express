const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

const application_key = 'your_secret_key'; // Use a strong secret in production

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Dummy users array
const users = [
  { 
    id: 1,
    username: 'user123', 
    password: 'mypassword',
    first_Name: 'farhan',
    last_Name: 'khan',
    email: 'abc@yahoo.com',
  }
];

// Profile route (protected)
app.get('/profile', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, application_key);
    const user = users.find(u => u.id === decoded.user_id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.render('profile', { user });
  } catch (err) {
    return res.status(401).send({ message: 'Invalid token' });
  }
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

// Example product route
app.get('/products/:slug', (req, res) => {
  res.render('vaporfly');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
