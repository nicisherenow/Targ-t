import homeLogo from '../../assets/home-logo.png'
import { NavLink } from 'react-router-dom'
import './PageNotFound.css'

export default function PageNotFound() {
  return (
    <div className='page-not-found'>
      <NavLink to='/' className='page-not-found-nav'>
        <img className='page-not-found-image' src={homeLogo} alt='home-logo-pnf' />
        <h1 className='page-not-found-header'>Page not found. Click here to go back home!</h1>
      </NavLink>
    </div>
  )
}
