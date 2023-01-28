import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../auth/LoginForm";
import './CartPage.css'
import { NavLink, useHistory } from "react-router-dom";
import { createNewCart, getAllCarts, deleteSingleCart, deleteEntireCart } from "../../store/cart";


export default function CartPage() {
  const [loaded, setLoaded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [itemId, setItemId] = useState(0)
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const carts = useSelector(state => state.carts)
  const items = useSelector(state => state.items)
  const history = useHistory()

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
  let randomItem = 0;
  let itemsList;
  if (items) {
    itemsList = Object.values(items)
    randomItem = Math.floor(Math.random() * itemsList.length)
  }

  let tax = totalPrice * 8.25/100
  let priceWithTax = totalPrice + tax

  useEffect(()=> {
    setLoaded(true)
  }, [loaded])

  const addToCart = async (e) => {
    await dispatch(createNewCart(user.id, +itemId, 1))
    await dispatch(getAllCarts())
  }

  const onUpdateCart = async (e) => {
    e.preventDefault()
    await dispatch(createNewCart(user.id, +itemId, quantity))
    await dispatch(getAllCarts())
  }

  const onDeleteTheWholeCart = async (e) => {
    e.preventDefault()
    await dispatch(deleteEntireCart())
  }

  const onCheckout = async (e) => {
    e.preventDefault()
    await dispatch(deleteEntireCart())
    .then(() => history.push('/checkout'))
  }
  const onClickRemove = async (e) => {
    e.preventDefault()
    await dispatch(deleteSingleCart(itemId))
  }

  const updateQuantity = (e) => {
    setQuantity(e.target.value)
  }

  const updateItemId = (e) => {
    setItemId(e.target.value)
  }

  return (
    <>
    { !user || !carts || !loaded || !cartsList.length ?

      <div className="cart-page-body" id='cart-page-align'>
        <h1>Your cart is empty</h1>
        {!user ?
        <>
        <h3>Have an account? Sign in to see your cart</h3>
        <div className="placeholder-button">
          <OpenModalButton
          buttonText='Sign in'
          modalComponent={<LoginForm />}
          className='sign-in-button'
          />
          </div>
          </>
        :
        <>
        <h3>How about a last minute grab?</h3>
         {itemsList[randomItem] ?
           <div id="shopping-item-card" key={itemsList[randomItem].id}>
            <NavLink to={`/items/${itemsList[randomItem].id}`} className='shopping-item-container'>
              <div className="shopping-item-image-container">
                <img src={itemsList[randomItem].imageUrl} alt={itemsList[randomItem].name} className='shopping-item-image' />
                <div className="no-text-decor">${itemsList[randomItem].price}</div>
              </div>
            </NavLink>
            <button onMouseUp={addToCart} onMouseDown={updateItemId} value={itemsList[randomItem].id}>Add to cart</button>
          </div>
         : null }
         </>
        }
      </div>
      :
      <>
      <div className="cart-page-body">
        <div className="cart-page-column">

        <h1>Cart</h1>
        {cartsList.map(cart => (
          <div className="cart-item-card" key={cart.id}>
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
          <div className="update-cart-align">
            <form onSubmit={onUpdateCart} className='update-cart-button'>
                <div className="cart-item-cards">
                    <select
                      name="quantity"
                      onChange={updateQuantity}
                      required={true}
                      className='update-field'
                      >
                      <option className='update-field' value={cart.quantity}>{cart.quantity}</option>
                      <option className='update-field' value={1}>1</option>
                      <option className='update-field' value={2}>2</option>
                      <option className='update-field' value={3}>3</option>
                      <option className='update-field' value={4}>4</option>
                      <option className='update-field' value={5}>5</option>
                      <option className='update-field' value={6}>6</option>
                      <option className='update-field' value={7}>7</option>
                      <option className='update-field' value={8}>8</option>
                      <option className='update-field' value={9}>9</option>
                      <option className='update-field' value={10}>10</option>
                    </select>
                    <button type='submit' onClick={updateItemId} value={+cart.itemId} className='cart-buttons' >Update</button>
                    <button onMouseEnter={updateItemId} onClick={onClickRemove} value={cart.id} className='cart-buttons'>Remove</button>
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
            <div className="button-container">
              <button onClick={onDeleteTheWholeCart} className='checkout-button'>Clear cart</button>
              <button onClick={onCheckout} className='checkout-button'>Checkout</button>
            </div>
        </div>
      </div>
        </>
    }
    </>
  )
}
