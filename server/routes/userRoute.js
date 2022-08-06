const express = require('express')
const router = express.Router()
const { 
    getUser,
    logoutUser,
    registerUser,
    changeUserTheme
} = require('../controllers/userController')

router.post('/api/get-auth-user', getUser)
router.post('/api/register-user', registerUser)
router.post('/api/user-theme-change', changeUserTheme)
router.get('/api/logout', logoutUser)


module.exports = router