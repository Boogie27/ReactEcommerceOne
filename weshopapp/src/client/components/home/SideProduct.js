import React from 'react'
import { NavLink } from 'react-router-dom'


const moneySign = '£'

const sideProducts = [
    {
        id: 1,
        image: [
            'asset/client/products/products/1.jpg',
            'asset/client/products/products/2.jpg'
        ],
        product_name: 'Itaque Earum Rerum Hic Tenetur Alias',
        price: '83.00',
        old_price: '87.00'
    },
    {
        id: 2,
        image: [
            'asset/client/products/products/2.jpg',
            'asset/client/products/products/3.jpg'
        ],
        product_name: 'Itaque Earum Rerum Hic Tenetur Alias',
        price: '81.00',
        old_price: '89.00'
    },
    {
        id: 3,
        image: [
            'asset/client/products/products/3.jpg',
            'asset/client/products/products/4.jpg'
        ],
        product_name: 'Itaque Earum Rerum Hic Tenetur Alias',
        price: '88.00',
        old_price: '99.00'
    },
    {
        id: 4,
        image: [
            'asset/client/products/products/4.jpg',
            'asset/client/products/products/5.jpg'
        ],
        product_name: 'Itaque Earum Rerum Hic Tenetur Alias',
        price: '85.00',
        old_price: '93.00'
    },
]



const SideProduct = () => {
    return (
        <div className="sideproduct-container">
            <div className="title-header"><h4>BESTSELLING PRODUCTS</h4></div>
            <div className="sideproduct-body">
                {
                    sideProducts.map((product) => ( <ProductItem key={product.id} product={product} />))
                }
            </div>
        </div>
    )
}


export default SideProduct






const ProductItem = ({product}) => {
    return (
        <div  className="sideproduct-item">
            <div className="sideproduct-img">
                <img src={product.image[0]} alt={product.product_name}/>
            </div>
            <div className="sideproduct-text">
                <ul>
                    <li><NavLink to="/detail">{product.product_name}</NavLink></li>
                    <li className="sideproduct-price active">{ moneySign + product.price} <s>{moneySign + product.old_price}</s></li>
                    <li><button>ADD TO CART</button></li>
                </ul>
            </div>
        </div>
    )
}