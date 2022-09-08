const User = require('../models/users')
const Product = require('../models/products')
const Cart = require('../models/Cart')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')






// add item to cart
const addToCart = AsyncHandler(async (request, response) => {
    const item = {
        product: request.body.product_id,
        user: request.body.user_id,
        quantity: request.body.quantity,
        price: request.body.price,
        created_at: today(),
    }

    //  if item exists in cart increase quantity
    const exists = await Cart.findOne({ product: item.product, user: item.user }).exec()
    if(exists){
        const new_quantity = exists.quantity + item.quantity
        const update = await Cart.findOneAndUpdate({_id: exists._id}, {$set: { quantity: new_quantity}}).exec()
        if(update){
            const cartItem = await Cart.find({user: item.user}).exec()
            return response.send({ data: true, cart: cartItem })
        }
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
        const cartItems = await Cart.find({user: exists._id}).populate(
            'product',
            'image product_name category' 
        )
        if(cartItems){
            return response.send(cartItems)
        }
    }
   return response.send(false)
})






// toggle cart quantity
const toggleCartQuantity = AsyncHandler(async (request, response) => {
        const { id, new_quantity, product_id} = request.body
        if(new_quantity > 0){
            const product_quantity = await Product.findOne({_id: product_id}).exec()
            if(new_quantity <= product_quantity.quantity){
                const update = await Cart.findOneAndUpdate({_id: id}, {$set: { quantity: new_quantity}}).exec()
            }else{
                return response.send('greater')
            }
            return response.send(true)
        }

        if(new_quantity == 0){
            Cart.deleteOne({_id: id}).exec()
            return response.send(true)
        }
    
        return response.send(false)
})



// delete acrt item
const deleteCartItem = AsyncHandler(async (request, response) => {
    const { _id } = request.body
    const exists = Cart.findOne({_id: _id}).exec()
    if(exists){
        const deleteItem = await Cart.deleteOne({_id: _id}).exec()
        if(deleteItem){
            return response.send(true)
        }
    }
    return response.send(false)
})



module.exports = { 
    addToCart,
    fetchCartItems,
    deleteCartItem,
    toggleCartQuantity
}