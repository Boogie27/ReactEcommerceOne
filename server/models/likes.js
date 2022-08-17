const mongoose = require('mongoose')



const likesSchema  = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    type: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})



const likes = mongoose.model("likes", likesSchema)

module.exports =  likes