import React from 'react'
import { NavLink } from 'react-router-dom'



const MiniNavigation = () => {
    return (
        <div className="mini-navi-container">
            <div className="inner-mini-nav">
                <div className="title-header"><h4>SHOP WITH SMILES</h4></div>
                <div className="mini-navi-items">
                    <ul>
                        <li><NavLink to="/">HOME</NavLink></li>
                        <li><NavLink to="/detail">CONTACT</NavLink></li>
                        <li><NavLink to="/special">SPECIAL</NavLink></li>
                        <li><NavLink to="/wishlist">WISHLIST</NavLink></li>
                        <li><NavLink to="/login">LOGIN</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MiniNavigation