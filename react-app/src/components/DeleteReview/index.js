import { useModal } from "../../context/Modal";
import { getAllItems } from "../../store/item";
import { useDispatch } from "react-redux";
import { deleteSingleReview } from "../../store/review";

export default function DeleteReview({ reviewId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal()

  const deleteReview = async (e) => {
      e.preventDefault()
      await dispatch(deleteSingleReview(reviewId))
      await dispatch(getAllItems())
      await closeModal()
  }

  return (
      <div className="delete-user-review-container">
          <h3 className="delete-review-header">Are you sure you want to delete your review?</h3>
          <div className="delete-buttons-container">
              <button onClick={deleteReview} className='delete-review-button'>Yes, Delete review</button>
              <button onClick={closeModal} className='delete-review-button'>Cancel</button>
          </div>
      </div>
  )
}
