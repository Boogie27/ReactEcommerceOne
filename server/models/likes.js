const mongoose = require('mongoose')



const likesSchema  = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
      },
})



const likes = mongoose.model("likes", likesSchema)

module.exports =  likes