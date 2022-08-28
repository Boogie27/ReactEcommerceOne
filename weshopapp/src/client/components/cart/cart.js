import React, { useState, useEffect  } from 'react'
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlus,
    faMinus,
    faTrashCan,
    faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'
import Cookies from 'js-cookie'
import { 
    url, 
    today,
    money,
    token,
    cart_img,
    moneySign, 
    userImageURL, 
    category_img,
    product_img,
    profile_img,
    productImageURL 
} from '../../Data'
import Preloader from '../preloader/Preloader'







const Cart = ({user, addToCart}) => {
    const [cart, setCart] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [isLoggedin, setIsLoggedin ] = useState(true)

    useEffect(() => {
        fetchShoppingCart()
    })


    // fetch shopping cart
    const fetchShoppingCart = () => {
        if(token()){
            Axios.get(url(`/api/get-cart-items/${token()}`)).then((response) => { 
                if(response.data){
                    setIsLoggedin(false)
                  return setCart(response.data)
                }
                setCart([])
            })
            setIsLoggedin(false)
          }
    }


    const removeProduct = () => {
        console.log('deleted')
    }

    const quantityToggle = (string) => {
        console.log(string)
    }




    return (
        <>
         {isLoggedin ? (
            <>
                <EmptyCart/>
                <Preloader text="Loading, please wait..."/>
            </>
            ) : (
             <div className="cart-container">
             {
                 cart.length == 0 ? (<EmptyCart/>) : (
                     <div className="cart-items">
                         <div className="title-header"><h3>Shopping Cart</h3></div>
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
                                 <CartItems image={'1.jpg'} name={'Iphon 13 pro max'} price={12000} quantity={2} removeProduct={removeProduct} quantityToggle={quantityToggle} setQuantity={setQuantity}/>
                             </tbody>
                         </table>
                         <CartTotal/>
                     </div>
                 )
             }
         </div>
         )}
        </>
    )
}



export default Cart




const CartItems = ({image, name, price, quantity, removeProduct, quantityToggle, setQuantity}) => {
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
                        <input type="text" onChange={(e) => setQuantity(e.target.value)} value="1" className="quantity-input"/>
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







const EmptyCart = () => {
    return (
        <div className="empty-shopping-cart">
            <div className="cart-items-body">
                <img src={cart_img('1.png')} alt=""/>
                <div className="title-header"><h3>Empty Shopping Cart</h3></div>
                <NavLink to="/" className="cart-button">
                    Continue shopping
                    <FontAwesomeIcon className="icon"  icon={faArrowRightLong} />
                </NavLink>
            </div>
        </div>
    )
}