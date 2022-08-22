const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3001
const cors = require('cors')
const cookieParser = require('cookie-parser');
const USER_MODEL = require('./models/users')
const PRODUCT_MODEL = require('./models/products')
const PRODUCT_REVIEW_MODEL = require('./models/reviews')

const userRoute = require('./routes/userRoute') 
const cartRoute = require('./routes/cartRoute') 
const getUserRoute = require('./routes/getUserRoute') 
const productRoute = require('./routes/productRoute') 


require('dotenv').config()


app.use(express.json())
app.use(cookieParser("secret"))
app.use(cors())


const dataBaseURL = process.env.MONGOOSE_URI
const connectParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(dataBaseURL, connectParams)
.then(() => console.log('Connected to MongoDB.....'))
.catch((e) => console.log("Error: " + e))







// fetch latest products
app.get('/latest-product', async (request, response) => {
    PRODUCT_MODEL.find({is_latest: 1}, (error, result) => {
        if(error){
            return response.send(error)
        }
        return response.send(result)
    }).limit(3)
})



// fetch featured products
app.get('/featured-product', async (request, response) => {
    PRODUCT_MODEL.find({ is_featured: 1}, (error, result) => {
        if(error){
            return response.send(error)
        }
        return response.send(result)
    }).limit(6)
})



// fetch product detail
app.get('/detail', async (request, response) => {
    let product_id = request.query.product
    PRODUCT_MODEL.findOne({_id: product_id}, (error, result) => {
        if(error){
            return response.send(error)
        }
        return response.send(result)
    })
})



// fetch product reviews
app.get('/reviews', async (request, response) => {
    let product_id = request.query.product_id
    const reviews = await PRODUCT_REVIEW_MODEL.find({product_id: product_id}).populate(
        'user',
        'first_name last_name image gender is_active'
      )
      return response.json({ reviews });
})


// fetch related products
app.get('/related-products', async (request, response) => {
    let category = request.query.category
    const relatedProducts = await PRODUCT_MODEL.find({category: category}).exec()
    return response.json({ relatedProducts });
})


// submit reviews 
app.post('/submit-review', async (request, response) => {
    const object = request.body
    const check = await PRODUCT_REVIEW_MODEL.findOne({user: object.user_id, product_id: object.product_id}).exec()
    const user = await USER_MODEL.findOne({_id: object.user_id}).exec()
    if(!user){
        return response.send('no user')
    }
    if(check){
        return response.send('reviewed')
    }
    const review = {
        user: object.user_id,
        product_id: object.product_id,
        stars: object.stars,
        title: object.title,
        reviews: object.reviews,
        created_at: object.created_at,
    }
    const newReview = PRODUCT_REVIEW_MODEL(review)
    await newReview.save()
    return response.send('success')
})



// delete review
app.post('/delete-review', async (request, response) => {
    const review_id = request.body.review_id
    const delete_review = PRODUCT_REVIEW_MODEL.remove({_id: review_id}).exec()
    if(delete_review){
        return response.send(true)
    }
    return response.send(false)
})





// fetch loggedin user
app.get('/user', async (request, response) => {
    const email = "anonyecharles@gmail.com"
    const password = "111111"
    USER_MODEL.findOne({email: email, password: password }, (error, result) => {
        if(error){
            return response.send(error)
        }
        return response.send(result)
    })
})



app.use('/api/users', userRoute)

// register user
app.use(userRoute)

// get loggedin user
// app.use('/api/get-auth-user', getUserRoute)

// product route
app.use(productRoute)

// cart route
app.use(cartRoute)


app.listen(PORT, () => {
    console.log("Server running on port: " + PORT)
})










// MongoDB username: weshopapp
// mongoDB password : weshopapp123456


// ***** Connect with MongoDB compass ******
// mongodb+srv://weshopapp:weshopapp123456@cluster0.lmbavfe.mongodb.net/test


// **** Connect with Application ********
// mongodb+srv://weshopapp:weshopapp123456@cluster0.lmbavfe.mongodb.net/?retryWrites=true&w=majority