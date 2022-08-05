const User = require('../models/users')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const bcrypt = require('bcrypt')




const registerUser = AsyncHandler(async (request, response) => {
    const { username, email, password, gender, confirmPassword } = request.body

    // validate input
    const validation = validate_input(request.body)
    if(validation){
        return response.json({ validationError: true, validation})
    }

    const exists = await User.findOne({ email: email })
    if(exists){
        return response.send('exists')
    }
    
    const hash_pwd = hashPassword(password) // generate hash password

    const token = generate_token(username) //generate token

    const newUser = {
        first_name: '',
        last_name: '',
        user_name: username,
        email: email,
        password: hash_pwd,
        image: '',
        token: token,
        gender: gender,
        theme: 'light',
        is_active: 0,
        last_login: today(),
        remember_me: '',
        created_at: today()
    }

    const createUser = await User.create(newUser)
    if(createUser){
        let options = {
            maxAge: 1000 * 60 * 60 * 24, // would expire after on day
            httpOnly: true, // The cookie only accessible by the web server
            signed: true // Indicates if the cookie should be signed
        }
        return response.cookie('weshopapp', token, options).send({data: 'success', token: token})
    }else{
        response.status(400)
        throw new Error("User Not Created")
    }
})



const hashPassword = (password) => {
    const salt =  bcrypt.genSaltSync(5)
    const hash =  bcrypt.hashSync(password, salt)
    return hash
}




const generate_token = (username) => {
    const salt =  bcrypt.genSaltSync(5)
    const hash =  bcrypt.hashSync(username, salt)
    return hash
}



// validate user input
const validate_input = (input) => {
    let email = ''
    let username = ''
    let password = ''
    let confirmPassword = ''
    
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(input.email == ""){
        email = "*Email field is required"
    } else if(!input.email.match(validRegex)){
        email = "*Invalid email address"
    }

    if(input.username == ""){
        username = "*Username field is required"
    }else if(input.username.length < 3){
        username = "*Must be minimum of 3 characters"
    }else if(input.username.length > 50){
        username = "*Must be maximum of 50 characters"
    }

    if(input.password == ""){
        password = "*Passowrd field is required"
    }else if(input.password.length < 6){
        password = "*Must be minimum of 6 characters"
    }else if(input.password.length > 12){
        password = "*Must be maximum of 12 characters"
    }

    if(input.confirmPassword == ""){
        confirmPassword = "*Confirm passowrd field is required"
    }else if(input.confirmPassword !== input.password){
        confirmPassword = "*Confirm password Must equalls password"
    }

    if(username.length || email.length || password.length || confirmPassword.length){
        return {email: email, username: username, password: password, confirmPassword: confirmPassword}
    }else{
        return false
    }
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









