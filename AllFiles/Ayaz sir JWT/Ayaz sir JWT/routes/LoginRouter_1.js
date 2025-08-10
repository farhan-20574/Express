const express = require('express')
const { AuthService } = require('../services/auth')
const LoginController = require('../controllers/LoginController')

const router = express.Router();
const auth = new AuthService()

router.get('/',auth.isGuest, LoginController.show)
router.post('/',auth.isGuest, LoginController.attempt)


module.exports = {
    loginRouter: router
}