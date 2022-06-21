import React, { useState, useEffect } from 'react'
import { NavLink, useSearchParams  } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faStar,
    faHeart,
    faTrashCan,
    faThumbsUp,
    faThumbsDown,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'







const Detail = () => {
    const [searchParams] = useSearchParams();
    const [productDetail, setProductDetail] = useState(null)
    const [description, setDescription] = useState('')
    const [userReviews, setUserReviews] = useState('')
    
    const product_id = searchParams.get('product')
  
    useEffect(() => {
        // fetch product detail
        Axios.get('http://localhost:3001/detail?product=' + product_id).then((response) => {
            setProductDetail(response.data)
        })
    }, [])

    return (
        <div className="product-detail-container">
           {
                productDetail ? (
                    <>
                        <DetailTop productDetail={productDetail}/>
                        <DetailMiddle/>
                    </>
                ) : null
            }
        </div>
    )
}

export default Detail





const DetailTop = ({productDetail}) => {
    return (
        <div className="detail-img-container">
            <div className="inner-detail-img">
                <ProductImage images={productDetail.image}/>
                <ProductDetail/>
            </div>
        </div>
    )
}






const ProductImage = ({ images }) => {
    const [imageIndex, setImageIndex] = useState(0)
    const showImage = (index) => {
        setImageIndex(index)
    }
    
    return (
        <div className="product-img">
            <div className="main-product-img">
                <img src={images[imageIndex]} alt=""/>
            </div>
            <div className="product-img-view">
                <div className="preview-frame">
                    { images.map((image, index) => <ImagePreview key={index} imageIndex={imageIndex} showImage={showImage} index={index} image={image}/>)}
                </div>
                <DirectionButton/>
            </div>
        </div>
    )
}




const ImagePreview = ({image, index, imageIndex, showImage}) => {
    const state = imageIndex == index ? 'active' : ''

    return (
        <div onClick={() => showImage(index)} className={`img-preview ${state}`}>
            <img  src={image} alt={`product-image-${index}`}/>
        </div>
      );
}




const DirectionButton = () => {
    return (
        <div className="direction-button">
            <FontAwesomeIcon className="icon"  icon={faChevronLeft} />
            <FontAwesomeIcon className="icon"  icon={faChevronRight} />
        </div>
    )
}








const ProductDetail = () => {
    return (
        <div className="product-detail">
           <div className="title-header"><h3>Metro Double Layer HP Mouse</h3></div>
            <div className="detail-reviews">
                <ul className="ul-detail-top">
                    <li><ProductStars/></li>
                    <li>(5) reviews</li>
                    <li className="li-link"><FontAwesomeIcon className="icon-pen"  icon={faPen} />Write a review</li>
                </ul>
                <ItemDetail/>
                <ProductQuantity/>
                <WishListAdd/>
            </div>
        </div>
    )
}






const ProductStars = () => {
    return (
        <div className="review-stars">
            <FontAwesomeIcon className="star active"  icon={faStar} />
            <FontAwesomeIcon className="star active"  icon={faStar} />
            <FontAwesomeIcon className="star active"  icon={faStar} />
            <FontAwesomeIcon className="star"  icon={faStar} />
            <FontAwesomeIcon className="star"  icon={faStar} />
        </div>
    )
}





const ItemDetail = () => {
    return (
        <ul className="ul-detail-middle">
            <li><b>Price:</b> £8.00</li>
            <li><b>Old Price:</b> £8.00</li>
            <li><b>Brand: </b>Mac Os</li>
            <li><b>Product Code: </b>Product 25</li>
            <li><b>Availability: </b><span className="active">Out of stock</span></li>
        </ul>
    )
}





const ProductQuantity = () => {
    return (
        <div className="product-qauntity">
           <div className="productQty">
               <label>Qty</label>
               <input type="number" min="1"/>
               <button type="button">ADD TO CART</button>
           </div>
        </div>
    )
}






const WishListAdd = () => {
    return (
        <div className="icons">
            <ul>
                <li><FontAwesomeIcon className=""  icon={faHeart} /> Add To Wishlist</li>
                <li className="thumbs-like"><FontAwesomeIcon  icon={faThumbsUp} /> likes 5</li>
                <li className="thumbs-dislike"><FontAwesomeIcon  icon={faThumbsDown} /> likes 0</li>
            </ul>
        </div>
    )
}





const DetailMiddle = () => {
    const [descReviewState, setDescReviewState] = useState('description')

    const toogleDescReview = (state) => {
        setDescReviewState(state)
    }
    
    return (
        <div className="description-review">
            <ul className="title-header">
                <li onClick={() => toogleDescReview('description')} className={`${descReviewState == 'description' ? 'active' : ''}`}><h4>Description</h4></li>
                <li onClick={() => toogleDescReview('review')} className={`${descReviewState == 'review' ? 'active' : ''}`}><h4>Reviews (0)</h4></li>
            </ul>
            <div className="desc-reviews-body">
                {
                    descReviewState == 'description' ? (<Description/>) : (<Reviews/>)
                }
            </div>
        </div>
    )
}




const Description = () => {
    return (
        <div className="description">
            <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non 
            numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima 
            veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
             Quis autem vel eum iure reprehenderit qui in ea voluptate veli
            quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
            </p>
        </div>
    )
}





const Reviews = () => {
    return (
        <div className="reviews-container">
        <Row className="show-grid">
            <Col sm={12} md={12} lg={6}>
                <div className="user-reviews-body">
                    <div className="title-header"><h4>Customers review</h4></div>
                    <UserReviews/>
                    <UserReviews/>
                    <UserReviews/>
                    <UserReviews/>
                </div>
            </Col>
            <Col sm={12} md={12} lg={6}>
                <ReviewForm/>
            </Col>
        </Row>
            
            
        </div>
    )
}









const UserReviews = () => {
    return (
        <div className="user-reviews">
            <div className="user-review-img online">
                <img src="asset/client/users/avatar/1.png" alt=""/>
            </div>
            <div className="user-reviews-p">
                <ul>
                    <li className="title-header">
                        <h4>Boogie charles</h4>
                        <div className="review-date">
                            26 march 2022
                            <FontAwesomeIcon className="review-delete"  icon={faTrashCan} />
                        </div>
                    </li>
                    <li>
                        <FontAwesomeIcon className="star active"  icon={faStar} />
                        <FontAwesomeIcon className="star active"  icon={faStar} />
                        <FontAwesomeIcon className="star active"  icon={faStar} />
                        <FontAwesomeIcon className="star"  icon={faStar} />
                        <FontAwesomeIcon className="star"  icon={faStar} />
                    </li>
                    <li>
                        <p>quam nihil molestiae consequatur, vel illum qui 
                            dolorem eum fugiat quo voluptas nulla pariatur
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}





const ReviewForm = () => {
    return (
        <div className="review-form">
            <div className="title-header"><h4>Wrire a review</h4></div>
            <div className="review-form-body">
                <div className="form-stars">
                    <div className="star-title-header">
                        <h4>How would you rate thing item?</h4>
                    </div>
                    <FontAwesomeIcon className="star"  icon={faStar} />
                    <FontAwesomeIcon className="star"  icon={faStar} />
                    <FontAwesomeIcon className="star"  icon={faStar} />
                    <FontAwesomeIcon className="star"  icon={faStar} />
                    <FontAwesomeIcon className="star"  icon={faStar} />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title: <span>*</span></label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Review: <span>*</span></label>
                    <textarea rows="4" cols="50" className="form-control"></textarea>
                </div>
                <div className="form-button">
                    <button type="submit">SUBMIT REVIEW</button>
                </div>
            </div>
        </div>
    )
}