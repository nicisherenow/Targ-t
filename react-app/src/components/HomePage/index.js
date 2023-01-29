import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../store/item";
import { NavLink } from "react-router-dom"
import './HomePage.css'
import { getAllReviews } from "../../store/review";
import { createNewCart, getAllCarts } from "../../store/cart";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  const [category, setCategory] = useState('')
  const [itemId, setItemId] = useState(0)
  const dispatch = useDispatch()
  const items = useSelector(state => state.items)
  const user = useSelector(state => state.session.user)

  let itemsList;
  if (items) {
    itemsList = Object.values(items)
  }

  let categoryList;
  if (itemsList) {
    categoryList = itemsList.filter(item => item.category === category)
  }

  const addToCart = async (e) => {
    e.preventDefault()
    await dispatch(createNewCart(user.id, +itemId, 1))
    await dispatch(getAllCarts())
  }

  const updateItemId = (e) => {
    setItemId(e.target.value)
  }
  const item = itemsList[0]

  useEffect(() => {
    dispatch(getAllItems())
    dispatch(getAllReviews())
    .then(() => setLoaded(true))
  }, [dispatch, loaded])

  if (!loaded) return null
  if (!item) return null

  return (
    <div className="targét-home-container">
      <div className="targét-home-content-container">
        <div className="targét-home-words">
          <h1 className="targét-home-header">Welcome to Targét</h1>
          <h2>Tired of buying the same ol' everyday items at reasonable prices?</h2>
          <h3>Where everything is just a little bit more expensive and that's ok because it's french.</h3>
        </div>
        <div className="pic-home-nav-container">
          <NavLink to={`/items/${item.id}`}>
            <img src={item.imageUrl} alt='targét-item' className="targét-home-main-pic" />
          </NavLink>
        </div>
      </div>
      <h4 className="category-header">{category ? category : "We've got it all!"}</h4>
        <div className="category-holder">
        {category ? categoryList.map(item => (
          <div className='category-containers'>
          <NavLink className='category-navs' to={`/items/${item.id}`} key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <div>${item.price}</div>
          </NavLink>
        </div>
        )) :
        itemsList.map(item => (
        <div className='category-containers'>
          <NavLink className='category-navs' to={`/items/${item.id}`} key={item.id}>
            <img src={item.imageUrl} alt={item.name} className='home-shopping-image' />
            <div>${item.price}</div>
          </NavLink>
          {user ?
          <button onClick={addToCart} onMouseEnter={updateItemId} value={item.id} className='home-cart-button'>Add to cart</button>
            : null
        }
        </div>
        ))

        }
        </div>
    </div>
  )
}
