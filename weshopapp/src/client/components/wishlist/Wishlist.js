import React, { useState, useEffect  } from 'react'
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTrashCan,
    faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'
import Cookies from 'js-cookie'
import { 
    url, 
    today,
    money,
    token, 
    product_img,
    productImageURL 
} from '../../Data'
import Preloader from '../preloader/Preloader'









const Wishlist = () => {
    const [isLoading, setIsLoading ] = useState({loading: true, text: 'Fetching Wishlist, Please Wait...'})





    return (
        <div className="wishlist-container">
            {
                isLoading.loading ? (
                <>
                    <EmptyWishlist/>
                    <Preloader text={isLoading.text}/>
                </>
                ) : (
                    ''
                )
            }
            
        </div>
    )
}











export default Wishlist















const EmptyWishlist = () => {
    return (
        <div className="empty-wishlist-container">
            <div className="title-header"><h3>EMPTY WISHLIST</h3></div>
            <NavLink to="/" className="empty-wishlist-button">
                Continue shopping
                <FontAwesomeIcon className="icon"  icon={faArrowRightLong} />
            </NavLink>
        </div>
    )
}
