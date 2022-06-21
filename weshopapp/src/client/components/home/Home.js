import React, { useRef, useState, useEffect } from 'react'
import { NavLink, useSearchParams  } from 'react-router-dom'
import Banner from './Banner'
import Axios from 'axios'
import SideProduct from './SideProduct'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEye,
  faStar,
  faHeart,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons'
import BottomBanner from '../footer/BottomBanner'
import QuickView from './QuickView'




const moneySign = '£'


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







const latestProducts_xx = [
    {
        id: 1,
        product_name: 'iphone',
        image: [
          'asset/client/products/products/8.jpg',
          // 'asset/client/products/products/2.jpg'
        ],
        product_desc: 'Itaque Earum Rerum Hic Tenetur Alias',
        price: '83.00',
        old_price: '87.00',
        quantity: 10
    },
    {
        id: 2,
        product_name: 'game',
        image: [
          'asset/client/products/products/10.jpg',
          'asset/client/products/products/6.jpg'
        ],
        product_desc: 'Itaque Earum Rerum Hic Tenetur Alias',
        price: '81.00',
        old_price: '89.00',
        quantity: 0
    },
    {
        id: 3,
        product_name: 'cloth',
        image: [
          'asset/client/products/products/5.jpg',
          'asset/client/products/products/3.jpg'
        ],
        product_desc: 'Itaque Earum Rerum Hic Tenetur Alias',
        price: '88.00',
        old_price: '99.00',
        quantity: 10
    },
    {
        id: 4,
        product_name: 'headset',
        image: [
          'asset/client/products/products/9.jpg',
          'asset/client/products/products/4.jpg'
      ],
        product_desc: 'Itaque Earum Rerum Hic Tenetur Alias',
        price: '85.00',
        old_price: '93.00',
        quantity: 0
    },
    {
      id: 5,
      product_name: 'headset',
      image: [
        'asset/client/products/products/1.jpg',
    ],
      product_desc: 'Itaque Earum Rerum Hic Tenetur Alias',
      price: '85.00',
      old_price: '93.00',
      quantity: 10
  },
  {
    id: 6,
    product_name: 'headset',
    image: [
      'asset/client/products/products/10.jpg',
      'asset/client/products/products/3.jpg'
  ],
    product_desc: 'Itaque Earum Rerum Hic Tenetur Alias',
    price: '85.00',
    old_price: '93.00',
    quantity: 0
  }
]


const Home = ({appState}) => {

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
    Axios.get('http://localhost:3001/latest-product').then((response) => {
      setLatestProducts(response.data)
    })

    // fetch featured products
    Axios.get('http://localhost:3001/featured-product').then((response) => {
      setFeaturedProducts(response.data)
    })

  }, [])

  return (
    <div className="home-container">
      <Banner appState={appState} />
      <div className="home-body">
        <SideProduct/>
        <HomeBody showQuickView={showQuickView} categories={categories} latestProducts={latestProducts}/>
      </div>
      <div className="second-banner-container">
        <SecondBanner/>
      </div>
      <div className="featured-p-container">
        <FeaturedProducts showQuickView={showQuickView} featuredProducts={featuredProducts}/>
      </div>
      <BottomBanner/>
      {
        product ? (<QuickView product={product} closeQuickView={closeQuickView} />) : null
      }
    </div>
  )
}

export default Home









