import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { updateCurrentReview } from '../../store/review'
import { getAllItems } from '../../store/item'

const UpdateReview = ({ reviewId }) => {
  const currentReview = useSelector(state => state.reviews[reviewId])
  const [loaded, setLoaded] = useState(false)
  const [errors, setErrors] = useState([])
  const [review, setReview] = useState(currentReview.review)
  const [rating, setRating] = useState(currentReview.rating)
  const [imageUrl, setImageUrl] = useState(currentReview.imageUrl)
  const [title, setTitle] = useState(currentReview.title)
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const userId = useSelector(state => state.session.user.id)


  useEffect(() => {
    setLoaded(true)
  }, [loaded])

  const updateReview = (e) => {
    setReview(e.target.value)
  }

  const updateRating = (e) => {
    setRating(e.target.value)
  }

  const updateTitle = (e) => {
    setTitle(e.target.value)
  }

  const updateImageUrl = (e) => {
    setImageUrl(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(updateCurrentReview(review, rating, imageUrl, title, +reviewId))
    await dispatch(getAllItems)
    if (data) {
      setErrors(data)
    } else {
      await closeModal()
    }
  }

  if (!loaded) return null

  return (
    <form onSubmit={onSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>Title</label>
        <input
          type='text'
          name='title'
          onChange={updateTitle}
          value={title}
          required={true}
        ></input>
      </div>
      <div>
        <label>Review</label>
        <input
          type='text'
          name='review'
          onChange={updateReview}
          value={review}
          required={true}
        ></input>
      </div>
          <div>
        <label className="signup-input-label">Rating</label>
          <select
            name="rating"
            onChange={updateRating}
            required={true}
            className='signup-input-field'
            >
            <option className='signup-input-field' value={1}>1</option>
            <option className='signup-input-field' value={2}>2</option>
            <option className='signup-input-field' value={3}>3</option>
            <option className='signup-input-field' value={4}>4</option>
            <option className='signup-input-field' value={5}>5</option>
          </select>
          </div>
      <div>
        <label>Image URL(optional)</label>
        <input
          type='text'
          name='imageUrl'
          onChange={updateImageUrl}
          value={imageUrl}
        ></input>
      </div>
      <button type='submit'>Edit Review</button>
    </form>
  )
}

export default UpdateReview
