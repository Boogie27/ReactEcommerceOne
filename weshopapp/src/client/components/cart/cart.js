import React, { useState, useEffect  } from 'react'
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlus,
    faMinus,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'
import { 
    url, 
    today,
    money,
    moneySign, 
    userImageURL, 
    category_img,
    product_img,
    profile_img,
    productImageURL 
} from '../../Data'


const Cart = ({user, addToCart}) => {

    const removeProduct = () => {
        console.log('deleted')
    }

    const quantityToggle = (string) => {
        console.log(string)
    }




    return (
        <div className="cart-container">
            <div className="title-header"><h3>Shopping Cart</h3></div>
            <div className="cart-items">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">NAME</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CartItems image={'1.jpg'} name={'Iphon 13 pro max'} price={12000} quantity={2} removeProduct={removeProduct} quantityToggle={quantityToggle}/>
                        <CartItems image={'2.jpg'} name={'Samsung Phone'} price={14000} quantity={1} removeProduct={removeProduct} quantityToggle={quantityToggle}/>
                        <CartItems image={'3.jpg'} name={'Techno Phone'} price={16000} quantity={1} removeProduct={removeProduct}  quantityToggle={quantityToggle}/>
                    </tbody>
                </table>
                <CartTotal/>
            </div>
        </div>
    )
}



export default Cart




const CartItems = ({image, name, price, quantity, removeProduct, quantityToggle}) => {
    return (
        <tr className="cart-items-detail">
            <th scope="row">
                <div className="content">
                    <FontAwesomeIcon onClick={() => removeProduct()} className="cart-transh-can"  icon={faTrashCan} />
                </div>
            </th>
            <td><img src={product_img(image)} alt=""/></td>
            <td><div className="content">{name}</div></td>
            <td><div className="content">{money(price)}</div></td>
            <td>
                <div className="content">
                    <div className="quantity-counter">
                        <button type="button"><FontAwesomeIcon onClick={() => quantityToggle('decrease')} className="icon"  icon={faMinus} /></button>
                        <input type="text" value="1" className="quantity-input"/>
                        <button type="button"><FontAwesomeIcon onClick={() => quantityToggle('increase')} className="icon"  icon={faPlus} /></button>
                    </div>
                </div>
            </td>
            <td><div className="content">{money(price * quantity)}</div></td>
        </tr>
    )
}









const CartTotal = () => {
    return (
        <div className="cart-total-container">
            <ul>
                <li><b className="cart-total">Total: <span>24,000</span></b></li>
                <li><NavLink to="/checkout" className="checkout-link">Proceed to checkout</NavLink></li>
            </ul>
        </div>
    )
}