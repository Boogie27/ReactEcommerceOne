const User = require('../models/users')
const Product = require('../models/products')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')





// add to wishlist
const addToWishlist = AsyncHandler(async (request, response) => {
    const { product_id, price } = request.body

    return response.send({data: price})
})









module.exports = { 
    addToWishlist,
}