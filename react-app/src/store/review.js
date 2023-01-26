const LOAD_REVIEWS = 'reviews/loadReviews'
const LOAD_REVIEW = 'review/loadReview'
const CREATE_REVIEW = 'item/createReview'
const EDIT_REVIEW = 'item/editReview'

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
})

const loadReview = (review) => ({
  type: LOAD_REVIEW,
  review
})

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review
})

const editReview = (review) => ({
  type: EDIT_REVIEW,
  review
})



export const getAllReviews = () => async (dispatch) => {
  const res = await fetch('/api/reviews');
  if (res.ok) {
    const reviews = await res.json()
    dispatch(loadReviews(reviews))
  }
}

export const getReviewById = (id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`);
  if (res.ok) {
    const review = await res.json()
    dispatch(loadReview(review))
  }
}

export const writeReview = (userId, itemId, review, rating, imageUrl, title) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${itemId}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId,
      itemId,
      review,
      rating,
      imageUrl,
      title,
    })
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(createReview(data))
    return null
  } else if ( res.status < 500 ) {
    const data = await res.json()
    if (data.errors) {
      return data.errors
      }
  } else {
    return ['An error occured. Please try again.']
  }
}

export const updateCurrentReview = (review, rating, imageUrl, title, reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      review,
      rating,
      imageUrl,
      title,
    })
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(editReview(data))
    return null
  } else if ( res.status < 500 ) {
    const data = await res.json()
    if (data.errors) {
      return data.errors
      }
  } else {
    return ['An error occured. Please try again.']
  }
}

let initialState = {}

const reviewReducer = ( state = initialState, action ) => {
  let newState = {};
  switch (action.type) {
    case LOAD_REVIEWS:
      const reviewsList = action.reviews.reviews;
      reviewsList.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case CREATE_REVIEW:
      newState = { ...state }
      newState[action.review.id] = action.review
      return newState
    case EDIT_REVIEW:
      newState = { ...state }
      newState[action.review.id] = action.review
      return newState
    default:
      return state;
  }
}

export default reviewReducer;
