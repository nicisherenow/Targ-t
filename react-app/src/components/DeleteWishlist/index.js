import { useModal } from "../../context/Modal";
import { getAllItems } from "../../store/item";
import { useDispatch } from "react-redux";
import '../DeleteReview/DeleteReview.css'
import { reallyDeleteEntireWishlist } from "../../store/wishlist";

export default function DeleteWishlist() {
  const dispatch = useDispatch();
  const { closeModal } = useModal()

  const onDeleteTheWholeCart = async (e) => {
    e.preventDefault()
    await dispatch(reallyDeleteEntireWishlist())
    await closeModal()
  }

  return (
      <div className="delete-user-review-container">
          <h3 className="delete-review-header">Are you sure you want to clear your wishlist?</h3>
          <div className="delete-buttons-container">
              <button onClick={onDeleteTheWholeCart} className='delete-review-button'>Yes, clear wishlist</button>
              <button onClick={closeModal} className='delete-review-button'>Cancel</button>
          </div>
      </div>
  )
}
