const express = require('express');
const fs = require('fs');
const { readFile, writeFile } = require('fs/promises');

let users

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

app.use('/assets', express.static('public'))

/**
 * LOG request time and path in file
 * file name: access_logs.txt
 */
app.use((req, res ,next) => {
  const msg = `Request Time: ${ new Date() } :::: Request Path: ${ req.path } \n`
  
  // WRITE
  fs.appendFile('access_logs.txt', msg, (err) => {
    if (err) throw err;
  })

  next()
})



/**
 * CREATE NEW USER
 */
function createUserValidator(req, res, next) {
  if (!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.email || !req.body.age || !req.body.gender) {
    return res.status(400).send({ message: 'All fields are required' })
  }
  next()
}
app.post('/users', createUserValidator, async (req, res) => {
  let users = await readFile('data/users.json', 'utf8');

  users = users ? JSON.parse(users) : []; 
  
  
  const user = {
    id: Date.now(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender
  }

  users.push(user)

  await writeFile('data/users.json', JSON.stringify(users),'utf8', (err) => {
    if (err) throw err;
  })

  res.status(201).send({ message: 'User successfully created', user });

})

/**
 * READ ALL USERS
 * READ USER BY ID
 */
app.get('/users/{:id}', (req, res) => {
  if (!req.params.id) {
    return res.send(users)
  }
  const user = users.find((user) => user.id === parseInt(req.params.id))

  if (!user) return res.status(404).send({ message: 'User not found' })
  res.send(user);
})


/**
 * UPDATE USER BY ID
 */
app.patch('/users/:id', (req, res) => {
  if (!req.params.id) {
    return new Error('ID REQUIRED')
  }

  // const user = users.find((user) => user.id === parseInt(req.params.id))
  // if(!user) return res.status(404).send({ message: 'User not found' })
  // user.first_name = 'Jane';
  // user.last_name = 'Doe';

  const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id))
  if (userIndex === -1) return res.status(404).send({ message: 'User not found' })

  const updatedUser = {
    id: parseInt(req.params.id),
    first_name: 'Jane',
    last_name: 'Doe',
    username: 'jane_doe',
    email: 'jane@example.com',
    age: 22,
    gender: 'female'
  }

  // users.splice(userIndex,1,updatedUser)
  users[userIndex] = updatedUser;

  res.send(users);
})

/**
 * DELETE USER BY ID
 */
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id))
  if (userIndex === -1) return res.status(404).send({ message: 'User not found' });
  users.splice(userIndex, 1)
  res.send({ message: 'User successfully deleted' });
})




app.listen(3000, () => {
  console.log('Server is running on port 3000');
})