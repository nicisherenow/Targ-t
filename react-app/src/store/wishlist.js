const LOAD_WISHLISTS = 'wishlists/loadWishlists'
const LOAD_WISHLIST = 'wishlist/loadWishlist'
const CREATE_WISHLIST = 'wishlist/createWishlist'
const DELETE_WISHLIST = 'wishlist/DeleteWishlistItem'
const CLEAR_WISHLIST = 'wishlist/clearWishlist'

const loadWishlists = (wishlists) => ({
  type: LOAD_WISHLISTS,
  wishlists,
});

const loadWishlist = (wishlist) => ({
  type: LOAD_WISHLIST,
  wishlist
})

const createWishlist = (wishlist) => ({
  type: CREATE_WISHLIST,
  wishlist
})

const deleteWishlistItem = (itemId) => ({
  type: DELETE_WISHLIST,
  itemId
})

export const clearWishlist = () => ({
  type: CLEAR_WISHLIST
})

export const getAllWishlists = () => async (dispatch) => {
  const res = await fetch('/api/wishlists');
  if (res.ok) {
    const wishlists = await res.json()
    dispatch(loadWishlists(wishlists))
  }
}

export const getWishlistById = (id) => async (dispatch) => {
  const res = await fetch(`/api/wishlists/${id}`);
  if (res.ok) {
    const wishlist = await res.json()
    dispatch(loadWishlist(wishlist))
  }
}

export const createNewWishlist = (userId, itemId) => async (dispatch) => {
  const res = await fetch(`/api/wishlists/${itemId}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId,
      itemId,
      quantity,
    })
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(createWishlist(data))
    return data
  } else if ( res.status < 500 ) {
    const data = await res.json()
    if (data.errors) {
      return data.errors
      }
  } else {
    return ['An error occured. Please try again.']
  }
}

export const deleteSingleWishlist = (itemId) => async (dispatch) => {
  const res = await fetch(`/api/wishlists/${itemId}`, {
    method: 'DELETE'
  })
  if (res.ok) {
    await res.json()
    dispatch(deleteWishlistItem(itemId))
    return null
  }
}

export const deleteEntireWishlist = () => async (dispatch) => {
  const res = await fetch('/api/wishlists/remove', {
    method: 'DELETE'
  })
  if (res.ok) {
    await res.json()
    dispatch(clearWishlist())
    return null
  }
}


let initialState = {}

const wishlistReducer = ( state = initialState, action ) => {
  let newState = {};
  switch (action.type) {
    case LOAD_WISHLISTS:
      const wishlistsList = action.wishlists.wishlists;
      wishlistsList.forEach((wishlist) => {
        newState[wishlist.id] = wishlist;
      });
      return newState;
    case LOAD_WISHLIST:
      newState = { ...state }
      newState[action.wishlist.id] = action.wishlist
      return newState
    case CREATE_WISHLIST:
      newState = { ...state }
      newState[action.wishlist.id] = action.wishlist
      return newState
    case DELETE_WISHLIST:
      newState = { ...state }
      delete newState[action.itemId]
      return newState
    case CLEAR_WISHLIST:
      return initialState
    default:
      return state;
  }
}

export default wishlistReducer;
