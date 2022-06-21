import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './client/components/css/Style.css'
import { Route, Routes } from 'react-router-dom'
import Home from './client/components/home/Home'
import Footer from './client/components/footer/Footer'
import { NavLink } from 'react-router-dom'
import Detail from './client/components/detail/Detail'
import Navigation from './client/components/navigation/Navigation'
import MiniNavigation from './client/components/navigation/MiniNavigation'





function App() {
  const [appState, setAppState] = useState(false)
  const [sideNavi, setSideNavi] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
 

  const toggleSearch = () => {
      setMobileSearch(!mobileSearch)
  }


  const toggleAppState = () => {
      setAppState(!appState)
  }


  const sideNavToggle = () => {
      setSideNavi(!sideNavi)
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
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;







// https://capricathemes.com/opencart/OPC09/OPC090216/OPC1/index.php?route=common/home
