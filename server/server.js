const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3001
const cors = require('cors')
const PRODUCT_MODEL = require('./models/products')

app.use(express.json())
app.use(cors())


const dataBaseURL = 'mongodb+srv://weshopapp:weshopapp123456@cluster0.lmbavfe.mongodb.net/weshopapp?retryWrites=true&w=majority'
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


app.listen(PORT, () => {
    console.log("Server running on port: " + PORT)
})










// MongoDB username: weshopapp
// mongoDB password : weshopapp123456


// ***** Connect with MongoDB compass ******
// mongodb+srv://weshopapp:weshopapp123456@cluster0.lmbavfe.mongodb.net/test


// **** Connect with Application ********
// mongodb+srv://weshopapp:weshopapp123456@cluster0.lmbavfe.mongodb.net/?retryWrites=true&w=majority