const HomeBody = ({categories, latestProducts, showQuickView}) => {
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
                latestProducts.map((latestProduct) => (
                  <Col key={latestProduct._id} xs={12} sm={6} md={4}>
                  {
                    latestProduct.image.length > 0 ? ( <LatestProducts showQuickView={showQuickView} latestProduct={latestProduct}/> ) : null
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






const LatestProducts = ({latestProduct, showQuickView}) => {
  return (
      <div className="latest-p-container">
        <div className="latest-p-item">
          <div className="latest-p-img">
            <NavLink to="/detail">
              <img src={latestProduct.image[0]} alt={latestProduct.product_name} />
            </NavLink>
          </div>
          <div className="latest-p-text">
            <ul>
              <li className="product-name"><NavLink to="/">{latestProduct.product_name}</NavLink></li>
              <li className="product-desc"><NavLink to="/">{latestProduct.product_desc}</NavLink></li>
              <li className="product-price">{moneySign + latestProduct.price}</li>
              <li className="latest-pb-button">
                <ProductLinksOne/>
              </li>
            </ul>
          </div>
          <div className="float-item-container">
            <FloatItems latestProduct={latestProduct} showQuickView={showQuickView}/>
          </div>
        </div>
        <div className="product-link-two">
          <ProductLinksTwo showQuickView={showQuickView} latestProduct={latestProduct}/>
        </div>
      </div>
  )
}





const ProductLinksOne = () => {
  return (
    <>
      <div className="stars">
        <FontAwesomeIcon className="star active"  icon={faStar} />
        <FontAwesomeIcon className="star active"  icon={faStar} />
        <FontAwesomeIcon className="star active"  icon={faStar} />
        <FontAwesomeIcon className="star"  icon={faStar} />
        <FontAwesomeIcon className="star"  icon={faStar} />
      </div>
      <div className="cart-icon"><FontAwesomeIcon  icon={faCartShopping} /></div>
    </>
  )
}






const ProductLinksTwo = ({showQuickView, latestProduct}) => {
  return (
    <div className="product-link-body">
      <div className="cart-icon"><FontAwesomeIcon  icon={faHeart} /></div>
      <div className="cart-icon"><FontAwesomeIcon  onClick={() => showQuickView(latestProduct)} icon={faEye} /></div>
      <div className="cart-icon"><FontAwesomeIcon  icon={faCartShopping} /></div>
    </div>
  )
}




const FloatItems = ({latestProduct, showQuickView}) => {
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
        latestProduct.image.length > 1 ? (
        <div className={`float-item-img ${floatImage && 'active'}`}>
          <NavLink to="/detail">
            <img src={latestProduct.image[1]} alt={latestProduct.product_name}/>
          </NavLink>
        </div>
        ) : null
      }
      <div className="float-item-btn">
        <ul className={`${floatImage && 'active'}`}>
          <li className="icon-btn"><FontAwesomeIcon className="icon"  icon={faHeart} /></li>
          <li className="icon-btn"><FontAwesomeIcon onClick={() => showQuickView(latestProduct)} className="icon"  icon={faEye} /></li>
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






const FeaturedProducts = ({featuredProducts, showQuickView}) => {
  return (
    <div className="product-conatiner">
      <div className="title-header"><h4>FEATURED PRODUCTS</h4></div>
      <div className="product-body">
        <Row className="show-grid">
          {
            featuredProducts.map((featuredProduct) => (
              <Col key={featuredProduct._id} xs={12} sm={6} md={4} lg={3}>
              {
                featuredProduct.image.length > 0 ? ( <FeaturedProduct showQuickView={showQuickView} featuredProduct={featuredProduct}/> ) : null
              }
              </Col>
            )) 
          }
        </Row>
      </div>
    </div>
  )
}







const FeaturedProduct = ({featuredProduct, showQuickView}) => {
  return (
      <div className="latest-p-container">
        <div className="latest-p-item">
          <div className="latest-p-img">
            <NavLink to="/detail">
              <img src={featuredProduct.image[0]} alt={featuredProduct.product_name} />
            </NavLink>
          </div>
          <div className="latest-p-text">
            <ul>
              <li className="product-name"><NavLink to="/">{featuredProduct.product_name}</NavLink></li>
              <li className="product-desc"><NavLink to="/">{featuredProduct.product_desc}</NavLink></li>
              <li className="product-price">{moneySign + featuredProduct.price}</li>
              <li className="latest-pb-button">
                <ProductLinksOne/>
              </li>
            </ul>
          </div>
          <div className="float-item-container">
            <FeaturedFloatItems featuredProduct={featuredProduct} showQuickView={showQuickView}/>
          </div>
        </div>
        <div className="product-link-two">
          <ProductLinksTwo showQuickView={showQuickView} featuredProduct={featuredProduct}/>
        </div>
      </div>
  )
}







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
          <NavLink to={`/detail?product=${featuredProduct._id}`}>
            <img src={featuredProduct.image[1]} alt={featuredProduct.product_name}/>
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