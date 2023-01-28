import { nanoid } from 'nanoid'
import { NavLink } from 'react-router-dom'
import './CheckoutLanding.css'

export default function CheckoutLanding() {


  return (
    <div className="landing-container">
      <h1>Thank you for your purchase!</h1>
      <h3>Order number: {nanoid()}</h3>
      <div>You can expect to receive that order, NEVER!</div>
      <div>I hope you enjoyed my page! I had fun building it.</div>
      <NavLink to={'/'} className='no-text-deco'>Click here if you would like to continue "shopping"!</NavLink>
    </div>
  )
}
