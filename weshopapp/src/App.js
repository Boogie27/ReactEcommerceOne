import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './client/components/css/Style.css'
import { Route, Routes } from 'react-router-dom'
import Home from './client/components/home/Home'
import Footer from './client/components/footer/Footer'
import { NavLink } from 'react-router-dom'
import Detail from './client/components/detail/Detail'
import Login from './client/components/auth/Login'
import Register from './client/components/auth/Register'
import Navigation from './client/components/navigation/Navigation'
import MiniNavigation from './client/components/navigation/MiniNavigation'
import Axios from 'axios'
import Cookies from 'js-cookie'
import {  url } from './client/Data'
import AlertDanger from './client/components/alerts/AlertDanger'
import AlertSuccess from './client/components/alerts/AlertSuccess'
import Preloader from './client/components/preloader/Preloader'


function App() {
  const [user, setUser] = useState(false)
  const [message, setMessage] = useState(false)
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
    userAppState(user)
    getLoggedinUser() //get auth user
  }, [])


  // change user app theme on page load
  const userAppState = (user) => {
    if(user.theme == 'light'){
      setAppState(false)
    }
    if(user.theme == 'dark'){
      setAppState(true)
    }
  }
  

  const getLoggedinUser = () => {
    const token = Cookies.get('weshopappuser')
    if(token) {
      setIsLoading({state: true, text: 'Fetching data, Please wait...'})
      Axios.post(url('/api/get-auth-user'), { token: token }).then((response) => {
        const authUser = response.data
        if(authUser){
          setUser(authUser)
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
    const token = Cookies.get('weshopappuser')
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
 



  return (
    <div className={`parent-container ${appState && 'active'}`}>
      <div className="parent-nav-container">
        <Navigation  appState={appState} sideNavToggle={sideNavToggle} toggleSearch={toggleSearch} mobileSearch={mobileSearch} sideNavi={sideNavi} toggleAppState={toggleAppState}/>
        <MiniNavigation user={user} logoutUser={logoutUser}/>
        {message && <AlertSuccess alert={message}/>}
      </div>
      <Routes>
          <Route path="/" element={<Home appState={appState} />}/>
          <Route path="/detail" element={<Detail user={user}/>}/>
          <Route path="/login" element={<Login alertMessage={alertMessage} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
          <Route path="/register" element={<Register alertMessage={alertMessage} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
      </Routes>
      <Footer/>
      { isLoading.state && <Preloader text={isLoading.text}/> }
    </div>
  );
}

export default App;







// https://capricathemes.com/opencart/OPC09/OPC090216/OPC1/index.php?route=common/home
