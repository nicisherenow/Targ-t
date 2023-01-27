const LOAD_CARTS = 'carts/loadCarts'
const LOAD_CART = 'cart/loadCart'
const CREATE_CART = 'cart/createCart'

const loadCarts = (carts) => ({
  type: LOAD_CARTS,
  carts,
});

const loadCart = (cart) => ({
  type: LOAD_CART,
  cart
})

const createCart = (cart) => ({
  type: CREATE_CART,
  cart
})

export const getAllCarts = () => async (dispatch) => {
  const res = await fetch('/api/carts');
  if (res.ok) {
    const carts = await res.json()
    dispatch(loadCarts(carts))
  }
}

export const getCartById = (id) => async (dispatch) => {
  const res = await fetch(`/api/carts/${id}`);
  if (res.ok) {
    const cart = await res.json()
    dispatch(loadCart(cart))
  }
}

export const createNewCart = (userId, itemId, quantity) => async (dispatch) => {
  const res = await fetch(`/api/carts/${itemId}`, {
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
    dispatch(createCart(data))
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

let initialState = {}

const cartReducer = ( state = initialState, action ) => {
  let newState = {};
  switch (action.type) {
    case LOAD_CARTS:
      const cartsList = action.carts.carts;
      cartsList.forEach((cart) => {
        newState[cart.id] = cart;
      });
      return newState;
    case LOAD_CART:
      newState = { ...state }
      newState[action.cart.id] = action.cart
      return newState
    case CREATE_CART:
      newState = { ...state }
      newState[action.cart.id] = action.cart
      return newState
    default:
      return state;
  }
}

export default cartReducer;
