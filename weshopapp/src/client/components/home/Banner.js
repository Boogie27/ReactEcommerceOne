import React from 'react'
import { NavLink } from 'react-router-dom'





const Banner = ({appState}) => {
    return (
      <div className={`banner-container ${appState && 'active'}`}>
          <div className="inner-banner">
              <div className="banner-left">
                  <ul>
                      <li className="banner-text"><h4>Best Deals Online</h4></li>
                      <li className="banner-header">
                          <h4>VIRTUAL REALITY GEAR CONTROLLER UPTO <b>40% OFF</b></h4>
                      </li>
                      <li className="banner-button"><NavLink to="/">SHOP NOW</NavLink></li>
                  </ul>
              </div>
              <div className="banner-right">hello</div>
          </div>
      </div>
    )
}








export default Banner