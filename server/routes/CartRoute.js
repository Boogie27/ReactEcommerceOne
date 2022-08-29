const express = require('express')
const router = express.Router()
const {
    addToCart,
    fetchCartItems,
    deleteCartItem,
    toggleCartQuantity,
} = require('../controllers/cartController')





router.post('/api/add-to-cart', addToCart)
router.get('/api/get-cart-items/:token', fetchCartItems)
router.post('/api/toggle-cart-quantity', toggleCartQuantity)
router.post('/api/delete-cart-item', deleteCartItem)






module.exports = router