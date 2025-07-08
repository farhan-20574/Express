const express = require('express');
const IndexController = require('.');

const router = express.Router();
const indexController = new IndexController();

// Home page
router.get('/', indexController.home.bind(indexController));

// Home page (GET)
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

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

module.exports = router;