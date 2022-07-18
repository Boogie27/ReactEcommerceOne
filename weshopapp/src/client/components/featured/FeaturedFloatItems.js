import React, { useRef, useState, useEffect } from 'react'
import { NavLink, useSearchParams  } from 'react-router-dom'
import { url, userImageURL, moneySign, productImageURL} from '../../Data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEye,
  faStar,
  faHeart,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons'








  
const FeaturedFloatItems = ({featuredProduct, showQuickView}) => {
    const [floatImage, setFloatImage] = useState(false)
  
    const floatImageScreenIn = () => {
      setFloatImage(true)
    }
  
    const floatImageScreenOut = () => {
      setFloatImage(false)
    }
  
    return (
      <div className="float-item" onMouseEnter={() => floatImageScreenIn()} onMouseLeave={() => floatImageScreenOut()}>
        {
          featuredProduct.image.length > 1 ? (
          <div className={`float-item-img ${floatImage && 'active'}`}>
            <NavLink to={`/detail?product=${featuredProduct._id}&category=${featuredProduct.category}`}>
              <img src={productImageURL + featuredProduct.image[1]} alt={featuredProduct.product_name}/>
            </NavLink>
          </div>
          ) : null
        }
        <div className="float-item-btn">
          <ul className={`${floatImage && 'active'}`}>
            <li className="icon-btn"><FontAwesomeIcon className="icon"  icon={faHeart} /></li>
            <li className="icon-btn"><FontAwesomeIcon onClick={() => showQuickView(featuredProduct)} className="icon"  icon={faEye} /></li>
          </ul>
        </div>
      </div>
    )
}




export default FeaturedFloatItems