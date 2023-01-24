import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../store/item";
import { NavLink } from "react-router-dom"
import './HomePage.css'

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const items = Object.values(useSelector(state => state.items))

  const item = items[1]

  useEffect(() => {
    dispatch(getAllItems())
    .then(() => setLoaded(true))
  }, [dispatch, loaded])

  if (!loaded) return null
  if (!item) return null

  return (
    <div className="targét-home-container">
      <h1 className="targét-home-header">Welcome to Targét</h1>
      <div className="targét-home-content-container">
        <NavLink to={`/items/${item.id}`}>
          <img src={item.imageUrl} alt='targét-item' className="targét-home-main-pic" />
        </NavLink>
      </div>
    </div>
  )
}
