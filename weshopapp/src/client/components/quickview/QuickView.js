import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faHeart,
  faXmark,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { moneySign, productImageURL } from '../../Data'






const QuickView = ({product, closeQuickView}) => {

    return (
        <div className="quickview-container">
            <div onClick={closeQuickView} className="qv-dark-skin"></div>
            <div className="quick-view">
                <div className="cancle-btn">
                    <FontAwesomeIcon className="cancel-icon" onClick={closeQuickView}  icon={faXmark} />
                </div>
                <div className="quick-view-inner">
                    <QuickViewImage product={product}/>
                    <div className="quick-view-detail">
                        <div className="title-header"><h4>{product.product_name}</h4></div>
                        <StarRatings/>
                        <Details product={product}/>
                        <AddToCart/>
                        <WishListAdd/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default QuickView









const QuickViewImage = ({product}) => {

    const product_image = product.image
    const [counter, setCounter] = useState(1)
    const [sliderImage, setSliderImage] = useState(product_image[0])
    

    const prevSLideImage = () => {
        if(counter <= 0){
            setCounter(product_image.length - 1)
        }else{
            setCounter(counter - 1)
        }
        setSliderImage(product_image[counter])
    }

    const nextSLideImage = () => {
        if(counter >= product_image.length - 1){
            setCounter(0)
        }else{
            setCounter(counter + 1)
        }
        setSliderImage(product_image[counter])
    }

    return (
        <div className="quick-view-img">
            <img src={ productImageURL + sliderImage} alt={product.product_name}/>
            {
                product.image.length > 1 ? (
                    <div className="direction">
                        <FontAwesomeIcon onClick={() => prevSLideImage()} className="arrow"  icon={faArrowLeft} />
                        <FontAwesomeIcon onClick={() => nextSLideImage()} className="arrow"  icon={faArrowRight} />
                    </div>
                ) : null
            }
        </div>
    )
}





const StarRatings = () => {
    return (
        <div className="quick-view-stars">
            <FontAwesomeIcon className="star active"  icon={faStar} />
            <FontAwesomeIcon className="star active"  icon={faStar} />
            <FontAwesomeIcon className="star active"  icon={faStar} />
            <FontAwesomeIcon className="star"  icon={faStar} />
            <FontAwesomeIcon className="star"  icon={faStar} />
        </div>
    )
}





const Details = ({product}) => {
    return (
        <div className="qv-details">
            <ul>
                <li><b>Product Name: </b>{product.product_name}</li>
                <li><b>Product Price: </b>{moneySign + product.price}</li>
                <li><b>Old Price: </b> <s>{moneySign + product.old_price}</s></li>
                <li><b>Product Code: </b>{`${'Product '+ product.id}`}</li>
                <li><b>Availability: </b><span className={`${!product.quantity && 'active'}`}>{product.quantity ? 'Product Instock' : 'Out Of Stock'}</span></li>
            </ul>
        </div>
    )
}







const AddToCart = () => {
    return (
        <div className="qv-addtocart">
            <label>QTY</label>
            <input type="number"/>
            <button type="button">ADD TO CART</button>
        </div>
    )
}





const WishListAdd = () => {
    return (
        <div className="icons">
            <ul>
                <li><FontAwesomeIcon className=""  icon={faHeart} /></li>
                <li><h4>Add To Wishlist</h4></li>
            </ul>
        </div>
    )
}