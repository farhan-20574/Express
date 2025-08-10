const express = require('express')
const { AuthService } = require('../services/auth')
const DashboardController = require('../controllers/DashboardController')

const router = express.Router();
const auth = new AuthService()

router.get('/',auth.isAuthenticated, DashboardController.show)

module.exports = {
    dashboardRouter: router
}