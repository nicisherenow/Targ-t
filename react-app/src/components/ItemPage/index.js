import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems, getItemById } from "../../store/item";
import { useParams } from "react-router-dom"
import './ItemPage.css'
import ReviewForm from "../ReviewForm";
import OpenModalButton from "../OpenModalButton";
import UpdateReview from "../UpdateReview";
import { getAllReviews } from "../../store/review";
import DeleteReview from "../DeleteReview";

export default function ItemPage() {
  const [loaded, setLoaded] = useState(false)
  const { itemId } = useParams()
  const dispatch = useDispatch()
  const item = useSelector(state => state.items[itemId])
  const user = useSelector(state => state.session.user)

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
            <div>Quantity and Add to cart Placeholder</div>
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
                <div>{review.rating}</div>
                <span className="tiny-review-name">{review.user.firstName}</span>
                <div>{review.review}</div>
              {review.imageUrl ? (
              <img src={review.imageUrl} alt='review' className="review-image" />
                ) : null }
              </div>
              </div>
            )) : "No Reviews for this product yet."}
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
          <div>Quantity and Add to cart Placeholder</div>
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
              <div>{review.rating}</div>
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
          )) : "No Reviews for this product yet."}
          </div>
      </div>
    </div>
  )
}
