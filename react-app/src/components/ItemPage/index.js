import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemById } from "../../store/item";
import { useParams, useHistory } from "react-router-dom"
import './ItemPage.css'
import ReviewForm from "../ReviewForm";
import OpenModalButton from "../OpenModalButton";
import UpdateReview from "../UpdateReview";
import { getAllReviews } from "../../store/review";
import DeleteReview from "../DeleteReview";
import { createNewCart, getAllCarts } from "../../store/cart";
import StarDisplay from "../StarDisplay";
import { createNewWishlist, getAllWishlists, deleteSingleWishlist } from "../../store/wishlist";
import arrLeft from '../../assets/arr-left.png'
import arrRight from '../../assets/arr-right.png'
import homeLogo from '../../assets/home-logo.png'

export default function ItemPage() {
  const [loaded, setLoaded] = useState(false)
  const { itemId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const [quantity, setQuantity] = useState(1)
  const item = useSelector(state => state.items[itemId])
  const carts = useSelector(state => state.carts)
  const user = useSelector(state => state.session.user)
  const wishlists = useSelector(state => state.wishlists)


  const updateQuantity = (e) => {
    setQuantity(e.target.value)
  }

  let cartsList;
  if (carts) {
    cartsList = Object.values(carts)
  }

  let hasCart;
  if (cartsList) {
    hasCart = cartsList.filter(cart => cart.itemId === +itemId)
  }

  let wishlistsList;
  if (wishlists) {
    wishlistsList = Object.values(wishlists)
  }

  let hasWishlist;
  if (wishlistsList) {
    hasWishlist = wishlistsList.filter(wishlist => wishlist.itemId === +itemId)
  }

  const onPreviousClick = () => {
    if (itemId > 1) {
      history.push(`/items/${+itemId - 1}`)
    } else {
      history.push(`/items/${120}`)
    }
  }

  const onNextClick = () => {
    if (+itemId < 120) {
      history.push(`/items/${+itemId + 1}`)
    } else {
      history.push('/items/1')
    }
  }

  const onAddToCart = async (e) => {
    e.preventDefault()
    await dispatch(createNewCart(user.id, +itemId, quantity))
    await dispatch(deleteSingleWishlist(+itemId))
    await dispatch(getAllCarts())
    await dispatch(getAllWishlists())
  }

  const addToWishlist = async (e) => {
    e.preventDefault()
    await dispatch(createNewWishlist(user.id, +itemId))
    await dispatch(getAllWishlists())
  }

  let totalRating = 0;
  let reviewsList;
  if (item) {
    reviewsList = item.reviews
    reviewsList.forEach(review => {
      totalRating += review.rating
    })
  }
  let reviewRating = 0;
  if (reviewsList) {
    reviewRating = (totalRating / reviewsList.length).toFixed(1)
  }

  let hasReview;
  if (reviewsList && user) {
    hasReview = reviewsList.filter(review => review.userId === user.id)
  }

  useEffect(() => {
    dispatch(getItemById(itemId))
    if (!+itemId || +itemId > 120 || +itemId < 0) {
      history.push('/catch')
    }
    if (user) {
      dispatch(getAllReviews())
    }
    setLoaded(true)

  }, [dispatch, loaded, itemId, user, history])

  if (!loaded) return <div className="targét-item-container"></div>
  if (!item) return <div className="targét-item-container"></div>

  if (!user) {
    return (
      <div className="targét-item-container">
        <img onClick={onPreviousClick} src={arrLeft} alt='previous' className="ip-previous-item" />
        <img onClick={onNextClick} src={arrRight} alt='next' className="ip-next-item" />
        <div className="top-half">
        <h1 className="targét-item-header">{item.name}</h1>
        <div className="targét-item-content-container">
          <img src={item.imageUrl} alt='targét-item' className="targét-item-picture" />
          <div className="targét-item-info-container">
            <h2>${item.price}</h2>
            {reviewsList.length  ?
                <div className="rating-decimal">Average rating: {reviewRating} ({reviewsList.length > 1 ? `${reviewsList.length} reviews` : `${reviewsList.length} review`})</div>
                :
                <div className="rating-decimal">No Reviews for this product yet.</div>

            }
          </div>
        </div>
        </div>
        <div className="middle-part">
            <p>{item.description}</p>
        </div>
        <div className="bottom-half">
            <div>{item.reviews.length ? item.reviews.map(review => (
              <div key={review.id} className='review-card-container'>
              <div className="review-content-container">
                <h4 className="review-h4">{review.title}</h4>
                <StarDisplay rate={review.rating} />
                <span className="tiny-review-name">{review.user.firstName}</span>
                <div>{review.review}</div>
              {review.imageUrl ? (
              <img src={review.imageUrl} alt='review' onError={e => { e.currentTarget.src = homeLogo ; }} className="review-image" />
                ) : null }
              </div>
              </div>
            )) : <div className="review-card-container-copy">No Reviews for this product yet.</div>}
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className="targét-item-container">
      <img onClick={onPreviousClick} src={arrLeft} alt='previous' className="ip-previous-item" />
      <img onClick={onNextClick} src={arrRight} alt='next' className="ip-next-item" />
      <div className="top-half">
      <h1 className="targét-item-header">{item.name}</h1>
      <div className="targét-item-content-container">
        <img src={item.imageUrl} alt='targét-item' className="targét-item-picture" />
        <div className="targét-item-info-container">
          <h2>${item.price}</h2>
          {reviewsList.length  ?
                <div className="rating-decimal">Average rating: {reviewRating} ({reviewsList.length > 1 ? `${reviewsList.length} reviews` : `${reviewsList.length} review`})</div>
                :
                <div className="rating-decimal">No Reviews for this product yet.</div>
            }
          <form onSubmit={onAddToCart} className='add-to-cart-button'>
              <div className="div-gap">
                <label className="signup-input-label">Quantity: </label>
                  <select
                    name="quantity"
                    onChange={updateQuantity}
                    required={true}
                    className='signup-input-field'
                    >
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
                  <button type='submit'>Add to cart</button>
              </div>
              </form>
              {(hasWishlist && hasWishlist.length) || (hasCart && hasCart.length) ? null :
                  <button onClick={addToWishlist} className='add-to-wishlist-button'>Add to wishlist</button>
                }
        </div>
      </div>
      </div>
      <div className="middle-part">
          <p>{item.description}</p>
      </div>
      <div className="bottom-half">
          { hasReview.length ?
            <OpenModalButton
              buttonText='Edit review'
              modalComponent={<UpdateReview reviewId={hasReview[0].id} />}
              className='edit-review-button'
              />
              :
              <OpenModalButton
                buttonText='Write Review'
                modalComponent={<ReviewForm itemId={itemId} />}
                className='write-review-button'
              />
            }
          <div>{item.reviews.length ? item.reviews.map(review => (
            <div key={review.id} className='review-card-container'>
              <div className="side-buttons">
            <div className="review-content-container">
              <h4 className="review-h4">{review.title}</h4>
              <StarDisplay rate={review.rating} />
              <span className="tiny-review-name">{review.user.firstName}</span>
              <div>{review.review}</div>
            {review.imageUrl ? (
            <img src={review.imageUrl} alt='review' onError={e => { e.currentTarget.src = homeLogo ; }} className="review-image" />
              ) : null }
            </div>
              { review.userId === user.id ?
              <div className="modal-buttons">
                <div className="space-between">
                <OpenModalButton
                  buttonText='Delete review'
                  modalComponent={<DeleteReview reviewId={review.id} />}
                  className='delete-review-button'
                />
                </div>
              </div>
             : null }
             </div>
            </div>
          ))

          : <div className="review-card-container-copy">No Reviews for this product yet.</div>}
          </div>
      </div>
    </div>
  )
}
