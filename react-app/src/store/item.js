const LOAD_ITEMS = 'items/loadItems'
const LOAD_ITEM = 'item/loadItem'

const loadItems = (items) => ({
  type: LOAD_ITEMS,
  items,
});

const loadItem = (item) => ({
  type: LOAD_ITEM,
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

let initialState = {}

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
    default:
      return state;
  }
}

export default itemReducer;
