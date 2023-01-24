import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllItems } from "../../store/item";


export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllItems())
    .then(() => setLoaded(true))
  }, [dispatch, loaded])

  if (!loaded) return null

  return (
    <div className="targét-home-container">
      <h1 className="targét-home-header">Welcome to Targét</h1>
    </div>
  )
}
