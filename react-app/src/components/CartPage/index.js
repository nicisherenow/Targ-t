import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../auth/LoginForm";
import './CartPage.css'
import { NavLink } from "react-router-dom";


export default function CartPage() {
  const [loaded, setLoaded] = useState(false)
  // const dispatch = useDispatch()
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
  console.log(+priceWithTax.toFixed(2))
  useEffect(()=> {
    setLoaded(true)
  }, [loaded])


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
              <div>{cart.quantity}</div>
              <div className="price">${cart.item.price}</div>
            </div>
          </NavLink>
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
