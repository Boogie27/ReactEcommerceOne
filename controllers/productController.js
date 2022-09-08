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
        const exists = await Likes.findOne({user: like.user_id, product_id: like.product_id}).exec()
        if(exists){
            if(exists.type == 'like' && like.type == 'like'){
                await Likes.deleteOne({_id: exists._id}).exec()
            } else if(exists.type == 'dislike' && like.type == 'dislike'){
                await Likes.deleteOne({_id: exists._id}).exec()
            }else{
                await Likes.findOneAndUpdate({_id: exists._id}, {$set: { type: like.type}}).exec()
            }
            return response.send('ok')
        }
       
        const likeType = like.type == 'like' ? like.type : 'dislike'
        const newLikes = {
            product_id: like.product_id,
            user: like.user_id,
            type: likeType,
            created_at: today()
        }
        
        const createLike = await Likes.create(newLikes)
        if(createLike){
            const totalLikes = await Likes.find({product_id: like.product_id}).exec()
            return response.send({ data: likeType, like: createLike, totalLikes: totalLikes })
        }
    }
    return response.send('error')
})






module.exports = { 
    getProductLikes,
    ProductLikeToogle,
}