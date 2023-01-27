import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../auth/LoginForm";
import './CartPage.css'


export default function CartPage() {
  const [loaded, setLoaded] = useState(false)
  // const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const carts = useSelector(state => state.carts)

  let cartsList;
  let totalPrice = 0;
  if (carts) {
    cartsList = Object.values(carts)
    cartsList.forEach(cart => {
      totalPrice += cart.item.price * cart.quantity
    })
  }
  console.log(totalPrice)
  let tax = totalPrice * 8.25/100
  console.log(tax)
  let priceWithTax = totalPrice += tax
  console.log(+priceWithTax.toFixed(2))
  useEffect(()=> {
    setLoaded(true)
  }, [loaded])


  return (
    <>
    { !user || !carts || !loaded ?
      <div className="cart-page-body">
        <h1>Your cart is empty</h1>
        <h3>Have an account? Sign in to see your cart</h3>
        <OpenModalButton
          buttonText='Sign in'
          modalComponent={<LoginForm />}
          className='sign-in-button'
          />
      </div>
      : <div className="cart-page-body">
        {cartsList.map(cart => (
          <div className="cart-item-container">
            <div>{cart.item.name}</div>
            <div>{cart.quantity}</div>
            <div>{cart.item.price}</div>
          </div>
        ))}
      </div>
    }
    </>
  )
}
