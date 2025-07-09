const express = require('express');
const IndexController = require('./index'); // Adjust path if needed

const router = express.Router();
const indexController = new IndexController();

// Home page (handled by controller)
router.get('/', indexController.home.bind(indexController));

// Login page (GET)
router.get('/login', (req, res) => {
  res.render('login');
});

// Renew password page (GET)
router.get('/renew', (req, res) => {
  res.render('renew');
});

// Forgot password page (GET)
router.get('/forget', (req, res) => {
  res.render('forget');
});

// Dashboard page (GET)
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Forgot password page (GET)
router.get('/forget', (req, res) => {
  res.render('forget');
});

// register new user page (GET)
router.get('/register', (req, res) => {
  res.render('register');
});

// profile page (GET)
router.get('/profile', (req, res) => {
  res.render('profile');
});




module.exports = router;