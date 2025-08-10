const express = require('express');
const fs =require('fs')
const routes = require('./src/controllers/routes');

const app = express();
app.set('view engine', 'ejs');


// Middleware specific to this router
app.use((req, res, next) => {
  console.log('Users Router accessed at:', Date.now());
  next();
});



routes.get('/login', (req, res) => {
  res.render('src/views/login');
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server app started at http://localhost:${PORT}`);
});