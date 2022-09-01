import React, { useRef, useState, useEffect } from 'react'
import { NavLink, useSearchParams  } from 'react-router-dom'
import Banner from './Banner'
import Axios from 'axios'
import SideProduct from './SideProduct'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEye,
  faStar,
  faHeart,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons'
import BottomBanner from '../footer/BottomBanner'
import QuickView from '../quickview/QuickView'
import { url, userImageURL, moneySign, productImageURL} from '../../Data'
import FeaturedProduct from '../featured/FeaturedProduct'





const categories = [
  {
    id: 1,
    image: 'asset/client/products/categories/1.jpg',
    title: '10% DISCOUNT',
    header: 'BUY SMART CAMERA',
  },
  {
    id: 2,
    image: 'asset/client/products/categories/2.jpg',
    title: '16% DISCOUNT',
    header: 'BUY SMART ITEM',
  },
  {
    id: 3,
    image: 'asset/client/products/categories/4.jpg',
    title: '20% DISCOUNT',
    header: 'BUY SMART STUFF',
  },
]






const Home = ({appState, addToCart}) => {
  const [product, setProduct] = useState(null)
  const [latestProducts, setLatestProducts] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  
  const showQuickView = (product) => {
    setProduct(product)
  }

  const closeQuickView = () => {
    setProduct(null)
  }

  useEffect(() => {
    // fetch latest products
    Axios.get(url(`/latest-product`)).then((response) => {
      setLatestProducts(response.data)
    })

    // fetch featured products
    Axios.get(url(`/featured-product`)).then((response) => {
      setFeaturedProducts(response.data)
    })

  }, [])

  return (
    <div className="home-container">
      <Banner appState={appState} />
      <div className="home-body">
        <SideProduct/>
        <HomeBody addToCart={addToCart} showQuickView={showQuickView} categories={categories} latestProducts={latestProducts}/>
      </div>
      <div className="second-banner-container">
        <SecondBanner/>
      </div>
      <div className="featured-p-container">
        <FeaturedProducts addToCart={addToCart} showQuickView={showQuickView} featuredProducts={featuredProducts}/>
      </div>
      <BottomBanner/>
      {
        product ? (<QuickView product={product} closeQuickView={closeQuickView} />) : null
      }
    </div>
  )
}

export default Home









const HomeBody = ({categories, addToCart, latestProducts, showQuickView}) => {
  return (
    <div className="homebody-container">
      <div className="inner-homebody">
        <div className="top-category">
          <Row className="show-grid">
            {
              categories.map((category) => ( <Col key={category.id} xs={12} md={4}><TopCategories  category={category}/></Col> ))
            }
          </Row>
        </div>
        <div className="latest-p-container">
          <div className="title-header"><h4>LATEST PRODUCTS</h4></div>
          <div className="latest-p-body">
            <Row className="show-grid">
              {
                latestProducts.map((featuredProduct) => (
                  <Col key={featuredProduct._id} xs={12} sm={6} md={4}>
                  {
                    featuredProduct.image.length > 0 ? ( <FeaturedProduct addToCart={addToCart} showQuickView={showQuickView} featuredProduct={featuredProduct}/> ) : null
                  }
                  </Col>
                )) 
              }
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}




const TopCategories = ({category}) => {
  return (
    <div className="top-category-item">
      <img src={category.image} alt="image name"/>
      <div className="top-category-text">
        <ul>
          <li className="top-title">{category.title}</li>
          <li><h4>{category.header}</h4></li>
        </ul>
      </div>
    </div>
  )
}









const SecondBanner = () => {
  const [isAnimateBanner, setIsAnimateBanner] = useState(false)

  const animateBanner = (e) => {
    setIsAnimateBanner(e)
  }

  return (
    <div onMouseEnter={() => animateBanner(true)} onMouseLeave={() => animateBanner(false)} className="second-banner-item">
      <img src="asset/client/products/categories/3.jpg" className={`${isAnimateBanner && 'active'}`} alt="second-banner"/>
      <div className="banner-text">
        <ul>
          <li className="title-header"><h4>Top Quality</h4></li>
          <li><h4>SUMMER OFFER!!</h4></li>
        </ul>
      </div>
    </div>
  )
}






const FeaturedProducts = ({addToCart, featuredProducts, showQuickView}) => {
  return (
    <div className="product-conatiner">
      <div className="title-header"><h4>FEATURED PRODUCTS</h4></div>
      <div className="product-body">
        <Row className="show-grid">
          {
            featuredProducts.map((featuredProduct) => (
              <Col key={featuredProduct._id} xs={12} sm={6} md={4} lg={3}>
              {
                featuredProduct.image.length > 0 ? ( <FeaturedProduct addToCart={addToCart} showQuickView={showQuickView} featuredProduct={featuredProduct}/> ) : null
              }
              </Col>
            )) 
          }
        </Row>
      </div>
    </div>
  )
}







