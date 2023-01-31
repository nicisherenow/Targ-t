import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../auth/LoginForm";
import './WishlistPage.css'
import { NavLink, useHistory } from "react-router-dom";
import { createNewWishlist, getAllWishlists, deleteSingleWishlist, deleteEntireWishlist } from "../../store/wishlist";
import { createNewCart } from "../../store/cart";
import wishlist from '../../assets/wishlist.png'
import cross from '../../assets/cross-white.png'


export default function WishlistPage() {
  const [loaded, setLoaded] = useState(false)
  const [itemId, setItemId] = useState(1)
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const wishlists = useSelector(state => state.wishlists)
  const items = useSelector(state => state.items)
  const history = useHistory()


  let wishlistsList;
  if (wishlists) {
    wishlistsList = Object.values(wishlists)
  }

  let itemsList;
  if (items) {
    itemsList = Object.values(items)
  }

  useEffect(()=> {
    dispatch(getAllWishlists())
    setLoaded(true)
  }, [dispatch, loaded])

  const addToWishlist = async (e) => {
    e.preventDefault()
    const data = await dispatch(createNewWishlist(user.id, +itemId))
    if (data) {
      setErrors(data)
    } else {
      await dispatch(getAllWishlists())
    }
  }

  const addToCart = async (e) => {
    e.preventDefault()
    await dispatch(createNewCart(user.id, +itemId, 1))
    await dispatch(deleteSingleWishlist(+itemId))
    await dispatch(getAllWishlists())
  }

  const onPreviousClick = () => {
    if (itemId > 1) {
      setItemId(+itemId - 1)
    } else {
      setItemId(+itemsList.length - 1)
    }
  }

  const onNextClick = () => {
    if (itemId < +itemsList.length - 1) {
      setItemId(+itemId + 1)
    } else {
      setItemId(1)
    }
  }

  const onDeleteTheWholeWishlist = async (e) => {
    e.preventDefault()
    await dispatch(deleteEntireWishlist())
  }

  const onMoveToCart = async (e) => {
    e.preventDefault()
    await dispatch(deleteEntireWishlist())
    .then(() => history.push('/cart'))
  }
  const onClickRemove = async (e) => {
    e.preventDefault()
    await dispatch(deleteSingleWishlist(+itemId))
    await dispatch(getAllWishlists())
  }
  if (!wishlistsList.length || !loaded ) return (

    <div className="wishlist-page-body">
    <div className="wishlist-icon-container">
        <img src={wishlist} alt='wishlist' className="wishlist-icon" />
      </div>
      <div className="wishlist-header-container">
        <h2 className="wishlist-header">You don't have anything in your wishlist yet</h2>
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
      </div>
      {wishlistsList?.length && user ?
      <div className="wishlist-container">
        {wishlistsList.map(wishlist => (
          <div className="each-wishlist" key={wishlist.id}>
            <img src={wishlist.item.imageUrl} alt={wishlist.item.name} className='wishlist-image' />
            <div className="wishlist-buttons">
              <button onClick={addToCart} onMouseEnter={updateItemId} value={wishlist.item.id} className='wishlist-to-cart'>Add to cart</button>
              <button onClick={onClickRemove} onMouseEnter={updateItemId} value={wishlist.item.id} className='wishlist-remove'>
                <img src={cross} alt='remove' className="wishlist-remove-image" />
              </button>
            </div>
          </div>
        ))}
      </div>
      :
          <div className="wishlist-header-container">
            <h2 className="wishlist-header">You don't have anything in your wishlist yet</h2>
          </div>
      }
    </div>
  )
}
