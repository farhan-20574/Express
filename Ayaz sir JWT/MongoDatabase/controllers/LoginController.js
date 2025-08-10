const { AuthService } = require('../services/auth')
const auth = new AuthService()
const fsPromises = require('fs/promises')
const path = require('path');

const { database } = require('../services/database')

module.exports = {
    
    show(req,res){
        res.render('auth/login',{ 
            title:'Login', 
            isAuthenticated: !!req.user,
            formData: {
                errors: auth.sessionStore.errors
            }
        })
        auth.sessionStore.errors = {}
    },
    async attempt(req,res) {
        const { username, password } = req.body || {};
        if (!username || !password) {
            auth.sessionStore.errors = {
                error: 'Username & password required'
            }
            return res.redirect('/login')
        }
        let users = [];
        try{
            // const dbPath = path.join(__dirname, '../database.json');
            // const contents = await fsPromises.readFile(dbPath, { encoding: 'utf8' });
            // const data = JSON.parse(contents)
            // users = data.users || []
            users = await database.collection('users').find().toArray()
        }catch(e) {
            console.log('>>> ERROR',e)
        }
        const user = users.find(u => u.username === username && u.password === password && !u.deleted_at);
        if (!user) {
            res.status(401)
            return res.render('auth/login', {
                title: 'Login', 
                formData: {
                    username: req.body.username,
                    errors: {
                        error: 'Credentials don\'t match'
                    }
                },
                isAuthenticated: !!req.user,
            })
        }
        const sessionId = auth.generateToken(user._id)
        res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/;`);
        res.redirect('/')
    }
}