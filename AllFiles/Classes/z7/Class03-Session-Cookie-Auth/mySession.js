const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());


const users = [
    {
        id: 1,
        username: "myuser",
        password: "1234"
    }
]

const sessions = {}

app.get('/login', (req, res) => {
    res.end();
});




// Example route
app.post('/login', (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(422).send('Username and password are required');
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).send('Invalid credentials');

    const sessionId = Math.ceil(Math.random() * 1000000).toString();
    sessions[sessionId] = user.id;
    res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=3600`);
    res.send({
        massege: 'Login successful',
    });
});

function cookieParser(headers) {
    
    if (!headers.cookie) return ;
    for (let index = 0; index < headers.cookie.length; index++) {
        const cookieArr = headers.cookie.split(';');
        return {
            [cookieArr[0]]: cookieArr[1]
        }
    }

    app.use((req, res, next) => {
        const cookies = cookieParser(req.headers)   
        [cookies[0] = cookies]
        next()
    })
}
const checkAuth = (req, res, next) => {
    console.log('>>>>',req.headers.cookie);

    if (!sessionId || !sessions[sessionId]) return res.status(401).send('Unauthorized');
    next();
};
app.get('/dashboard', checkAuth, (req, res) => {
    res.send('Welcome to the dashboard');
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
