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
import { CartModalDropDown } from '../dropdown/CartModalDropDown'







const Cart = ({user, cart, setCart, addToCart, notify_success, notify_error}) => {
    const [totalPrice, setTotalPrice] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading ] = useState({loading: true, text: 'Fetching Cart, Please Wait...'})
    const [isDeleting, setIsDeleting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteItemID, setDeleteItemID] = useState(null)


   
    useEffect(() => {
        fetchShoppingCart()
    }, [])


    // fetch shopping cart
    const fetchShoppingCart = () => {
        if(token()){
            Axios.get(url(`/api/get-cart-items/${token()}`)).then((response) => { 
                if(response.data){
                    setIsLoading({loading: false, text: ''})
                    let totalPrice = 0
                    response.data.map((item, index) => {
                        totalPrice = totalPrice + ( item.price * item.quantity)
                    })
                    setTotalPrice(totalPrice)
                  return setCart(response.data)
                }
                setCart([])
                setTotalPrice(0)
            })
        }
        setIsLoading({loading: false, text: ''})
    }


    const quantityToggle = (index, counter,) => {
        const item = cart[index]
        let new_quantity = counter + item.quantity
        if(new_quantity <= 0){
            new_quantity = 0
            setIsLoading({loading: true, text: 'Deleting Product, Please Wait...'})
        }
         
        Axios.post(url('/api/toggle-cart-quantity'), {id: item._id, new_quantity: new_quantity, product_id: item.product._id}).then((response) => {
            if(response.data == 'greater'){
                return notify_error('Quantity exceed available quantity!')
            }
            if(response.data){
                setIsLoading({loading: false, text: ''})
                return fetchShoppingCart()
            }
            setIsLoading({loading: false, text: ''})
            return notify_error("Something went wront, try again!")
        })
       
    }



    // open and close delete modal 
    const modalToggle = (action, string) => { 
        setIsDeleting(false)
        setIsModalOpen(action) 
        setDeleteItemID(string)
    }

    // delete cart item
    const deleteItem = () => {
        setIsLoading({loading: true, text: 'Deleting Product, Please Wait...'})

        if(!deleteItemID){
            return notify_error("Something went wront, try again!")
        }
        Axios.post(url('/api/delete-cart-item'), {_id: deleteItemID}).then((response) => {
            if(response.data){
                fetchShoppingCart()
                modalToggle(false, null)
                setDeleteItemID(null)
                setIsLoading({loading: false, text: ''})
                return notify_success("Cart item deleted successfuly!")
            }
            setIsLoading({loading: false, text: ''})
            return notify_error("Something went wront, try again!")
        })
    }




    


    return (
        <>
         {isLoading.loading ? (
            <>
                {  cart.length == 0 ? (<EmptyCart/>) : '' }
                <Preloader text={isLoading.text}/>
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
                                {
                                    cart.map((item, index) => (
                                        <CartItems item_id={item._id} item={item}
                                            index={index} image={item.product.image} key={index} 
                                            name={item.product.product_name} price={item.price} 
                                            quantity={item.quantity} modalToggle={modalToggle} 
                                            quantityToggle={quantityToggle} setQuantity={setQuantity}/>
                                    ))
                                }
                             </tbody>
                        </table>
                        <CartTotal totalPrice={totalPrice}/>
                        {
                            isModalOpen && <CartModalDropDown isDeleting={isDeleting} deleteItem={deleteItem} modalToggle={modalToggle} />
                        }
                        {
                            isLoading.loading ? (<Preloader text={isLoading.text}/>) : ''
                        }
                     </div>
                 )
             }
         </div>
         )}
        </>
    )
}



export default Cart




const CartItems = ({item_id, item, index, image, name, price, quantity, modalToggle, quantityToggle, setQuantity}) => {
    let product_image = '1.jpg'
    if(image != undefined){
        product_image = image[0]
    }
    return (
        <tr className="cart-items-detail">
            <th scope="row">
                <div className="content">
                    <FontAwesomeIcon onClick={() => modalToggle(true, item_id)} className="cart-transh-can"  icon={faTrashCan} />
                </div>
            </th>
            <td>
                <NavLink to={`/detail?product=${ item.product._id }&category=${ item.product.category }`}>
                    <img src={product_img(product_image)} alt=""/>
                </NavLink>
            </td>
            <td>
                <div className="content">
                    <NavLink to={`/detail?product=${ item.product._id }&category=${ item.product.category }`}>
                        {name}
                    </NavLink>
                </div>
            </td>
            <td><div className="content">{money(price)}</div></td>
            <td>
                <div className="content">
                    <div className="quantity-counter">
                        <button type="button"><FontAwesomeIcon onClick={() => quantityToggle(index, -1)} className="icon"  icon={faMinus} /></button>
                        <input type="text" onChange={(e) => setQuantity(e.target.value)} value={quantity} className="quantity-input"/>
                        <button type="button"><FontAwesomeIcon onClick={() => quantityToggle(index, 1)} className="icon"  icon={faPlus} /></button>
                    </div>
                </div>
            </td>
            <td><div className="content">{money(price * quantity)}</div></td>
        </tr>
    )
}









const CartTotal = ({totalPrice}) => {
    return (
        <div className="cart-total-container">
            <ul>
                <li><b className="cart-total">Total: <span>{money(totalPrice)}</span></b></li>
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