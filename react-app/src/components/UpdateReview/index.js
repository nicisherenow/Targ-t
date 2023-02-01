import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './UpdateReview.css'
import { useModal } from '../../context/Modal'
import { getAllReviews, updateCurrentReview } from '../../store/review'
import { getAllItems } from '../../store/item'
import StarComponent from '../StarComponent'


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

  useEffect(() => {
    setLoaded(true)
  }, [loaded])

  const updateReview = (e) => {
    setReview(e.target.value)
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
    await dispatch(getAllItems())
    await dispatch(getAllReviews())
    if (data) {
      setErrors(data)
    } else {
      await closeModal()
    }
  }


  if (!loaded) return null

  return (
    <div className='review-container'>
    <h1 className='review-header'>Edit review</h1>
    <form onSubmit={onSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div className='errors' key={ind}>{error.split(':')[1]}</div>
        ))}
      <div>
        <StarComponent onChange={setRating} rate={currentReview.rating} />
      </div>
      </div>
      <div className='review-div'>
        <label>Title</label>
        <input
          className='review-input'
          type='text'
          name='title'
          onChange={updateTitle}
          value={title}
          required={true}
          ></input>
      </div>
      <div className='review-div'>
        <label>Review</label>
        <input
          className='review-input'
          type='text-area'
          name='review'
          onChange={updateReview}
          value={review}
          required={true}
          ></input>
      </div>
      <div className='review-div'>
        <label>Image URL(optional)</label>
        <input
          className='review-input'
          type='text'
          name='imageUrl'
          onChange={updateImageUrl}
          value={imageUrl}
          ></input>
      </div>
      <button className='review-button' type='submit'>Edit Review</button>
    </form>
  </div>
  )
}

export default UpdateReview
