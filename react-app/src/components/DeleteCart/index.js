import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteEntireCart } from "../../store/cart";
import '../DeleteReview/DeleteReview.css'

export default function DeleteCart() {
  const dispatch = useDispatch();
  const { closeModal } = useModal()

  const onDeleteTheWholeCart = async (e) => {
    e.preventDefault()
    await dispatch(deleteEntireCart())
    await closeModal()
  }

  return (
      <div className="delete-user-review-container">
          <h3 className="delete-review-header">Are you sure you want to clear your cart?</h3>
          <div className="delete-buttons-container">
              <button onClick={onDeleteTheWholeCart} className='delete-review-button'>Yes, clear cart</button>
              <button onClick={closeModal} className='delete-review-button'>Cancel</button>
          </div>
      </div>
  )
}
