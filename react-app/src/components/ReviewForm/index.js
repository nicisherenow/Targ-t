import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './ReviewForm.css'
import { useModal } from '../../context/Modal'
import { getAllReviews, writeReview } from '../../store/review'
import { getAllItems } from '../../store/item'
import StarComponent from '../StarComponent'


const  ReviewForm = ( { itemId }) => {
  const [loaded, setLoaded] = useState(false)
  const [errors, setErrors] = useState([])
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(1)
  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()
  const userId = useSelector(state => state.session.user.id)
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
  console.log(errors)
  const onSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(writeReview(userId, +itemId, review, rating, imageUrl, title))
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
    <h1 className='review-header'>Write review</h1>
    <form onSubmit={onSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div className='errors' key={ind}>{error.split(':').length === 2 ? error.split(':')[1] : error.split('imageUrl :')[1]}</div>
          ))}
      </div>
      <div>
        <StarComponent onChange={setRating} />
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
          type='text'
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
      <button className='review-button' type='submit'>Submit Review</button>
    </form>
          </div>
  )
}

export default ReviewForm
