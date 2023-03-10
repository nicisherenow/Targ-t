import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../store/item";
import { NavLink } from "react-router-dom"
import './HomePage.css'
import { getAllReviews } from "../../store/review";
import { createNewCart, getAllCarts } from "../../store/cart";
import { getAllWishlists, deleteSingleWishlist } from "../../store/wishlist";
import arrLeft from '../../assets/arr-left.png'
import arrRight from '../../assets/arr-right.png'

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  const [categoryId, setCategoryId] = useState(0)
  const [itemId, setItemId] = useState(0)
  const dispatch = useDispatch()
  const items = useSelector(state => state.items)
  const user = useSelector(state => state.session.user)

  let itemsList;
  if (items) {
    itemsList = Object.values(items)
  }

  const categories = ['', 'Clothing, Shoes & Accessories', 'Furniture', 'Kitchen & Dining', 'Outdoor Living & Garden', 'Baby', 'Toys', 'Electronics', 'Video Games', 'Movies, Music, & Books', 'Sports & Outdoors']

  const category = categories[categoryId]

  let categoryList;
  if (itemsList) {
    categoryList = itemsList.filter(item => item.category === category)
  }

  const addToCart = async (e) => {
    e.preventDefault()
    await dispatch(createNewCart(user.id, +itemId, 1))
    await dispatch(deleteSingleWishlist(+itemId))
    await dispatch(getAllCarts())
    await dispatch(getAllWishlists())
  }

  const updateItemId = (e) => {
    setItemId(e.target.value)
  }

  const onPreviousClick = () => {
    if (categoryId > 0) {
      setCategoryId(+categoryId - 1)
    } else {
      setCategoryId(+categories.length - 1)
    }
  }

  const onNextClick = () => {
    if (categoryId < +categories.length - 1) {
      setCategoryId(+categoryId + 1)
    } else {
      setCategoryId(0)
    }
  }

  const item = itemsList[0]

  useEffect(() => {
    dispatch(getAllItems())
    dispatch(getAllReviews())
    .then(() => setLoaded(true))
  }, [dispatch, loaded])

  if (!loaded) return <div className="targét-home-container"></div>
  if (!item) return <div className="targét-home-container"></div>

  return (
    <div className="targét-home-container">
      <div className="targét-home-content-container">
        <div className="targét-home-words">
          <h1 className="targét-home-header">Welcome to Targét</h1>
          <h2>Tired of buying the same ol' everyday items at reasonable prices?</h2>
          <h3>Targét, where everything is just a little bit more expensive and that's ok because it's french.</h3>
        </div>
        <div className="pic-home-nav-container">
          <NavLink to={`/items/${item.id}`}>
            <img src={item.imageUrl} alt='targét-item' className="targét-home-main-pic" />
          </NavLink>
        </div>
      </div>
        <div className="category-arrows">
          <img onClick={onPreviousClick} src={arrLeft} alt='previous' className="previous-category" />
          <h4 className="category-header">{category ? category : "We've got it all!"}</h4>
          <img onClick={onNextClick} src={arrRight} alt='next' className="next-category" />
        </div>
        <div className="category-holder-rows">
        {category ? categoryList.map(item => (
          <div className='category-containers' key={item.id}>
          <NavLink className='category-navs' to={`/items/${item.id}`} key={item.id}>
            <img src={item.imageUrl} alt={item.name} className='home-shopping-image' />
            <div>${item.price}</div>
          </NavLink>
          {user ?
          <>
            <form onSubmit={addToCart}>
              <button type='submit' onClick={updateItemId} value={item.id} className='home-cart-button'>Add to cart</button>
            </form>
          </>
            : null
          }
        </div>
        )) :
        itemsList.map(item => (
        <div className='category-containers' key={item.id}>
          <NavLink className='category-navs' to={`/items/${item.id}`} key={item.id}>
            <img src={item.imageUrl} alt={item.name} className='home-shopping-image' />
            <div>${item.price}</div>
          </NavLink>
          {user ?
          <>
            <form onSubmit={addToCart}>
              <button type='submit' onClick={updateItemId} value={item.id} className='home-cart-button'>Add to cart</button>
            </form>
          </>
            : null
        }
        </div>
        ))

        }
        </div>
    </div>
  )
}
