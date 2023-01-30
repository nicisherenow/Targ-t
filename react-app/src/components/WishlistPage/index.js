import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../auth/LoginForm";
import './WishlistPage.css'
import { NavLink, useHistory } from "react-router-dom";
import { createNewWishlist, getAllWishlists, deleteSingleWishlist, deleteEntireWishlist } from "../../store/wishlist";
import wishlist from '../../assets/wishlist.png'


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
  }, [loaded])

  const addToWishlist = async (e) => {
    e.preventDefault()
    const data = await dispatch(createNewWishlist(user.id, +itemId))
    if (data) {
      setErrors(data)
    } else {
      await dispatch(getAllWishlists())
    }
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

  const onUpdateWishlist = async (e) => {
    e.preventDefault()
    await dispatch(createNewWishlist(user.id, +itemId))
    await dispatch(getAllWishlists())
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
    await dispatch(deleteSingleWishlist(itemId))
  }

  const updateItemId = (e) => {
    setItemId(e.target.value)
  }

  return (
    <div className="wishlist-page-body">
      <div className="wishlist-icon-container">
        <img src={wishlist} alt='wishlist' className="wishlist-icon" />
      </div>
      
    </div>
  )
}
