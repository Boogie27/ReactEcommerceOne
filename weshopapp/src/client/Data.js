

const logo = 'asset/client/logo/logo.png'

const moneySign = '£'

const userImageURL = 'asset/client/users/profile-image/'

const productImageURL = 'asset/client/products/products/'

const categoryImageURL = 'asset/client/products/categories/'


const current_user = {
        // _id: "62b202da0e79f00bcad9f400",
        _id: "62b203200e79f00bcad9f401",
        user_name: "boogie",
        email: "anonyecharles@gmail.com",
        password: "111111",
        image: "1.png",
        first_name: "charles",
        last_name: "anonye",
        is_active: 0,
        theme: "light",
        last_login: "2022-12-04T00:00:00.000Z",
        remember_me: "token_here",
        created_at: "2022-12-04T00:00:00.000Z"
    }


const url = (string) => {
    return 'http://localhost:3001' + string
}


const money = (money) => {
    return '£' + money
}


const today = () => {
    let today = new Date().toISOString()
    return today
}


const profile_img = (string) => {
    return 'asset/client/users/profile-image/' + string
}


const product_img = (string) => {
    return 'asset/client/products/products/' + string
}


const category_img = (string) => {
    return 'asset/client/products/categories/' + string
}


const auth_img = (string) => {
    return 'asset/client/auth/' + string
}





export {
    url,
    logo, 
    money,
    today,
    auth_img,
    moneySign,
    current_user,
    userImageURL,
    category_img,
    product_img,
    profile_img,
    productImageURL,
    categoryImageURL,
}





// MongoDB username: weshopapp
// mongoDB password : weshopapp123456


// ***** Connect with MongoDB compass ******
// mongodb+srv://weshopapp:weshopapp123456@cluster0.lmbavfe.mongodb.net/test


// **** COnnect with Application ********
// mongodb+srv://weshopapp:weshopapp123456@cluster0.lmbavfe.mongodb.net/?retryWrites=true&w=majority