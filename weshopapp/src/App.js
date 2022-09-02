import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './client/components/css/Style.css'
import { Route, Routes } from 'react-router-dom'
import Home from './client/components/home/Home'
import Footer from './client/components/footer/Footer'
import { NavLink } from 'react-router-dom'
import Detail from './client/components/detail/Detail'
import Login from './client/components/auth/Login'
import Cart from './client/components/cart/cart'
import Wishlist from './client/components/wishlist/Wishlist'


import Register from './client/components/auth/Register'
import Navigation from './client/components/navigation/Navigation'
import MiniNavigation from './client/components/navigation/MiniNavigation'
import Axios from 'axios'
import Cookies from 'js-cookie'
import {  url, name } from './client/Data'
import AlertDanger from './client/components/alerts/AlertDanger'
import AlertSuccess from './client/components/alerts/AlertSuccess'
import Preloader from './client/components/preloader/Preloader'
import LogoutDropDown from './client/components/dropdown/LogoutDropDown'
import { ToastContainer, toast } from 'react-toastify';






function App() {
  const [user, setUser] = useState(false)
  let token = Cookies.get('weshopappuser')
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [message, setMessage] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)
  const [appState, setAppState] = useState(false)
  const [sideNavi, setSideNavi] = useState(false)
  const [isLoggedin, setIsLoggedin ] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
  const [isLoading, setIsLoading ] = useState({state: false, text: ''})
  

  const toggleSearch = () => {
      setMobileSearch(!mobileSearch)
  }


  const toggleAppState = () => {
    const token = Cookies.get('weshopappuser')
    if(user && token){
      // change user theme here
      Axios.post(url('/api/user-theme-change'), user).then((response) => {
        console.log(response.data)
      })
    }
    return setAppState(!appState)
  }


  const sideNavToggle = () => {
      setSideNavi(!sideNavi)
  }


   
  useEffect(() => {
    getLoggedinUser() //get auth user
    userAppState(user)
    fetchCartItems()
    fetchWishlistItems()
  }, [])

  


  // change user app theme on page load
  const userAppState = (user) => {
    if(user && user.theme == 'light'){
      setAppState(false)
    }
    if(user && user.theme == 'dark'){
      setAppState(true)
    }
  }
  

  const getLoggedinUser = () => {
    if(token) {
      setIsLoading({state: true, text: 'Fetching data, Please wait...'})
      Axios.post(url('/api/get-auth-user'), { token: token }).then((response) => {
        const authUser = response.data
        if(authUser){
          setUser(authUser)
          fetchCartItems()
          setIsLoading({state: false, text: ''})
          return userAppState(authUser)
        }
      })
    }
    setIsLoading({state: false, text: ''})
    return setAppState(false)
  }

  

  //logout user
  const logoutUser = (e) => {
    e.preventDefault()
    if(user && token){
      setIsLoading({state: true, text: 'Logout user, Please wait...'})
      Axios.get(url(`/api/logout?id=${user._id}`)).then((response) => {
        if(response.data){
          alertMessage("Logout successfully!", 5000) //set logout success alertMessage
          Cookies.set('weshopappuser', '', { expires: new Date(0) })
        }else{
          Cookies.set('weshopappuser', '', { expires: new Date(0) })
        }
        setUser(false)
        fetchCartItems()
        fetchWishlistItems()
        setIsLoading({state: false, text: ''})
      })
    }
  }


  const alertMessage = (string, time) => {
      setMessage(string)
      const timer = setTimeout(() => {
        setMessage('')
      }, time)
  }


  const alertError = (string, time) => {
    setErrorAlert(string)
    const timer = setTimeout(() => {
      setErrorAlert('')
    }, time)
  }
  


  // open or close modal
  const modalToggle = (action = false, string = null) => {
    setLogoutModal(action)
  }


  //logout user
  const logoutUserModal = (e) => {
    setLogoutModal(false)
    logoutUser(e)
  }



  // fetch cart items
  const fetchCartItems  = (string = null) => {
    
    if(string && token == undefined){
      token = string
    }
    
    if(token){
      Axios.get(url(`/api/get-cart-items/${token}`)).then((response) => { 
          if(response.data){
            return setCart(response.data)
          }
          setCart([])
      })
    }
  }
 

  const addToCart = (item) => {
    if(!user){
      if(item.old_url){
        Cookies.set('current_url', item.old_url, { expires: 1 })
      }
      return notify_error('Login or Register to proceed!')
    }

    item.user_id = user._id

    Axios.post(url('/api/add-to-cart'), item).then((response) => {
      if(!response.data.data){
        return notify_error('Something went wront,try again!')
      }

      notify_success('Item added to cart successfully!')
      setCart(response.data.cart)
    })
  }




  const fetchWishlistItems = (string = null) => {
    if(string && token == undefined){
      token = string
    }
    if(token != undefined){
      Axios.get(url(`/api/fetch-wishlist-items/${token}`)).then((response) => {
        return setWishlist(response.data)
      })
    }
    setWishlist([])
  }


  // add to wish list
  const addToWishlist = (item) => {
    if(!user){
      if(item.old_url){
        Cookies.set('current_url', item.old_url, { expires: 1 })
      }
      return notify_error('Login or Register to proceed!')
    }

    Axios.post(url(`/api/add-to-wishlist`), item).then((response) => {
      if(response.data.state == 'exists'){
        return alertError('Product already exists in wishlist', 3000)
      }
      if(response.data.state == 'created'){
        fetchWishlistItems()
        alertMessage('Product added to wishlist successfully!', 3000)
      }
      if(response.data.state == 'error'){
        return alertError('Something went wrong, Try again!', 3000)
      }
    })
  }



  const notify_success = (string) => {
    toast.success(string, {
      position: "bottom-right",
      autoClose: 5000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      hideProgressBar: false,
      });
}


const notify_error = (string) => {
    toast.error(string, {
      position: "bottom-right",
      autoClose: 5000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      hideProgressBar: false,
      });
}




  return (
    <div className={`parent-container ${appState && 'active'}`}>
      <div className="parent-nav-container">
        <Navigation  user={user} cart={cart} appState={appState} sideNavToggle={sideNavToggle} toggleSearch={toggleSearch} mobileSearch={mobileSearch} sideNavi={sideNavi} toggleAppState={toggleAppState}/>
        <MiniNavigation user={user} wishlist={wishlist} modalToggle={modalToggle}/>
        {message && <AlertSuccess alert={message}/>}
        {errorAlert && <AlertDanger alert={errorAlert}/>}
      </div>
      <Routes>
          <Route path="/" element={<Home appState={appState} addToCart={addToCart}/>}/>
          <Route path="/detail" element={<Detail addToWishlist={addToWishlist} user={user} addToCart={addToCart} alertError={alertError} alertMessage={alertMessage}/>}/>
          <Route path="/cart" element={<Cart user={user} cart={cart} setCart={setCart} addToCart={addToCart} notify_success={notify_success} notify_error={notify_error}/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/login" element={<Login fetchWishlistItems={fetchWishlistItems} alertMessage={alertMessage} fetchCartItems={fetchCartItems} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
          <Route path="/register" element={<Register alertMessage={alertMessage} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
      </Routes>
      <Footer/>
      { isLoading.state && <Preloader text={isLoading.text}/> }
      {logoutModal && <LogoutDropDown modalToggle={modalToggle} logoutUserModal={logoutUserModal} username={user.user_name}/>}
    
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} 
                     newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
                 />
    
      
    </div>
  );
}

export default App;







// https://capricathemes.com/opencart/OPC09/OPC090216/OPC1/index.php?route=common/home
