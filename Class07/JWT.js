const express = require('express');
app = express();
const jwt = require('JWT');


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
  
  const user =users.find((user)=> user.username === req.body.username && user.password)
  //incase of faliure
  if (!user) return res.status(401).render('login', {error:true})
  //create session ID
  const token = jwt.sign({user_id: user.id}, application_key);
  // response user wtih token ID
  res.sendHeader('Set-Cookie', `token=${token}; HttpOnly;Path=/;Max-Age=3000`)});


app.get('/products/:slug', (req, res) => {
  res.render('vaporfly')}), 

    const sessionID = Date.now()+ Math.random();



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
