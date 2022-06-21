import React  from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faStar,
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons'


const Footer = () => {
    return (
        <div className="footer-conatiner">
            <div className="inner-footer">
                <Row className="show-grid">
                    <Col xs={12} md={6} lg={4}><FooterInformation/></Col>
                    <Col xs={12} md={6} lg={4}><UseFullLinks/></Col>
                    <Col xs={12} md={6} lg={4}><Subscription/></Col>
                </Row>
            </div>
            <BottomFooter/>
        </div>
    )
}

export default Footer





const FooterInformation = () => {
    return (
        <div className="footer-item">
            <div className="title-header"><h4>STORE INFORMATION</h4></div>
            <ul>
                <li>Elocart - Electronic Store</li>
                <li>507-Union Trade ipsum Doler Centre France</li>
                <li>Call Us: 000-000-0000</li>
                <li>eloquent@yourcompany.com</li>
            </ul>
        </div>
    )
}






const UseFullLinks = () => {
    return (
        <div className="footer-item">
            <div className="title-header"><h4>USEFULL LINKS</h4></div>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/">About</NavLink></li>
                <li><NavLink to="/">Contact Us</NavLink></li>
                <li><NavLink to="/">Cart</NavLink></li>
                <li><NavLink to="/">Wishlist</NavLink></li>
            </ul>
        </div>
    )
}









const Subscription = () => {
    return (
        <div className="footer-item">
            <div className="title-header"><h4>USEFULL LINKS</h4></div>
            <ul>
                <li>Subscribe our newsletter get 10% off your first update.</li>
                <li>
                    <div className="subscription-bar">
                        <input type="email" placeholder="Enter Your Email Address"/>
                        <button type="button"><FontAwesomeIcon  icon={faPaperPlane} /></button>
                    </div>
                </li>
            </ul>
        </div>
    )
}






const BottomFooter = () => {
    return (
        <div className="bottom-footer">
            Made With REACT By Eloquent - E-commerce Store © 2022
        </div>
    )
}