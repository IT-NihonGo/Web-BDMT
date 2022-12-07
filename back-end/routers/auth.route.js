const express = require('express')
const checkAuth = require("../middleware/check-auth.js")
const authController = require('../controllers/auth/index')

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post(
    '/change-password',
    checkAuth,
    authController.changePassword,
)
router.get(
    '/get-authenticated-user',
    checkAuth,
    authController.getAuthenticatedUser,
)

module.exports = router
