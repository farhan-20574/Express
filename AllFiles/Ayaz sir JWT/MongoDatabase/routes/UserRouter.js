const express = require('express')
const router = express.Router();
const { AuthService } = require('../services/auth')
const UserController = require('../controllers/UserController')
const validations = require('../validations')
const auth = new AuthService()


router.use(auth.isAuthenticated)

router.get('', UserController.getAll)
router.get('/:id', UserController.getById)
router.post('', validations.createUserRequest, UserController.create)
router.patch('/:id', UserController.update)
router.delete('/:id', UserController.destroy)


module.exports = {
    userRouter: router
}