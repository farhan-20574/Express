const APP_KEY = 'my-secret';
const jwt = require('jsonwebtoken')
const User = require('../models/User')
class AuthService {
    sessionStore = {};

    constructor() {
        this.isAuthenticated = this.isAuthenticated.bind(this)
        this.isGuest = this.isGuest.bind(this)

    }

    async isGuest(req, res, next){
        try {
            const response = jwt.verify(req.cookies.sessionId,APP_KEY)
            const user = await User.getById(response.id)
            if(!user) throw new Error('User not found');
            req.user = user
            return res.redirect('/')
        } catch (error) {
            next()
        }
    }

    async isAuthenticated (req,res,next) {
        try {
            const response = jwt.verify(req.cookies.sessionId,APP_KEY)
            const user = await User.getById(response.id)
            if(!user) throw new Error('User not found');
            req.user = user
            next()
        } catch (error) {
            this.sessionStore.errors = { error: 'Please login first' }
            return res.status(401).redirect('/login');
        }
    }

    generateToken(userId) {
      return jwt.sign({ id: userId }, APP_KEY);
    }
}


module.exports = {AuthService}

