const LOAD_ITEMS = 'items/loadItems'
const LOAD_ITEM = 'item/loadItem'
const CREATE_REVIEW = 'item/createReview'

const loadItems = (items) => ({
  type: LOAD_ITEMS,
  items,
});

const loadItem = (item) => ({
  type: LOAD_ITEM,
  item
})

const createReview = (item) => ({
  type: CREATE_REVIEW,
  item
})

export const getAllItems = () => async (dispatch) => {
  const res = await fetch('/api/items');
  if (res.ok) {
    const items = await res.json()
    dispatch(loadItems(items))
  }
}

export const getItemById = (id) => async (dispatch) => {
  const res = await fetch(`/api/items/${id}`);
  if (res.ok) {
    const item = await res.json()
    dispatch(loadItem(item))
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

let initialState = { items: null }

const itemReducer = ( state = initialState, action ) => {
  let newState = {};
  switch (action.type) {
    case LOAD_ITEMS:
      const itemsList = action.items.items;
      itemsList.forEach((item) => {
        newState[item.id] = item;
      });
      return newState;
    case LOAD_ITEM:
      newState = { ...state }
      newState[action.item.id] = action.item
      return newState
    case CREATE_REVIEW:
      newState = { ...state }
      newState[action.item.id] = action.item
      return newState
    default:
      return state;
  }
}

export default itemReducer;
