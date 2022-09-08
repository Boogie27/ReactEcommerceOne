const express = require('express')
const router = express.Router()
const { 
    getUser,
    loginUser,
    logoutUser,
    registerUser,
    changeUserTheme
} = require('../controllers/userController')





router.post('/api/get-auth-user', getUser)
router.post('/api/register-user', registerUser)
router.post('/api/user-theme-change', changeUserTheme)
router.get('/api/logout', logoutUser)
router.post('/api/login-user', loginUser)


module.exports = router