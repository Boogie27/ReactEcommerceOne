import React, { useState, useEffect  } from 'react'
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faStar,
    faHeart,
    faXmark,
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
import Cookies from 'js-cookie'
import { 
    url, 
    today,
    moneySign, 
    userImageURL, 
    category_img,
    product_img,
    profile_img,
    productImageURL 
} from '../../Data'
import AlertDanger from '../alerts/AlertDanger'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalDropDown } from '../dropdown/ModalDropDown'
import RelatedProducts from './RelatedProducts'
import QuickView from '../quickview/QuickView'
import Preloader from '../preloader/Preloader'






const Detail = ({user, addToCart, alertError, alertMessage, addToWishlist}) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const product_id = searchParams.get('product')
    const category = searchParams.get('category')
    const [isLoggedin, setIsLoggedin ] = useState(true)

    const [likes, setLikes] = useState([])
    const [disLikes, setDisLikes] = useState([])
    const [productDetail, setProductDetail] = useState(null)
    const [description, setDescription] = useState('')
    const [userReviews, setUserReviews] = useState('')
    const [reviews, setReviews] = useState([])

    const [isSubmit, setIsSubmit] = useState(false)
    const [starsAlert, setStarsAlert] = useState('')
    const [titleAlert, setTitleAlert] = useState('')
    const [reviewsAlert, setReviewsAlert] = useState('')
    const [activeStars, setActiveStars] = useState(0)
    const [stars, setStars] = useState(0)
    const [title, setTitle] = useState('')
    const [productReviews, setProductReviews] = useState('')

    const [starsCount, setStarsCount] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteReviewID, setDeleteReviewID] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const current_url = `/detail?product=${product_id}&category=${category}`


    useEffect(() => {
        // remove loader
        setIsLoggedin(false)

        // fetch product detail
        fetchProductDetail(product_id)

        // fetch product reviews
        fetchProductReviews(product_id)

        // fetch total stars
        total_stars(reviews)

        // fetch related products
        fetchRelatedProducts(category)

        // get product likes
        fetchProductLikes(product_id)
        
    }, [product_id])
    
    const fetchProductDetail = (product_id) => {
        Axios.get(url(`/detail?product=${product_id}`)).then((response) => {
            setProductDetail(response.data)
        })
    }

    const fetchProductReviews = (product_id) => {
        Axios.get(url(`/reviews?product_id=${product_id}`)).then((response) => {
            setReviews(response.data.reviews)
            total_stars(response.data.reviews)
        })
    }

    // fetch related products
    const fetchRelatedProducts = (category) => {
        Axios.get(url(`/related-products?category=${category}`)).then((response) => {
            setRelatedProducts(response.data.relatedProducts)
        })
    }

    // fetch product likes
    const fetchProductLikes = (product_id) => {
        Axios.get(url(`/api/product-likes/${product_id}`)).then((response) => {
            setLikes(response.data.likes)
            setDisLikes(response.data.dislike)
        })
        
    }
    


    // submit product review
    const submitReview = () => {
        setIsSubmit(true)
        setStarsAlert('')
        setTitleAlert('')
        setReviewsAlert('')
        if(title == ''){
            setIsSubmit(false)
            setTitleAlert('Title field is required!')
        }
        if(productReviews == ''){
            setIsSubmit(false)
            setReviewsAlert('Review field is required!')
        }
        if(stars == 0){
            setIsSubmit(false)
            setStarsAlert('Select stars rating')
        }
        if(!user){
            setIsSubmit(false)
            Cookies.set('current_url', current_url, { expires: 1 })
            return notify_error("Register or Login to review this product!")
        }

        if(title && productReviews && stars){
            Axios.post(url('/submit-review'), {
                stars: stars,
                title: title,
                product_id: product_id,
                reviews: productReviews,
                user_id: user._id,
                created_at: today(),
            }).then((response) => {
                setIsSubmit(false)
                if(response.data == 'no user'){
                    setStars(0)
                    setTitle('')
                    setActiveStars(0)
                    setProductReviews('')
                    return notify_error("Register or Login to review this product!")
                }
                if(response.data == 'success'){
                    setStars(0)
                    setTitle('')
                    setActiveStars(0)
                    setProductReviews('')
                    fetchProductReviews(product_id)
                    notify_success('Review submitted successfully!')
                }
                if(response.data == 'reviewed'){
                    setStars(0)
                    setTitle('')
                    setActiveStars(0)
                    setProductReviews('')
                    notify_error('Product has already been reviewd!')
                }
            })
        }
    }
    
    

    const notify_success = (string) => {
        toast.success(string, {
          position: "bottom-right",
          autoClose: 5000,
          draggable: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          hideProgressBar: false,
          });
    }


    const notify_error = (string) => {
        toast.error(string, {
          position: "bottom-right",
          autoClose: 5000,
          draggable: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          hideProgressBar: false,
          });
    }


    // close modal 
    const modalToggle = (action, string) => { 
        setIsModalOpen(action) 
        setDeleteReviewID(string)
        setIsDeleting(false)
    }


    // delete reviews
    const deleteReview = () => {
        setIsDeleting(true)
        const items = reviews.filter((review) => review._id !== deleteReviewID)
        
        Axios.post(url('/delete-review'), { review_id: deleteReviewID})
        .then((response) => {
            setReviews(items)
            setIsDeleting(false)
            setIsModalOpen(false) 
            setDeleteReviewID(null)
            fetchProductReviews(product_id)
            notify_success('Review deleted successfully!')
        })
    }



     // product star rating
     const total_stars = (string) => {
        let total = 0
        if(string.length == 0){ return setStarsCount(0) }

        string.map((review) => { total = total + review.stars })

        let rate = Math.round( total / string.length)
        return setStarsCount(rate)
    }


    // show quickview
    const showQuickView = (product) => {
        setProduct(product)
    }
    
    // close quickview
    const closeQuickView = () => {
        setProduct(null)
    }

    
    const likeToggle = (action) => {
        let type = action ? 'like' : 'dislike'
        const message = 'Login or Register to '+type+' this product!'
        Cookies.set('current_url', current_url, { expires: 1 })

        if(!user){
            return notify_error(message)
        }

        Axios.post(url('/api/product-like-toggle'), { type: type, user_id: user._id, product_id: product_id }).then((response) => {
            if(response.data == 'failed'){
                return notify_error(message)
            }
            if(response.data == 'error'){
                return notify_error('Something went wrong, try again!')
            }
            fetchProductLikes(product_id)
        })
    }



    const addItemToCart =  () => {
        if(!user){
            alertError('Login or Regsiter to proceed!', 3000)
            Cookies.set('current_url', current_url, { expires: 1 })
            return navigate("/login")
        }
        const item = {
            product_id: productDetail._id,
            quantity: quantity,
            price: productDetail.price,
            user_id: user._id
          }
        addToCart(item)
    }

    

    // add product to wishslist
    const addItemToWishlist = () => {
        const item = {
            user_id: user._id,
            product_id: productDetail._id,
            old_url: current_url,
        }
        addToWishlist(item)
    }


    return (
        <>
            {isLoggedin ? (<Preloader text="Loading, please wait..."/>) : (
                <div className="product-detail-container">
                {
                     productDetail ? (
                         <>
                             <DetailTop reviews={reviews} productDetail={productDetail}  starsCount={starsCount}
                                    user={user} disLikes={disLikes} likes={likes} likeToggle={likeToggle}
                                    setQuantity={setQuantity} quantity={quantity} addItemToCart={addItemToCart}
                                    addItemToWishlist={addItemToWishlist}
                             />
                             <DetailMiddle user={user}
                                 productDetail={productDetail} modalToggle={modalToggle}
                                 reviews={reviews} stars={stars} productReviews={productReviews}
                                 reviews={reviews} setProductReviews={setProductReviews} isSubmit={isSubmit}
                                 title={title} setTitle={setTitle} setStars={setStars} submitReview={submitReview}
                                 starsAlert={starsAlert} titleAlert={titleAlert} reviewsAlert={reviewsAlert}
                                 activeStars={activeStars} setActiveStars={setActiveStars} deleteReview={deleteReview}
                                 disLikes={disLikes} likes={likes}
                             />
                             {
                                 relatedProducts.length > 0 ? (
                                     <RelatedProducts relatedProducts={relatedProducts} showQuickView={showQuickView}/>
                                 ) : null
                             }
                             
                             {
                                 isModalOpen && <ModalDropDown isDeleting={isDeleting} deleteReview={deleteReview} modalToggle={modalToggle} />
                             }
                             
                         </>
                     ) : null
                 }
                 <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} 
                     newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
                 />
                 {
                 product ? (<QuickView product={product} closeQuickView={closeQuickView} />) : null
                 }
             </div>
            )}
        </>
        
    )
}

