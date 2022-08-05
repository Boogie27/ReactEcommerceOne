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




function App() {
  const [user, setUser] = useState(false)
  const [appState, setAppState] = useState(false)
  const [sideNavi, setSideNavi] = useState(false)
  const [isLoggedin, setIsLoggedin ] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
 

  const toggleSearch = () => {
      setMobileSearch(!mobileSearch)
  }


  const toggleAppState = () => {
    const token = Cookies.get('weshopappuser')
    if(user && token){
      // change user theme here
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
      Axios.post(url('/api/get-auth-user'), { token: token }).then((response) => {
        const authUser = response.data
        if(authUser){
          setUser(authUser)
          return userAppState(authUser)
        }
      })
    }
    return setAppState(false)
  }



  return (
    <div className={`parent-container ${appState && 'active'}`}>
      <div className="parent-nav-container">
        <Navigation appState={appState} sideNavToggle={sideNavToggle} toggleSearch={toggleSearch} mobileSearch={mobileSearch} sideNavi={sideNavi} toggleAppState={toggleAppState}/>
        <MiniNavigation />
      </div>
      <Routes>
          <Route path="/" element={<Home appState={appState} />}/>
          <Route path="/detail" element={<Detail/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;







// https://capricathemes.com/opencart/OPC09/OPC090216/OPC1/index.php?route=common/home
