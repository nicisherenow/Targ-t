import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../store/item";
import { NavLink } from "react-router-dom"
import './HomePage.css'
import { getAllReviews } from "../../store/review";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const items = Object.values(useSelector(state => state.items))


  const item = items[0]

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
    </div>
  )
}