export default Detail










const DetailTop = ({ 
        user, reviews, productDetail, starsCount, disLikes, likes, likeToggle,
        setQuantity, quantity, addItemToCart, addItemToWishlist
    }) => {
    return (
        <div className="detail-img-container">
            <div className="inner-detail-img">
                <ProductImage images={productDetail.image}/>
                <ProductDetail addItemToWishlist={addItemToWishlist}
                    setQuantity={setQuantity} quantity={quantity} addItemToCart={addItemToCart}
                    reviews={reviews} productDetail={productDetail} starsCount={starsCount}
                    disLikes={disLikes} likes={likes} likeToggle={likeToggle} user={user}
                />
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








const ProductDetail = ({
    user, reviews, productDetail, starsCount, disLikes, likes, likeToggle,
    setQuantity, quantity, addItemToCart, addItemToWishlist
    }) => {
    return (
        <div className="product-detail">
           <div className="title-header"><h3>{productDetail.product_name}</h3></div>
            <div className="detail-reviews">
                <ul className="ul-detail-top">
                    <li><ProductStars reviews={reviews} starsCount={starsCount}/></li>
                    <li>({reviews.length}) reviews</li>
                    <li className="li-link"><FontAwesomeIcon className="icon-pen"  icon={faPen} />Write a review</li>
                </ul>
                <ItemDetail productDetail={productDetail}/>
                {
                    productDetail.quantity > 0 ? (
                        <ProductQuantity addItemToCart={addItemToCart} setQuantity={setQuantity} quantity={quantity}/>
                    ) : ''
                }
                <WishListAdd addItemToWishlist={addItemToWishlist} user={user} likes={likes} disLikes={disLikes} likeToggle={likeToggle}/>
            </div>
        </div>
    )
}






const ProductStars = ({reviews, starsCount}) => {
    const stars = Array(5).fill(0)


    return (
        <div className="review-stars">
        {
            stars.map((star, index) => <FontAwesomeIcon key={index} className={`star ${index + 1 <= starsCount ? 'active' : ''}`}  icon={faStar} />)
        }
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





const ProductQuantity = ({quantity, setQuantity, addItemToCart}) => {
    return (
        <div className="product-qauntity">
           <div className="productQty">
               <label>Qty</label>
               <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
               <button onClick={() => addItemToCart()} type="button">ADD TO CART</button>
           </div>
        </div>
    )
}






const WishListAdd = ({user, likes, disLikes, likeToggle, addItemToWishlist}) => {
    return (
        <div className="icons">
            <ul>
                <li onClick={() => addItemToWishlist()}><FontAwesomeIcon icon={faHeart} /> Add To Wishlist</li>
                <li onClick={() => likeToggle(true)} className="thumbs-like">
                    <FontAwesomeIcon  icon={faThumbsUp} /> likes {likes.length}
                </li>
                <li onClick={() => likeToggle(false)} className="thumbs-dislike">
                    <FontAwesomeIcon  icon={faThumbsDown} /> likes {disLikes.length}
                </li>
            </ul>
            { user && likes.length > 0 ? (
                <p className="like-dislike-font">You and {likes.length - 1} other member{likes.length - 1 > 1 ? 's' : ''} <b>like</b> this product</p>
            ) : ''
            }
        </div>
    )
}





const DetailMiddle = ({
    reviews, isSubmit, starsAlert, setProductReviews, title, 
    setTitle, setStars, stars, productReviews, submitReview,
    titleAlert, reviewsAlert,  activeStars, setActiveStars,
    deleteReview, productDetail, modalToggle, user
    }) => {
    const [descReviewState, setDescReviewState] = useState('description')

    const toogleDescReview = (state) => {
        setDescReviewState(state)
    }

    return (
        <div className="description-review">
            <ul className="title-header">
                <li onClick={() => toogleDescReview('description')} className={`${descReviewState === 'description' ? 'active' : ''}`}>
                    <h4>Description</h4>
                </li>
                <li onClick={() => toogleDescReview('review')} className={`${descReviewState === 'review' ? 'active' : ''}`}>
                    <h4>Reviews ({reviews.length})</h4>
                </li>
            </ul>
            <div className="desc-reviews-body">
                {
                    descReviewState === 'description' ? (<Description productDetail={productDetail}/>) : (
                    <Reviews 
                        reviews={reviews} setProductReviews={setProductReviews} submitReview={submitReview}
                        title={title} setTitle={setTitle} setStars={setStars} stars={stars} productReviews={productReviews}
                        isSubmit={isSubmit} starsAlert={starsAlert} titleAlert={titleAlert} reviewsAlert={reviewsAlert}
                        activeStars={activeStars} setActiveStars={setActiveStars} deleteReview={deleteReview}
                        modalToggle={modalToggle} user={user}
                    />)
                }
            </div>
        </div>
    )
}




const Description = ({productDetail}) => {
    return (
        <div className="description">
            <p>{productDetail.product_desc}</p>
        </div>
    )
}





const Reviews = ({
    reviews, starsAlert, setProductReviews, isSubmit, title, setTitle, 
    setStars, stars, productReviews, submitReview, titleAlert, reviewsAlert,
    activeStars, setActiveStars, deleteReview, modalToggle, user
    }) => {
    return (
        <div className="reviews-container">
            <Row className="show-grid">
                <Col sm={12} md={12} lg={reviews.length > 0 ? '6' : '12'}>
                    <div className="user-reviews-body">
                        { 
                            reviews.length > 0 ? (<div className="title-header"><h4>Customers review</h4></div>) : ''
                        }
                        
                        {
                            reviews.map((review, index) => <UserReviews key={index} modalToggle={modalToggle} user={user} deleteReview={deleteReview} review={review}/>)
                        }
                        
                    </div>
                </Col>
                <Col sm={12} md={12} lg={reviews.length > 0 ? '6' : '12'}>
                    <ReviewForm 
                        setProductReviews={setProductReviews} isSubmit={isSubmit}
                        title={title} setTitle={setTitle} submitReview={submitReview} 
                        setStars={setStars} stars={stars} productReviews={productReviews}
                        starsAlert={starsAlert} titleAlert={titleAlert} reviewsAlert={reviewsAlert}
                        activeStars={activeStars} setActiveStars={setActiveStars}
                    />
                </Col>
            </Row>
        </div>
    )
}









const UserReviews = ({review, user, deleteReview, modalToggle}) => {
    const date = Moment(review.created_at).format('MMM Do YY')
    const stars = Array(5).fill(0)
    const member = review.user

    return (
        <div className="user-reviews">
            <div className={`user-review-img ${member.is_active ? 'online' : 'offline'}`}>
                <img src={profile_img(member.image, member.gender)} alt=""/>
            </div>
            <div className="user-reviews-p">
                <ul>
                    <li className="title-header">
                        <h4>{member.user_name}</h4>
                        <div className="review-date">
                            {date}
                            {
                                member._id === user._id && (
                                    <FontAwesomeIcon onClick={() => modalToggle(true, review._id)} className="review-delete"  icon={faTrashCan} />
                                )
                            }
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
        starsAlert, titleAlert, reviewsAlert,  activeStars, setActiveStars
    }) => {
    const formStars = Array(5).fill(0)
    const [isClicked, setIsClicked] = useState(false)

    const animateStar = (action) => {
        setActiveStars(action.index)
        setStars(activeStars + 1)

        if(action === false && isClicked){
            setStars(isClicked.index + 1)
            setActiveStars(isClicked.index + 1)
        }else{
            setIsClicked(false)
            setStars(action.index + 1)
        }
       
        if(!isClicked && action === false && stars > 0){
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
                            starsAlert && (<AlertDanger alert={starsAlert}/>) 
                        }
                        <h4>How would you rate thing item?</h4>
                    </div>
                    <div   onMouseLeave={() => animateStar(false)} className="form-star-container">
                    {
                        formStars.map((star, index) => (<FontAwesomeIcon onClick={() => setIsClicked({index: index, state: 'click'})} onMouseEnter={() => animateStar({index: index, state: 'hover'})} key={index} className={`star  ${ index + 1 <= activeStars ? 'active' : ''}`}  icon={faStar} />))
                    }
                    </div>
                    <div className="star-count">({stars})</div>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title: <span>*</span> <span className="form-alert text-danger">{titleAlert}</span></label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Review: <span>*</span> <span className="form-alert text-danger">{reviewsAlert}</span></label>
                    <textarea rows="4" cols="50" className="form-control" value={productReviews} onChange={(e) => setProductReviews(e.target.value)}></textarea>
                </div>
                <div className="form-button">
                    <button onClick={() => submitReview()} type="submit">{ isSubmit ? 'Please wait...' : 'SUBMIT REVIEW'}</button>
                </div>
            </div>
        </div>
    )
}