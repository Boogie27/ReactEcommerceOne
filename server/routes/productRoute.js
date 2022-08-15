const express = require('express')
const router = express.Router()
const { 
    getProductLikes,
    ProductLikeToogle
} = require('../controllers/productController')





router.get('/api/product-likes/:product_id', getProductLikes)
router.post('/api/product-like-toggle', ProductLikeToogle)





module.exports = router