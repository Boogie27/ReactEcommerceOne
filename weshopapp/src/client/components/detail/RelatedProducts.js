import React, { useRef, useState, useEffect } from 'react'
import { NavLink, useSearchParams  } from 'react-router-dom'
import FeaturedProduct from '../featured/FeaturedProduct'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';





const RelatedProducts = ({relatedProducts, showQuickView}) => {

    return (
        <div className="product-conatiner">
            <div className="title-header"><h4>RELATED PRODUCTS</h4></div>
            <div className="product-body">
                <Row className="show-grid">
                {
                    relatedProducts.map((featuredProduct) => (
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


export default RelatedProducts