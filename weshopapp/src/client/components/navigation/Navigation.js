// import React, { useState, useEffect } from 'react'
import { logo } from '../../Data'
import { NavLink } from 'react-router-dom'
import SideNavigation from './SideNavigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faUser,
    faBars,
    faToggleOn,
    faToggleOff,
    faHeadphones,
    faCartShopping,
    faMagnifyingGlass, 
} from '@fortawesome/free-solid-svg-icons'





const Navigation = ({
    cart,
    appState,
    sideNavi,
    toggleSearch, 
    mobileSearch,
    sideNavToggle,
    toggleAppState,
}) => {
    
    
  return (
    <div className={`nav-container ${appState && 'active'}`}>
        <SideNavigation appState={appState} sideNavi={sideNavi} sideNavToggle={sideNavToggle} toggleAppState={toggleAppState}/>
        <div className="inner-nav-container">
            <Logo appState={appState} sideNavToggle={sideNavToggle} />
            <Search />
            <Contact appState={appState}/>
            <Profile cart={cart} appState={appState} toggleSearch={toggleSearch} toggleAppState={toggleAppState}/>
            {
                mobileSearch ? (<MobileNavigation toggleSearch={toggleSearch} />) : null
            }
            
        </div>
    </div>
  )
}

export default Navigation







const Logo = ({appState, sideNavToggle }) => {
    return (
        <div className={`logo-container ${appState && 'active'}`}>
            <div className="mobile-nav-toggle">
                <FontAwesomeIcon onClick={sideNavToggle} className="icon" icon={faBars} />
            </div>
            <img src={logo} alt="logo"/>
        </div>
    )
}




const Search = () => {
    return (
        <div className="search-container active">
            <input type="text" className="" placeholder="Search products"/>
            <button type="button"><FontAwesomeIcon className="icon" icon={faMagnifyingGlass} /></button>
        </div>
    )
}




const Contact = ({appState}) => {
    return (
        <div className={`contact-container ${appState && 'active'}`}>
           <div className="contact-icon"><FontAwesomeIcon className="icon" icon={faHeadphones} /></div>
           <div className="contact-text">
                <div className="title-header"><h4>Contact us</h4></div>
                <p>0734628495</p>
           </div>
        </div>
    )
}






const Profile = ({user, cart, toggleSearch, toggleAppState, appState}) => {
    const toggleIcon = appState ? faToggleOn : faToggleOff

    return (
        <div className={`profile-container ${appState && 'active'}`}>
            <div className="toggle-icon"><FontAwesomeIcon onClick={toggleAppState} className="icon" icon={toggleIcon} /></div>
            <div className="profile-icon search-icon"><FontAwesomeIcon className="icon" onClick={() => toggleSearch()} icon={faMagnifyingGlass} /></div>
            <div className="profile-icon"><FontAwesomeIcon className="icon" icon={faUser} /></div>
            <div className="shopping-cart">
                <div className="shopping-cart-icon">
                    <NavLink to="/cart">
                    { cart.length > 0 ? (<span className="badge bg-warning cart-count">{ cart.length }</span>) : '' }
                    <FontAwesomeIcon className="icon" icon={faCartShopping} />
                    </NavLink>
                </div>
                <div className="cart-text">
                    <div className="title-header"><h4>My Cart</h4></div>
                    <p>£0.00</p>
                </div>
           </div>
        </div>
    )
}







const MobileNavigation = ({toggleSearch}) => {
    return (
        <div className="mobile-navi-container">
            <div onClick={toggleSearch} className="dark-skin"></div>
            <div className="m-search-container">
                <input type="text" className="" placeholder="Search products"/>
                <button type="button"><FontAwesomeIcon className="icon" icon={faMagnifyingGlass} /></button>
            </div>
        </div>
    )
}