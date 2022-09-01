const express = require('express')
const router = express.Router()
const { 
    addToWishlist
} = require('../controllers/wishListController')









router.post('/api/add-to-wishlist', addToWishlist)







module.exports = router

