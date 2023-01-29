import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemById } from "../../store/item";
import { useParams } from "react-router-dom"
import './ItemPage.css'
import ReviewForm from "../ReviewForm";
import OpenModalButton from "../OpenModalButton";
import UpdateReview from "../UpdateReview";
import { getAllReviews } from "../../store/review";
import DeleteReview from "../DeleteReview";
import { createNewCart, getAllCarts } from "../../store/cart";
import StarDisplay from "../StarDisplay";

export default function ItemPage() {
  const [loaded, setLoaded] = useState(false)
  const { itemId } = useParams()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const item = useSelector(state => state.items[itemId])
  const user = useSelector(state => state.session.user)


  const updateQuantity = (e) => {
    setQuantity(e.target.value)
  }

  const onAddToCart = async (e) => {
    e.preventDefault()
    await dispatch(createNewCart(user.id, +itemId, quantity))
    await dispatch(getAllCarts())
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

  useEffect(() => {
    dispatch(getItemById(itemId))
    dispatch(getAllReviews())
    .then(() => setLoaded(true))
  }, [dispatch, loaded, itemId])

  if (!loaded) return null
  if (!item) return null

  if (!user) {
    return (
      <div className="targét-item-container">
        <div className="top-half">
        <h1 className="targét-item-header">{item.name}</h1>
        <div className="targét-item-content-container">
          <img src={item.imageUrl} alt='targét-item' className="targét-item-picture" />
          <div className="targét-item-info-container">
            <h2>${item.price}</h2>
            {reviewsList.length  ?
                <div className="rating-decimal">Average rating: {reviewRating}</div>
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
              <img src={review.imageUrl} alt='review' className="review-image" />
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
      <div className="top-half">
      <h1 className="targét-item-header">{item.name}</h1>
      <div className="targét-item-content-container">
        <img src={item.imageUrl} alt='targét-item' className="targét-item-picture" />
        <div className="targét-item-info-container">
          <h2>${item.price}</h2>
          {reviewsList.length  ?
                <div className="rating-decimal">Average rating: {reviewRating}</div>
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
        </div>
      </div>
      </div>
      <div className="middle-part">
          <p>{item.description}</p>
      </div>
      <div className="bottom-half">
          <OpenModalButton
            buttonText='Write Review'
            modalComponent={<ReviewForm itemId={itemId} />}
            className='write-review-button'
            />
          <div>{item.reviews.length ? item.reviews.map(review => (
            <div key={review.id} className='review-card-container'>
            <div className="review-content-container">
              <h4 className="review-h4">{review.title}</h4>
              <StarDisplay rate={review.rating} />
              <span className="tiny-review-name">{review.user.firstName}</span>
              <div>{review.review}</div>
            {review.imageUrl ? (
            <img src={review.imageUrl} alt='review' className="review-image" />
              ) : null }
              { review.userId === user.id ?
              <>
              <OpenModalButton
              buttonText='Edit review'
              modalComponent={<UpdateReview reviewId={review.id} />}
              className='edit-review-button'
              />
              <OpenModalButton
              buttonText='Delete review'
              modalComponent={<DeleteReview reviewId={review.id} />}
              className='delete-review-button'
              />
              </>
             : null }
            </div>
            </div>
          )) : <div className="review-card-container-copy">No Reviews for this product yet.</div>}
          </div>
      </div>
    </div>
  )
}
