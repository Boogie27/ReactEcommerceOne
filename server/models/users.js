const mongoose = require('mongoose')
const bcrypt = require('bcrypt')




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
        required: false
    },
    token: {
        type: String,
    },
    gender: {
        type: String,
        required: false
    },
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
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
        required: false
    },
    created_at: {
        type: Date,
        required: true
    },
})


// // encrypt password before saving
// UserSchema.pre('save', async function (next){
//     if(!this.isModified('password')){
//         next()
//     }

//     const salt = await bcrypt.genSaltSync(5)
//     this.password = await bcrypt.hashSync(this.password, salt)
// })



const User = mongoose.model("users", UserSchema)

module.exports =  User