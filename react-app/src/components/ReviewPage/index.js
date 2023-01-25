import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './ReviewPage.css'

export default function ReviewPage() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoaded(true)
  }, [loaded])

  if (!loaded) return null

  return (
    null
  )
}
