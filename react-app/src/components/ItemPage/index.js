import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemById } from "../../store/item";
import { NavLink, useParams } from "react-router-dom"
import './ItemPage.css'
import ReviewForm from "../ReviewForm";
import OpenModalButton from "../OpenModalButton";

export default function ItemPage() {
  const [loaded, setLoaded] = useState(false)
  const { itemId } = useParams()
  const dispatch = useDispatch()
  const item = useSelector(state => state.items[itemId])


  useEffect(() => {
    dispatch(getItemById(itemId))
    .then(() => setLoaded(true))
  }, [dispatch, loaded])

  if (!loaded) return null
  if (!item) return null

  return (
    <div className="targét-item-container">
      <div className="top-half">
      <h1 className="targét-item-header">{item.name}</h1>
      <div className="targét-item-content-container">
        <img src={item.imageUrl} alt='targét-item' className="targét-item-picture" />
        <div className="targét-item-info-container">
          <h2>${item.price}</h2>
          <p>{item.description}</p>
          <div>Quantity and Add to cart Placeholder</div>
        </div>
      </div>
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
            </div>
            </div>
          )) : "No Reviews for this product yet."}
          </div>
      </div>
    </div>
  )
}
