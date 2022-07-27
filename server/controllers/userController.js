const User = require('../models/users')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const bcrypt = require('bcrypt')




const registerUser = AsyncHandler(async (request, response) => {
    const { user_name, email, password, gender } = request.body
    
    const exists = await User.findOne({ email: email })
    if(exists){
        return response.send('exists')
    }

    // validate input here

    const hash_pwd = hashPassword(password)

    const newUser = {
        first_name: '',
        last_name: '',
        user_name: user_name,
        email: email,
        password: hash_pwd,
        image: '',
        gender: gender,
        theme: 'light',
        is_active: 0,
        last_login: today(),
        remember_me: '',
        created_at: today()
    }

    // const createUser = await User.create(newUser)
    // if(createUser){
    //     response.status(201).json({
    //         _id: createUser._id,
    //         email: createUser.email,
    //         image: createUser.image,
    //         gender: createUser.gender,
    //         first_name: createUser.first_name,
    //         last_name: createUser.last_name,
    //         is_active: createUser.is_active,
    //         theme: createUser.theme,
    //         last_login: createUser.last_login,
    //         created_at: createUser.created_at,
    //     })
    // }else{
    //     response.status(400)
    //     throw new Error("User Not Created")
    // }
    return response.json(newUser)
})



const hashPassword = (password) => {
    const salt =  bcrypt.genSaltSync(5)
    const hash =  bcrypt.hashSync(password, salt)
    return hash
}





module.exports = { registerUser }







// encrypt password before saving
// UserSchema.pre('save', async function (next){
//     if(!this.isModified('password')){
//         return next()
//     }

//     const salt = await bcrypt.genSalt(20)
//     this.password = await bcrypt.hash(this.password, salt)

// })









