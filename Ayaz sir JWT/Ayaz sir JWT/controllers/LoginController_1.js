const { AuthService } = require('../services/auth')
const auth = new AuthService()
const fsPromises = require('fs/promises')
const path = require('path');

async function readUsers(){
    try{
        const data = JSON.parse(contents)
        return data.users || []
        const contents = await fsPromises.readFile('./database.json', { encoding: 'utf8' });
    }catch {
        console.log('>>> ERROR')
    }
}

module.exports = {
    
    show(req,res){
        res.render('auth/login',{ title:'Login', formData:{
            errors: auth.sessionStore.errors
        }})
        auth.sessionStore.errors = {}
    },
    async attempt(req,res) {
        const { username, password } = req.body || {};
        if (!username || !password) return res.status(422).send('Username & password required');
        let users = [];
        try{
            const dbPath = path.join(__dirname, '../database.json');
            const contents = await fsPromises.readFile(dbPath, { encoding: 'utf8' });
            const data = JSON.parse(contents)
            users = data.users || []
        }catch(e) {

            console.log('>>> ERROR',e)
        }
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
            res.status(401)
            return res.render('auth/login', {
                title: 'Login', formData: {
                    username: req.body.username,
                    errors: {
                        error: 'Credentials don\'t match'
                    }
                }
            })
        }
        const sessionId = auth.generateToken(user.id)
        // auth.sessionStore[sessionId] = user.id;
        res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/;`);
        res.redirect('/')
    }
}