import React from 'react'
import { NavLink } from 'react-router-dom'



const MiniNavigation = ({user, wishlist,modalToggle}) => {
    return (
        <div className="mini-navi-container">
            <div className="inner-mini-nav">
                <div className="title-header"><h4>SHOP WITH SMILES</h4></div>
                <div className="mini-navi-items">
                    <ul>
                        <li><NavLink to="/">HOME</NavLink></li>
                        <li><NavLink to="/products">PRODUCTS</NavLink></li>
                        <li className="wishlist-button">
                            <NavLink to="/wishlist">WISHLIST
                            { wishlist && wishlist.length > 0 ? (<span className="badge bg-danger">{wishlist.length}</span>) : '' }
                            </NavLink>
                        </li>
                        <li><NavLink to="/contact">CONTACT</NavLink></li>
                        { user ? (
                            <li onClick={(e) => modalToggle(true, e)}>LOGOUT</li>
                        ) : (
                            <>
                                <li><NavLink to="/register">REGISTER</NavLink></li>
                                <li><NavLink to="/login">LOGIN</NavLink></li>
                            </>
                        ) }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MiniNavigation