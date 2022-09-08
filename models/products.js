const mongoose = require('mongoose')



const ProductsSchema  = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_desc: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    is_featured: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})



const products = mongoose.model("products", ProductsSchema)

module.exports =  products








// app.get('/', async (request, response) => {
//     const date = new Date(Date.now()).toISOString()
//     const product = new ProductsModle({
//         product_name: 'cars',
//         image: [
//           'asset/client/products/products/9.jpg',
//           'asset/client/products/products/5.jpg'
//         ],
//         product_desc: 'Itaque Earum Rerum Hic Tenetur Alias',
//         price: '81.00',
//         old_price: '89.00',
//         quantity: 10,
//         created_at: '2022-06-15',
//     })

//     try {
//         // await product.save()
//     }catch(error){
//         console.log(error)
//     }
// })