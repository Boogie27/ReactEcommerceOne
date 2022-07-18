import React from 'react'
import { logo } from '../../Data'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faBars,
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'



const SideNavigation = ({ appState, sideNavi, sideNavToggle, toggleAppState }) => {
    return (
        <div className={`side-nav-container ${sideNavi && 'active'}`}>
           <div onClick={sideNavToggle} className="dark-skin"></div>
           <div className={`side-navi ${appState && 'active'}`}>
                <SideNavHeader sideNavToggle={sideNavToggle}/>
                <div className="side-nav-body">
                    <CategoryLinks appState={appState} toggleAppState={toggleAppState} />
                    <ImportantLinks/>
                </div>
           </div>
        </div>
    )
}

export default SideNavigation








const SideNavHeader = ({sideNavToggle}) => {
    return (
        <div className="nav-title-header">
            <div className="side-nav-icon">
                <FontAwesomeIcon onClick={sideNavToggle} className="icon" icon={faBars} />
            </div>
            <div className="img"><img src={logo} alt="logo"/></div>
        </div>
    )
}






const CategoryLinks = ({appState, toggleAppState}) => {
    const toggleIcon = appState ? faToggleOn : faToggleOff

    return (
        <div className="side-nav-items">
            <div className="title-header"><h4>SHOP BY CATEGORIES</h4></div>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/wishlist">Wishlist</NavLink></li>
                <li><NavLink to="/special">Special</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li className="app-theme-btn"><span>App Theme</span><FontAwesomeIcon onClick={toggleAppState}className="icon"  icon={toggleIcon} /></li>
            </ul>
        </div>
    )
}







const ImportantLinks = () => {
    return (
        <div className="side-nav-items">
            <div className="title-header"><h4>IMPORTANT LINKS</h4></div>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/wishlist">Wishlist</NavLink></li>
                <li><NavLink to="/special">Special</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
            </ul>
        </div>
    )
}