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
    
    const user = await User.findOne({_id: like.user_id}).exec()
    if(!user){
        return response.send('failed')
    }
    if(user){
        const newLikes = {
            product_id: like.product_id,
            user: like.user_id,
            type: like.type,
            created_at: today()
        }
        //   if user has liked ths product, delete the like if not like the product

        //  if type is like then like if dilike then dislike
        const createLike = await Likes.create(newLikes)
        if(createLike){
            return response.send({ data: 'liked', like: createLike})
        }
    }
    return response.send('error')
})







module.exports = { 
    getProductLikes,
    ProductLikeToogle,
}