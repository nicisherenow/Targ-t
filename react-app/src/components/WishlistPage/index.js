import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../auth/LoginForm";
import './WishlistPage.css'
import { NavLink, useHistory } from "react-router-dom";
import { getAllWishlists, deleteSingleWishlist, deleteEntireWishlist } from "../../store/wishlist";
import { createNewCart, getAllCarts } from "../../store/cart";
import wishlist from '../../assets/wishlist.png'
import DeleteWishlist from "../DeleteWishlist";
import github from '../../assets/github.png'
import linkedin from '../../assets/linkedin.png'


export default function WishlistPage() {
  const [loaded, setLoaded] = useState(false)
  const [itemId, setItemId] = useState(1)
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const wishlists = useSelector(state => state.wishlists)
  const history = useHistory()


  let wishlistsList;
  if (wishlists) {
    wishlistsList = Object.values(wishlists)
  }

  useEffect(()=> {
    if (user) {
      dispatch(getAllWishlists())
    }
    setLoaded(true)
  }, [dispatch, loaded, user])

  const addToCart = async (e) => {
    e.preventDefault()
    await dispatch(createNewCart(user.id, +itemId, 1))
    await dispatch(deleteSingleWishlist(+itemId))
    await dispatch(getAllWishlists())
  }

  const onMoveToCart = async (e) => {
    e.preventDefault()
    await dispatch(deleteEntireWishlist())
    await dispatch(getAllCarts())
    await history.push('/cart')
  }
  const onClickRemove = async (e) => {
    e.preventDefault()
    await dispatch(deleteSingleWishlist(+itemId))
    await dispatch(getAllWishlists())
  }

  if ( !user ) return (

    <div className="wishlist-page-body">
    <div className="wishlist-icon-container">
        <img src={wishlist} alt='wishlist' className="wishlist-icon" />
      </div>
      <div className="wishlist-container">

      <div className="wishlist-header-container">
        <h2 className="wishlist-header">You don't have a wishlist yet,
        <OpenModalButton
          buttonText=' sign in?'
          modalComponent={<LoginForm />}
          className='wishlist-signin-button'
          /></h2>
      </div>
          </div>
      <div className="dev-links-center">
        <div className='dev-links-wl'>
            <a href='https://github.com/nicisherenow' className="git-links" target='_blank' rel="noreferrer"><img src={github} alt='github' className='link-size' id='github' /></a>
            <a href='https://www.linkedin.com/in/nicholas-talbot-5441a4242/' className="linkedin-links" target='_blank' rel="noreferrer"><img src={linkedin} alt='linkedin' className='link-size' id='linkedin' /></a>
        </div>
      </div>
  </div>
    )

  if ( !wishlistsList.length || !loaded ) return (

    <div className="wishlist-page-body">
      <div className="wishlist-icon-container">
        <img src={wishlist} alt='wishlist' className="wishlist-icon" />
      </div>
      <div className="wishlist-container">

      <div className="wishlist-header-container">
        <h2 className="wishlist-header">You don't have anything in your wishlist yet.</h2>
      </div>
      </div>
      <div className='dev-links-wl'>
          <a href='https://github.com/nicisherenow' className="git-links" target='_blank' rel="noreferrer"><img src={github} alt='github' className='link-size' id='github' /></a>
          <a href='https://www.linkedin.com/in/nicholas-talbot-5441a4242/' className="linkedin-links" target='_blank' rel="noreferrer"><img src={linkedin} alt='linkedin' className='link-size' id='linkedin' /></a>
      </div>
    </div>
    )

  const updateItemId = (e) => {
    setItemId(e.target.value)
  }

  return (
    <div className="wishlist-page-body">
      <div className="wishlist-icon-container">
        <img src={wishlist} alt='wishlist' className="wishlist-icon" />
        <button onClick={onMoveToCart} className='move-to-cart-button'>Add all to cart</button>
        <OpenModalButton
          buttonText='Clear wishlist'
          modalComponent={<DeleteWishlist />}
          />
        <span className="wishlist-total">{wishlistsList.length}</span>
      </div>
      {wishlistsList?.length && user ?
      <>
      <div className="wishlist-container">
        {wishlistsList.map(wishlist => (
          <div className="each-wishlist" key={wishlist.id}>
            <NavLink to={`/items/${wishlist.item.id}`}>
              <img src={wishlist.item.imageUrl} alt={wishlist.item.name} className='wishlist-image' />
            </NavLink>
            <div className="wishlist-buttons">
              <form onSubmit={addToCart}>
                <button type='submit' onClick={updateItemId} value={wishlist.item.id} className='wishlist-to-cart'>Add to cart</button>
              </form>
              <form onSubmit={onClickRemove}>
                <button type='submit' onClick={updateItemId} value={wishlist.item.id} className='wishlist-remove'>
                  x
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
            <div className='dev-links-wl'>
              <a href='https://github.com/nicisherenow' className="git-links" target='_blank' rel="noreferrer"><img src={github} alt='github' className='link-size' id='github' /></a>
              <a href='https://www.linkedin.com/in/nicholas-talbot-5441a4242/' className="linkedin-links" target='_blank' rel="noreferrer"><img src={linkedin} alt='linkedin' className='link-size' id='linkedin' /></a>
            </div>
        </>
      :
          <>
          <div className="wishlist-header-container">
            <h2 className="wishlist-header">You don't have anything in your wishlist yet</h2>
          </div>
            <div className='dev-links-wl'>
              <a href='https://github.com/nicisherenow' className="git-links" target='_blank' rel="noreferrer"><img src={github} alt='github' className='link-size' id='github' /></a>
              <a href='https://www.linkedin.com/in/nicholas-talbot-5441a4242/' className="linkedin-links" target='_blank' rel="noreferrer"><img src={linkedin} alt='linkedin' className='link-size' id='linkedin' /></a>
            </div>
          </>

      }
    </div>
  )
}
