const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const e = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

//set assets folder
app.use(express.static('public'));


app.user(cookieParser());

const users = [
  { username: 'user123', 
    password: mypassword,
    first_Name: 'farhan',
    last_Name: 'khan',
    email: 'abc@yahoo.com',
}];
const sessionID = {
    "asdf": {},
}

// Define a route to render the index view
app.get('/profile', (req, res) => {
    const userCookie = req.headers.cookie?.split('; ').find(cookie => cookie.startsWith('user='));
    const username = userCookie ? userCookie.split('=')[1] : null;
    
    if (!username) {
        return res.status(401).send({message: 'Unauthorized'});
    }
    
    const user = users.find(user => user.name === username);
    if (!user) {
        return res.status(404).send({message: 'User not found'});
    }
    
    res.render('profile', { user });
});
// 
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.name === username && user.password === password);
  if (!user) {
    return res.status(401).send({massege: 'Invalid username or password'});
  }
  res.sendHeader('Set-Cookie', `user=${user.name}; HttpOnly`);
app.get('/products/:slug', (req, res) => {
  res.render('vaporfly', 

    const sessionID = Date.now()+ Math.random();



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});