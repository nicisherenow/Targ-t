const LOAD_ITEMS = 'items/loadItems'

const load = (items) => ({
  type: LOAD_ITEMS,
  items,
});


export const getAllItems = () => async (dispatch) => {
  const res = await fetch('/api/items');
  if (res.ok) {
    const items = await res.json()
    dispatch(load(items))
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
    default:
      return state;
  }
}

export default itemReducer;
