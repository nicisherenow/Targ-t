import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../auth/LoginForm";


export default function CartPage() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  useEffect(()=> {
    setLoaded(true)
  }, [loaded])

  if (!loaded) return null

  return (
    <>
    { !user ?
      <div>
        <h1>Your cart is empty</h1>
        <h3>Have an account? Sign in to see your cart</h3>
        <OpenModalButton
          buttonText='Sign in'
          modalComponent={<LoginForm />}
          className='sign-in-button'
          />
      </div>
      : null
    }
    </>
  )
}
