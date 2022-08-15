const User = require('../models/users')
const Likes = require('../models/likes')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')



// fetch product likes
const getProductLikes = AsyncHandler(async (request, response) => {
    const product_id = request.params.product_id
    const productLikes = await Likes.find({product_id: product_id, type: 'like'}).exec()
    const productDislikes = await Likes.find({product_id: product_id, type: 'dislike'}).exec()
    
    return response.send({likes: productLikes, dislike: productDislikes})
})




// like and dislike product
const ProductLikeToogle = AsyncHandler(async (request, response) => {
    const like = request.body
    
    return response.send(like)
})







module.exports = { 
    getProductLikes,
    ProductLikeToogle,
}