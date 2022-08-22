const express = require('express')
const router = express.Router()
const {
    addToCart,
    fetchCartItems,
} = require('../controllers/cartController')





router.post('/api/add-to-cart', addToCart)
router.get('/api/get-cart-items/:token', fetchCartItems)





module.exports = router