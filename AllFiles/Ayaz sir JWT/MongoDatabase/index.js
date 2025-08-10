const { cookieParser } = require('./utils')
const express = require('express')
const app = express()

const { userRouter } = require('./routes/UserRouter')
const { loginRouter } = require('./routes/LoginRouter')
const { dashboardRouter } = require('./routes/DashboardRouter')
const { AuthService } = require('./services/auth')
const auth = new AuthService()

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

app.use((req, res, next) => {
    const cookies = cookieParser(req.headers)
    req.cookies = cookies
    next()
})

app.post('/logout', auth.isAuthenticated, (req, res) => {
    res.setHeader('Set-Cookie', `sessionId=; HttpOnly; Path=/;`);
    res.redirect('/login')
})

app.use('/', dashboardRouter)
app.use('/login', loginRouter)
app.use('/users', userRouter)

const PORT = 3000
app.listen(PORT, () => {
    console.log('Server started at', `http://localhost:${PORT}`)
})