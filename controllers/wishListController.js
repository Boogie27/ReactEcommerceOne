const User = require('../models/users')
const Product = require('../models/products')
const Wishlist = require('../models/wishlist')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')







// fetch wishlist
const fetchWishlist = AsyncHandler(async (request, response) => {
    const token = request.params.token
    const exists = await User.findOne({token: token, is_active: 1}).exec()
    if(exists){
        const items = await Wishlist.find({user: exists._id}).populate(
            'product',
            'image product_name category' 
        )
        if(items){
            return response.send(items)
        }
    }
   return response.send(false)
})



// add to wishlist
const addToWishlist = AsyncHandler(async (request, response) => {
    const { product_id, user_id } = request.body
    const item = {
        product: product_id,
        user: user_id,
        created_at: today()
    }
    const exists = await Wishlist.findOne({product: product_id, user: user_id}).exec()
    if(exists){
        return response.send({state: 'exists'})
    }

    const newWishlist = Wishlist.create(item)
    if(newWishlist){
        return response.send({ state: 'created'})
    }
    return response.send({state: 'error'})
})









module.exports = { 
    addToWishlist,
    fetchWishlist,
}