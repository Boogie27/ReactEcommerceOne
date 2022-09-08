const mongoose = require('mongoose')



const cartsSchema  = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'products',
    },
    created_at: {
        type: Date,
        required: true
    },
})



const Cart = mongoose.model("carts", cartsSchema)

module.exports =  Cart