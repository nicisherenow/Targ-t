import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../auth/LoginForm";
import './CartPage.css'
import { NavLink } from "react-router-dom";
import { createNewCart, getAllCarts } from "../../store/cart";


export default function CartPage() {
  const [loaded, setLoaded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [itemId, setItemId] = useState(0)
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const carts = useSelector(state => state.carts)

  let cartsList;
  let totalPrice = 0;
  let total = 0;
  if (carts) {
    cartsList = Object.values(carts)
    cartsList.forEach(cart => {
      totalPrice += cart.item.price * cart.quantity
      total += cart.quantity
    })
  }
  let tax = totalPrice * 8.25/100
  let priceWithTax = totalPrice + tax
  
  useEffect(()=> {
    setLoaded(true)
  }, [loaded])

  const onUpdateCart = async (e) => {
    e.preventDefault()
    await dispatch(createNewCart(user.id, +itemId, quantity))
    await dispatch(getAllCarts())
  }

  const updateQuantity = (e) => {
    setQuantity(e.target.value)
  }


  return (
    <>
    { !user || !carts || !loaded ?
      <div className="cart-page-column" id='cart-page-align'>
        <h1>Your cart is empty</h1>
        <h3>Have an account? Sign in to see your cart</h3>
        <OpenModalButton
          buttonText='Sign in'
          modalComponent={<LoginForm />}
          className='sign-in-button'
          />
      </div>
      :
      <>
      <div className="cart-page-body">
        <div className="cart-page-column">

        <h1>Cart</h1>
        {cartsList.map(cart => (
          <div className="cart-item-card">
            <NavLink to={`/items/${cart.itemId}`} key={cart.id} className='cart-navlink'>
            <div className="cart-image-container">
              <img src={cart.item.imageUrl} alt={`${cart.item.name}`} className='cart-image' />
            </div>
            <div className="cart-item-details">
              <div>{cart.item.name}</div>
              <div>{cart.quantity} </div>
              <div className="price">${cart.item.price}</div>
            </div>
          </NavLink>
          <div>

          <form onSubmit={onUpdateCart} className='update-cart-button'>
              <div>
                <label className="signup-input-label">Quantity</label>
                  <select
                    name="quantity"
                    onChange={updateQuantity}
                    required={true}
                    className='signup-input-field'
                    >
                    <option className='signup-input-field' value={cart.quantity}>{cart.quantity}</option>
                    <option className='signup-input-field' value={1}>1</option>
                    <option className='signup-input-field' value={2}>2</option>
                    <option className='signup-input-field' value={3}>3</option>
                    <option className='signup-input-field' value={4}>4</option>
                    <option className='signup-input-field' value={5}>5</option>
                    <option className='signup-input-field' value={6}>6</option>
                    <option className='signup-input-field' value={7}>7</option>
                    <option className='signup-input-field' value={8}>8</option>
                    <option className='signup-input-field' value={9}>9</option>
                    <option className='signup-input-field' value={10}>10</option>
                  </select>
                  <button type='submit' onClick={(e) => setItemId(e.target.value)}value={cart.itemId}>Update quantity</button>
              </div>
              </form>
          </div>
          </div>
        ))}
        </div>
        <div className="totals-section">
          <h2>Order Summary</h2>
            <div className="totals-spacing">Subtotal({total} {total > 1 ? 'items' : 'item'}) <span>${totalPrice.toFixed(2)}</span></div>
            <div className="totals-spacing">Estimated tax <span>${tax.toFixed(2)}</span></div>
            <div className="totals-spacing" id='total'>Total <span>${priceWithTax.toFixed(2)}</span></div>
        </div>
      </div>
        </>
    }
    </>
  )
}
