const mongoose = require('mongoose')



const reviewsSchema  = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    starts: {
        type: Number,
        required: true
    },
    reviews: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})



const product_reviews = mongoose.model("product_reviews", reviewsSchema)

module.exports =  product_reviews