const mongoose = require('mongoose')



const wishlistSchema  = new mongoose.Schema({
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



const Wishlist = mongoose.model("wishlist", wishlistSchema)

module.exports =  Wishlist