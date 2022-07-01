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
import Moment from 'moment';
import { 
    url, 
    today,
    moneySign, 
    userImageURL, 
    current_user, 
    productImageURL 
} from '../../Data'
import AlertDanger from '../alerts/AlertDanger'







const Detail = () => {
    const [searchParams] = useSearchParams();
    const [productDetail, setProductDetail] = useState(null)
    const [description, setDescription] = useState('')
    const [userReviews, setUserReviews] = useState('')
    const [reviews, setReviews] = useState([])

    const [isSubmit, setIsSubmit] = useState(false)
    const [starsAlert, setStarsAlert] = useState('')
    const [titleAlert, setTitleAlert] = useState('')
    const [reviewsAlert, setReviewsAlert] = useState('')
    const [stars, setStars] = useState(0)
    const [title, setTitle] = useState('')
    const [productReviews, setProductReviews] = useState('')
    
    const product_id = searchParams.get('product')
   
    useEffect(() => {
        // fetch product detail
        fetchProductDetail(product_id)

        // fetch product reviews
        fetchProductReviews(product_id)
    }, [])

    
    const fetchProductDetail = (product_id) => {
        Axios.get(url(`/detail?product=${product_id}`)).then((response) => {
            setProductDetail(response.data)
        })
    }

    const fetchProductReviews = (product_id) => {
        // Axios.get(url(`/reviews?product_id=${product_id}`)).then((response) => {
        //     setReviews(response.data)
        // })

        Axios.get(url(`/product-reviews?product_id=${product_id}`)).then((response) => {
            setReviews(response.data)
        })
    }



    const submitReview = () => {
        setIsSubmit(true)
        setStarsAlert('')
        setTitleAlert('')
        setReviewsAlert('')

        if(title == ''){
            setTitleAlert('Title field is required!')
        }
        if(stars == 0){
            setStarsAlert('Select stars rating')
            console.log(starsAlert)
        }
         console.log(stars)
        // Axios.post(url('/submit-review'), {
        //     user_id: current_user._id,
        //     product_id: product_id,
        //     stars: stars,
        //     title: title,
        //     reviews: productReviews,
        //     created_at: today,
        // })
    }
    



    return (
        <div className="product-detail-container">
           {
                productDetail ? (
                    <>
                        <DetailTop reviews={reviews} productDetail={productDetail}/>
                        <DetailMiddle 
                            reviews={reviews} stars={stars} productReviews={productReviews}
                            reviews={reviews} setProductReviews={setProductReviews} isSubmit={isSubmit}
                            title={title} setTitle={setTitle} setStars={setStars} submitReview={submitReview}
                            starsAlert={starsAlert}
                        />
                    </>
                ) : null
            }
        </div>
    )
}

export default Detail





