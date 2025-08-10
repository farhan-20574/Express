const fsPromises = require('fs/promises')
const fs = require('fs')

const validations = require('./validations');
const express = require('express');
const app = express()

app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))


app.use((req,res,next)=>{
    const cookies = cookieParser(req.headers)
    req.cookies = cookies
    next()
})

const sessions = {}
const users = [
    {
        id: 1,
        username: 'pakistan123',
        password: '1234'
    }
]
app.post('/login', (req,res) => {
    const {username, password} = req.body || {};
    if(!username || !password) return res.status(422).send('Username & password required');
    const user = users.find(u=> u.username === username && u.password === password);
    if(!user) return res.status(401).send('Credentials dont match');

    const sessionId = (Math.ceil(Math.random() * 100000000)).toString();
    sessions[sessionId] = user.id;
    res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/;`);
    res.send({
        message: 'Successfully logged in'
    })
})

const checkAuth = (req,res,next) => {
    console.log(req.cookies)
    if(!req.cookies.sessionId || !sessions[req.cookies.sessionId]) return res.status(401).send('Unauthorized');
    next()
}

app.get('/dashboard', checkAuth,(req, res)=>{
    res.send('Protected Data')
})


const PORT = 3000
app.listen(PORT, () => {
    console.log('Server started at', `http://localhost:${PORT}`)
})