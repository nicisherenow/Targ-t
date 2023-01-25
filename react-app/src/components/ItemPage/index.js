import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../store/item";
import { NavLink, useParams } from "react-router-dom"
import './ItemPage.css'

export default function ItemPage() {
  const [loaded, setLoaded] = useState(false)
  const { itemId } = useParams()
  const dispatch = useDispatch()
  const item = useSelector(state => state.items[itemId])

  useEffect(() => {
    dispatch(getAllItems())
    .then(() => setLoaded(true))
  }, [dispatch, loaded])

  if (!loaded) return null
  if (!item) return null

  return (
    <div className="targét-item-container">
      <h1 className="targét-item-header">{item.name}</h1>
      <div className="targét-item-content-container">
        <img src={item.imageUrl} alt='targét-item' className="targét-item-picture" />
        <div className="targét-item-info-container">
          <h2>${item.price}</h2>
          <div>Review Placeholder</div>
          <div>Quantity and Add to cart Placeholder</div>
        </div>
      </div>
    </div>
  )
}
