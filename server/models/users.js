const mongoose = require('mongoose')




const UserSchema  = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    is_active: {
        type: Number,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    last_login: {
        type: Date,
        required: true
    },
    remember_me: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})




const user = mongoose.model("users", UserSchema)

module.exports =  user