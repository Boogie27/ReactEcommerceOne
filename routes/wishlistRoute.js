const express = require('express')
const router = express.Router()
const { 
    addToWishlist,
    fetchWishlist
} = require('../controllers/wishListController')









router.post('/api/add-to-wishlist', addToWishlist)
router.get('/api/fetch-wishlist-items/:token', fetchWishlist)






module.exports = router