const DetailTop = ({ reviews, productDetail }) => {
    return (
        <div className="detail-img-container">
            <div className="inner-detail-img">
                <ProductImage images={productDetail.image}/>
                <ProductDetail reviews={reviews} productDetail={productDetail}/>
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
                <img src={productImageURL + images[imageIndex]} alt=""/>
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
            <img  src={productImageURL + image} alt={`product-image-${index}`}/>
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








const ProductDetail = ({ reviews, productDetail }) => {
    return (
        <div className="product-detail">
           <div className="title-header"><h3>{productDetail.product_name}</h3></div>
            <div className="detail-reviews">
                <ul className="ul-detail-top">
                    <li><ProductStars reviews={reviews}/></li>
                    <li>({reviews.length}) reviews</li>
                    <li className="li-link"><FontAwesomeIcon className="icon-pen"  icon={faPen} />Write a review</li>
                </ul>
                <ItemDetail productDetail={productDetail}/>
                <ProductQuantity/>
                <WishListAdd/>
            </div>
        </div>
    )
}






const ProductStars = ({reviews}) => {
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





const ItemDetail = ({productDetail}) => {
    const quantity = productDetail.quantity > 0 ? true : false
    return (
        <ul className="ul-detail-middle">
            <li><b>Price:</b> {moneySign + productDetail.price}</li>
            <li><b>Old Price:</b> {moneySign + productDetail.old_price}</li>
            <li><b>Brand: </b>{productDetail.brand}</li>
            <li><b>Product Code: </b>Product {productDetail.product_code}</li>
            <li><b>Availability: </b><span className={` ${!quantity && 'active'}`}>{quantity ? 'Available' : 'Out of stock'}</span></li>
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





const DetailMiddle = ({reviews, isSubmit, starsAlert, setProductReviews, title, setTitle, setStars, stars, productReviews, submitReview}) => {
    const [descReviewState, setDescReviewState] = useState('description')

    const toogleDescReview = (state) => {
        setDescReviewState(state)
    }

    return (
        <div className="description-review">
            <ul className="title-header">
                <li onClick={() => toogleDescReview('description')} className={`${descReviewState == 'description' ? 'active' : ''}`}>
                    <h4>Description</h4>
                </li>
                <li onClick={() => toogleDescReview('review')} className={`${descReviewState == 'review' ? 'active' : ''}`}>
                    <h4>Reviews ({reviews.length})</h4>
                </li>
            </ul>
            <div className="desc-reviews-body">
                {
                    descReviewState == 'description' ? (<Description/>) : (
                    <Reviews 
                        reviews={reviews} setProductReviews={setProductReviews} submitReview={submitReview}
                        title={title} setTitle={setTitle} setStars={setStars} stars={stars} productReviews={productReviews}
                        isSubmit={isSubmit} starsAlert={starsAlert}
                    />)
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





const Reviews = ({reviews, starsAlert, setProductReviews, isSubmit, title, setTitle, setStars, stars, productReviews, submitReview}) => {
    return (
        <div className="reviews-container">
            <Row className="show-grid">
                <Col sm={12} md={12} lg={reviews.length > 0 ? '6' : '12'}>
                    <div className="user-reviews-body">
                        { 
                            reviews.length > 0 ? (<div className="title-header"><h4>Customers review</h4></div>) : ''
                        }
                        
                        {
                            reviews.map((review, index) => <UserReviews key={index} review={review}/>)
                        }
                        
                    </div>
                </Col>
                <Col sm={12} md={12} lg={reviews.length > 0 ? '6' : '12'}>
                    <ReviewForm 
                        setProductReviews={setProductReviews} isSubmit={isSubmit}
                        title={title} setTitle={setTitle} submitReview={submitReview} 
                        setStars={setStars} stars={stars} productReviews={productReviews}
                        starsAlert={starsAlert}
                    />
                </Col>
            </Row>
        </div>
    )
}









const UserReviews = ({review}) => {
    const date = Moment(review.created_at).format('MMM Do YY')
    const stars = Array(5).fill(0)

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
                            {date}
                            <FontAwesomeIcon className="review-delete"  icon={faTrashCan} />
                        </div>
                    </li>
                    <li>
                        {
                            stars.map((star, index) => <FontAwesomeIcon key={index} className={`star ${index < review.stars ? 'active' : ''}`}  icon={faStar} />)
                        }
                    </li>
                    <li className="review-review">
                        <h4>{review.title}</h4>
                        <p>{review.reviews}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}






const ReviewForm = ({
        setProductReviews, isSubmit, title, setTitle, 
        setStars, stars, productReviews, submitReview,
        starsAlert,
    }) => {
    const formStars = Array(5).fill(0)
    const [isClicked, setIsClicked] = useState(false)
    const [activeStars, setActiveStars] = useState()

    const animateStar = (action) => {
        setActiveStars(action.index)
        setStars(activeStars + 1)

        if(action == false && isClicked){
            setStars(isClicked.index + 1)
            setActiveStars(isClicked.index)
        }else{
            setIsClicked(false)
            setStars(action.index + 1)
        }
       
        if(!isClicked && action == false && stars > 0){
            setStars(0)
        }
        
    }


   
    return (
        <div className="review-form">
            <div className="title-header"><h4>Wrire a review</h4></div>
            <div className="review-form-body">
                <div className="form-stars">
                    <div className="star-title-header">
                        {
                            starsAlert && (<AlertDanger alert="Select stars!"/>) 
                        }
                        <h4>How would you rate thing item?</h4>
                    </div>
                    <div   onMouseLeave={() => animateStar(false)} className="form-star-container">
                    {
                        formStars.map((star, index) => (<FontAwesomeIcon onClick={() => setIsClicked({index: index, state: 'click'})} onMouseEnter={() => animateStar({index: index, state: 'hover'})} key={index} className={`star  ${index <= activeStars ? 'active' : ''}`}  icon={faStar} />))
                    }
                    </div>
                    <div className="star-count">({stars})</div>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title: <span>*</span></label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Review: <span>*</span></label>
                    <textarea rows="4" cols="50" className="form-control" onChange={(e) => setProductReviews(e.target.value)}></textarea>
                </div>
                <div className="form-button">
                    <button onClick={() => submitReview()} type="submit">{ isSubmit ? 'Please wait...' : 'SUBMIT REVIEW'}</button>
                </div>
            </div>
        </div>
    )
}