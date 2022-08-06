const User = require('../models/users')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')









// // get loggedin user
// const getUser = AsyncHandler(async (request, response) => {
//     const { token } = request.body
//     const user = await User.findOne({ token: token })
//     if(user){
//        const authUser = {
//         _id: user._id,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         user_name: user.user_name,
//         email: user.email,
//         image: user.image,
//         gender: user.gender,
//         theme: user.theme,
//         is_active: user.is_active,
//         last_login: user.last_login,
//         remember_me: user.remember_me,
//         created_at: user.created_at
//        }
//        return response.send(authUser)
//     }
//     return response.send(user)
// })






// module.exports = { getUser }