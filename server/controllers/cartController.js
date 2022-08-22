const User = require('../models/users')
const Cart = require('../models/Cart')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')






// add item to cart
const addToCart = AsyncHandler(async (request, response) => {
    const item = {
        product_id: request.body.product_id,
        user: request.body.user_id,
        quantity: request.body.quantity,
        price: request.body.price,
        created_at: today(),
    }
    const add = await Cart.create(item)
    if(add){
        const cartItem = await Cart.find({user: item.user}).exec()
        return response.send({data: true, cart: cartItem})
    }
    return response.send({data: false})
})






// fetch cart items
const fetchCartItems = AsyncHandler(async (request, response) => {
    const token = request.params.token
    const exists = await User.findOne({token: token, is_active: 1}).exec()
    if(exists){
        const cartItems = await Cart.find({user: exists._id})
        if(cartItems){
            return response.send(cartItems)
        }
    }
   return response.send(false)
})




module.exports = { 
    addToCart,
    fetchCartItems
}